const express = require('express');
const router = express.Router();
const products = require('../database.js');
const Product = require('../class/productClass');
const { listProducts } = require('../database.js');

router.get('/show', (req, res) => {
    res.render('showProducts.pug', products);
});

router.get('/show/:id', (req, res) => {
    const id = req.params.id;
    const index = parseInt(id) - 1;
    const product = listProducts[index];
    res.render('showOneProduct.pug', {
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
    }); 
});


module.exports = router;