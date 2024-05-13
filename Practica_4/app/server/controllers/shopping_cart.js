"use strict";

class ShoppingCartException{
	constructor(errorMessage){
		this.errorMessage = errorMessage;
	}
}


class ProductProxy{
	constructor(productUUID, amount){
		this.productUUID = productUUID;
		this.amount = amount;
	}
}

class ShoppingCart{
	constructor(){
		this.products = []; //real value 
		this._productProxies = []; //UUID, amount
	}

	//productProxies
    get productProxies() {
        return this._productProxies;
    }
    set productProxies(val) {
    	throw new ShoppingCartException('Proxies can not be set manually.');
    }

	//products
    get products() {
        return this._products;
    }

    set products(val) {
    	//creamos arreglo vacio
        this._products = [];
    	if(typeof val === 'String'){
    		val = JSON.parse(val);
    	}

        if(Array.isArray(val)){
            for(let product of val){
                //remove first char of every prop
                if(product instanceof Product){
                    this._products.push(product);
                } else {
                    this._products.push(Product.createFromObject(product));
                }
            }
        } else {
            if(product instanceof Product){
                this._products.push(val);
            } else {
                this._products.push(Product.createFromObject(val));
            }
        }
    }

    addItem(productUUID, newAmount){
        if (newAmount == 0) return; //ignore empty items
    	if (newAmount < 0) throw new ShoppingCartException('Amount of items to add must be a positive number');
    	let agregado = false;

        //check if the item is already in productProxies[]
        for (let prox in this._productProxies){
            //if it is, update accordingly
            if(productUUID == this._productProxies[prox].productUUID){
                this._productProxies[prox].amount = this._productProxies[prox].amount + newAmount;
                agregado = true;
                break;
            }
        }
        //if not, create item in productProxies[]
        if(!agregado){
            let proxie = new ProductProxy(productUUID,newAmount);
            this._productProxies.push(proxie);
        }
    }

    updateItem(productUUID, newAmount){
    	if (newAmount == 0) this.removeItem(productUUID);
    	if (newAmount < 0) throw new ShoppingCartException('Amount of items to update must be a positive number');
        let agregado = false;

        //check if the item is in productProxies[]
        for (let prox in this._productProxies){
            //if it is, update accordingly
            if(productUUID == this._productProxies[prox].productUUID){
                this._productProxies[prox].amount = newAmount;
                agregado = true;
                break;
            }
        }
        //if not, add it 
        if(!agregado){
            this.addItem(productUUID, newAmount);
        }
    }
    
    removeItem(productUUID){
    	//remove _productUUID from productProxies[]
        for (let prox in this._productProxies){ 
            if(productUUID == this._productProxies[prox].productUUID){
                this._productProxies.splice(prox,1);
                break;
            }
        }
    }
    
    calculateTotal(){
    	let total = 0;
        //creamos el products[]
        this._products = (getProducts());
        for(let prox in this._productProxies){
            for(let prod in this.products){
                if(this.products[prod].uuid == this.productProxies[prox].productUUID ){
                    console.log(this.products[prod].title, ": ", this.products[prod].pricePerUnit,"x",this.productProxies[prox].amount)
                    total = total + (this.products[prod].pricePerUnit * this.productProxies[prox].amount)
                }
            }
        }
        //buscamos el valor en products y lo multiplicamos por la cantidad del proxy
    	return total;
    }
}


module.exports = ShoppingCart;