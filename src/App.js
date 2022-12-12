import React, { useState, useEffect } from "react";
import "./App.css";
import Beers from "./components/Beers";
import LoadingMask from "./components/LoadingMask";

function App() {
  const [beers, setBeers] = useState([]);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers?per_page=${perPage}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setBeers(data);
        }, 1000);
      });
  }, [perPage]);

  console.log(beers);

  return (
    <div className="App">
      <input
        type="number"
        value={perPage}
        onChange={(event) => {
          setPerPage(event.target.value);
        }}
      />
      {beers.length > 0 ? <Beers beers={beers} /> : <LoadingMask />}
    </div>
  );
}

export default App;
