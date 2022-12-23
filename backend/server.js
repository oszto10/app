const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/beers", (req, res) => {
  res.sendFile(path.join(`${__dirname}/beers.json`));
});

//így is lehet
/* app.get("/beers", (req, res) => {
  fs.readFile(`${__dirname}/beers.json`, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      const beerData = JSON.parse(data);
      return res.send(beerData);
    }
  });
}); */

app.post("/beers/add", (req, res) => {
  const newBeerData = {
    name: req.body.name,
    tagline: req.body.tagline,
    abv: req.body.abv,
  };

  fs.readFile(`${__dirname}/beers.json`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const beerData = JSON.parse(data);
      newBeerData.id = beerData.length + 1;
      beerData.push(newBeerData);

      fs.writeFile(
        `${__dirname}/beers.json`,
        JSON.stringify(beerData, null, 4),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            return res.json(newBeerData);
          }
        }
      );
    }
  });
});

app.delete("/del/:id", (req, res) => {
  fs.readFile(`${__dirname}/beers.json`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const beerData = JSON.parse(data);

      const newBeerData = beerData.filter((beer) => beer.id !== +req.params.id);
      console.log(newBeerData);
      fs.writeFile(
        `${__dirname}/beers.json`,
        JSON.stringify(newBeerData, null, 4),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            return res.send('"ok"');
          }
        }
      );
    }
  });
});

app.listen(9000, () => {
  console.log("http://127.0.0.1:9000");
});
