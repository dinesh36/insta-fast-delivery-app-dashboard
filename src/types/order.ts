export enum OrderStatus {
    Placed = 'Placed',
    Preparing = 'Preparing',
    OutForDelivery = 'OutForDelivery',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
}

export interface Order {
    orderId: string;
    orderFrom: string;
    restaurant: string;
    rider: string;
    status: OrderStatus;
    placedAt: Date;
    estimatedDelivery: Date;
    deliveredAt: Date;
    isDelayed: boolean;
    city: string;
    orderZone: string;
    deliveryZone: string;
    lat: number;
    lng: number;
}
