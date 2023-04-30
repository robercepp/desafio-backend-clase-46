

module.exports = class ProductosDTO {
    constructor (data) {
        this.data = data
    }
    readData() {
        const products = []
        this.data.forEach(product => {
            const item = {
                nombre: product.nombre,
                precio: product.precio,
                thumbnail: product.thumbnail
            }
            products.push(item)
        });
        return products
    }

    readSingleProduct(){
        const product = {
            nombre: this.data.nombre,
            precio: this.data.precio,
            thumbnail: this.data.thumbnail
        }
        return product
    }
}