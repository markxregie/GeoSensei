import React, { useState } from "react";
import WorldMap from "./WorldMap";
import ResultsMap from "./ResultsMap";
import StreetView from "./StreetView";

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [showStreetView, setShowStreetView] = useState(false);
    const [correctLocation, setCorrectLocation] = useState(null);
    const [guessedLocation, setGuessedLocation] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [miniMapExpanded, setMiniMapExpanded] = useState(false);

    const startGame = () => {
        setGameStarted(true);
        setShowStreetView(true);
        setShowResults(false);
        setGuessedLocation(null);
        setCorrectLocation(null);
        setMiniMapExpanded(false);
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
    };

    const handlePlayAgain = () => {
        setGameStarted(false);
        setShowStreetView(false);
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
            {!gameStarted ? (
                <div style={{ margin: "auto", textAlign: "center" }}>
                    <button onClick={startGame} style={{ padding: "20px 40px", fontSize: "24px" }}>
                        Start Game
                    </button>
                </div>
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
                    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1100 }}>
                        <button onClick={handlePlayAgain} style={{ padding: "10px 20px", fontSize: "16px" }}>
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
