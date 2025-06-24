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
import OrderStatusPieChart from "@/components/chart/OrderStatusPieChart";

export interface RiderData {
  riderId: string;
  name: string;
  orders: OrderData[];
}

function ChartView(): React.ReactElement {
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | 'comparison' | 'status'>('line');
  const [selectedRange, setSelectedRange] = useState<DateRange>('1W');
  const orders = useAppSelector((state) => state.orderList.orders);

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#48bb78'];

  const aggregatedData = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    if (order.isDelayed) acc['Delayed'] = (acc['Delayed'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(aggregatedData).map(([label, value]) => ({
    label,
    value,
  }));

  const aggregatedCityData = orders
    .filter((order) => order.status === 'Completed')
    .reduce((acc, order) => {
      acc[order.city] = (acc[order.city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const barChartData = Object.entries(aggregatedCityData).map(([city, completedOrders]) => ({
    city,
    completedOrders,
  }));

  const handleChartTypeChange = (type: 'bar' | 'pie' | 'line' | 'comparison' | 'status') => {
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
            <BarChart data={barChartData} colors={colors} />
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
          {chartType === 'status' && (
              <OrderStatusPieChart />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ChartView;

