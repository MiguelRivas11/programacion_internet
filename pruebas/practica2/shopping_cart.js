// Import ProductProxy class
const { Product } = require('./product');

// Custom exception class for shopping cart
class ShoppingCartException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

// Class representing a product proxy
class ProductProxy {
    constructor(productUuid, amount) {
        this.productUuid = productUuid;
        this.amount = amount;
    }
}

// Class representing a shopping cart
class ShoppingCart {
    constructor() {
        this.proxies = [];
        this.products = [];
    }

    // Add or update item in the shopping cart
    addItem(productUuid, amount) {
        const existingProxy = this.proxies.find(proxy => proxy.productUuid === productUuid);
        if (existingProxy) {
            existingProxy.amount += amount;
        } else {
            this.proxies.push(new ProductProxy(productUuid, amount));
            const product = this.products.find(product => product.uid === productUuid);
            if (!product) {
                throw new ShoppingCartException('Product not found in the inventory');
            }
            this.products.push(new Product(product.uid, product.title, product.description, product.imageUrl, product.unit, product.stock, product.pricePerUnit, product.category));
        }
    }

    // Update item amount in the shopping cart
    updateItem(productUuid, newAmount) {
        if (newAmount < 0) {
            throw new ShoppingCartException('Amount cannot be negative');
        } else if (newAmount === 0) {
            this.removeItem(productUuid);
        } else {
            const existingProxy = this.proxies.find(proxy => proxy.productUuid === productUuid);
            if (!existingProxy) {
                throw new ShoppingCartException('Product not found in the shopping cart');
            }
            existingProxy.amount = newAmount;
        }
    }

    // Remove item from the shopping cart
    removeItem(productUuid) {
        const index = this.proxies.findIndex(proxy => proxy.productUuid === productUuid);
        if (index === -1) {
            throw new ShoppingCartException('Product not found in the shopping cart');
        }
        this.proxies.splice(index, 1);
    }

    // Calculate total price of the shopping cart
    calculateTotal() {
        let total = 0;
        for (const proxy of this.proxies) {
            const product = this.products.find(product => product.uid === proxy.productUuid);
            if (!product) {
                throw new ShoppingCartException('Product not found in the inventory');
            }
            total += proxy.amount * product.pricePerUnit;
        }
        return total;
    }
}

module.exports = {
    ShoppingCart,
    ShoppingCartException
};
