import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "mapillary-js";

const StreetView = ({ onLocationLoaded }) => {
    const viewerRef = useRef(null);
    const [imageKey, setImageKey] = useState(null);

    useEffect(() => {
        fetchRandomImageKey();
    }, []);

    const fetchRandomImageKey = async () => {
        try {
            const accessToken = "MLY|24211086625146458|857bdd27b7c04347489b229ab872e3ba";

            const response = await fetch(
                `https://graph.mapillary.com/images?access_token=${accessToken}&fields=id,geometry`
            );
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                const randomImage = data.data[Math.floor(Math.random() * data.data.length)];
                setImageKey(randomImage.id);

                if (randomImage.geometry && randomImage.geometry.coordinates) {
                    const [lon, lat] = randomImage.geometry.coordinates;
                    onLocationLoaded({ lat, lon });
                }
            } else {
                console.warn("No images found. Retrying...");
                fetchRandomImageKey();
            }
        } catch (error) {
            console.error("Error fetching image key:", error);
        }
    };

    useEffect(() => {
        if (!viewerRef.current || !imageKey) return;

        const clientId = "24211086625146458";
        const viewer = new Viewer({
            container: viewerRef.current,
            clientId: clientId,
            imageId: imageKey,
        });

        viewer.on("nodechanged", (event) => {
            if (event.node.latLon) {
                onLocationLoaded(event.node.latLon);
            }
        });

        return () => viewer.remove();
    }, [imageKey]);

    return <div ref={viewerRef} style={{ width: "100%", height: "500px" }} />;
};

export default StreetView;
