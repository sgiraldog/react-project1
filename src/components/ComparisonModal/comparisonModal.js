import React from 'react';
import { connect } from 'react-redux';
import { isComparisonModalActive, isComparing } from '../../redux/actions/pokemonActions';
//import './pokemonList.css'

const ComparisonModal = (props) => {
  const pokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon]
  const pokemon2 = props.pokemonData.pokemons[props.pokemonData.secondPokemon]

  const closeModal = () => {
    props.isComparing(false);
    props.isComparisonModalActive(false);
  }

  return (
    <div>
      {
        props.pokemonData.isComparisonModalActive && (
          <div>
            <h1>Activo { pokemon.name } vs { pokemon2.name }</h1>
            <button onClick={closeModal}>
              X
            </button>
          </div>  
        )
      }
      {!props.pokemonData.isModalActive && (
        <h1>Comparación Inactiva - {props.pokemonData.isComparing}</h1>
      )} 
    </div>
  );
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return{
    isComparisonModalActive: (state) => dispatch(isComparisonModalActive(state)),
    isComparing: (state) => dispatch(isComparing(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparisonModal);