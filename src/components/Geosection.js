import React from "react";
import "./Geosection.css"; // Custom styles

const GeoSection = () => {
  return (
    <div className="geo-section-container">
      <h1 className="continent-heading">[Continents]</h1>
      
      <p className="continent-description">
        Yorem ipsum rhoncus nisl, eu tempor urna. Curabitur vel 
        bibendum lorem. Morbi convallis convallis diam sit amet lacinia. 
        Aliquam in elementum tellus.
      </p>
      
      <div className="game-cards-container">
        <div className="game-card">
          <div className="card-image"></div>
          <h2 className="card-title">Guess the Flag</h2>
        </div>
        
        <div className="game-card">
          <div className="card-image"></div>
          <h2 className="card-title">Capitals</h2>
        </div>
        
        <div className="game-card">
          <div className="card-image"></div>
          <h2 className="card-title">Landmark</h2>
        </div>
        
        <div className="game-card">
          <div className="card-image"></div>
          <h2 className="card-title">Trivia</h2>
        </div>
      </div>
    </div>
  );
};

export default GeoSection;