import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import mockChartData from '@/data/mockChartData';
import BarChart, { OrderData } from './BarChart';
import PieChart from './PieChart';

interface RiderData {
    riderId: string;
    name: string;
    orders: OrderData[];
}

function ChartView(): React.ReactElement {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [selectedRider, setSelectedRider] = useState<RiderData>(
    mockChartData[0],
  );

  const colors = ['#FF6384', '#36A2EB', '#FFCE56'];
  const totalOrders = selectedRider.orders.reduce((sum, o) => sum + o.value, 0);

  const handleRiderChange = (event: SelectChangeEvent) => {
    const rider = mockChartData.find((r) => r.riderId === event.target.value);
    if (rider) setSelectedRider(rider);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
        {' '}
        Chart for
        {' '}
        <strong>{selectedRider.name}</strong>
      </Typography>

      <Select
        value={selectedRider.riderId}
        onChange={handleRiderChange}
        sx={{ mb: 2, width: 250 }}
      >
        {mockChartData.map((rider) => (
          <MenuItem key={rider.riderId} value={rider.riderId}>
            {rider.name}
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ width: '100%', height: 400, mb: 2 }}>
        {chartType === 'bar' ? (
          <BarChart data={selectedRider.orders} colors={colors} />
        ) : (
          <PieChart data={selectedRider.orders} colors={colors} />
        )}
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total Orders:
        {' '}
        <strong>{totalOrders}</strong>
      </Typography>

      <Button
        variant="contained"
        onClick={() => setChartType((prev) => (prev === 'bar' ? 'pie' : 'bar'))}
      >
        Switch to
        {' '}
        {chartType === 'bar' ? 'Pie' : 'Bar'}
        {' '}
        Chart
      </Button>
    </Box>
  );
}

export default ChartView;
