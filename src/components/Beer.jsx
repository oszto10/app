import React from 'react'

function Beer({beerData, fetchBeers}) {
  const delButton = () => {
    fetch(`/del/${beerData.id}` , {
      method: 'DELETE'
  }
  )
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    fetchBeers();
  })
  }
  
  
  
  return (
 

    <div>
      <h1>{beerData.id}</h1>
        <h2>{beerData.name}</h2>
        <h3>{beerData.tagline}</h3>
        <h4>{beerData.abv}</h4>
        <input onClick={delButton} value="Delete" type='button'/>
    </div>
  )
}

export default Beer
