import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../../images/pokedex.png';
import { connect } from 'react-redux';
import { updateSearch, changeMobileItemsStatus } from '../../redux/actions/navBarActions';
import './navigationBar.css';

const NavigationBar = (props) => {

  const handleSearch = (event) => {
    props.updateSearch(event.target.value.toLowerCase());
  }

  const changeMobileItemsStatus = () => {
    props.changeMobileItemsStatus()
  }

  return (
    <div className='main-nav-container'>
      <nav className='nav-bar'>
        <div className='nav-bar-container'>
          <NavLink to='/' className='home-link'>
              <img 
                src={ icon }
                alt='PokéDex'
                className='home-link-img'
              />
          </NavLink>
          <NavLink to='/pokemons' className='normal-link'>Pokémons</NavLink>
        </div>
        
        <button className='burger-button' onClick={ changeMobileItemsStatus }>
          <span className='burger-button-bar'/>
          <span className='burger-button-bar'/>
          <span className='burger-button-bar'/>
        </button>

        { props.isSearchActive && 
          (
            <input className='search-input' type='text' placeholder='Search' onChange={ handleSearch } />
          )
        }
      </nav>
      {
        props.navBar.isMobileItemsActive && (
          <div className='mobile-bar-container'>
            <NavLink className='mobile-link' to='/' >Home</NavLink>
            <NavLink className='mobile-link' to='/pokemons' >Pokémons</NavLink>
          </div>
        )
      }
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateSearch: (text) => dispatch(updateSearch(text)),
    changeMobileItemsStatus: () => dispatch(changeMobileItemsStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
