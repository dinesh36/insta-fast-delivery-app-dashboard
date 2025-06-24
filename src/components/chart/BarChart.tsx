import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useMediaQuery, useTheme } from '@mui/material';

export interface OrderData {
  city: string;
  completedOrders: number;
}

interface BarChartProps {
  data: OrderData[];
  colors: string[];
}

function BarChart({ data, colors }: BarChartProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderChart = () => {
    if (!ref.current) return;

    const container = ref.current;
    const { width } = container.getBoundingClientRect();
    const height = isMobile ? 900 : 300;
    const margin = {
      top: 20, right: 20, bottom: 50, left: 40,
    };

    d3.select(container).selectAll('*').remove();

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.city))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.completedOrders)! + 5])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.city)!)
      .attr('y', (d) => y(d.completedOrders))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d.completedOrders))
      .attr('fill', (_, i) => colors[i % colors.length]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  };

  useEffect(() => {
    renderChart();
    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [data, colors, isMobile]);

  return <div ref={ref} key={isMobile ? 'mobile' : 'desktop'} style={{ width: '100%', height: '100%' }} />;
}

export default BarChart;
