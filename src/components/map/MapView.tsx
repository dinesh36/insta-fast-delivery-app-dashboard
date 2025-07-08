import React, { JSX } from 'react';
import { GoogleMap, useLoadScript, HeatmapLayer } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const center = {
  lat: 20.5937,
  lng: 78.9629,
};

type Order = {
  lat: number;
  lng: number;
};

type MapViewProps = {
  orders: Order[];
};

function MapView({ orders }: MapViewProps): JSX.Element {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
    libraries: ['visualization'],
  });

  const [zoom, setZoom] = React.useState(5);

  const handleZoomChanged = (map: google.maps.Map) => {
    setZoom(map.getZoom() || 5);
  };

  const groupOrdersByLocation = (orders: Order[]) => {
    const locationMap = new Map<string, { lat: number; lng: number; weight: number }>();

    orders.forEach((order) => {
      const key = `${order.lat.toFixed(4)},${order.lng.toFixed(4)}`;
      if (locationMap.has(key)) {
        const existing = locationMap.get(key)!;
        existing.weight += 1;
      } else {
        locationMap.set(key, { lat: order.lat, lng: order.lng, weight: 1 });
      }
    });

    return Array.from(locationMap.values()).map((location) => ({
      location: new google.maps.LatLng(location.lat, location.lng),
      weight: location.weight,
    }));
  };

  const heatmapData = groupOrdersByLocation(orders);

  const heatmapOptions = {
    radius: Math.max(10, 20 - zoom * 2),
    maxIntensity: zoom > 10 ? 5 : 10,
  };

  const handleMapLoad = (map: google.maps.Map) => {
    map.addListener('zoom_changed', () => handleZoomChanged(map));
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      onLoad={handleMapLoad}
    >
      <HeatmapLayer data={heatmapData} options={heatmapOptions} />
    </GoogleMap>
  );
}

export default MapView;
