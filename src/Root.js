import React from "react";
import { Routes, Route } from "react-router-dom"; // import Routes and Route
import Homepage from './App'; // import Homepage
import Legends from './Components/Legends'; // import Legends
import About from './Components/About'; // import About
import "./index.css";

export default function Root() {
  return (
    <> 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/legends" element={<Legends />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </> 
  ); 
}