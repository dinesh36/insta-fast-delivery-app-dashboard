import { faker } from '@faker-js/faker';
import {Order, OrderStatus} from "@/types/order";

const cities = [
    'Ahmedabad',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Pune',
    'Hyderabad',
    'Kolkata',
];

const cityCoordinates: Record<string, { lat: number; lng: number }> = {
    Ahmedabad: { lat: 23.0225, lng: 72.5714 },
    Mumbai: { lat: 19.076, lng: 72.8777 },
    Delhi: { lat: 28.7041, lng: 77.1025 },
    Bangalore: { lat: 12.9716, lng: 77.5946 },
    Pune: { lat: 18.5204, lng: 73.8567 },
    Hyderabad: { lat: 17.385, lng: 78.4867 },
    Kolkata: { lat: 22.5726, lng: 88.3639 },
};

export function generateMockOrders(countPerCity = 3000): Order[] {
    faker.seed(12345); // For setting the consistent fake data on restart
    const orders: Order[] = [];

    for (const city of cities) {
        const { lat, lng } = cityCoordinates[city];
        for (let i = 1; i <= countPerCity; i++) {
            const placedAt = faker.date.recent({days: 365});
            const estimatedDelivery = faker.date.soon({days: 1, refDate: placedAt});
            const isDelayed = faker.datatype.boolean({ probability: 0.3 });
            const deliveredAt = isDelayed
                ? faker.date.between({
                    from: estimatedDelivery,
                    to: new Date(estimatedDelivery.getTime() + 60 * 60 * 1000)
                })
                : faker.date.between({ from: placedAt, to: estimatedDelivery });

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
                lat: faker.location.latitude({ min: lat - 0.05, max: lat + 0.05 }),
                lng: faker.location.longitude({ min: lng - 0.05, max: lng + 0.05 }),
            } as Order;

            orders.push(orderObj);
        }
    }

    return orders;
}
