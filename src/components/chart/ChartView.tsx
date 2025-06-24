import React, { useState } from 'react';
import { Box, Typography, SelectChangeEvent } from '@mui/material';
import {mockChartData} from '@/data/mockChartData';
import BarChart, { OrderData } from './BarChart';
import PieChart from './PieChart';
import ChartToolbar from './ChartToolbar';
import LineChart from "@/components/chart/LineChart";
import {useAppSelector} from "@/redux-store/hooks";
import ChartRange, {DateRange} from "@/components/chart/ChartRange";

export interface RiderData {
  riderId: string;
  name: string;
  orders: OrderData[];
}

function ChartView(): React.ReactElement {
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');
  const [selectedRider, setSelectedRider] = useState<RiderData>(mockChartData[0]);
    const [selectedRange, setSelectedRange] = useState<DateRange>('1W');
    const orders = useAppSelector((state) => state.orderList.orders);

  const colors = ['#FF6384', '#36A2EB', '#FFCE56'];
  const totalOrders = selectedRider.orders.reduce((sum, o) => sum + o.value, 0);

    const handleChartTypeChange = (type: 'bar' | 'pie' | 'line') => {
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
                <PieChart data={selectedRider.orders} colors={colors} />
            )}
            {chartType === 'line' && (
                <LineChart orders={orders} range={selectedRange} />
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
