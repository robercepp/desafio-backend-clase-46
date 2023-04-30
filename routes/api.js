//productos.js
//Librerías
const Router = require("koa-router");

const logger = require("../utils/logger.js");
const passport = require("passport");

//controlador
const prod = require("../controllers/productos.js");

//prefijo de todas las rutas con /productos
const router = new Router({
  prefix: "/api",
});

//manejo de productos (API)
router.get('/productos', auth, prod.listAllProducts)

router.get("/productos/:id", auth, prod.listProductById)

router.post("/productos", auth, prod.createProduct);

router.put('/productos/:id', auth, prod.modifyProduct)

router.delete('/productos/:id', auth, prod.deleteProduct)

//números aleatorios
router.get('/randoms', auth, prod.randoms)

router.get('/productos-test', auth, prod.randomTests)

function auth(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  }
  ctx.redirect('/login')
}

module.exports = router