const express = require('express');
const router = express.Router();
const products = require('../database.js');
const Product = require('../class/productClass')
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', (req, res) => {
    res.render('uploadProducts.pug');
})

router.post('/', (req, res) => {
    const body = req.body;
    const { name, price, thumbnail } = body;
	const newProduct = new Product( name, price, thumbnail, products.listProducts.length + 1);
    products.listProducts.push(newProduct);
    res.redirect('/products/show');
})

module.exports = router;