//variables de entorno
require("dotenv").config();

// Librerías requeridas
const koa = require("koa");
const parser = require("koa-bodyparser");
const session = require("koa-session");
const sessionMongoose = require("koa-session-mongoose");
const views = require("koa-views");
const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const static = require("koa-static");
const Router = require("koa-router");
const override = require("koa-methodoverride");

const app = new koa();
const route = new Router();

//Librerías requeridas
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {});
require("./utils/socketService.js")(io);
const logger = require("./utils/logger.js");

const flash = require("koa-connect-flash");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

//sesiones
const cookieParser = require("koa-cookie").default;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const { PORT, mode, DAO } = require("./utils/yargs.js");

if (mode == "CLUSTER") {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    logger.info(`Proceso Maestro: ${process.pid}`);
    cluster.on("exit", (worker, code, signal) => {
      logger.info(`el worker ${worker.process.pid} se ha cerrado`);
    });
  } else {
    iniciarServidor();
  }
} else {
  iniciarServidor();
}

//servidor
function iniciarServidor() {
  mongoose
    .connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info(`Conexión con MongoDbAtlas exitosa`);
      return httpServer.listen(PORT, () => {
        logger.info(
          `Servidor Koa con WebSocket iniciado en modo ${mode} escuchando el puerto ${PORT} - Proceso N° ${process.pid} - DAO tipo: ${DAO}`
        );
      });
    });
}

//middlewares
app.use(views("./views", { map: { html: "nunjucks" } }));
app.use(cookieParser());
app.keys = [process.env.SESSION_SECRET];
app.use(
  session(
    {
      store: sessionMongoose.create({
        modelName: "sessions",
        expires: 86400,
      }),
    },
    app
  )
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(override("_method"));
app.use(parser());
app.use(route.routes());
app.use(static("./public"));

//passport
const { findUser, findUserById } = require("./controllers/usuarios.js");
const initializePassport = require("./config/passport.js");
initializePassport(
  passport,
  (email) => findUser(email),
  (id) => findUserById(id)
);

//implementación de rutas
let api = require("./routes/api.js");
let info = require("./routes/info.js");
let front = require("./routes/front.js");
app.use(api.routes());
app.use(info.routes());
app.use(front.routes());
