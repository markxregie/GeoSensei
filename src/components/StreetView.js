import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "mapillary-js";
import "./StreetView.css";
import Spinner from "react-bootstrap/Spinner";

const StreetView = ({ onLocationLoaded }) => {
    const viewerRef = useRef(null);
    const viewerInstanceRef = useRef(null);
    const [imageKey, setImageKey] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRandomImageKey();
    }, []);

    const fetchRandomImageKey = async () => {
        setLoading(true);
        try {
            // Fetch access token from backend
            const tokenResponse = await fetch("http://localhost:3002/api/mapillary/token");
            if (!tokenResponse.ok) {
                throw new Error("Failed to fetch access token");
            }
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.accessToken;

            // Fetch images with a limit and no pagination for simplicity
            const limit = 50;

            // Define multiple bounding boxes for different continents
            const boundingBoxes = [
                "bbox=-10.0,34.0,40.0,71.0",   // Europe
                "bbox=60.0,5.0,150.0,55.0",    // Asia
                "bbox=-20.0,-35.0,55.0,37.0",  // Africa
                "bbox=-130.0,20.0,-60.0,55.0", // North America
                "bbox=-80.0,-55.0,-35.0,-10.0",// South America
                "bbox=110.0,-50.0,180.0,-10.0" // Oceania
            ];

            // Randomly select one bounding box
            const bbox = boundingBoxes[Math.floor(Math.random() * boundingBoxes.length)];

            const response = await fetch(
                `https://graph.mapillary.com/images?access_token=${accessToken}&fields=id,geometry&limit=${limit}&is_pano=true&${bbox}`
            );
            const data = await response.json();

            console.log("Mapillary API response:", data);

            if (data.data && data.data.length > 0) {
                const randomImage = data.data[Math.floor(Math.random() * data.data.length)];
                setImageKey(randomImage.id);

                if (randomImage.geometry && randomImage.geometry.coordinates) {
                    const [lon, lat] = randomImage.geometry.coordinates;
                    onLocationLoaded({ lat, lon });
                }
                setError(null);
            } else {
                setError("No images found. Retrying...");
                setTimeout(fetchRandomImageKey, 2000);
            }
        } catch (error) {
            setError("Error fetching image key: " + error.message);
            console.error("Error fetching image key:", error);
            setTimeout(fetchRandomImageKey, 5000);
        }
    };

    useEffect(() => {
        if (!viewerRef.current || !imageKey) return;

        setLoading(true);

        const fetchAccessTokenAndCreateViewer = async () => {
            try {
                console.log("Creating viewer for imageKey:", imageKey);
                const tokenResponse = await fetch("http://localhost:3002/api/mapillary/token");
                if (!tokenResponse.ok) {
                    throw new Error("Failed to fetch access token");
                }
                const tokenData = await tokenResponse.json();
                const accessToken = tokenData.accessToken;

                if (viewerInstanceRef.current) {
                    console.log("Removing existing viewer instance");
                    viewerInstanceRef.current.remove();
                }

                const viewer = new Viewer({
                    container: viewerRef.current,
                    accessToken: accessToken,
                    imageId: imageKey,
                    components: {
                        nav: true,
                        attribution: true,
                        cover: false,
                        marker: false,
                    },
                });

                viewerInstanceRef.current = viewer;

                // Wait for viewer to be ready
                viewer.on("ready", () => {
                    console.log("Viewer ready event fired");
                    setLoading(false);
                    // Removed moveTo call to avoid conflicts
                });
                viewer.on("error", (error) => {
                    console.error("Viewer error event:", error);
                    setError("Viewer error: " + error.message);
                    setLoading(false);
                });
                viewer.on("image", () => {
                    viewer.resize();
                });

                // Fallback timeout to hide spinner after 10 seconds
                setTimeout(() => {
                    if (loading) {
                        console.warn("Viewer ready event timeout, hiding spinner");
                        setLoading(false);
                    }
                }, 10000);

                // Call resize right after creation to fix initial black half issue
                viewer.resize();

                viewer.on("nodechanged", (event) => {
                    if (event.node.latLon) {
                        onLocationLoaded(event.node.latLon);
                    }
                    // Call resize on nodechanged to fix black half issue
                    viewer.resize();
                });

                // Add window resize listener to call viewer.resize()
                const handleResize = () => {
                    viewer.resize();
                };
                window.addEventListener("resize", handleResize);

                // Add click listener on viewer container to call viewer.resize()
                const handleClick = () => {
                    viewer.resize();
                };
                viewerRef.current.addEventListener("click", handleClick);

                // Cleanup listeners on unmount
                return () => {
                    window.removeEventListener("resize", handleResize);
                    if (viewerRef.current) {
                        viewerRef.current.removeEventListener("click", handleClick);
                    }
                };
            } catch (error) {
                console.error("Error creating Mapillary viewer:", error);
                setError("Error creating Mapillary viewer: " + error.message);
            }
        };

        fetchAccessTokenAndCreateViewer();

        // Cleanup function to remove viewer on unmount or imageKey change
        return () => {
            if (viewerInstanceRef.current) {
                viewerInstanceRef.current.remove();
                viewerInstanceRef.current = null;
            }
            if (viewerRef.current) {
                viewerRef.current.innerHTML = "";
            }
        };
    }, [imageKey]);

    return (
        <div className="streetview-container" style={{ position: "relative" }}>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            {loading && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                    }}
                >
                    <Spinner animation="border" style={{ color: "#5D4A68" }} />
                </div>
            )}
            <div
                ref={viewerRef}
                className="streetview-viewer"
                style={{ visibility: loading ? "hidden" : "visible" }}
            />
        </div>
    );
};

export default StreetView;
