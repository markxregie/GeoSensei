 import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorldMap from "./WorldMap";
import ResultsMap from "./ResultsMap";
import StreetView from "./StreetView";
import StarfieldAnimation from "./StarfieldAnimation";
import arrowLeft from "../images/arrow-left.svg";
import helpCircle from "../images/help-circle.svg";
import xIcon from "../images/x.svg";
import img1 from "../images/1.png";
import img2 from "../images/2.png";
import img3 from "../images/3.png";
import img4 from "../images/4.png";
import img5 from "../images/5.png";

const Game = () => {
    const navigate = useNavigate();
    const [gameStarted, setGameStarted] = useState(false);
    const [showStreetView, setShowStreetView] = useState(false);
    const [correctLocation, setCorrectLocation] = useState(null);
    const [guessedLocation, setGuessedLocation] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [miniMapExpanded, setMiniMapExpanded] = useState(false);
    const [muted, setMuted] = useState(false);
    const [showHelpCarousel, setShowHelpCarousel] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = muted ? 0 : 0.2; // Mute or set volume to 20%
        }
    }, [muted]);

    const startGame = () => {
        setGameStarted(true);
        setShowStreetView(true);
        setShowResults(false);
        setGuessedLocation(null);
        setCorrectLocation(null);
        setMiniMapExpanded(false);
    };

    const handleBack = () => {
        // Navigate back to the start page using react-router
        navigate("/newpage/asia");
    };

    const toggleMute = () => {
        setMuted(!muted);
    };

    const handleLocationLoaded = (location) => {
        setCorrectLocation(location);
    };

    const handleNextToGuess = () => {
        setShowStreetView(false);
    };

    const handleGuessSubmit = (guess) => {
        setGuessedLocation(guess);
        setShowResults(true);
        setMiniMapExpanded(true);
        setShowStreetView(false);
    };

    const handlePlayAgain = () => {
        setGameStarted(true);
        setShowStreetView(true);
        setCorrectLocation(null);
        setGuessedLocation(null);
        setShowResults(false);
        setMiniMapExpanded(false);
    };

    const toggleMiniMap = () => {
        setMiniMapExpanded(!miniMapExpanded);
    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <audio ref={audioRef} src="/sound/zen-garden-310599.mp3" autoPlay loop />
            <button
                onClick={toggleMute}
                style={{
                    position: "absolute",
                    top: 20,
                    right: 60,
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    userSelect: "none",
                }}
                aria-label={muted ? "Unmute" : "Mute"}
            >
                {muted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#5D4A68" viewBox="0 0 24 24">
                        <path d="M16.5 12l5-5v10l-5-5zM3 9v6h4l5 5V4L7 9H3z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#5D4A68" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3z" />
                    </svg>
                )}
            </button>
            <button
                onClick={() => setShowHelpCarousel(true)}
                style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    userSelect: "none",
                }}
                aria-label="Help"
            >
                <img src={helpCircle} alt="Help" style={{ width: "24px", height: "24px" }} />
            </button>
{showHelpCarousel && (
    <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
        }}
    >
<div
    style={{
        position: "relative",
        width: "80vw",
        height: "60vh",
        backgroundColor: "transparent",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    }}
>
            <button
                onClick={() => setShowHelpCarousel(false)}
                style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                }}
                aria-label="Close Help"
            >
<img src={xIcon} alt="Close" style={{ width: "24px", height: "24px", filter: "invert(100%)" }} />
            </button>
<div
    style={{
        flex: 0,
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
        borderRadius: "8px",
        marginBottom: "1px",
        fontSize: "24px",
        color: "white",
        padding: "0.1rem",
        height: "80vh",
        
    }}
>
    <h2 style={{ color: "white", fontWeight: "bold", marginBottom: "1rem" }}>
        How to Play – Geosensei Where Am I?
    </h2>
    <img
        src={[img1, img2, img3, img4, img5][carouselIndex]}
        alt={`Instruction ${carouselIndex + 1}`}
        style={{ maxWidth: "100%", maxHeight: "60%", borderRadius: "8px", marginBottom: "1rem" }}
    />
    <p style={{ fontSize: "18px", color: "white", textAlign: "center", maxWidth: "80%" }}>
        {[
            "1. Click Next to start. Don’t just sit there.",
            "2. Tap the center arrow on the Street Map. Yes, that one.",
            "3. Use the arrow buttons to stroll around like a nosy tourist.",
            "4. Click the mini-map, drop your pin, and make your guess.",
            "5. Hit Submit and see how off you were. Brave enough to try again?"
        ][carouselIndex]}
    </p>
