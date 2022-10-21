class Product {
    constructor(title, price, thumbnail, id) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id ;
    }

    getAll(products) {
        return products;
    }

    getById(id, products) {
        try {
            const index = products.findIndex((product) => product.id === id);
            if (index < 0) throw new Error('El producto no existe');
            return products[index];
        } catch (error) {
            console.log(error);
        }
    }

    save(body, products) {
        try {
            const {titulo, precio, foto} = body;
            const newProduct = {
                titulo : titulo,
                precio : precio,
                foto : foto,
                id : products[products.length -1].id + 1
            }
            products.push(newProduct);
            return newProduct;
        } catch (error) {
            throw new Error('Datos Invalidos'), error
        }
    }

    update(id, body, products) {
        let updatedProduct = false  
        try {
            products.forEach((product) => {
                if (product.id === id) {
                    product.title = body.title;
                    product.price = body.price;
                    product.thumbnail = body.thumbnail;
                    updatedProduct = true;
                }
                updatedProduct ? console.log('Producto actualizado') : console.log('Producto no encontrado');
            });
        } catch (error) {
            throw new Error('Datos Invalidos'), error
        }
    }
    
    deletedById (id, products) {
        try {
            const index = products.findIndex((product) => product.id === id);
            if (index < 0) throw new Error('El producto no existe');
            products.splice(index, 1);
        } catch (error) {
            throw new Error('Datos Invalidos'), error
        }
    }
}

module.exports = Product;