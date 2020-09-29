import { actionTypes } from '../actions/pokemonActions';
import config from '../../config';

const initialState = {
  count: 0,
  next: config.API_URL + '/pokemon',
  previous: '',
  pokemons: [],
  isFetching: false,
  isFetchingPokemon: false,
  firstPokemon: 0,
  secondPokemon: 0,
  isModalActive: false,
  isComparing: false,
  isComparisonModalActive: false,
  error: null
}

const pokemonListReducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.FETCH_POKEMON_LIST_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        pokemons: [...state.pokemons, ...action.payload.pokemons],
        isFetching: false
      }
    case actionTypes.FETCH_POKEMON_LIST_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    case actionTypes.FETCH_POKEMON_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_POKEMON_SUCCESS:
      state.pokemons[action.payload.index] = {
        ...action.payload.pokemon,
         dataLoaded: true
        }
      return{
        ...state,
        isFetchingPokemon: false,
        isModalActive:  !state.isComparing && state.pokemons[action.payload.index].dataLoaded && state.pokemons[action.payload.index].speciesLoaded,
        isComparisonModalActive: state.isComparing && state.pokemons[action.payload.index].dataLoaded && state.pokemons[action.payload.index].speciesLoaded
      }
    case actionTypes.FETCH_POKEMON_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isFetchingPokemon: false
      }
    case actionTypes.FETCH_POKEMON_SPECIES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.FETCH_POKEMON_SPECIES_SUCCESS:
      state.pokemons[action.payload.index] = {
        ...state.pokemons[action.payload.index],
         ...action.payload.species, 
         speciesLoaded: true}
       return{
        ...state,
        isFetchingPokemon: false,
        isModalActive:  !state.isComparing && state.pokemons[action.payload.index].dataLoaded && state.pokemons[action.payload.index].speciesLoaded,
        isComparisonModalActive: state.isComparing && state.pokemons[action.payload.index].dataLoaded && state.pokemons[action.payload.index].speciesLoaded
      }
    case actionTypes.FETCH_POKEMON_SPECIES_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isFetchingPokemon: false
      }
    case actionTypes.SELECT_POKEMON:
      return {
        ...state,
        ...action.payload
      }
    case actionTypes.IS_MODAL_ACTIVE:
      return {
        ...state,
        isModalActive: !state.isModalActive
      }
    case actionTypes.IS_COMPARING:
      return {
        ...state,
        isComparing: !state.isComparing
      }

    case actionTypes.IS_COMPARISON_MODAL_ACTIVE:
      return {
        ...state,
        isComparisonModalActive: !state.isComparisonModalActive
      }
    default:
      return state
  }
}

export default pokemonListReducer;