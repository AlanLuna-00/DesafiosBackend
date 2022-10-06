const fs = require('fs');
const path = require('path');



// const obtenerJson = () => {
//     const data = fs.readFileSync(nameJson, 'utf-8')
//     return JSON.parse(data)
// }

// const save = (data) => {
//     if (!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos Invalidos')

//     const products = obtenerJson()

//     const newProduct = {
//         title: data.title,
//         price: data.price,
//         id: products[products.length -1].id + 1
//     }

//     products.push(newProduct)

//     saveProducts(products)
// }

// const saveProducts = (products) => {
//     const data = JSON.stringify(products, null , '\t')
//     fs.writeFileSync(nameJson, data)
// }

// const getbyId = (idBuscado) => {
//     const products = obtenerJson()

//     const index = products.findIndex((product) => product.id === idBuscado)

//     if (index < 0) throw new Error('El producto no existe')

//     return products[index]
// }

// const getAll = () => {
//     const products = obtenerJson()
//     return products
// }

// const deletebyId = (idDeleted) => {
//     const products = obtenerJson()

//     const index = products.findIndex((product) => product.id === idDeleted);

//     if (index < 0) return;

//     products.splice(index,1)
    
//     saveProducts(products)
// }

// deletebyId(4)


const nameJson = 'products.json'


class Contenedor {

    constructor(nameJson) {
        this.nameJson = nameJson
    }

    async validateData() {
        const exits = await fs.promises.stat(this.nameJson)
        !exits ? await fs.promises.writeFile(this.nameJson, JSON.stringify(['Error 404'])) : null
    }

    async getProducts() {
        await this.validateData()
        const data = await fs.promises.readFile(this.nameJson, 'utf-8')
        return JSON.parse(data)
    }

    async log() {
        const products = await this.getProducts()
        console.log(products)
    }

    async save(data) {
        if (!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos Invalidos')

        const products = await this.getProducts()

        const newProduct = {
            title: data.title,
            price: data.price,
            id: products[products.length -1].id + 1
        }

        products.push(newProduct)

        await this.saveProducts(products)
    }

    async saveProducts(products) {
        const data = JSON.stringify(products, null , '\t')
        await fs.promises.writeFile(this.nameJson, data)
    }

    async getById(idBuscado) {
        const products = await this.getProducts()

        const index = products.findIndex((product) => product.id === idBuscado)

        if (index < 0) throw new Error('El producto no existe')

        return products[index]
    }

    async getAll() {
        const products = await this.getProducts()
        return products
    }

    async deleteById(idDeleted) {
        const products = await this.getProducts()

        const index = products.findIndex((product) => product.id === idDeleted);

        if (index < 0) return;

        products.splice(index,1)
        
        await this.saveProducts(products)
    }

}

const main = async () => {
    const contenedor = new Contenedor(nameJson)
    
    // Save Product
    await contenedor.save({
        title: 'Teclado',
        price: 320
    })

    // Get All Products
    const products = await contenedor.getAll()
    console.log(products)

    // Get Product by Id
    const product = await contenedor.getById(2)
    console.log(product)

    // Delete Product by Id
    await contenedor.deleteById(2)
    await contenedor.log()
    
}

main()