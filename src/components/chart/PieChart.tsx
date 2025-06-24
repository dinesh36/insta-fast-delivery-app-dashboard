import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useMediaQuery, useTheme } from '@mui/material';
import Legend from './Legend';

interface OrderData {
  label: string;
  value: number;
}

interface PieChartProps {
  data: OrderData[];
  colors: string[];
}

function PieChart({ data, colors }: PieChartProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const { width } = container.getBoundingClientRect();
    const height = isMobile ? 900 : 300;
    const radius = Math.min(width, height) / 2 - 20;

    d3.select(ref.current).selectAll('*').remove();

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<{ label: string; value: number }>().value((d) => d.value);
    const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc as any)
      .attr('fill', (_, i) => colors[i % colors.length]);
  }, [data, colors, isMobile]);

  const legendData = data.map((item, index) => ({
    label: item.label,
    color: colors[index % colors.length],
  }));

  return (
    <div style={{ position: 'relative' }}>
      <div ref={ref} />
      <Legend data={legendData} />
    </div>
  );
}

export default PieChart;
