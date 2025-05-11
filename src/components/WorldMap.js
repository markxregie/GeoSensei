import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

const ClickableMap = ({ onGuessSubmit }) => {
    const [guessLocation, setGuessLocation] = useState(null);

    const MapClickHandler = () => {
        useMapEvents({
            click: (event) => {
                setGuessLocation([event.latlng.lat, event.latlng.lng]);
            },
        });

        return null;
    };

    return (
        <div>
            <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {guessLocation && <Marker position={guessLocation} />}
            </MapContainer>
            <button onClick={() => onGuessSubmit(guessLocation)} disabled={!guessLocation}>
                Submit Guess
            </button>
        </div>
    );
};

export default ClickableMap;
