import React, { useMemo} from 'react';
import { HeatmapLayerF } from '@react-google-maps/api';
import { Box, Typography } from '@mui/material';
import mockRiders from '../../data/mockRiders';

const heatmapGradient = [
    'rgba(0,255,0,0)',
    'rgba(0,255,0,1)',
    'rgba(255,255,0,1)',
    'rgba(255,165,0,1)',
    'rgba(255,0,0,1)',
];

const OrderHeatMap: React.FC = () => {
    const { heatmapData } = useMemo(() => {
        let heatmapPoints: google.maps.visualization.WeightedLocation[] = [];
        let markerPoints: { lat: number; lng: number; orders: number }[] = [];
        mockRiders.forEach((r) => {
            r.orderData.forEach((d) => {
                heatmapPoints.push({
                    location: new window.google.maps.LatLng(d.center.lat, d.center.lng),
                    weight: d.orders,
                });
                markerPoints.push({
                    lat: d.center.lat,
                    lng: d.center.lng,
                    orders: d.orders,
                });
            });
        });
        return { heatmapData: heatmapPoints, markerData: markerPoints };
    }, []);


    return (
        <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2, background: '#fff', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
                Order Heatmap (All Areas)
            </Typography>
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

export default OrderHeatMap
