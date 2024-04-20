import React, { useState, useEffect } from 'react';
import "./styles.css";
import { colors } from "./Colors.js";

const Pokeinfo = ({ selectedPoke, onClose }) => {
  const [moveTypes, setMoveTypes] = useState([]);

  useEffect(() => {
    if (selectedPoke) {
      Promise.all(
        selectedPoke.moves.slice(0, 10).map(move =>
          fetch(move.move.url)
            .then(response => response.json())
            .then(moveData => ({ name: move.move.name, type: moveData.type.name }))
        )
      ).then(setMoveTypes);
    }
  }, [selectedPoke]);

  if (!selectedPoke) {
    return null;
  }

  return (
    <div className="pokeinfo-modal">
      <div className="pokeinfo-card">
        <button className="CloseButton" onClick={onClose}>
          Close
        </button>
        <h1>
          {selectedPoke.name.charAt(0).toUpperCase() +
            selectedPoke.name.slice(1)}
        </h1>
        <img
          className="PokeHDImage"
          src={selectedPoke.sprites.other["official-artwork"].front_default}
          alt={selectedPoke.name}
        />
        <div className="pokeinfo-images">
          <img
            src={selectedPoke.sprites.front_default}
            alt={`${selectedPoke.name} front`}
          />
          <img
            src={selectedPoke.sprites.back_default}
            alt={`${selectedPoke.name} back`}
          />
        </div>
        <div className="pokeinfo-types">
          {selectedPoke.types.map((type, index) => (
            <p
              className="type"
              key={index}
              style={{ backgroundColor: colors[type.type.name] }}
            >
              {type.type.name}
            </p>
          ))}
        </div>
        <div className="pokeinfo-details">
          <div className="pokeinfo-stats">
            <table>
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {selectedPoke.stats.map((stat, index) => (
                  <tr key={index}>
                    <td>{stat.stat.name}</td>
                    <td>{stat.base_stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pokeinfo-moves">
        {moveTypes.map((move, index) => (
          <p
            className="move"
            key={index}
            style={{ backgroundColor: colors[move.type] }}
          >
            {move.name}
          </p>
        ))}
      </div>
        </div>
      </div>
    </div>
  );
};

export default Pokeinfo;
