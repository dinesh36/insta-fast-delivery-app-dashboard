// store/orders/orderThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOrders, setOrdersLoading } from './order-list-slice';
import { Order } from '@/types/order';

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (filters: any, thunkAPI) => {
        const { dispatch } = thunkAPI;
        dispatch(setOrdersLoading(true));

        const queryParams = new URLSearchParams(filters as any).toString();
        const response = await fetch(`/api/orders${queryParams ? `?${queryParams}` : ''}`);

        if (!response.ok) {
            dispatch(setOrders([]));
            dispatch(setOrdersLoading(false));
            throw new Error('Failed to fetch orders');
        }

        const data: Order[] = await response.json();
        dispatch(setOrders(data));
        dispatch(setOrdersLoading(false));
    }
);
