//info.js
//librerías
const logger = require("../utils/logger.js");
const prod = require("../controllers/productos.js");
const { getAllChats } = require("../controllers/chat.js");
const passport = require("koa-passport");
const { listAllUsers, createUser, findUser } = require("./usuarios.js");

async function index(ctx, next) {
  logger.info(`ruta: '${ctx.url}' - método: get peticionada`);
  const email = ctx.state.user.email;
  const chats = await getAllChats();
  await ctx.render("main", {
    email: email,
    titulo: "Pagina principal",
  });
}

async function main(ctx, next) {
  logger.info(`ruta: '${ctx.url}' - método: get peticionada`);
  await ctx.render("login", { titulo: "Login de usuario" });
}

async function login(ctx, next) {
  return passport.authenticate("local", async (err, user, info, status) => {
    if (user) {
      await ctx.login(user);
      ctx.redirect("/");
    } else {
      ctx.body = info.message;
    }
  })(ctx, next);
}

async function regForm(ctx, next) {
  logger.info(`ruta: '${ctx.url}' - método: get peticionada`);
  await ctx.render("register", { titulo: "Registro de usuario nuevo" });
}

async function register(ctx, next) {
  logger.info(`ruta: '${ctx.url}' - método: post peticionada`);
  if ((await findUser(ctx.request.body.email)) !== null) {
    await ctx.render("register", {
      titulo: "Registro de usuario nuevo",
      error: "El usuario ya existe",
    });
  } else {
    try {
      createUser(ctx.request.body);
      ctx.redirect("/login");
    } catch (error) {
      logger.error(error);
      ctx.redirect("/register");
    }
  }
}

async function logout(ctx, next) {
  logger.info(`ruta: '${ctx.url}' - método: get peticionada`);
  const email = ctx.state.user.email;
  await ctx.render("logout", { usuario: email, titulo: "cierre de sesión" });
}

async function exit(ctx, next) {
  logger.info(`ruta: '${ctx.url}' - método: get peticionada`);
  ctx.logout(function (err) {
    if (err) {
      return next(err);
    }
    ctx.redirect("/login");
  });
}

module.exports = {
  main,
  index,
  login,
  logout,
  exit,
  register,
  regForm,
};
