"use strict";

const express = require('express');
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    let  query = req.query.query;
    if(query == undefined){
      res.status(200).json(dataHandler.getProducts());
    }else{
      res.status(200).json(dataHandler.findProduct(query));
    }
  });

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    let product = dataHandler.getProductById(id);
    if(product != undefined ) {
      res.status(200).json(product);
    } else {
      res.status(404).send(`Producto con UUID: ${id} no existe!`);
    }
  });

router.route('/cart')
  .post((req, res) => {
    let proxies = req.body;
    let products = [];

    if(!Array.isArray(proxies)){
      res.status(400).send('Body debe de ser un arreglo!');
      return;
    }
    for (let proxy of proxies){
      let product = dataHandler.getProductById(proxy.productUUID);
      if(product != undefined){
        products.push(product);
      } else {
        res.status(404).send(`Producto con UUID: ${proxy.productUUID} no existe!`);
        return;        
      }
    }
    res.status(200).json(products);
  });

module.exports = router;