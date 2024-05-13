"use strict";

const productsUrl = 'http://localhost:8080/products'
const cartUrl = 'http://localhost:8080/products/cart'

function initShoppingCart(){
	if(sessionStorage.getItem('shoppingCart')==null){
		let cart = new ShoppingCart();
		writeShoppingCart(cart);
	}
	let cart = readShoppingCart();
	document.getElementById("proxySize").innerText = cart._productProxies.length;
}

function readShoppingCart(){
	let cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
	let i = new ShoppingCart();
	i._products = cart._products;
	i._productProxies = cart._productProxies;
	return i;
}

function writeShoppingCart(cart){
	sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
}


function goToCart(){
  	if(sessionStorage.getItem('shoppingCart')==null){
		let cart = new ShoppingCart();
		writeShoppingCart(cart);
	}
  	let cart = readShoppingCart();
  	//aqui hacemos una llamada al post cart y lo que nos regresa lo guardamos en products
  	postCart(cartUrl, cart._productProxies, 
      	(msg) => {
	        //console.log(msg)
	        cart.products = JSON.parse(msg)
	        writeShoppingCart(cart)
	        window.location.href = "shopping_cart"
	      }
	      , (err) => {
	      	sessionStorage.removeItem('shoppingCart');
			let cart = new ShoppingCart();
			writeShoppingCart(cart);
  			document.getElementById("proxySize").innerText 
          		= cart._productProxies.length;
    		loadCart();
			console.log("Server + UUID Refresh = " + err);
      	});
}

function reloadCart(){
  	let cart = readShoppingCart();
  	postCart(cartUrl, cart._productProxies, 
      	(msg) => {
	        cart.products = JSON.parse(msg)
	        writeShoppingCart(cart)
    		loadCart();
	      } 
	      , (err) => {
	      	sessionStorage.removeItem('shoppingCart');
			let cart = new ShoppingCart();
			writeShoppingCart(cart); 
  			document.getElementById("proxySize").innerText 
          		= cart._productProxies.length;
    		loadCart();
			console.log("Server + UUID Refresh = " + err);
      	});
}


initShoppingCart();