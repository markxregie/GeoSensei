import React, { useState } from "react";
import StreetView from "./StreetView";
import GameMap from "./WorldMap";
import ResultsMap from "./ResultsMap";

const Game= () => {
    const [correctLocation, setCorrectLocation] = useState(null);
    const [guessedLocation, setGuessedLocation] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleLocationLoaded = (location) => {
        console.log("Correct location received:", location);
        setCorrectLocation(location);
    };

    const handleGuessSubmit = (guess) => {
        setGuessedLocation(guess);
        setShowResults(true);
    };

    return (
        <div>
            {!showResults ? (
                <>
                    <StreetView onLocationLoaded={handleLocationLoaded} />
                    <GameMap onGuessSubmit={handleGuessSubmit} />
                </>
            ) : (
                <ResultsMap correctLocation={correctLocation} guessedLocation={guessedLocation} />
            )}
        </div>
    );
};

export default Game;
