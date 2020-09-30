import config from '../../config';
import store from '../store';

export const actionTypes = {
  FETCH_POKEMON_LIST_REQUEST: 'FETCH_POKEMON_LIST_REQUEST',
  FETCH_POKEMON_LIST_SUCCESS: 'FETCH_POKEMON_LIST_SUCCESS',
  FETCH_POKEMON_LIST_ERROR: 'FETCH_POKEMON_LIST_ERROR',
  FETCH_POKEMON_REQUEST: 'FETCH_POKEMON_REQUEST',
  FETCH_POKEMON_SUCCESS: 'FETCH_POKEMON_SUCCESS',
  FETCH_POKEMON_ERROR: 'FETCH_POKEMON_ERROR',
  FETCH_POKEMON_SPECIES_REQUEST: 'FETCH_POKEMON_SPECIES_REQUEST',
  FETCH_POKEMON_SPECIES_SUCCESS: 'FETCH_POKEMON_SPECIES_SUCCESS',
  FETCH_POKEMON_SPECIES_ERROR: 'FETCH_POKEMON_SPECIES_ERROR',
  UPDATE_MODAL_ACTIVE: 'IS_MODAL_ACTIVE',
  SELECT_POKEMON: 'SELECT_POKEMON',
  UPDATE_COMPARING: 'UPDATE_COMPARING',
  UPDATE_COMPARISON_MODAL_ACTIVE: 'UPDATE_COMPARISON_MODAL_ACTIVE',
  UPDATE_LOAD_POKEMON: 'UPDATE_LOAD_POKEMON'
}

export const fetchPokemonList = (url = config.API_URL + '/pokemon') => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_POKEMON_LIST_REQUEST
  })

  fetch(url)
  .then( res => res.json() )
  .then( data => {
    dispatch({
      type: actionTypes.FETCH_POKEMON_LIST_SUCCESS,
      payload: {
        count: data.count,
        next: data.next,
        previous: data.previous,
        pokemons: data.results
      }
    })
  })
  .catch( error => {
    dispatch({
      type: actionTypes.FETCH_POKEMON_LIST_ERROR,
      payload:{
        error: error
      }
    })
  })
}

export const fetchPokemon = (index) => (dispatch) => {
  const url = config.API_URL + '/pokemon/' + (index + 1);
  const state = store.getState();
  const pokemon = state.pokemonData.pokemons[index];

  if ( pokemon.dataLoaded && pokemon.speciesLoaded ) {
    dispatch({
      type: actionTypes.FETCH_POKEMON_SUCCESS,
      payload: {
        index,
        pokemon
      }
    })
  } else {
    dispatch({
      type: actionTypes.FETCH_POKEMON_REQUEST
    })
    
    fetch(url)
    .then( res => res.json() )
    .then( data => {
      dispatch({
        type: actionTypes.FETCH_POKEMON_SUCCESS,
        payload: {
          index,
          pokemon:{
            id: data.id,
            name: data.name,
            information: {
              height: data.height,
              weight: data.weight,
            },
            abilities: data.abilities,
            stats: data.stats,
            types: data.types,
            url
          }
        }
      })
    })
    .catch( error => {
      dispatch({
        type: actionTypes.FETCH_POKEMON_ERROR,
        payload:{
          error: error
        }
      })
    })
  }
}

export const fetchPokemonSpecies = (index) => (dispatch) =>{
  const url = config.API_URL + '/pokemon-species/' + (index + 1)
  const state = store.getState();
  const pokemon = state.pokemonData.pokemons[index];

  if ( pokemon.dataLoaded && pokemon.speciesLoaded ) {
    dispatch({
      type: actionTypes.FETCH_POKEMON_SPECIES_SUCCESS,
      payload: {
        index,
        description: pokemon.description,
        gender: pokemon.information.gender
      }
    })
  } else {
    dispatch({
      type: actionTypes.FETCH_POKEMON_SPECIES_REQUEST
    })
    fetch(url)
    .then( res => res.json() )
    .then( data => {
      dispatch({
        type: actionTypes.FETCH_POKEMON_SPECIES_SUCCESS,
        payload: {
          index,
          description: data.flavor_text_entries[0].flavor_text,
          gender: getStringGender(data.gender_rate)
        }
      })
    })
    .catch( error => {
      dispatch({
        type: actionTypes.FETCH_POKEMON_SPECIES_ERROR,
        payload:{
          error: error
        }
      })
    })
  }
}

export const selectPokemon = (index) => {
  const state = store.getState();
  const key = !state.pokemonData.isComparing ? 'firstPokemon' : 'secondPokemon';

  return({
    type: actionTypes.SELECT_POKEMON,
    payload: {
      [key]: index
    }
  })
}

export const updatePokemonModalActive = () => 
  ({
    type: actionTypes.UPDATE_MODAL_ACTIVE
  })


export const updateComparing = () => 
  ({
    type: actionTypes.UPDATE_COMPARING
  })

  export const updateLoadPokemon = () => 
  ({
    type: actionTypes.UPDATE_LOAD_POKEMON
  })


export const updateComparisonModalActive = () =>
  ({
    type: actionTypes.UPDATE_COMPARISON_MODAL_ACTIVE
  })

const getStringGender = (index) => {
  if ( index >= 0 && index <= 4 ){
    return 'Male';
  } else if ( index >= 4 && index <= 8 ) {
    return 'Female';
  } else if ( index === -1 ) {
    return 'Genderless';
  } else {
    return 'Unknown'
  }
}

