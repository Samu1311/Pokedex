import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Legends = () => {
  const [legends, setLegends] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // new state for loading

  useEffect(() => {
    const fetchLegends = async () => {
  setIsLoading(true);
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon-species?limit=1000"
    );
    const detailedLegends = (await Promise.all(
      response.data.results.map(async (species) => {
        const speciesResponse = await axios.get(species.url);
        if (speciesResponse.data.is_legendary) {
          const pokemonResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${speciesResponse.data.id}`
          );
          return {
            name: speciesResponse.data.name,
            description: speciesResponse.data.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            ).flavor_text,
            image: pokemonResponse.data.sprites.front_default,
            hdImage: pokemonResponse.data.sprites.other["official-artwork"].front_default,
            sprite: pokemonResponse.data.sprites.back_default,
          };
        }
      })
    )).filter(Boolean);
    setLegends(detailedLegends);
  } catch (error) {
    console.error("An error occurred while fetching the legends:", error);
  }
  setIsLoading(false);
};

    fetchLegends();
  }, []);

  if (isLoading) {
    return <p className="loading-render">Loading...</p>; // render loading state
  }

  return (
    <div className="legends-container"> 
    {legends.map((legend, index) => (
      <div className="legends-card" key={index}>
        <div className="legend-images">
        <img src={legend.hdImage} alt={legend.name} />
        <div className="sprites">
          <img src={legend.image} alt={`${legend.name} front sprite`} />
          <img src={legend.sprite} alt={`${legend.name} back sprite`} />
        </div>
        </div>
        <div className="legend-info">
        <h2>{capitalizeFirstLetter(legend.name)}</h2>
        <p>{legend.description}</p>
        </div>
      </div>
    ))}
    </div>
  );
};

export default Legends;
