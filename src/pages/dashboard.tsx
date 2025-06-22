import React, { useState, useCallback, useRef } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import OrdersTable from '../components/orderTable/OrdersTable';
import mockOrders from '@/data/mockData';
import MapView from '@/components/map/MapView';
import mockRiders from '@/data/mockRiders';
import ChartView from '@/components/chart/ChartView';
import ResizeHandle from '@/components/resizeHandle/ResizeHandle';

function Dashboard() {
  const [leftWidth, setLeftWidth] = useState(50);
  const [topHeight, setTopHeight] = useState(60);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Box sx={{ height: '100vh' }}>
        <Box sx={{ height: '100vh', minHeight: '500px' }}>
          <OrdersTable orders={mockOrders} />
        </Box>
        <Box sx={{ height: '100vh', minHeight: '500px' }}>
          <ChartView />
        </Box>
        <Box sx={{ height: '100vh', minHeight: '500px' }}>
          <MapView riders={mockRiders} />
        </Box>
      </Box>
    );
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
        <Box sx={{
          position: 'relative',
          height: `${topHeight}%`,
          overflow: 'hidden',
        }}
        >
          <OrdersTable orders={mockOrders} />
          <ResizeHandle direction="vertical" onMouseDown={handleVerticalResize} />
        </Box>
        <Box sx={{
          height: `${100 - topHeight}%`,
          overflow: 'hidden',
        }}
        >
          <ChartView />
        </Box>
        <ResizeHandle direction="horizontal" onMouseDown={handleHorizontalResize} />
      </Box>

      <Box sx={{
        width: `${100 - leftWidth}%`,
        overflow: 'hidden',
      }}
      >
        <MapView riders={mockRiders} />
      </Box>
    </Box>
  );
}

export default Dashboard;
