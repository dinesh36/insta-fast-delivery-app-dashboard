import React, { useMemo } from "react";
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, RowClickedEvent } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });

export type Order = {
    orderId: string;
    status: string;
    rider: string;
    placedAt: string;
    deliveryZone: string;
    estimatedDelivery: string;
};

type OrdersTableProps = {
    orders: Order[];
    onSelectOrder?: (order: Order) => void;
};

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onSelectOrder }) => {
    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
    }), []);

    const columnDefs: ColDef[] = useMemo(
        () => [
            { field: "orderId", headerName: "Order ID" },
            { field: "status", headerName: "Status" },
            { field: "rider", headerName: "Rider" },
            { field: "placedAt", headerName: "Time Placed" },
            { field: "deliveryZone", headerName: "Zone" },
            { field: "estimatedDelivery", headerName: "ETA" },
        ],
        []
    );

    const onRowClicked = (event: RowClickedEvent<Order>) => {
        if (event.data) {
            onSelectOrder?.(event.data);
        }
    };

    const onGridReady = (params: GridReadyEvent) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <div
            className="ag-theme-material"
            style={{
                height: "100%",
                width: "100%",
                border: "1px solid #ddd"
            }}
        >
            <AgGridReact
                rowData={orders}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                onRowClicked={onRowClicked}
                onGridReady={onGridReady}
                animateRows={true}
                rowSelection="multiple"
            />
        </div>
    )
};

export default OrdersTable;