const express = require('express');
const router = express.Router();
const showProductsRouter = require('./products');
const uploadProductsRouter = require('./uploadProducts');


router.use('/products', showProductsRouter);
router.use('/products', uploadProductsRouter);

module.exports = router;