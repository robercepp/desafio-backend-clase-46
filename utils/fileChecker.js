const fs = require("fs");
const logger = require('../utils/logger.js')

async function fileChecker() {
  const fileStructure = `
        [
            {
                "id": "mensajes",
                "mensajes": [

                ]
            }
        ]
        `;
  if (!fs.existsSync("./DB/chats.txt")) {
    try {
      await fs.promises.writeFile("./DB/chats.txt", fileStructure);
    } catch (error) {
      logger.error("error!: ", error);
    }
  }
}

module.exports = { fileChecker };
