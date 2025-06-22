
enum OrderStatus {
  Completed = 'Completed'
}

enum OrderCities {
  Ahmedabad = 'Ahmedabad',
}

enum DeliveryZones {

}


const mockOrderObject =  {
    orderId: 'ORD001',
    orderFrom: 'Dinesh Dabhi',
    restaurant: 'The Sky Heaven',
    rider: 'Sanket Parmar',
    status: OrderStatus.Completed,
    placedAt: new Date(),
    estimatedDelivery: new Date(),
    deliveredAt: new Date(),
    isDelayed: true,
    city: 'Ahmedabad',
    orderZone: '123',
    deliveryZone: '123'
};

const mockOrders = [
  mockOrderObject, mockOrderObject
];

export default mockOrders;
