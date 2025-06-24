import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAppSelector } from '@/redux-store/hooks';
import { OrderStatus } from '@/types/order';
import Legend from './Legend';

interface ChartDataItem {
  label: 'Completed' | 'Cancelled';
  value: number;
}

function OrderStatusPieChart(): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const orders = useAppSelector((state) => state.orderList.orders);

  const colors: Record<ChartDataItem['label'], string> = {
    'Completed': '#4CAF50',
    'Cancelled': '#F44336',
  };

  const chartData: ChartDataItem[] = [
    {
      label: 'Completed',
      value: orders.filter((order) => order.status === OrderStatus.Completed).length,
    },
    {
      label: 'Cancelled',
      value: orders.filter((order) => order.status === OrderStatus.Cancelled).length,
    },
  ];

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const { width } = container.getBoundingClientRect();
    const height = isMobile ? 900 : 300;
    const radius = Math.min(width, height) / 2 - 40;

    d3.select(container).selectAll('*').remove();

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<ChartDataItem>().value((d) => d.value);
    const arc = d3.arc<d3.PieArcDatum<ChartDataItem>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(chartData))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d) => colors[d.data.label]);
  }, [chartData, isMobile, orders.length, colors]);

  const legendData = chartData.map((item) => ({
    label: item.label,
    color: colors[item.label],
  }));

  return (
    <div style={{ position: 'relative' }}>
      <div ref={ref} style={{ width: '100%', height: '100%', position: 'relative' }} />
      <Legend data={legendData} />
    </div>
  );
}

export default OrderStatusPieChart;