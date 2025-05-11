import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

const ResultsMap = ({ correctLocation, guessedLocation }) => {
    if (!correctLocation || !guessedLocation) return <p>Loading results...</p>;

    return (
        <MapContainer center={correctLocation} zoom={3} style={{ height: "100vh" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={correctLocation} />
            <Marker position={guessedLocation} />
            <Polyline positions={[correctLocation, guessedLocation]} color="red" />
        </MapContainer>
    );
};

export default ResultsMap;
