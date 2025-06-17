import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface OrderData {
    label: string;
    value: number;
}

interface BarChartProps {
    data: OrderData[];
    colors: string[];
}

function BarChart({ data, colors }: BarChartProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const { width } = container.getBoundingClientRect();
    const height = 300;
    const margin = {
      top: 20, right: 20, bottom: 40, left: 40,
    };

    d3.select(ref.current).selectAll('*').remove();

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)! + 5])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.label)!)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d.value))
      .attr('fill', (_, i) => colors[i]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data, colors]);

  return <div ref={ref} />;
}

export default BarChart;
