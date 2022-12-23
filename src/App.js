import React, { useState, useEffect } from "react";
import "./App.css";
import Beers from "./components/Beers";
import LoadingMask from "./components/LoadingMask";

function App() {
  const [beers, setBeers] = useState([]);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [abv, setAbv] = useState(0);

  const fetchBeers = () => {
    fetch("/beers")
      .then((res) => res.json())
      .then((data) => setBeers(data));
  };

  const addBeer = () => {
    fetch("/beers/add", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        tagline: tagline,
        abv: abv,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);
        fetchBeers();
      })
    );
  };

  useEffect(() => {
    fetchBeers();
  }, []);

  return (
    <div className="App">
      {beers.length > 0 ? (
        <>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="tagline"
            value={tagline}
            onChange={(event) => setTagline(event.target.value)}
          />
          <input
            type="number"
            placeholder="abv"
            onChange={(event) => setAbv(event.target.value)}
          />
          <button
            onClick={() => {
              addBeer();
            }}
          >
            Send
          </button>
          <Beers beers={beers} fetchBeers={fetchBeers} />{" "}
        </>
      ) : (
        <LoadingMask />
      )}
    </div>
  );
}

export default App;
