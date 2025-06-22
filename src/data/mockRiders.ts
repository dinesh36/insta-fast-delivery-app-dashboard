const mockRiders = [
    {
        riderId: 'RIDER456',
        name: 'Alex Smith',
        location: { lat: 40.7549, lng: -73.984 },
        orderData: [
            { lat: 40.7512, lng: -73.9805, orders: 67 },
            { lat: 40.7598, lng: -73.9882, orders: 45 },
            { lat: 40.7531, lng: -73.9831, orders: 92 },
            { lat: 40.7556, lng: -73.9797, orders: 18 },
            { lat: 40.7573, lng: -73.9854, orders: 101 },
        ],
    },
    {
        riderId: 'RIDER789',
        name: 'Sarah Johnson',
        location: { lat: 40.7612, lng: -73.9816 },
        orderData: [
            { lat: 40.7650, lng: -73.9523, orders: 77 },
            { lat: 40.7599, lng: -73.9666, orders: 23 },
            { lat: 40.7605, lng: -73.9112, orders: 99 },
            { lat: 40.7631, lng: -73.9678, orders: 56 },
            { lat: 40.7587, lng: -73.9888, orders: 34 },
        ],
    },
];

export default mockRiders;
