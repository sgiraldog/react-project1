import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import PokemonList from './components/PokemonList';
import WelcomePage from './components/WelcomePage';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={ WelcomePage } />
        <Route path='/pokemons' component={ PokemonList }/>
        <Route path='*' exact component={ PageNotFound } />
      </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
