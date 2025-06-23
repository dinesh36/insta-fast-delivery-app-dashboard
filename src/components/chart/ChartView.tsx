import React, { useState } from 'react';
import { Box, Typography, SelectChangeEvent } from '@mui/material';
import {mockChartData, mockLineData} from '@/data/mockChartData';
import BarChart, { OrderData } from './BarChart';
import PieChart from './PieChart';
import ChartToolbar from './ChartToolbar';
import LineChart from "@/components/chart/LineChart";

export interface RiderData {
  riderId: string;
  name: string;
  orders: OrderData[];
}

function ChartView(): React.ReactElement {
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');
  const [selectedRider, setSelectedRider] = useState<RiderData>(mockChartData[0]);

  const colors = ['#FF6384', '#36A2EB', '#FFCE56'];
  const totalOrders = selectedRider.orders.reduce((sum, o) => sum + o.value, 0);

  const handleRiderChange = (event: SelectChangeEvent) => {
    const rider = mockChartData.find((r) => r.riderId === event.target.value);
    if (rider) setSelectedRider(rider);
  };

    const handleChartTypeChange = (type: 'bar' | 'pie' | 'line') => {
        setChartType(type);
    };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChartToolbar
        chartType={chartType}
        selectedRider={selectedRider}
        riders={mockChartData}
        onChartTypeChange={handleChartTypeChange}
        onRiderChange={handleRiderChange}
      />

      <Box sx={{ flex: 1, p: 2, minHeight: 0 }}>
        <Box sx={{ width: '100%', height: '100%' }}>
            {chartType === 'bar' && (
                <BarChart data={selectedRider.orders} colors={colors} />
            )}
            {chartType === 'pie' && (
                <PieChart data={selectedRider.orders} colors={colors} />
            )}
            {chartType === 'line' && (
                <LineChart data={mockLineData} />
            )}
        </Box>
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle1">
          Total Orders:
          {' '}
          <strong>{totalOrders}</strong>
        </Typography>
      </Box>
    </Box>
  );
}

export default ChartView;
