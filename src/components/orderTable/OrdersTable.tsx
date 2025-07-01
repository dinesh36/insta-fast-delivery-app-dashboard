import React, {JSX, useEffect, useMemo, useRef} from 'react';
import {
    AllCommunityModule,
    ModuleRegistry,
    provideGlobalGridOptions,
    ColDef, GridReadyEvent, RowClickedEvent, GridApi
} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';
import {useMediaQuery, useTheme} from '@mui/material';
import {Order} from "@/types/order";
import {useAppDispatch, useAppSelector} from '@/redux-store/hooks';
import {TextFilter} from "@/components/orderTable/TextFilter";
import {OptionsFilter} from "@/components/orderTable/OptionsFilter";
import {debounce} from "@/utils";
import {fetchOrders} from "@/redux-store/order-list/orderThunk";
import {DateRangeFilter} from "@/components/orderTable/DateRangeFilter";

ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({theme: 'legacy'});

function OrdersTable(): JSX.Element {
    const theme = useTheme();
    const orders = useAppSelector((state) => state.orderList.orders);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const gridApiRef = React.useRef<GridApi | null>(null);
    const previousFilterModal = React.useRef<any>({});
    const isLoading = useAppSelector((state) => state.orderList.isOrdersLoading);
    const dispatch = useAppDispatch();
    const debouncedHandleFilterChange = useRef(debounce(()=>{
        const newFilterModal = gridApiRef.current?.getFilterModel();
        if(JSON.stringify(newFilterModal) !== JSON.stringify(previousFilterModal.current)){
            previousFilterModal.current = newFilterModal;
            // noinspection TypeScriptValidateTypes
            dispatch(fetchOrders(newFilterModal))
        }
    }, 100));

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

    const columnDefs: ColDef[] = useMemo(() => {
        const columns: ColDef[] = [
            {field: 'orderId', headerName: 'Order Number'},
            {field: 'orderFrom', headerName: 'Order From'},
            {field: 'restaurant', headerName: 'Restaurant'},
            {field: 'rider', headerName: 'Delivery Rider'},
            {field: 'status', headerName: 'Status', filter: OptionsFilter},
            {field: 'placedAt', headerName: 'Order At', filter: DateRangeFilter},
            {field: 'estimatedDelivery', headerName: 'Expected Delivery Time'},
            {field: 'deliveredAt', headerName: 'Actual Delivery Time'},
            {field: 'isDelayed', headerName: 'Is Delayed'},
            {field: 'city', headerName: 'City'},
            {field: 'deliveryZone', headerName: 'Area'},
        ];
        return columns.map((record: ColDef) => ({
            ...record,
            filter: record.filter || TextFilter
        })) as ColDef[];
    }, []);

    const onRowClicked = (event: RowClickedEvent<Order>) => {
        if (event.data) {
            console.log('Do something if required')
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
                loading={isLoading}
                key={isMobile ? 'mobile' : 'desktop'}
                rowData={orders}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onRowClicked={onRowClicked}
                onGridReady={onGridReady}
                onFilterChanged={debouncedHandleFilterChange.current}
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
