import React from 'react';
import { connect } from 'react-redux';
import { updateComparisonModalActive, updateComparing } from '../../redux/actions/pokemonActions';
import config from '../../config';
import pokeball from '../../images/gray-pokeball.png';
import Chart from '../StatsChart';
import './comparisonModal.css';

const ComparisonModal = (props) => {
  const pokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon];
  const pokemon2 = props.pokemonData.pokemons[props.pokemonData.secondPokemon];
  const informationUnits = [ 'm', 'kg', '' ];
  const informationClass = 'information-container__item';
  const informationClasses = [ informationClass, informationClass + ' bordered', informationClass ];

  const closeModal = () => {
    props.updateComparing();
    props.updateComparisonModalActive();
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
                  {
                    Object.keys(pokemon.information).map( (key, index) =>(
                      <div className={ informationClasses[index] }>
                        <h3 className='information-container__item-value'>{ pokemon.information[key] + informationUnits[index]}</h3>
                        <h3 className='information-container__item-name'>{ key }</h3>
                        <h3 className='information-container__item-value'>{ pokemon2.information[key] + informationUnits[index]}</h3>
                      </div>
                    ))
                  }
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
                    pokemon.abilities.map( item => (
                      <li className='abilities-item' key={ item.ability.name }>
                        { item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1)}
                      </li>
                    ))}
                  </ul>
                  <ul className='abilities-list'>
                    { pokemon2.abilities &&
                    pokemon2.abilities.map( item => (
                      <li className='abilities-item right' key={ item.ability.name }>
                        { item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1)}
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
    updateComparisonModalActive: (state) => dispatch(updateComparisonModalActive(state)),
    updateComparing: (state) => dispatch(updateComparing(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparisonModal);