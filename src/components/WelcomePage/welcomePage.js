import React from 'react';
import NavigationBar from '../NavigationBar';
import { NavLink } from 'react-router-dom';
import pokeball from '../../images/open-pokeball.png';
import './welcomePage.css';

const WelcomePage = () => {

  return (
    <div className='welcome-container'>
      <NavigationBar isSearchActive={ false } />
      <div className='welcome-card'>
        <div className='welcome-message-container'>
            <h1 className='welcome-message'>Welcome to the PokéDex!</h1>
            <NavLink to='/pokemons' className='welcome-button'>Let's Start</NavLink>
        </div>
        <img 
          className='welcome-img'
          src={ pokeball }
          alt='Pokeball'
        />
      </div>
    </div>
  )
}


export default WelcomePage;