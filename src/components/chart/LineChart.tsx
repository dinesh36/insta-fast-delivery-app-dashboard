import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { Order, OrderStatus } from "@/types/order";

interface LineChartProps {
    orders: Order[];
    range: '1W' | '1M' | '6M' | '1Y';
}

const RANGE_DAYS: Record<LineChartProps['range'], number> = {
    '1W': 7, '1M': 30, '6M': 182, '1Y': 365,
};

const MARGIN = { top: 40, right: 50, bottom: 130, left: 60 };

const prepareChartData = (orders: Order[], range: LineChartProps['range']) => {
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - RANGE_DAYS[range]);

    const counts: Record<string, number> = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        counts[d.toISOString().slice(0, 10)] = 0;
    }

    orders.forEach(order => {
        if (order.status === OrderStatus.Completed) {
            const key = new Date(order.deliveredAt).toISOString().slice(0, 10);
            if (counts[key] !== undefined) counts[key]++;
        }
    });

    return Object.entries(counts).map(([dateStr, value]) => ({
        date: new Date(dateStr),
        value,
    }));
};

const createScales = (data: { date: Date; value: number }[], width: number, height: number) => {
    const dates = d3.extent(data, d => d.date);
    const minDate = dates[0] ?? new Date();
    const maxDate = dates[1] ?? new Date();

    const adjustedMaxDate = minDate.getTime() === maxDate.getTime()
        ? new Date(maxDate.getTime() + 86400000)
        : maxDate;

    return {
        x: d3.scaleTime()
            .domain([minDate, adjustedMaxDate!])
            .range([0, width]),
        y: d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)! * 1.2])
            .range([height, 0])
    };
};

const createTooltip = () => {
    return d3.select(document.body)
        .append('div')
        .attr('id', 'chart-tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('padding', '8px')
        .style('border', '1px solid #ddd')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')
        .style('opacity', 0)
        .style('z-index', '9999');
};

function LineChart({ orders, range }: LineChartProps): React.ReactElement {
    const ref = useRef<HTMLDivElement | null>(null);
    const data = useMemo(() => prepareChartData(orders, range), [orders, range]);

    useEffect(() => {
        if (!ref.current) return;

        const container = ref.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const width = containerWidth - MARGIN.left - MARGIN.right;
        const height = containerHeight - MARGIN.top - MARGIN.bottom;

        d3.select(container).selectAll('*').remove();

        const svg = d3.select(container)
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .append('g')
            .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

        const { x, y } = createScales(data, width, height);

        // Add axes
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5))
            .style('font-size', '12px');

        svg.append('g')
            .call(d3.axisLeft(y).ticks(5))
            .style('font-size', '12px');

        // Add y-axis label
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -MARGIN.left + 20)
            .attr('x', -height / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .text('Orders Delivered');

        // Create area and line
        const area = d3.area<any>()
            .x(d => x(d.date))
            .y0(height)
            .y1(d => y(d.value))
            .curve(d3.curveMonotoneX);

        const line = d3.line<any>()
            .x(d => x(d.date))
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX);

        // Draw area and line
        svg.append('path')
            .datum(data)
            .attr('fill', 'rgba(76, 175, 80, 0.1)')
            .attr('d', area);

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#4caf50')
            .attr('stroke-width', 2)
            .attr('d', line);

        // Setup tooltip
        const tooltip = createTooltip();
        const focusLine = svg.append('line')
            .attr('stroke', '#999')
            .attr('stroke-width', 1)
            .attr('y1', 0)
            .attr('y2', height)
            .style('opacity', 0);

        const focusCircle = svg.append('circle')
            .attr('r', 4)
            .attr('fill', '#4caf50')
            .style('opacity', 0);

        // Add interaction area
        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mousemove', function (event) {
                const [mx] = d3.pointer(event);
                const bisect = d3.bisector((d: any) => d.date).left;
                const i = bisect(data, x.invert(mx), 1);
                const d = data[i - 1];

                const cx = x(d.date);
                const cy = y(d.value);

                focusLine.attr('x1', cx).attr('x2', cx).style('opacity', 1);
                focusCircle.attr('cx', cx).attr('cy', cy).style('opacity', 1);
                tooltip
                    .style('opacity', 0.9)
                    .html(`Date: ${d3.timeFormat('%b %d, %Y')(d.date)}<br/>Orders: ${d.value}`)
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 28}px`);
            })
            .on('mouseout', () => {
                focusLine.style('opacity', 0);
                focusCircle.style('opacity', 0);
                tooltip.style('opacity', 0);
            });

        return () => {
            tooltip.remove();
            d3.select(container).selectAll('*').remove();
        };
    }, [data]);

    return (
        <div ref={ref} style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            minHeight: '400px',
            overflow: 'hidden',
        }} />
    );
}

export default LineChart;