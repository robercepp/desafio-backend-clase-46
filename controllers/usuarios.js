const { userDao } = require("../repository/Factory.js");

//usuarios

async function listAllUsers() {
  const resultado = await userDao.listAll();
  return resultado;
}

async function createUser(user) {
  const resultado = await userDao.save(user);
  return resultado;
}

async function findUser(email) {
  const resultado = await userDao.find(email);
  return resultado;
}

async function findUserById(id) {
  const resultado = await userDao.findById(id)
  return resultado
}

module.exports = { listAllUsers, createUser, findUser, findUserById };
