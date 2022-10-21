const { Router } = require('express');
const products = require('./products.js');

const router = Router();

router.use('/products', products);

module.exports = router;