</div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <button
                    onClick={() => setCarouselIndex((carouselIndex - 1 + 5) % 5)}
                    style={{
                        padding: "10px 20px",
                        fontSize: "18px",
                        cursor: "pointer",
                        backgroundColor: "#5D4A68",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#7B6591"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#5D4A68"}
                    aria-label="Previous"
                >
                    &#8592; Prev
                </button>
                <button
                    onClick={() => setCarouselIndex((carouselIndex + 1) % 5)}
                    style={{
                        padding: "10px 20px",
                        fontSize: "20px",
                        cursor: "pointer",
                        backgroundColor: "#5D4A68",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#7B6591"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#5D4A68"}
                    aria-label="Next"
                >
                    Next &#8594;
                </button>
            </div>
        </div>
    </div>
)}
            {!gameStarted ? (
                <>
                    <StarfieldAnimation />
                    <button
                        onClick={handleBack}
                        style={{
                            position: "absolute",
                            top: 20,
                            left: 20,
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#5D4A68",
                            fontSize: "18px",
                            cursor: "pointer",
                            padding: "4px 8px",
                            fontWeight: "bold",
                            userSelect: "none",
                        }}
                    >
                        <img src={arrowLeft} alt="Back" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                        Back
                    </button>
                    <div style={{ margin: "auto", textAlign: "center" }}>
                        <h1 style={{ fontSize: "100px", color: "#5D4A68", marginBottom: "8px" }}>GeoSensei</h1>
                        <h3 style={{ fontSize: "24px", color: "#7B6591", marginBottom: "24px" }}>Where Am I?</h3>
                        <button
                            onClick={startGame}
                            style={{
                                width: "200px",
                                height: "50px",
                                fontSize: "20px",
                                backgroundColor: "#5D4A68",
                                color: "white",
                                border: "none",
                                borderRadius: "30px",
                                cursor: "pointer",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#7B6591"}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#5D4A68"}
                        >
                            Start Game
                        </button>
                    </div>
                </>
            ) : showStreetView ? (
                <div style={{ flex: 1, position: "relative" }}>
                    <StreetView onLocationLoaded={handleLocationLoaded} onNext={handleNextToGuess} />
                    <div
                        style={{
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            width: miniMapExpanded ? "80vw" : "200px",
                            height: miniMapExpanded ? "60vh" : "150px",
                            border: "2px solid #5D4A68",
                            borderRadius: "8px",
                            overflow: "hidden",
                            zIndex: 1000,
                            backgroundColor: "white",
                        }}
                    >
                        <button
                            onClick={toggleMiniMap}
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                zIndex: 1100,
                                backgroundColor: "#5D4A68",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                padding: "2px 6px",
                                cursor: "pointer",
                            }}
                        >
                            {miniMapExpanded ? "Collapse" : "Expand"}
                        </button>
                        <div style={{ width: "100%", height: "100%" }}>
                            <WorldMap
                                onGuessSubmit={handleGuessSubmit}
                                showSubmitButton={true}
                                correctLocation={correctLocation}
                                guessedLocation={guessedLocation}
                                showResults={false}  // Prevent showing results prematurely in mini-map
                            />
                        </div>
                    </div>
                </div>
            ) : !showResults ? (
                <div style={{ height: "calc(100vh - 60px)", marginTop: "60px" }}>
                    <WorldMap onGuessSubmit={handleGuessSubmit} correctLocation={correctLocation} guessedLocation={guessedLocation} showResults={showResults} />
                </div>
            ) : (
                <div style={{ height: "100vh", position: "relative" }}>
                    <WorldMap onGuessSubmit={handleGuessSubmit} correctLocation={correctLocation} guessedLocation={guessedLocation} showResults={showResults} />
                    <div style={{ position: "absolute", bottom: 20, right: 20, zIndex: 1100 }}>
                        <button
                            onClick={handlePlayAgain}
                            style={{
                                padding: "12px 24px",
                                fontSize: "18px",
                                backgroundColor: "#5D4A68",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#7B6591"}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#5D4A68"}
                        >
                            Play Again
                        </button>
                    </div>
                    <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 1100 }}>
                        <button
                            onClick={() => {
                                setGameStarted(false);
                                setShowStreetView(false);
                                setCorrectLocation(null);
                                setGuessedLocation(null);
                                setShowResults(false);
                                setMiniMapExpanded(false);
                            }}
                            style={{
                                padding: "12px 24px",
                                fontSize: "18px",
                                backgroundColor: "#4A6D5D",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#6D7B65"}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#4A6D5D"}
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;


