import {OrderStatus} from "@/types/order";

export const CITY_FILTER_OPTIONS: FilterOption[] = [
    { value: '', label: 'All' },
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bengaluru', label: 'Bengaluru' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Kolkata', label: 'Kolkata' },
];

export const STATUS_FILTER_OPTIONS: FilterOption[] = [
    { value: OrderStatus.Placed, label: 'Placed' },
    { value: OrderStatus.Preparing, label: 'Preparing' },
    { value: OrderStatus.OutForDelivery, label: 'OutForDelivery' },
    { value: OrderStatus.Completed, label: 'Completed' },
    { value: OrderStatus.Cancelled, label: 'Cancelled' },
];

export const DELIVER_DELAY_STATE_OPTIONS: FilterOption[] = [
    { value: 'onTime', label: 'On Time' },
    { value: 'late', label: 'Late' }
];
