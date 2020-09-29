import React from 'react';
import { NavLink } from 'react-router-dom';
import pokeballIcon from '../../images/pokeball.png';
import sadPokemon from '../../images/sad-pokemon.png';
import './pageNotFound.css';
const PageNotFound = () => {

  return (
    <div className='main-container'>
      <div className='container'>
        <h1 className='sorry-title'>Oops!</h1>
        <div className='message-container'>
          <h2 className='not-found-number'>4</h2>
          <img 
            className='not-found-img'
            src={ pokeballIcon } 
            alt='Pokeball'
          />
          <h2 className='not-found-number'>4</h2>
        </div>
        <h2 className='page-not-found'>Page Not Found</h2>
        <NavLink to='/pokemons' className='back-button'>Back Home</NavLink>
      </div>
      <img
        className='sad-pokemon-img'
        src={ sadPokemon }
        alt='Sad Pokémon'
      />
    </div> 
  )
}


export default PageNotFound;