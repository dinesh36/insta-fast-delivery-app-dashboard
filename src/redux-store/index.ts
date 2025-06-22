import { configureStore } from '@reduxjs/toolkit';
import orderListReducer, { OrderListState } from './order-list-slice';

export const store = configureStore({
  reducer: {
    orderList: orderListReducer,
  },
});

export type RootState = {
  orderList: OrderListState;
};
export type AppDispatch = typeof store.dispatch;
