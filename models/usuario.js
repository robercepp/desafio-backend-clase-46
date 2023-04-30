const mongoose = require ('mongoose')

const usuariosCollections = 'usuariosent'

const UsuarioSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model(usuariosCollections, UsuarioSchema)