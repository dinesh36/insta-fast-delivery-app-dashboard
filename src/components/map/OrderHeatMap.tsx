import React, { useMemo } from 'react';
import { HeatmapLayerF } from '@react-google-maps/api';
import { Select, MenuItem, Box, Typography } from '@mui/material';
import mockRiders from '../../data/mockRiders';

const heatmapGradient = [
    'rgba(0,255,0,0)',
    'rgba(0,255,0,1)',
    'rgba(255,255,0,1)',
    'rgba(255,165,0,1)',
    'rgba(255,0,0,1)',
];

type OrderPoint = { lat: number; lng: number; orders: number };
type RiderData = { riderId: string; name: string; orderData: OrderPoint[] };

const ALL_RIDERS = 'ALL_RIDERS';

type Props = {
    selectedRiderId: string;
    setSelectedRiderId: (id: string) => void;
};

const OrderHeatMap: React.FC<Props> = ({ selectedRiderId, setSelectedRiderId }) => {
    const heatmapData = useMemo(() => {
        let points: OrderPoint[] = [];
        if (selectedRiderId === ALL_RIDERS) {
            mockRiders.forEach((r) => {
                points = points.concat(r.orderData);
            });
        } else {
            const rider = mockRiders.find((r) => r.riderId === selectedRiderId);
            points = rider?.orderData || [];
        }
        return points.map((loc) => ({
            location: new window.google.maps.LatLng(loc.lat, loc.lng),
            weight: loc.orders,
        }));
    }, [selectedRiderId]);

    const handleChange = (e: any) => {
        setSelectedRiderId(e.target.value as string);
    };

    return (
        <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2, background: '#fff', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
                Order Heatmap by Rider
            </Typography>
            <Select
                value={selectedRiderId}
                onChange={handleChange}
                sx={{ mb: 2, minWidth: 200 }}
            >
                <MenuItem value={ALL_RIDERS}>All Riders</MenuItem>
                {mockRiders.map((r: RiderData) => (
                    <MenuItem key={r.riderId} value={r.riderId}>
                        {r.name}
                    </MenuItem>
                ))}
            </Select>
            <HeatmapLayerF
                data={heatmapData}
                options={{
                    radius: 30,
                    opacity: 0.7,
                    gradient: heatmapGradient,
                }}
            />
        </Box>
    );
};

export default OrderHeatMap;
