// Import Product class
const { Product, ProductException } = require('./product');

// Constant array of products (initial data)
const products = [
    new Product("eg3119b6-2d51-5ee2-0ec8-9bbd14bf3gc", "Plátano", "Plátano Chiapas 8.90 la pieza bien fresca y tersa", "https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg", "pieza", 15, 3.6, "Fruta")
    // Add more initial products here if needed
];

// Class for handling data operations
class DataHandler {
    // Get all products
    static getProducts() {
        return products;
    }

    // Get product by UUID
    static getProductById(uuid) {
        const product = products.find(product => product.uid === uuid);
        if (!product) {
            throw new ProductException('Product not found');
        }
        return product;
    }

    // Create a new product
    static createProduct(product) {
        products.push(product);
    }

    // Update an existing product
    static updateProduct(uuid, updatedProduct) {
        const index = products.findIndex(product => product.uid === uuid);
        if (index === -1) {
            throw new ProductException('Product not found');
        }
        products[index] = updatedProduct;
    }

    // Delete a product
    static deleteProduct(uuid) {
        const index = products.findIndex(product => product.uid === uuid);
        if (index === -1) {
            throw new ProductException('Product not found');
        }
        products.splice(index, 1);
    }

    // Find products by query
    static findProduct(query) {
        const [categoryQuery, titleQuery] = query.split(':');
        if (categoryQuery && titleQuery) {
            return products.filter(product => product.category.includes(categoryQuery) && product.title.includes(titleQuery));
        } else if (categoryQuery) {
            return products.filter(product => product.category.includes(categoryQuery));
        } else if (titleQuery) {
            return products.filter(product => product.title.includes(titleQuery));
        } else {
            throw new ProductException('Invalid query format');
        }
    }
}

module.exports = DataHandler;
