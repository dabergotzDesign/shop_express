'use strict';
const fs = require('fs');
const express = require("express");
const app = express();

const ip = "127.0.0.1";
const port = 8081;

app.use(express.static("./public"));


fs.readFile(
  'packages.csv', 
  'utf-8', 
  (error, data) => {
    const splitPattern = new RegExp("\r\n|\r|\n");
    const products = data.split(splitPattern);
    products.shift();
    const pages = products
      .filter(row => row.trim() !== '')
      .map(createHTML);
     
  
    app.get('/product/:index', (req, res) => {
      res.send("Product: " + pages[req.params.index]); 
    });

    app.listen(port, ip, () => {
        console.log(`Server running at http://${ip}:${port}/`);
    });

  }
);

//Individual Product Pages
const createHTML = row => {
  const fields = row.split('\t');
  const page = `
        <h1>${fields[0]}</h1>
        <p>${fields[1]}</p>
        <p>Installationsbefehl: <code>${fields[2]}</code></p>
        <p><a href="${fields[3]}">${fields[3]}</a></p>`;
  return page;
}



