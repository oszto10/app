import React from 'react'
import Beer from './Beer'

function Beers({beers, fetchBeers}) {
  return (
    <div>{beers.map((beer, i)=><Beer key={i} beerData={beer} fetchBeers={fetchBeers}/>)}</div>
  )
}

export default Beers