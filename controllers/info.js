//info.js
//librerías
const logger = require("../utils/logger.js");

async function getInfo(ctx, next) {
    logger.info(`ruta: '${ctx.url}' - método: get peticionada`);
    await ctx.render('info', {titulo: "Info del Proceso"})
}

module.exports = {
    getInfo
}