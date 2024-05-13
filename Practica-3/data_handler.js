const fs =require('fs');
 //cargar y parsear
 const productsRawData =fs.readFileSync('products.json');
 const products=JSON.parse(productsRawData);

 module.exports={
    products
 };