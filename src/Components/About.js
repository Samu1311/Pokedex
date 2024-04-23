import React from "react";
import "./styles.css";
import PokeApiLogo from "./Images/pokeapi_logo.png";

function About() {
  return (
    <div className="about-container">
        <div className="about-tittle">About</div>
        <div className="about-introduction">
          Welcome to our Pokédex App! Designed for both new trainers and
          seasoned Pokémon experts, our app is your ultimate guide to the
          Pokémon universe. Explore detailed information on hundreds of Pokémon
          species, including their stats, abilities, and evolution paths.
        </div>
        <div className="about-features">
          <h1>Features</h1>
          <p>
            <span>Comprehensive Pokémon Profiles:</span> Get to know your
            favorite Pokémon with in-depth profiles that include high-quality
            images, stats, and unique abilities.
          </p>
          <p>
            <span>Easy Navigation:</span> Our user-friendly interface makes it
            simple to search and browse through various Pokémon categories and
            types.
          </p>
          <p>
            <span>Regular Updates:</span> Stay informed with the latest updates
            and newly discovered Pokémon as the Pokémon world expands.
          </p>
        </div>
        <div className="pokeapi-information">
          <div className="pokeapi-header-with-logo">
            <h1>Powered by</h1>
            <img src={PokeApiLogo} alt="PokeAPI logo" />
          </div>
          <p>
            <span>Integration with PokéAPI:</span> Our Pokédex app is powered by
            PokéAPI, the leading RESTful API for Pokémon data. This integration
            allows us to fetch a wealth of information on Pokémon species, their
            evolutions, abilities, and much more directly from an extensive and
            continuously updated database.
          </p>
          <p>
            <span>How it benefits users:</span> Thanks to PokéAPI, our app
            offers the most current and comprehensive Pokémon data available.
            Whether you're looking up the newest Pokémon or rediscovering
            classic species, our app provides reliable and up-to-date
            information at your fingertips.
          </p>
          <p>
            <span>Invitation to explore more about PokéAPI:</span> "Learn more
            about how PokéAPI powers apps like ours and contributes to the
            Pokémon community by visiting{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PokéAPI's official website.
            </a>
          </p>
          </div>
          <div className="creators">
            <h1>Creators</h1>
            <p>
              We proudly acknowledge the dedication and expertise of Samuele
              Biondi, Eliza Smela, Eric Pinto, and Ana Vieira, the creators of
              this app. As Global Business Engineering students specializing in
              software at VIA University College, they have combined their
              knowledge and skills to develop an innovative and user-friendly
              Pokédex app.
            </p>
          </div>
    </div>
  );
}

export default About;
