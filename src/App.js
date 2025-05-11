import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Appheader from "./components/header";
import AppHome from "./components/Home";
import AppAbout from "./components/About";
import AppInnovation from "./components/Innovation";
import AppBenefits from "./components/benefits";
import AppFooter from "./components/footer";
import NewHeader from "./components/newheader";
import GeoSection from "./components/Geosection";
import Chatbot from "./components/Chatbot";
import Guesstheflag from "./components/Guesstheflag";
import Capitals from "./components/capital";
import NotFound from "./pages/NotFound";
import Game from "./components/GameScreen"; // GeoGuessing Game Component

function App() {
  const [continent, setContinent] = useState("Asia");

  return (
    <div className="App">
      <Chatbot />
      <Router>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Appheader />
                <main>
                  <AppHome />
                  <AppAbout />
                  <AppInnovation />
                  <AppBenefits />
                  <AppFooter />
                </main>
              </>
            }
          />

          {/* Continent-Specific Page */}
          <Route path="/newpage/:continent" element={<ContinentPage setContinent={setContinent} />} />

          {/* Dynamic Quiz Route */}
          <Route
            path="/quiz/:quizType/:continent"
            element={<QuizComponent setContinent={setContinent} continent={continent} />}
          />

          {/* GeoGuessing Game */}
          <Route
            path="/geoguess"
            element={
              <>
                <NewHeader setContinent={setContinent} activeContinent={continent} />
                <main>
                  <Game />
                </main>
              </>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

/* ✅ Fix: Show Only One Quiz Component Based on URL */
function QuizComponent({ setContinent, continent }) {
  const { quizType } = useParams();

  return (
    <>
      <NewHeader setContinent={setContinent} activeContinent={continent} />
      <main>
        {quizType === "guess-the-flag" && <Guesstheflag />}
        {quizType === "capitals" && <Capitals />}
      </main>
    </>
  );
}

/* ✅ Continent Page to Manage Navigation */
function ContinentPage({ setContinent }) {
  const { continent } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!continent) {
      navigate("/newpage/Asia");
    } else {
      setContinent(continent);
    }
  }, [continent, setContinent, navigate]);

  return (
    <>
      <NewHeader setContinent={setContinent} activeContinent={continent} />
      <main>
        <GeoSection continent={continent} />
      </main>
    </>
  );
}

export default App;
