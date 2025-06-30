import './App.css';
import HomePage from './homepage.js';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetStarted from "./getstarted.js";
import HowItWorks from "./howitworks.js";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/howitworks" element={<HowItWorks />} />

        </Routes>  
        
      </Router>
  );
}

export default App;
