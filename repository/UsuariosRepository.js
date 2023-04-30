const userHandler = require("../daos/UsuariosDaoDB.js");
const usuario = require("../models/usuario.js");

module.exports = class UsuariosRepository extends userHandler {
  constructor() {
    super(usuario);
  }
  async listAll() {
    const data = await this.getAll();
    return data;
  }

  async save(user) {
    const data = await this.saveUser(user);
    return data;
  }

  async find(email) {
    const data = await this.findUserByMail(email);
    return data;
  }

  async findById(id) {
    const data = await this.findUserById(id);
    return data;
  }
};
