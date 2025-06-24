import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAppSelector } from '@/redux-store/hooks';
import { OrderStatus } from '@/types/order';

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
        'Cancelled': '#F44336'
    };

    const chartData: ChartDataItem[] = [
        {
            label: 'Completed',
            value: orders.filter(order => order.status === OrderStatus.Completed).length
        },
        {
            label: 'Cancelled',
            value: orders.filter(order => order.status === OrderStatus.Cancelled).length
        }
    ];

    useEffect(() => {
        if (!ref.current) return;

        const container = ref.current;
        const { width } = container.getBoundingClientRect();
        const height = isMobile ? 900 : 300;
        const radius = Math.min(width, height) / 2 - 40;

        d3.select(container).selectAll('*').remove();

        const svg = d3.select(container)
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
            .attr('fill', (d) => colors[d.data.label])
            .transition()
            .duration(1000)
            .attrTween('d', function(d) {
                const interpolate = d3.interpolate<d3.PieArcDatum<ChartDataItem>>({
                    startAngle: 0,
                    endAngle: 0,
                    padAngle: 0,
                    value: d.value,
                    data: d.data,
                    index: d.index ?? 0
                }, d);
                return function(t): string {
                    return arc(interpolate(t)) ?? '';
                };
            });

        arcs.append('text')
            .attr('transform', (d) => {
                const [x, y] = arc.centroid(d);
                return `translate(${x}, ${y})`;
            })
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .style('font-size', isMobile ? '16px' : '12px')
            .style('fill', '#000')
            .text(d => {
                const percent = ((d.data.value / orders.length) * 100).toFixed(1);
                return `${d.data.label}\n${d.data.value} (${percent}%)`;
            });

        return () => {
            d3.select(container).selectAll('*').remove();
        };
    }, [chartData, isMobile, orders.length, colors]);

    return <div ref={ref} style={{ width: '100%', height: '100%', position: 'relative' }} />;
}

export default OrderStatusPieChart;