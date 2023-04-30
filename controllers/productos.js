const logger = require("../utils/logger.js");
const { fork } = require("child_process");
const { productDao, randomProducts } = require("../repository/Factory.js");

//productos

async function listAll() {
  const resultado = await productDao.listAll();
  return resultado;
}

async function saveProd(data){
  const resultado = await productDao.save(data)
  return resultado;
}

async function listAllProducts(ctx) {
  logger.info(`ruta: '${ctx.url}' - método: get peticionada`);
  const resultado = await productDao.listAll();
  ctx.body = resultado;
}

async function listProductById(ctx) {
  logger.info(`ruta: '${ctx.url}' - método: get peticionada`);
  const { id } = ctx.params;
  const resultado = await productDao.listById(parseInt(id));
  ctx.body = resultado;
}

async function createProduct(ctx) {
  logger.info(`ruta: '${ctx.url}' - método: post peticionada`);
  const resultado = await productDao.save(ctx.request.body);
  ctx.body = resultado;
}

async function modifyProduct(ctx) {
  logger.info(`ruta: '${ctx.url}' - método: put peticionada`);
  const { id } = ctx.params;
  const resultado = await productDao.modify(ctx.request.body, id);
  ctx.body = resultado;
}

async function deleteProduct(ctx) {
  logger.info(`ruta: '${ctx.url}' - método: delete peticionada`);
  const { id } = ctx.params;
  const resultado = await productDao.delete(id);
  ctx.body = resultado;
}

function randomChild(child, cant) {
    child.send(parseInt(cant));
    return new Promise((resolve, reject) => {
      child.on('message', (res) => {
        resolve(res);
      });
      child.on('error', (err) => {
        reject(err);
      });
    });
  }

async function randoms(ctx, next) {
  logger.info(`ruta: '${ctx.url}' - método: GET peticionada`);
  const child = fork("./numsAleatorios.js");
  const {cant} = ctx.request.query
  const resultado = await randomChild(child, cant)
  await ctx.render('randoms', {titulo: 'Números Aleatorios', resultado})
  await next()
}

async function randomizeProducts(cant) {
  if (isNaN(cant)) {
    const resultado = await randomProducts.random(5);
    return resultado;
  } else {
    const resultado = await randomProducts.random(cant);
    return resultado;
  }
}

async function randomTests(ctx, next) {
logger.info(`ruta: '${ctx.url}' - método: GET peticionada`);
const {cant} = ctx.request.query
const lista = await randomizeProducts(parseInt(cant))
await ctx.render('test', {titulo: 'Pruebas de Productos aleatorios', lista})
await next()
}

module.exports = {
  listAll,
  saveProd,
  listAllProducts,
  listProductById,
  createProduct,
  modifyProduct,
  deleteProduct,
  randoms,
  randomTests
};
