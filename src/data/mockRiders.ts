const mockRiders = [
    {
        riderId: 'RIDER456',
        name: 'Alex Smith',
        location: { lat: 23.0225, lng: 72.5714 }, // Ahmedabad
        orderData: [
            { center: { lat: 23.0258, lng: 72.5873 }, radius: 400, orders: 67 },
            { center: { lat: 23.0300, lng: 72.5800 }, radius: 300, orders: 45 },
            { center: { lat: 23.0180, lng: 72.5300 }, radius: 500, orders: 92 },
            { center: { lat: 23.0350, lng: 72.6000 }, radius: 350, orders: 18 },
            { center: { lat: 23.0400, lng: 72.5700 }, radius: 600, orders: 101 },
        ],
    },
    {
        riderId: 'RIDER789',
        name: 'Sarah Johnson',
        location: { lat: 23.0333, lng: 72.6167 }, // Ahmedabad
        orderData: [
            { center: { lat: 23.0400, lng: 72.6300 }, radius: 400, orders: 77 },
            { center: { lat: 23.0450, lng: 72.6200 }, radius: 300, orders: 23 },
            { center: { lat: 23.0500, lng: 72.6100 }, radius: 500, orders: 99 },
            { center: { lat: 23.0550, lng: 72.6000 }, radius: 350, orders: 56 },
            { center: { lat: 23.0600, lng: 72.5900 }, radius: 600, orders: 34 },
        ],
    },
];

export default mockRiders;
