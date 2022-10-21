const express = require('express');
const router = express.Router();
const Product = require('../class/productClass');
const { body , validationResult } = require('express-validator');

const products = [
	new Product(
		'Escuadra',
		123.45,
		'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
		1
	),
	new Product(
		'Calculadora',
		234.56,
		'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
		2
	),
	new Product(
		'Lapicera',
		345.67,
		'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationary-school-256.png',
		3
	),
];

const clientProduct = new Product();

router.get('/', (req, res) => {
	res.json(clientProduct.getAll(products));
})

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const idParsed = parseInt(id);
	let index = products.findIndex((product) => product.id === idParsed);
	if (index < 0) {
		res.status(404).json({ error: 'Producto no encontrado', id: id });
	} else {
		res.json(clientProduct.getById(idParsed, products));
	}
});
	

router.post('/', (req, res) => {
	const body = req.body;
	const newProduct = clientProduct.save(body, products);
	res.json(newProduct);
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const idParsed = parseInt(id);
	const body = req.body;
	clientProduct.update(idParsed, body, products);
	res.json({
		ProdActualizado: clientProduct.getById(idParsed, products),
		data : products	
	});
});

router.delete('/:id', (req, res) => {
	try {
		const  id  = req.params.id;
		const idParsed = parseInt(id);
		clientProduct.deletedById(idParsed, products);
		res.json({ ProductDeleted: products[idParsed], id: id });
	}
	catch (error) {
		res.status(500).json({ error: error});
	}
})

module.exports = router;


