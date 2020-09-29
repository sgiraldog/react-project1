import React from 'react';
import { connect } from 'react-redux';
import { isPokemonModalActive, isComparing } from '../../redux/actions/pokemonActions';
import config from '../../config';
import pokeball from '../../images/gray-pokeball.png';
import Chart from '../StatsChart';
import './pokemonModal.css';
import './pokemonTypes.css';

const PokemonModal = (props) => {
  const pokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon]

  const closeModal = () => {
    props.isPokemonModalActive();
  }

  const handleCardClick = (event) => { 
    event.stopPropagation();
  }

  const comparePokemon = () => {
    props.isPokemonModalActive();
    props.isComparing();
  }

  return (
    <div>
      {
        props.pokemonData.isModalActive && (
          <div className='modal-container' onClick={ closeModal }>
            <div className='card' onClick={ handleCardClick }>
              <div className='pokemon-card__title'>
                
                <button className='pokemon-card__compare' onClick={ comparePokemon }>
                    Compare
                </button>
                <button className='pokemon-card__close' onClick={ closeModal }>
                    X
                </button>
              </div>
              <div className='pokemon-container'>
                <div className='image-container'>
                  <img className='pokemon-img' src={ config.SPRITES_URL + pokemon.id + '.png' } alt={ pokemon.name } />
                </div>
                <h2 className='pokemon-name'>{ pokemon.name.toUpperCase() }</h2>     
                <p className='pokemon-description'>
                    { pokemon.description }
                </p>
                <ul className='pokemon-types'>
                  {
                  pokemon.types && 
                  pokemon.types.map(type =>(
                    <li className={'pokemon-type ' + type.type.name} key={type.type.name}>
                      {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                    </li>
                  ))}
                </ul>
                <div className='information-container'> 
                  <div className='information-container__item'>
                    <h3 className='information-container__item-value'>{ pokemon.height }m</h3>
                    <h3 className='information-container__item-name'>Height</h3>
                  </div>
                  <div className='information-container__item bordered'>
                    <h3 className='information-container__item-value'>{ pokemon.weight }kg</h3>
                    <h3 className='information-container__item-name'>Weight</h3>
                  </div>
                  <div className='information-container__item'>
                    <h3 className='information-container__item-value'>{ pokemon.gender }</h3>
                    <h3 className='information-container__item-name'>Gender</h3>
                  </div>
                </div>
              </div>
              
              <div className='pokemon-container'>
                <div className='pokemon-container__title'>
                  <img
                    className='pokemon-container__title-img'
                    src={ pokeball }
                    alt='Pokeball'
                  />
                  <h3 className='pokemon-container__title-text'>Abilities</h3>
                </div>
                <ul className='abilities-list'>
                  { pokemon.abilities &&
                  pokemon.abilities.map(ability => (
                    <li className='abilities-item'key={ ability.ability.name }>
                      { ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1) }
                    </li>
                  ))}
                </ul>
              </div>

              <div className='pokemon-container'>
                <div className='pokemon-container__title'>
                  <img
                    className='pokemon-container__title-img'
                    src={ pokeball }
                    alt='Pokeball'
                  />
                  <h3 className='pokemon-container__title-text'>Stats</h3>
                </div>
                <Chart className='chart' />
              </div>
              <h2 className='pokemon-text'>{ pokemon.name.toUpperCase() }</h2>     
            </div> 
          </div>  
        )
      }
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