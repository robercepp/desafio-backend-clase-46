require("dotenv").config();
const fs = require("fs");
const { fileChecker } = require("../utils/fileChecker.js");
const logger = require("../utils/logger.js");
//util
const util = require("util");

module.exports = class ChatDaoDb {
  constructor(file) {
    this.file = file || process.env.CHATFILE;
  }
  async getAll() {
    await fileChecker();
    try {
      const datos = await fs.promises.readFile("./DB/chats.txt", "utf-8");
      const data = JSON.parse(datos);
      return data;
    } catch (error) {
      logger.error("error!: ", error);
    }
  }
  print(objeto) {
    console.log(util.inspect(objeto, true, 12, true));
  }
  
  async saveItem(object) {
    await fileChecker();
    try {
      const datos = await fs.promises.readFile("./DB/chats.txt", "utf-8");
      const data = JSON.parse(datos);
      const ids = data[0].mensajes.map((mensajes) => mensajes.id);
      const idMaximo = Math.max(...ids);
      object.id = idMaximo + 1;
      data[0].mensajes.push(object);
      await fs.promises.writeFile(
        "./DB/chats.txt",
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      logger.error("error!: ", error);
    }
  }
};
