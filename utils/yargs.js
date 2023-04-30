//variables de entorno
require("dotenv").config();
const yargs = require("yargs/yargs")(process.argv.slice(2));

//Uso de Yargs para determinar variables de ejecución de servidor
const { PORT, mode, DAO } = yargs
  .alias({
    p: "PORT",
    m: "mode",
    d: "DAO"
  })
  .default({
    PORT: process.env.PORT || 8080,
    mode: "FORK",
    DAO: process.env.DAO || "productMongo"
  }).argv;

  module.exports = {PORT, mode, DAO}