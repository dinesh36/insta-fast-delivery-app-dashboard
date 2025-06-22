import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Order} from "@/types/order";

export interface OrderListState {
  isOrdersLoading: boolean;
  orders: Order[];
}

const initialState: OrderListState = {
  orders: [],
  isOrdersLoading: true,
};

const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setOrdersLoading: (state, action: PayloadAction<boolean>) => {
      state.isOrdersLoading = action.payload;
    },
  },
});

export const { setOrders, setOrdersLoading } = orderListSlice.actions;
export default orderListSlice.reducer;
