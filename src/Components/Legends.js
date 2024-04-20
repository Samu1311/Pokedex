import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import "./styles.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Legends = () => {
  const [legends, setLegends] = useState([]);

  useEffect(() => {
    const fetchLegends = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-species?limit=1000"
      );
      const detailedLegends = await Promise.all(
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
              hdImage:
                pokemonResponse.data.sprites.other["official-artwork"]
                  .front_default,
              sprite: pokemonResponse.data.sprites.front_shiny,
            };
          }
        })
      );
      setLegends(detailedLegends.filter((legend) => legend !== undefined));
    };

    fetchLegends();
  }, []);

  return (
  <Layout>
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
  </Layout>
  );
};

export default Legends;
