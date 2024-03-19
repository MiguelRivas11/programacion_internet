// Importar las clases y métodos necesarios
const { Product } = require('./product');
const DataHandler = require('./data_handler');

// Función para ejecutar las pruebas
async function runTests() {
    try {
        // Pruebas para la clase de productos
        console.log("Pruebas para la clase de productos:");

        // Agregar productos
        const newProduct1 = new Product(null, "Manzana", "Manzana Roja", "https://example.com/apple.jpg", "unidad", 20, 2.5, "Fruta");
        const newProduct2 = new Product(null, "Naranja", "Naranja Valencia", "https://example.com/orange.jpg", "unidad", 15, 3.0, "Fruta");
        const newProduct3 = new Product(null, "Pera", "Pera Williams", "https://example.com/pear.jpg", "unidad", 18, 2.0, "Fruta");
        const newProduct4 = new Product(null, "Plátano", "Plátano Canario", "https://example.com/banana.jpg", "unidad", 22, 1.8, "Fruta");

        DataHandler.createProduct(newProduct1);
        DataHandler.createProduct(newProduct2);
        DataHandler.createProduct(newProduct3);
        DataHandler.createProduct(newProduct4);

        // Actualizar un producto
        const updatedProduct = new Product(newProduct1.uid, "Manzana", "Manzana Gala", "https://example.com/apple.jpg", "unidad", 25, 2.7, "Fruta");
        DataHandler.updateProduct(newProduct1.uid, updatedProduct);

        // Eliminar un producto
        DataHandler.deleteProduct(newProduct3.uid);

        // Búsqueda de productos
        console.log("\nBúsqueda de productos:");
        console.log("Por categoría (Fruta):", DataHandler.findProduct("Fruta:"));
        console.log("Por nombre (Naranja):", DataHandler.findProduct(":Naranja"));
        console.log("Búsqueda combinada (Plátano Fruta):", DataHandler.findProduct("Fruta:Plátano"));

        console.log("\nPruebas completadas correctamente.");
    } catch (error) {
        console.error("Error durante las pruebas:", error);
    }
}

// Ejecutar las pruebas
runTests();
