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

  const fetchPokeData = async () => {
    setIsLoading(true);
    const res = await axios.get(currentUrl);
    setNextPageUrl(res.data.next);
    setPrevPageUrl(res.data.previous);
    await loadPokemon(res.data.results);
    setIsLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await axios.get(pokemon.url);
        return pokemonRecord.data;
      })
    );

    setPokeData(_pokemonData);
  };

  useEffect(() => {
    fetchPokeData();
  }, [currentUrl]);

  return (
    <div className="main-container">
      <Pokedex
        pokemon={pokeData}
        loading={isLoading}
        infoPokemon={(pokemon) => setSelectedPoke(pokemon)}
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
    </div>
  );
};

export default Main;
