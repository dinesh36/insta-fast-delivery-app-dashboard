import { faker } from '@faker-js/faker';
import {Order, OrderStatus} from "@/types/order";


const cities = [
    'Ahmedabad',
    'Mumbai',
    'Dilli',
    'Banglore',
    'Pune',
    'Haidrabad',
    'Kolkata',
];

export function generateMockOrders(countPerCity = 3000): Order[] {
    faker.seed(12345); // For setting the consistent fake data on restart
    const orders: Order[] = [];

    for (const city of cities) {
        for (let i = 1; i <= countPerCity; i++) {
            const placedAt = faker.date.recent({days: 365});
            const estimatedDelivery = faker.date.soon({days: 1, refDate: placedAt});
            const deliveredAt = faker.date.between({from: placedAt, to: estimatedDelivery});
            const isDelayed = deliveredAt > estimatedDelivery;

            const orderObj = {
                orderId: `ORD${String(i).padStart(4, '0')}`,
                orderFrom: faker.person.fullName(),
                restaurant: faker.company.name(),
                rider: faker.person.fullName(),
                status: faker.helpers.arrayElement(Object.values(OrderStatus)),
                placedAt,
                estimatedDelivery,
                deliveredAt,
                isDelayed,
                city,
                orderZone: faker.location.zipCode(),
                deliveryZone: faker.location.zipCode(),
            } as Order;

            orders.push(orderObj);
        }
    }

    return orders;
}
