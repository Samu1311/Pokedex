import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokedex from "./Pokedex";
import Pokeinfo from "./PokeInfo";
import "./styles.css";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=24"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [selectedPoke, setSelectedPoke] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

// Update debounced search term after user has stopped typing for 500ms
useEffect(() => {
  const timerId = setTimeout(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 1000);

  return () => {
    clearTimeout(timerId);
  };
}, [searchTerm]);

// Fetch data whenever debounced search term changes
useEffect(() => {
  let url = debouncedSearchTerm
    ? "https://pokeapi.co/api/v2/pokemon?limit=1000"
    : currentUrl;
  fetchPokeData(url);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [debouncedSearchTerm, currentUrl]);

  const fetchPokeData = async (url) => {
    setIsLoading(true);
    const res = await axios.get(url);
    setNextPageUrl(res.data.next);
    setPrevPageUrl(res.data.previous);
    await loadPokemon(res.data.results);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await axios.get(pokemon.url);
        return pokemonRecord.data;
      })
    );
    setPokeData(_pokemonData);
    setIsLoading(false);
  };

  return (
  <div className="main-container">
    <input className="search-bar"
      type="text"
      placeholder="Search Pokemon"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {isLoading ? (
      <p className="loading-render">Loading...</p>
    ) : (
      <>
        <Pokedex
          allPokemon={pokeData}
          searchTerm={searchTerm}
          infoPokemon={setSelectedPoke}
        />
        <div className="button-container">
          {prevPageUrl && (
            <button
              className="prev-button"
              onClick={() => setCurrentUrl(prevPageUrl)}
            >
              Previous
            </button>
          )}
          {nextPageUrl && (
            <button
              className="next-button"
              onClick={() => setCurrentUrl(nextPageUrl)}
            >
              Next
            </button>
          )}
        </div>
        {selectedPoke && (
          <Pokeinfo
            selectedPoke={selectedPoke}
            onClose={() => setSelectedPoke(null)}
          />
        )}
      </>
    )}
  </div>
);
};

export default Main;