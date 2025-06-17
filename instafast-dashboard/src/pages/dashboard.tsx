import React from 'react';
import OrdersTable from '../components/orderTable/OrdersTable';
import mockOrders from '@/data/mockData';
import MapView from '@/components/map/MapView';
import mockRiders from '@/data/mockRiders';
import ChartView from '@/components/chart/ChartView';

function Dashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{
        flex: 1,
        borderRight: '1px solid #ccc',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <div style={{ flex: 0.6, overflowY: 'auto' }}>
          <OrdersTable orders={mockOrders} />
        </div>
        <div style={{ flex: 0.4, overflow: 'hidden' }}>
          <ChartView />
        </div>
      </div>

      <div style={{ flex: 1, padding: '10px' }}>
        <MapView riders={mockRiders} />
      </div>
    </div>
  );
}

export default Dashboard;
