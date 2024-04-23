import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import logotype from "./Images/Pokedex_word.png"; // Import the logotype
import closedPokeball from "./Images/Closed_pokeball.png"; // Import the closed pokeball image
import openPokeball from "./Images/Open_pokeball.png"; // Import the open pokeball image

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <div className="Navbar-Images">
      <Nav.Link onClick={() => setIsOpen(!isOpen)}>
        <img
          className="NavImage"
          src={isOpen ? openPokeball : closedPokeball}
          alt="Menu"
        />
      </Nav.Link>
      <Navbar.Brand>
        <img
          alt="Logotype"
          src={logotype}
          height="100"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      </div>
      {isOpen && (
        <Nav className="Nav-links-container">
          <Link to="/" className="nav-link">
            Homepage
          </Link>
          <Link to="/legends" className="nav-link">
            Legends
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </Nav>
      )}
    </Navbar>
  );
}

export default Header;
