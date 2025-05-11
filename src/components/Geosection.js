import React from "react";
import { useNavigate } from "react-router-dom"; 
import pixelsGif from "../images/pixels.gif";
import "./Geosection.css"; 

const GeoSection = ({ continent }) => {
  const navigate = useNavigate();

  const goToQuiz = (quizType) => {
    if (!continent) return;
    navigate(`/quiz/${quizType}/${continent}`); // Pass quiz type and continent in URL
  };

  return (
    <div className="geo-section-container">
      <div className="geo-section-background"></div> {/* New div for background */}
      
      <div className="geo-section-content"> {/* This div will hold the text content */}
        <h1 className="continent-heading">
          {continent ? continent : "Loading..."}
        </h1>
        <p className="continent-description">
          Explore fun quizzes and games about {continent}.
        </p>

        <div className="game-cards-container">
          <div className="game-card" onClick={() => goToQuiz("guess-the-flag")}>
            <div className="card-image">
              <img src={pixelsGif} alt="Guess the Flag" className="gif-image" />
            </div>
            <h2 className="card-title">Guess the Flag</h2>
          </div>

          <div className="game-card" onClick={() => goToQuiz("capitals")}>
            <div className="card-image"></div>
            <h2 className="card-title">Capitals</h2>
          </div>

          <div className="game-card" onClick={() => goToQuiz("landmark")}>
            <div className="card-image"></div>
            <h2 className="card-title">Landmark</h2>
          </div>

          <div className="game-card" onClick={() => goToQuiz("trivia")}>
            <div className="card-image"></div>
            <h2 className="card-title">Trivia</h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GeoSection;
