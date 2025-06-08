    import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet's default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapResizeHandler = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();

    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);
  return null;
};

const ClickableMap = ({ onGuessSubmit, showSubmitButton = true, correctLocation, guessedLocation, showResults }) => {
    const [guessLocation, setGuessLocation] = useState(null);

    // Reset local guessLocation when showResults changes to true
    useEffect(() => {
        if (showResults) {
            setGuessLocation(null);
        }
    }, [showResults]);

    const MapClickHandler = () => {
        useMapEvents({
            click: (event) => {
                setGuessLocation([event.latlng.lat, event.latlng.lng]);
            },
        });

        return null;
    };

    // If showResults is true, use guessedLocation from props instead of local guessLocation state
    const displayGuessLocation = showResults ? guessedLocation : guessLocation;

    // Calculate distance if both locations are available
    const haversineDistance = (coords1, coords2) => {
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
    };

    const distance = correctLocation && displayGuessLocation ? haversineDistance(correctLocation, displayGuessLocation).toFixed(2) : null;

    return (
        <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
            <MapContainer
                center={correctLocation || [20, 0]}
                zoom={showResults ? 4 : 2}
                minZoom={2}
                style={{ height: "100%", width: "100%" }}
            >
                <MapResizeHandler />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {showResults && correctLocation && <Marker position={correctLocation} />}
                {displayGuessLocation && <Marker position={displayGuessLocation} />}
                {showResults && correctLocation && displayGuessLocation && <Polyline positions={[correctLocation, displayGuessLocation]} color="red" />}
            </MapContainer>
            {showResults && distance && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(93, 74, 104, 0.8)",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "18px",
                        zIndex: 1100,
                    }}
                >
                    Distance between your guess and the correct location: {distance} km
                </div>
            )}
            {!showResults && showSubmitButton && (
                <button
                    onClick={() => {
                        console.log("Submit Guess clicked with guessLocation:", guessLocation);
                        onGuessSubmit(guessLocation);
                    }}
                    disabled={!guessLocation}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1000,
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#5D4A68",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Submit Guess
                </button>
            )}
        </div>
    );
};

export default ClickableMap;
