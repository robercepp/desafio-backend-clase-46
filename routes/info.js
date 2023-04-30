//info.js
//librerías
const Router = require("koa-router");

const router = new Router()

//controlador
const info = require("../controllers/info.js")

//rutas
router.get('/info', info.getInfo)

module.exports = router