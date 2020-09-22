import React from 'react';
import { connect } from 'react-redux';
import { isPokemonModalActive, isComparing } from '../../redux/actions/pokemonActions';
//import './pokemonList.css'

const PokemonModal = (props) => {
  const pokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon]

  const closeModal = () => {
    props.isPokemonModalActive(false);
  }

  const comparePokemon = () => {
    props.isPokemonModalActive(false);
    props.isComparing(true);
  }

  return (
    <div>
      {
        props.pokemonData.isModalActive && (
          <div>
            <h1>Activo { pokemon.name }</h1>
            <button onClick={comparePokemon}>
              Comparar
            </button>
            <button onClick={closeModal}>
              X
            </button>
          </div>  
        )
      }
      {!props.pokemonData.isModalActive && (
        <h1>Inactivo</h1>
      )} 
    </div>
  );
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return{
    isPokemonModalActive: (state) => dispatch(isPokemonModalActive(state)),
    isComparing: (state) => dispatch(isComparing(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonModal);