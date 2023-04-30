const logger = require("../utils/logger.js");

module.exports = class ProductosDaoDb {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const data = await this.model.find({});
      return data;
    } catch (error) {
      logger.error(error);
    }
  }

  async getById(id) {
    try {
      const data = await this.model.find({ id: id });
      if (data.length == 0) {
        return { error: "elemento no encontrado" };
      } else {
        return data[0];
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async saveItem(object) {
    try {
      const data = await this.model.find({});
      const ids = data.map((producto) => producto.id);
      const idMaximo = Math.max(...ids);
      if (idMaximo == -Infinity) {
        object.id = 1;
        object.timestamp = Date.now();
        await this.model.create(object);
        return null;
      } else {
        object.id = idMaximo + 1;
        object.timestamp = Date.now();
        await this.model.create(object);
        return object;
      }
    } catch (error) {
      logger.error("error!: ", error);
    }
  }

  async updateItem(object, id) {
    try {
      const data = await this.model.find({ id: id });
      if (data.length == 0) {
        return { error: "producto no encontrado" };
      } else if (!object.nombre) {
        return { error: "atención, no se ha introducido un nombre" };
      } else if (!object.precio) {
        return { error: "atención, no se ha introducido un precio" };
      } else if (!object.thumbnail) {
        return { error: "atención, no se ha introducido un thumbnail" };
      } else {
        object.id = id;
        object.timestamp = data.timestamp;
        await this.model.updateOne(
          { id: id },
          {
            $set: {
              nombre: object.nombre,
              precio: object.precio,
              thumbnail: object.thumbnail,
            },
          }
        );
      }
    } catch (error) {
      logger.error("error!: ", error);
    }
  }

  async deleteById(id) {
    try {
      const data = await this.model.find({ id: id });
      if (data.length == 0) {
        return { error: "producto no encontrado" };
      } else {
        await this.model.deleteOne({ id: id });
      }
    } catch (error) {
      logger.error("error!: ", error);
    }
  }
};
