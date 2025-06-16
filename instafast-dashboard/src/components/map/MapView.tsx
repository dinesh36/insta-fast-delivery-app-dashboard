import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};
const center = {
    lat: 40.7549,
    lng: -73.9840,
};

type Rider = {
    riderId: string;
    name: string;
    location: { lat: number; lng: number };
};

type MapViewProps = {
    riders: Rider[];
};

const MapView: React.FC<MapViewProps> = ({ riders }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
    });

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
            {riders.map((rider) => (
                <Marker key={rider.riderId} position={rider.location} title={rider.name} />
            ))}
        </GoogleMap>
    );
};

export default MapView;