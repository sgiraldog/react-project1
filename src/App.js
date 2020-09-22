import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PokemonList from './components/PokemonList/pokemonList'
import PokemonModal from './components/PokemonModal/pokemonModal'
import ComparisonModal from './components/ComparisonModal/comparisonModal'

function App() {
  return (
    <Provider store={store}>
      <PokemonModal/>
      <ComparisonModal />
      <PokemonList />
    </Provider>
  );
}

export default App;
