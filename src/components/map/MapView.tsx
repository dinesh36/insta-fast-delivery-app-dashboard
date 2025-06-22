import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import OrderHeatMap from './OrderHeatMap';
import mockRiders from '../../data/mockRiders';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const defaultCenter = {
  lat: 23.0225,
  lng: 72.5714, // Ahmedabad
};

function MapView() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
    libraries: ['visualization'],
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
      <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={12}>
        <OrderHeatMap />
        {mockRiders.map((rider) => (
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
