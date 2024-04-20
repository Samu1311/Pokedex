import React from 'react';
import './styles.css'
import { colors } from './Colors.js';

function PokemonCard({ pokemon, infoPokemon }) {
  const primaryType = pokemon.types[0].type.name;
  const cardColor = colors[primaryType];
  const nameCapitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className="PokemonCard" onClick={() => infoPokemon(pokemon)} style={{ backgroundColor: cardColor }}>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
      <div className="PokemonName">
        {nameCapitalized}
      </div>
    </div>
  );
}

function Pokedex({ pokemon, loading, infoPokemon }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Pokedex">
      {pokemon.map((poke, index) => (
        <PokemonCard key={index} pokemon={poke} infoPokemon={infoPokemon} />
      ))}
    </div>
  );
}

export default Pokedex;