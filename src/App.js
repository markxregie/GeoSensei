import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Chatbot from './components/Chatbot'; 

function App() {
  return (
    <div className="App">
      <Chatbot /> {/* Render the Chatbot component */}

      <Router>
        <Routes>
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
          <Route
            path="/newpage"
            element={
              <>
                <NewHeader /> {/* Different Header */}
                <main>
                  <GeoSection />
                </main>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
