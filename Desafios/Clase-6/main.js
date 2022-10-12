const express = require('express');
const Contenedor = require('./contenedorClass.js');
const app = express();

const PORT = 8080;

const productsFile = './products.json';

const contenedor = new Contenedor(productsFile);

let visitas = 0
app.get('/', (req, res) => {
    visitas++
    res.send(`Bienvenido a mi servidor - Alan Luna - Visitas a la web ${visitas}`)
});

app.get('/productos', async (req, res) => {
    const products = await contenedor.getAll()
    const showProducts = products.map((product) => {
        return `Producto: ${product.title} - Precio: ${product.price} - ID: ${product.id}   `
    })
    res.send(showProducts)
});

const idRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

app.get('/productos/:id', async (req, res) => {
    const id = idRandom(1,4)
    const product = await contenedor.getById(id)
    const showProduct = `Producto: ${product.title} - Precio: ${product.price} - ID: ${product.id}`
    res.send(showProduct)
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});



