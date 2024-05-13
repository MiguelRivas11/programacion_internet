"use strict";

const express = require('express');
const router = express.Router();
const routerProd = require('../routes/products');
const routerProdAdm = require('../routes/admin_products');
const path = require('path');

router.use('/products', routerProd);
router.use('/admin', validateAdmin , routerProdAdm);

router.get('/',
  (req, res) => res.send('e-commerce app práctica 3')
);

router.get('/home',function(req, res) {
    res.sendFile(path.join(__dirname, '../../view/Home.html'));
});
router.get('/shopping_cart',function(req, res) {
    res.sendFile(path.join(__dirname, '../../view/shopping_cart.html'));
});
router.get('/style',function(req, res) {
    res.sendFile(path.join(__dirname, '../../view/style.css'));
});


function validateAdmin(req, res, next){
  let  query = req.headers;
  let auth = query['x-auth'];
  if(auth != undefined && auth == 'admin'){
    next();
  }else{
    res.status(403).type("text/plain").send("Acceso no autorizado");
  }
}

module.exports = router;