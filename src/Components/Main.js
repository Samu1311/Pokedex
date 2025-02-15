import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokedex from "./Pokedex";
import Pokeinfo from "./PokeInfo";
import { colors } from "./Colors";
import "./Main.css";

const Main = () => {
  const [allPokeData, setAllPokeData] = useState([]);
  const [pokeData, setPokeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPoke, setSelectedPoke] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const POKEMON_PER_PAGE = 24;

  // Update debounced search term after user has stopped typing for 500ms
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch all Pokémon data initially
  useEffect(() => {
    const fetchAllPokeData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000", {
          timeout: 20000, // Increase timeout to 20 seconds
        });
        const allData = await Promise.all(
          res.data.results.map(async (pokemon) => {
            let pokemonRecord = await axios.get(pokemon.url, {
              timeout: 20000, // Increase timeout to 20 seconds
            });
            return pokemonRecord.data;
          })
        );
        setAllPokeData(allData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        // Add a small delay before setting isLoading to false during the initial fetch
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchAllPokeData();
  }, []);

  // Filter and paginate Pokémon data whenever debounced search term, selected type, or current page changes
  useEffect(() => {
    if (allPokeData.length === 0) return;

    setIsLoading(true);
    const filteredData = allPokeData.filter(pokemon =>
      (!selectedType || pokemon.types.some(type => type.type.name === selectedType)) &&
      (!debouncedSearchTerm || pokemon.name.includes(debouncedSearchTerm.toLowerCase()))
    );

    const startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + POKEMON_PER_PAGE);

    setPokeData(paginatedData);
    setIsLoading(false);
  }, [allPokeData, debouncedSearchTerm, selectedType, currentPage]);

  const handleFilterClick = (type) => {
    setSelectedType(type);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleAllTypesClick = () => {
    setSelectedType("");
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="main-container">
      <input className="search-bar"
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="filter-container">
        <button
          className="filter-button"
          onClick={toggleFilterMenu}
        >
          {isFilterMenuOpen ? "▲" : "▼"} Filter by Type
        </button>
      </div>
      <div className={`filter-menu ${isFilterMenuOpen ? "open" : ""}`}>
        <div
          className={`filter-item ${selectedType === "" ? "selected" : ""}`}
          style={{ backgroundColor: "#ccc", color: "#000" }}
          onClick={handleAllTypesClick}
        >
          All Types
        </div>
        {Object.keys(colors).map((type) => (
          <div
            key={type}
            className={`filter-item ${selectedType === type ? "selected" : ""}`}
            style={{ backgroundColor: colors[type] }}
            onClick={() => handleFilterClick(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>

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
            {currentPage > 1 && (
              <button
                className="prev-button"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            )}
            {pokeData.length === POKEMON_PER_PAGE && (
              <button
                className="next-button"
                onClick={() => setCurrentPage(currentPage + 1)}
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