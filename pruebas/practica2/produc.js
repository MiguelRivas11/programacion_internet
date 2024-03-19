// Import the UUID generator function
const { generateUUID } = require('./utils');

// Custom exception class for products
class ProductException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

// Class representing a product
class Product {
    constructor(uid, title, description, imageUrl, unit, stock, pricePerUnit, category) {
        this._uid = uid || generateUUID();
        this._title = title;
        this._description = description;
        this._imageUrl = imageUrl;
        this._unit = unit;
        this._stock = stock;
        this._pricePerUnit = pricePerUnit;
        this._category = category;
    }

    // Getters and setters with validations
    get uid() {
        return this._uid;
    }

    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new ProductException('Title must be a non-empty string');
        }
        this._title = value;
    }

    get title() {
        return this._title;
    }

    set description(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new ProductException('Description must be a non-empty string');
        }
        this._description = value;
    }

    get description() {
        return this._description;
    }

    set imageUrl(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new ProductException('Image URL must be a non-empty string');
        }
        this._imageUrl = value;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set unit(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new ProductException('Unit must be a non-empty string');
        }
        this._unit = value;
    }

    get unit() {
        return this._unit;
    }

    set stock(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new ProductException('Stock must be a non-negative number');
        }
        this._stock = value;
    }

    get stock() {
        return this._stock;
    }

    set pricePerUnit(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new ProductException('Price per unit must be a non-negative number');
        }
        this._pricePerUnit = value;
    }

    get pricePerUnit() {
        return this._pricePerUnit;
    }

    set category(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new ProductException('Category must be a non-empty string');
        }
        this._category = value;
    }

    get category() {
        return this._category;
    }

    // Static method to create Product instance from JSON string
    static createFromJson(jsonValue) {
        const obj = JSON.parse(jsonValue);
        return Product.createFromObject(obj);
    }

    // Static method to create Product instance from object
    static createFromObject(obj) {
        const { uid, title, description, imageUrl, unit, stock, pricePerUnit, category } = obj;
        return new Product(uid, title, description, imageUrl, unit, stock, pricePerUnit, category);
    }

    // Static method to clean object from non-product properties
    static cleanObject(obj) {
        const { uid, title, description, imageUrl, unit, stock, pricePerUnit, category } = obj;
        return { uid, title, description, imageUrl, unit, stock, pricePerUnit, category };
    }
}

module.exports = {
    Product,
    ProductException
};
