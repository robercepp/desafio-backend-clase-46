const mongoose = require('mongoose') ;

const productosCollections = 'productosent'

const ProductoSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    nombre: {type: String, required: true, max: 50},
    precio: {type: Number, required: [true, "un valor debe ser incluido"]},
    thumbnail: {type: String, required: true},
    timestamp: {type: String, required: true}
})

module.exports = mongoose.model(productosCollections, ProductoSchema)