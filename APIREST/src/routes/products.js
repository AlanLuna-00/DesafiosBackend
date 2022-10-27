const express = require('express');
const router = express.Router();
const Product = require('../class/productClass');
const products = require('../class/productClass');

const product = new Product();

router.get('/', (req, res) => {
	res.json(product.getAll());
})

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const idParsed = parseInt(id);
	let index = products.findIndex((product) => product.id === idParsed);
	if (index < 0) {
		res.status(404).json({ error: 'Producto no encontrado', id: id });
	} else {
		res.json(new Product.getById(idParsed, products));
	}
});
	

router.post('/', (req, res) => {
	const body = req.body;
	const newProduct = new Product.save(body);
	res.json(newProduct);
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const idParsed = parseInt(id);
	const body = req.body;
	new Product.update(idParsed, body, products);
	res.json({
		ProdActualizado: new Product.getById(idParsed, products),
		data : products	
	});
});

router.delete('/:id', (req, res) => {
	try {
		const  id  = req.params.id;
		const idParsed = parseInt(id);
		new Product.deletedById(idParsed, products);
		res.json({ ProductDeleted: products[idParsed], id: id });
	}
	catch (error) {
		res.status(500).json({ error: error});
	}
})

module.exports = router;



