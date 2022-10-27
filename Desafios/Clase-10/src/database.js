const Product = require('./class/productClass');

const products = {
    listProducts: [
        new Product ('Buzo', 1000, 'https://cdn3.iconfinder.com/data/icons/clothes-126/64/21-garmentclothingovercoatcoatjacketwinterclothes-512.png', 1),
        new Product ('Remera', 500, 'https://cdn2.iconfinder.com/data/icons/essentials-volume-i/128/tshirt-512.png', 2),
        new Product ('Pantalon', 1500, 'https://cdn3.iconfinder.com/data/icons/fashion-beauty-vol-1/512/jeans_denim_trousers_pants-512.png', 3),
    ]
}


module.exports = products;