import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';



const StatsChart = (props) => {
  const firstPokemon = props.pokemonData.pokemons[props.pokemonData.firstPokemon];
  const secondPokemon = props.pokemonData.pokemons[props.pokemonData.secondPokemon];


  const data = {
    labels: firstPokemon.stats.map( ({ stat }) => stat.name),
    datasets: [
      {
        label: firstPokemon.name,
        data: firstPokemon.stats.map(({ base_stat }) => base_stat ),
        backgroundColor: '#ff7a7f',
        borderWidth: 3,
        hidden: false 
      }
    ]
  }

  if (props.pokemonData.isComparing){
    data.datasets = [
      ...data.datasets,
      {
        label: secondPokemon.name,
        data: secondPokemon.stats.map(({base_stat}) => base_stat ),
        backgroundColor: '#7a7eff',
        borderWidth: 3,
        hidden: !props.pokemonData.isComparing
      }
    ]
  }

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            beginAtZero: true
          },
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
    }
  }


  return (
    <div>
      <Bar
        data={ data }
        options={ options }
        datasetKeyProvider={ ()=>(Math.random()) }
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(StatsChart);