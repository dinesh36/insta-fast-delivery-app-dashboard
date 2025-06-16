import React from "react";
import OrdersTable, {Order} from "../components/OrdersTable";
import { mockOrders } from "@/data/mockData";
import MapView from "@/components/map/MapView";
import {mockRiders} from "@/data/mockRiders";

const Dashboard = () => {
    const handleSelectOrder = (order: Order) => {
        console.log("Selected order:", order);
    };

    return (
        <div style={{display: "flex", height: "100vh"}}>
            <div style={{flex: 1, borderRight: "1px solid #ccc", padding: "10px"}}>
                <OrdersTable orders={mockOrders}/>
            </div>
            <div style={{flex: 1, padding: "10px"}}>
                <MapView riders={mockRiders}/>
            </div>
        </div>
    );
};

export default Dashboard;