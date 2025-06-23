import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export interface DataPoint {
    date: string;
    value: number;
}

interface LineChartWithShadowProps {
    data: DataPoint[];
}

function LineChart({ data }: LineChartWithShadowProps): React.ReactElement {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const container = ref.current;
        const { width } = container.getBoundingClientRect();
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 30, left: 50 };

        d3.select(container).selectAll('*').remove();

        const svg = d3
            .select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const parseDate = d3.timeParse('%Y-%m-%d');
        const formattedData = data.map(d => ({
            ...d,
            date: parseDate(d.date) as Date,
        }));

        const x = d3
            .scaleTime()
            .domain(d3.extent(formattedData, d => d.date) as [Date, Date])
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(formattedData, d => d.value)! * 1.1])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const area = d3
            .area<DataPoint>()
            .x(d => x(d.date as unknown as Date))
            .y0(height - margin.bottom)
            .y1(d => y(d.value))
            .curve(d3.curveMonotoneX);

        const line = d3
            .line<DataPoint>()
            .x(d => x(d.date as unknown as Date))
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX);

        const defs = svg.append('defs');
        const gradient = defs
            .append('linearGradient')
            .attr('id', 'lineGradient')
            .attr('x1', '0')
            .attr('y1', '0')
            .attr('x2', '0')
            .attr('y2', '1');

        gradient
            .append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#4caf50')
            .attr('stop-opacity', 0.4);

        gradient
            .append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#4caf50')
            .attr('stop-opacity', 0);

        svg
            .append('path')
            .datum(formattedData)
            .attr('fill', 'url(#lineGradient)')
            .attr('d', area(formattedData as unknown as DataPoint[]) ?? '');

        svg
            .append('path')
            .datum(formattedData)
            .attr('fill', 'none')
            .attr('stroke', '#4caf50')
            .attr('stroke-width', 2)
            .attr('d', line(formattedData as unknown as DataPoint[]) ?? '');

        svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat('%d %b') as any));

        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(5));

        const focusLine = svg.append('line')
            .attr('stroke', '#ccc')
            .attr('stroke-width', 1)
            .attr('y1', margin.top)
            .attr('y2', height - margin.bottom)
            .style('opacity', 0);

        const focusCircle = svg.append('circle')
            .attr('r', 4)
            .attr('fill', '#4caf50')
            .style('opacity', 0);

        const focusText = svg.append('text')
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'hanging')
            .style('font-size', '12px')
            .style('opacity', 0);

        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mousemove', function (event) {
              const [mx] = d3.pointer(event);
              const date = x.invert(mx);
              const bisect = d3.bisector((d: any) => d.date).left;
              const i = bisect(formattedData, date, 1);
              const a = formattedData[i - 1];
              const b = formattedData[i];
              const d = b && (date.getTime() - a.date.getTime() > b.date.getTime() - date.getTime()) ? b : a;
              if (!d) return;

              const cx = x(d.date);
              const cy = y(d.value);

              focusLine.attr('x1', cx).attr('x2', cx).style('opacity', 1);
              focusCircle.attr('cx', cx).attr('cy', cy).style('opacity', 1);
              focusText
                .attr('x', cx + 8)
                .attr('y', cy - 12)
                .text(`${d3.timeFormat('%d %b %Y')(d.date)}: ₹${d.value.toLocaleString()}`)
                .style('opacity', 1);
            })
            .on('mouseout', () => {
              focusLine.style('opacity', 0);
              focusCircle.style('opacity', 0);
              focusText.style('opacity', 0);
            });
    }, [data]);

    return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
}

export default LineChart;