import React from 'react';
import { connect } from 'react-redux';
import { isComparisonModalActive, isComparing } from '../../redux/actions/pokemonActions';
import config from '../../config';
import pokeball from '../../images/gray-pokeball.png';
import Chart from '../StatsChart';
import './comparisonModal.css';

const ComparisonModal = (props) => {
  const pokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon]
  const pokemon2 = props.pokemonData.pokemons[props.pokemonData.secondPokemon]

  const closeModal = () => {
    props.isComparing();
    props.isComparisonModalActive();
  }

  const handleCardClick = (event) => { 
    event.stopPropagation();
  }

  return (
    <div>
      {
        props.pokemonData.isComparisonModalActive && (
          <div className='modal-container' onClick={ closeModal }>
            <div className='card' onClick={ handleCardClick }>
              <div className='pokemon-card__title'>
                <button className='pokemon-card__compare' hidden={true}>
                    Compare
                </button>
                <button className='pokemon-card__close' onClick={ closeModal }>
                    X
                </button>
              </div>
              <div className='pokemon-container'>
                <div className='comparison-image-container'>
                  <img className='comparison-pokemon-img' src={ config.SPRITES_URL + pokemon.id + '.png' } alt={ pokemon.name } />
                  <img className='comparison-pokemon-img' src={ config.SPRITES_URL + pokemon2.id + '.png' } alt={ pokemon2.name } />
                </div>
                <div>
                  <h2 className='pokemon-name'>{ pokemon.name.toUpperCase() } vs { pokemon2.name.toUpperCase() }</h2>    
                </div>    
                <div className='information-container'> 
                  <div className='information-container__item'>
                    <h3 className='information-container__item-value'>{ pokemon.height }m</h3>
                    <h3 className='information-container__item-name'>Height</h3>
                    <h3 className='information-container__item-value'>{ pokemon2.height }m</h3>
                  </div>
                  <div className='information-container__item bordered'>
                    <h3 className='information-container__item-value'>{ pokemon.weight }kg</h3>
                    <h3 className='information-container__item-name'>Weight</h3>
                    <h3 className='information-container__item-value'>{ pokemon2.weight }kg</h3>
                  </div>
                  <div className='information-container__item'>
                    <h3 className='information-container__item-value'>{ pokemon.gender }</h3>
                    <h3 className='information-container__item-name'>Gender</h3>
                    <h3 className='information-container__item-value'>{ pokemon2.gender }</h3>
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
                <div className='abilities-container'>
                  <ul className='abilities-list'>
                    { pokemon.abilities &&
                    pokemon.abilities.map(ability => (
                      <li className='abilities-item'key={ ability.ability.name }>
                        { ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                      </li>
                    ))}
                  </ul>
                  <ul className='abilities-list'>
                    { pokemon2.abilities &&
                    pokemon2.abilities.map(ability => (
                      <li className='abilities-item right'key={ ability.ability.name }>
                        { ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>
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
    isComparisonModalActive: (state) => dispatch(isComparisonModalActive(state)),
    isComparing: (state) => dispatch(isComparing(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparisonModal);