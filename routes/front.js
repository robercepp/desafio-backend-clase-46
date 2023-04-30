//info.js
//librerías
const Router = require("koa-router");

const router = new Router();

//controlador
const front = require("../controllers/front.js");
const passport = require("passport");

//rutas
router.get("/", auth, front.index);

router.get("/login", notAuth, front.main);

router.post("/login", notAuth, front.login);

router.get("/logout", auth, front.logout);

router.get("/exit", auth, front.exit);

router.get("/register", notAuth, front.regForm)

router.post("/register", notAuth, front.register)

function auth(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next();
  }
  ctx.redirect("/login");
}

function notAuth(ctx, next) {
  if (ctx.isAuthenticated()) {
    return ctx.redirect("/");
  }
  return next();
}

module.exports = router;
