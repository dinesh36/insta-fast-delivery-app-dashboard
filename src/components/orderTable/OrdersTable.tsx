import React, {JSX, useEffect, useMemo} from 'react';
import {
    AllCommunityModule,
    ModuleRegistry,
    provideGlobalGridOptions,
    ColDef, GridReadyEvent, RowClickedEvent, GridApi,
} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';
import {useMediaQuery, useTheme} from '@mui/material';
import {Order} from "@/types/order";

ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({theme: 'legacy'});

type OrdersTableProps = {
    orders: Order[];
    onSelectOrder?: (order: Order) => void;
};

function OrdersTable({orders, onSelectOrder}: OrdersTableProps): JSX.Element {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const gridApiRef = React.useRef<GridApi | null>(null);

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 100,
        }),
        [],
    );

    const columnDefs: ColDef[] = useMemo(
        () => [
            {field: 'orderId', headerName: 'Order Number'},
            {field: 'orderFrom', headerName: 'Order From'},
            {field: 'restaurant', headerName: 'Restaurant'},
            {field: 'rider', headerName: 'Delivery Rider'},
            {field: 'status', headerName: 'Status'},
            {field: 'placedAt', headerName: 'Order At'},
            {field: 'estimatedDelivery', headerName: 'Expected Delivery Time'},
            {field: 'deliveredAt', headerName: 'Actual Delivery Time'},
            {field: 'isDelayed', headerName: 'Is Delayed'},
            {field: 'city', headerName: 'City'},
            {field: 'deliveryZone', headerName: 'Area'},
        ],
        [],
    );

    const onRowClicked = (event: RowClickedEvent<Order>) => {
        if (event.data) {
            onSelectOrder?.(event.data);
        }
    };
    const handleResize = () => {
        if (gridApiRef.current) {
            requestAnimationFrame(() => {
                gridApiRef.current?.sizeColumnsToFit();
                gridApiRef.current?.resetRowHeights();
            });
        }
    };

    const onGridReady = (params: GridReadyEvent) => {
        gridApiRef.current = params.api;
        handleResize();
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        handleResize();
    }, [isMobile]);

    return (
        <div
            className="ag-theme-material"
            style={{
                height: '100%',
                width: '100%',
                border: '1px solid #ddd',
                minHeight: isMobile ? 400 : 600,
                overflow: 'auto',
            }}
        >
            <AgGridReact
                key={isMobile ? 'mobile' : 'desktop'}
                rowData={orders}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onRowClicked={onRowClicked}
                onGridReady={onGridReady}
                animateRows
                rowSelection="multiple"
                pagination
                paginationPageSize={isMobile ? 5 : 10}
                paginationAutoPageSize={isMobile}
                suppressPaginationPanel={false}
            />
        </div>
    );
}

export default OrdersTable;
