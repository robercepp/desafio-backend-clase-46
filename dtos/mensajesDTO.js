//normalizr
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema;

module.exports = class ChatsDto {
  constructor(data) {
    this.data = data;
  }
  async readData() {
    //normalización de datos
    const author = new schema.Entity(
      "authors",
      {},
      {
        idAttribute: "id",
      }
    );
    const mensaje = new schema.Entity("mensajes", {
      author: author,
    });
    const chat = new schema.Entity("chat", {
      mensajes: [mensaje],
    });
    const normalizedData = normalize(this.data[0], chat);
    const normalizedDataJSON = JSON.stringify(normalizedData);
    return normalizedDataJSON;
  }
};
