import React from 'react';
import { connect } from 'react-redux';
import config from '../../config';
import { selectPokemon, fetchPokemonList, fetchPokemon, fetchPokemonSpecies } from '../../redux/actions/pokemonActions';
import './pokemonList.css'

const PokemonList = (props) => {

  const fetchPokemonList = () =>{
    props.fetchPokemonList(props.pokemonData.next);
  }

 
  const fetchPokemon = (index) => {
    if (!props.pokemonData.isComparing){
      props.selectPokemon(index);
      props.fetchPokemon(index);
      props.fetchPokemonSpecies(index);
    }else{
      props.selectPokemon(index);
      props.fetchPokemon(index);
      props.fetchPokemonSpecies(index);
    }
  }

  return (
    <div>
      <button onClick={fetchPokemonList}>
        Load More
      </button>
      <ul className="pokemon__items">
        {
          props.pokemonData.pokemons.map((pokemon, index) => (
            <li className="pokemon__item" key={index} onClick={() => fetchPokemon(index)}>
              <img 
                className="pokemon__item-img"
                src={config.SPRITES_URL + (index + 1 ) + '.png'} alt={pokemon.name} />
              <h3 className="pokemon__item-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h3>
            </li>
          ))
        }
      </ul>
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return{
    selectPokemon: (index) => dispatch(selectPokemon(index)),
    fetchPokemonList: (url) => dispatch(fetchPokemonList(url)),
    fetchPokemon: (index, key) => dispatch(fetchPokemon(index, key)),
    fetchPokemonSpecies: (index, key) => dispatch(fetchPokemonSpecies(index, key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);