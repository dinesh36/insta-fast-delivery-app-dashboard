import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAppSelector } from '@/redux-store/hooks';
import Legend from './Legend';

interface ChartDataItem {
  label: 'On Time' | 'Delayed';
  value: number;
}

function OrderComparisonPieChart(): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const orders = useAppSelector((state) => state.orderList.orders);

  const colors: Record<ChartDataItem['label'], string> = {
    'On Time': '#4CAF50',
    'Delayed': '#FF9F40',
  };

  const chartData: ChartDataItem[] = [
    { label: 'On Time', value: orders.filter((order) => !order.isDelayed).length },
    { label: 'Delayed', value: orders.filter((order) => order.isDelayed).length },
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
  }, [chartData, isMobile, orders.length]);

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

export default OrderComparisonPieChart;