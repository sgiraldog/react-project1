import { combineReducers } from 'redux';
import pokemonData from './pokemonReducer';
import navBar from './navBarReducer';

export default combineReducers({
  pokemonData,
  navBar
});