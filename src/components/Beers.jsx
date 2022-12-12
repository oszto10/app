import React from 'react'
import Beer from './Beer'

function Beers({beers}) {
  return (
    <div>{beers.map((beer, i)=><Beer key={i} beerData={beer}/>)}</div>
  )
}

export default Beers