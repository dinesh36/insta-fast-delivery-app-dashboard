import React, { useState } from 'react';
import { Box, Typography, SelectChangeEvent } from '@mui/material';
import {mockChartData} from '@/data/mockChartData';
import BarChart, { OrderData } from './BarChart';
import PieChart from './PieChart';
import ChartToolbar from './ChartToolbar';
import LineChart from "@/components/chart/LineChart";
import {useAppSelector} from "@/redux-store/hooks";
import ChartRange, {DateRange} from "@/components/chart/ChartRange";
import OrderComparisonPieChart from "@/components/chart/OrderComparisonPieChart";

export interface RiderData {
  riderId: string;
  name: string;
  orders: OrderData[];
}

function ChartView(): React.ReactElement {
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | 'comparison'>('bar');
  const [selectedRider, setSelectedRider] = useState<RiderData>(mockChartData[0]);
  const [selectedRange, setSelectedRange] = useState<DateRange>('1W');
  const orders = useAppSelector((state) => state.orderList.orders);

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  const totalOrders = selectedRider.orders.reduce((sum, o) => sum + o.value, 0);

  const aggregatedData = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    if (order.isDelayed) acc['Delayed'] = (acc['Delayed'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(aggregatedData).map(([label, value]) => ({
    label,
    value,
  }));

  const handleChartTypeChange = (type: 'bar' | 'pie' | 'line' | 'comparison') => {
    setChartType(type);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChartToolbar chartType={chartType} onChartTypeChange={handleChartTypeChange} />
      {chartType === 'line' && (
        <Box>
          <ChartRange range={selectedRange} onRangeChange={setSelectedRange} />
        </Box>
      )}

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          {chartType === 'bar' && (
            <BarChart data={selectedRider.orders} colors={colors} />
          )}
          {chartType === 'pie' && (
            <PieChart data={pieChartData} colors={colors} />
          )}
          {chartType === 'line' && (
            <LineChart orders={orders} range={selectedRange} />
          )}
          {chartType === 'comparison' && (
              <OrderComparisonPieChart />
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
