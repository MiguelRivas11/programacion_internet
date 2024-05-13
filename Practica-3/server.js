const express =require('express');
const app = express();
const port=3000;

// Middleware global para parsear a JSON
app.use(express.json());

//Ruta raiz que retorna mensaje
app.get('/',(req,res) => {
    res.send('e-commerce app practica3');
});

// inicio del servidor
app.listen(port,() =>{
    console.log(`Server running on http://localhost:${port}`);
});
