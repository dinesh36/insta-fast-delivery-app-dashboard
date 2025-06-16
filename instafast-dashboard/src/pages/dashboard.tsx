import React from "react";
import OrdersTable, {Order} from "../components/OrdersTable";
import { mockOrders } from "@/data/mockData";

const Dashboard = () => {
    const handleSelectOrder = (order: Order) => {
        console.log("Selected order:", order);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Orders Dashboard</h2>
            <OrdersTable orders={mockOrders} onSelectOrder={handleSelectOrder} />
        </div>
    );
};

export default Dashboard;