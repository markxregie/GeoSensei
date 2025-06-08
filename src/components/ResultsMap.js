import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

function haversineDistance(coords1, coords2) {
    function toRad(x) {
        return (x * Math.PI) / 180;
    }

    const lat1 = coords1[0];
    const lon1 = coords1[1];
    const lat2 = coords2[0];
    const lon2 = coords2[1];

    const R = 6371; // km
    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
}

const ResultsMap = ({ correctLocation, guessedLocation }) => {
    if (!correctLocation || !guessedLocation) return <p>Loading results...</p>;

    const distance = haversineDistance(
        [correctLocation[0], correctLocation[1]],
        [guessedLocation[0], guessedLocation[1]]
    ).toFixed(2);

    return (
        <div>
            <MapContainer center={correctLocation} zoom={3} style={{ height: "90vh" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={correctLocation} />
                <Marker position={guessedLocation} />
                <Polyline positions={[correctLocation, guessedLocation]} color="red" />
            </MapContainer>
            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "18px" }}>
                Distance between your guess and the correct location: {distance} km
            </div>
        </div>
    );
};

export default ResultsMap;
