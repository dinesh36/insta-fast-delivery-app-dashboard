import React, { useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import OrderHeatMap from './OrderHeatMap';
import mockRiders from '../../data/mockRiders';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const defaultCenter = {
  lat: 40.7549,
  lng: -73.984,
};
const ALL_RIDERS = 'ALL_RIDERS';

function MapView() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
    libraries: ['visualization'],
  });

  const [selectedRiderId, setSelectedRiderId] = useState<string>(ALL_RIDERS);

  const center = useMemo(() => {
    if (selectedRiderId === ALL_RIDERS) return defaultCenter;
    const rider = mockRiders.find(r => r.riderId === selectedRiderId);
    return rider ? rider.location : defaultCenter;
  }, [selectedRiderId]);

  // Filter markers based on selected rider
  const markers = selectedRiderId === ALL_RIDERS
      ? mockRiders
      : mockRiders.filter(r => r.riderId === selectedRiderId);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
        <OrderHeatMap
            selectedRiderId={selectedRiderId}
            setSelectedRiderId={setSelectedRiderId}
        />
        {markers.map((rider) => (
            <Marker
                key={rider.riderId}
                position={rider.location}
                title={rider.name}
            />
        ))}
      </GoogleMap>
  );
}

export default MapView;
