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
    const products_data = data.split(splitPattern);
    products_data.shift();
    const products = products_data
      .filter(row => row.trim() !== '')
      .map(createHTML);

    app.set("view engine", "ejs");
    
    app.get("/", (req, res) => { 
      res.render("index", {
        products: products
      }); 
    });

    app.get('/product/:index', (req, res) => {
      res.render("products",{
        products: products,
        index: req.params.index
      }); 
    });
  
    /* app.get('/product/:index', (req, res) => {
      res.send("Product: " + products[req.params.index]); 
    }); */

    /* app.get('/', (req, res) => {
      res.send("Product: " + products[req.params.index]); 
    }); */

    app.listen(port, ip, () => {
        console.log(`Server running at http://${ip}:${port}/`);
    });

  }
);

//Individual Product Pages
const createHTML = row => {
  const fields = row.split('\t');
  const product = {
                    product_name: fields[0],
                    product_desc: fields[1],
                    product_install: fields[2],
                    product_url: fields[3]
                  };
  return product;
}



