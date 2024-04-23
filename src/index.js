import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Main";
import Legends from "./Components/Legends";
import About from "./Components/About";
import Header from "./Components/Header";
import "./Components/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Header /> {/* Show the header on all pages */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/legends" element={<Legends />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

