"use client";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box, useMediaQuery, useTheme} from "@mui/material";
import OrdersTable from "@/components/orderTable/OrdersTable";
import ChartView from "@/components/chart/ChartView";
import MapView from "@/components/map/MapView";
import mockRiders from "@/data/mockRiders";
import ResizeHandle from "@/components/resizeHandle/ResizeHandle";
import {useAppDispatch} from "@/redux-store/hooks";
import {setOrders, setOrdersLoading} from "@/redux-store/order-list-slice";

export default function homePage() {
    const [leftWidth, setLeftWidth] = useState(50);
    const [topHeight, setTopHeight] = useState(60);
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        const getOrders = async () => {
            console.log('inside get orders list');
            try{
                dispatch(setOrdersLoading(true))
                const response = await fetch('/api/orders');
                const orders = await response.json()
                dispatch(setOrders(orders))
            } finally {
                dispatch(setOrdersLoading(false))
            }
        }
        getOrders()
    }, []);

    const handleHorizontalResize = useCallback((mouseDownEvent: React.MouseEvent) => {
        mouseDownEvent.preventDefault();
        const startX = mouseDownEvent.clientX;
        const startWidth = leftWidth;

        const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            const deltaX = mouseMoveEvent.clientX - startX;
            const newWidth = startWidth + (deltaX / window.innerWidth) * 100;
            setLeftWidth(Math.min(Math.max(20, newWidth), 80));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [leftWidth]);

    const handleVerticalResize = useCallback((mouseDownEvent: React.MouseEvent) => {
        mouseDownEvent.preventDefault();
        const startY = mouseDownEvent.clientY;
        const startHeight = topHeight;
        const containerHeight = containerRef.current?.clientHeight || window.innerHeight;

        const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            const deltaY = mouseMoveEvent.clientY - startY;
            const newHeight = startHeight + (deltaY / containerHeight) * 100;
            setTopHeight(Math.min(Math.max(20, newHeight), 80));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [topHeight]);

    if (isMobile) {
        return (
            <Box sx={{height: '100vh'}}>
                <Box sx={{height: '400px', minHeight: '500px'}}>
                    <OrdersTable/>
                </Box>
                <Box sx={{height: '500px', minHeight: '500px'}}>
                    <ChartView/>
                </Box>
                <Box sx={{height: '600px', minHeight: '500px'}}>
                    <MapView riders={mockRiders}/>
                </Box>
            </Box>
        );
    }

    const renderGrid = () => {
        return <Box sx={{
            position: 'relative',
            height: `${topHeight}%`,
            overflow: 'hidden',
        }}
        >
            <OrdersTable/>
            <ResizeHandle direction="vertical" onMouseDown={handleVerticalResize}/>
        </Box>
    }

    const renderMap = () => {
        return <Box sx={{
            width: `${100 - leftWidth}%`,
            overflow: 'hidden',
        }}
        >
            <MapView riders={mockRiders}/>
        </Box>
    }

    const renderChart = () => {
        return <>
            <Box sx={{
                height: `${100 - topHeight}%`,
                overflow: 'hidden',
            }}
            >
                <ChartView/>
            </Box>
            <ResizeHandle direction="horizontal" onMouseDown={handleHorizontalResize}/>
        </>
    }

    return (
        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
                userSelect: 'none',
            }}
        >
            <Box sx={{
                position: 'relative',
                width: `${leftWidth}%`,
                display: 'flex',
                flexDirection: 'column',
            }}
            >
                {renderGrid()}
                {renderChart()}
            </Box>

            {renderMap()}
        </Box>
    );
}
