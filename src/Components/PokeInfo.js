// Full Pokeinfo Component with Type-Based Highlight, Including All Tab Render Functions
import React, { useState, useEffect } from 'react';
import './PokeInfo.css';
import { colors } from './Colors';

const Pokeinfo = ({ selectedPoke, onClose }) => {
  const [activeTab, setActiveTab] = useState('About');
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);
  const [moveTypes, setMoveTypes] = useState([]);
  const typeColor = colors[selectedPoke.types[0]?.type?.name] || '#4CAF50';

  useEffect(() => {
    if (selectedPoke) {
      fetch(selectedPoke.species.url)
        .then(response => response.json())
        .then(data => {
          setSpeciesData(data);
          return fetch(data.evolution_chain.url);
        })
        .then(response => response.json())
        .then(data => setEvolutionData(data));
    }
  }, [selectedPoke]);

  useEffect(() => {
    if (selectedPoke && activeTab === 'Moves') {
      Promise.all(
        selectedPoke.moves.slice(0, 10).map(move =>
          fetch(move.move.url)
            .then(response => response.json())
            .then(moveData => ({
              name: move.move.name,
              type: moveData.type.name,
              method: move.version_group_details[0].move_learn_method.name,
            }))
        )
      ).then(setMoveTypes);
    }
  }, [selectedPoke, activeTab]);

  const renderAboutTab = () => {
    if (!speciesData) return React.createElement('p', null, 'Loading...');
  
    // Get description from speciesData
    const description = speciesData?.flavor_text_entries?.find(
      entry => entry.language?.name === 'en'
    )?.flavor_text?.replace(/\f|\n/g, ' ') || 'No description available.';
  
    // Get type-based color from Colors.js
    const typeColor = colors[selectedPoke.types[0]?.type?.name] || '#4CAF50';
  
    // Gather other details safely
    const habitat = speciesData?.habitat?.name || 'Unknown';
    const generation = speciesData?.generation?.name || 'Unknown';
    const color = speciesData?.color?.name || 'Unknown';
    const shape = speciesData?.shape?.name || 'Unknown';
    const varieties = speciesData?.varieties?.map(v => v.pokemon?.name).join(', ') || 'None';
  
    return React.createElement(
      'div',
      { className: 'pokeinfo-details-section' },
      React.createElement('p', {
        className: 'poke-description',
        style: { borderLeft: `5px solid ${typeColor}`, marginBottom: '30px' }
      }, description),
      React.createElement('p', null, React.createElement('strong', null, 'Height: '), `${selectedPoke.height / 10} m`),
      React.createElement('p', null, React.createElement('strong', null, 'Weight: '), `${selectedPoke.weight / 10} kg`),
      React.createElement('p', null, React.createElement('strong', null, 'Abilities: '), selectedPoke.abilities.map(a => a.ability.name).join(', ')),
      React.createElement('p', null, React.createElement('strong', null, 'Habitat: '), habitat),
      React.createElement('p', null, React.createElement('strong', null, 'Generation: '), generation),
      React.createElement('p', null, React.createElement('strong', null, 'Color: '), color),
      React.createElement('p', null, React.createElement('strong', null, 'Shape: '), shape),
      React.createElement('p', null, React.createElement('strong', null, 'Varieties: '), varieties)
    );
  };

  const renderBaseStatsTab = () => (
    React.createElement(
      'div',
      { className: 'pokeinfo-stats' },
      selectedPoke.stats.map((stat, index) => {
        // Get type-based color from Colors.js
        const typeColor = colors[selectedPoke.types[0].type.name] || '#777';
  
        return React.createElement(
          'div',
          { key: index, className: 'stat-bar' },
          React.createElement('span', { className: 'stat-label' }, stat.stat.name.toUpperCase()),
          React.createElement(
            'div',
            { className: 'bar-background' },
            React.createElement('div', {
              className: 'bar-fill',
              style: {
                width: `${(stat.base_stat / 150) * 100}%`,
                backgroundColor: typeColor,
              }
            })
          ),
          React.createElement('span', { className: 'stat-value' }, stat.base_stat)
        );
      })
    )
  );

  const renderEvolutionsTab = () => {
    if (!evolutionData) return <p>Loading...</p>;
  
    const renderEvolutionChain = (chain) => {
      if (!chain) return null;
  
      const pokemonId = chain.species.url.split('/').slice(-2, -1)[0];
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  
      return (
        <div className="evolution-stage">
          <div className="evolution-details">
            <img src={imageUrl} alt={chain.species.name} className="evolution-image" />
            <p className="evolution-name">{chain.species.name}</p>
          </div>
          {chain.evolves_to.length > 0 && (
            <>
              <div className="evolution-arrow">↓</div>
              {chain.evolves_to.map((evolution, index) => (
                <div key={index} className="evolution-chain">
                  {renderEvolutionChain(evolution)}
                </div>
              ))}
            </>
          )}
        </div>
      );
    };
  
    return <div className="pokeinfo-evolutions">{renderEvolutionChain(evolutionData.chain)}</div>;
  };  
  

  const renderMovesTab = () => (
    <div className="pokeinfo-moves">
      {moveTypes.map((move, index) => (
        <div key={index} className="move-card" style={{ backgroundColor: colors[move.type] }}>
          <span className="move-name">{move.name}</span>
          <span className="move-method">{move.method}</span>
        </div>
      ))}
    </div>
  );

  const renderTabs = () => (
    React.createElement('div', { className: 'pokeinfo-tabs' },
      ['About', 'Base Stats', 'Evolutions', 'Moves'].map(tab =>
        React.createElement('p', {
          key: tab,
          className: `tab-item ${activeTab === tab ? 'active-tab' : ''}`,
          style: activeTab === tab ? { color: typeColor, borderBottom: `3px solid ${typeColor}` } : {},
          onClick: () => setActiveTab(tab)
        }, tab)
      )
    )
  );

  const renderPokemonImage = () => (
    React.createElement('div', { className: 'pokeinfo-image' },
      React.createElement('img', {
        src: selectedPoke.sprites.other['official-artwork'].front_default,
        alt: selectedPoke.name,
        className: 'pokemon-artwork'
      })
    )
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About': return renderAboutTab();
      case 'Base Stats': return renderBaseStatsTab();
      case 'Evolutions': return renderEvolutionsTab();
      case 'Moves': return renderMovesTab();
      default: return null;
    }
  };

  return React.createElement('div', { className: 'pokeinfo-modal' },
    React.createElement('div', { className: 'pokeinfo-card styled' },
      React.createElement('button', { className: 'close-button', onClick: onClose }, '×'),
      React.createElement('div', { className: 'pokeinfo-header', style: { backgroundColor: typeColor } },
        selectedPoke.name.charAt(0).toUpperCase() + selectedPoke.name.slice(1)
      ),
      renderPokemonImage(),
      renderTabs(),
      renderTabContent()
    )
  );
};

export default Pokeinfo;