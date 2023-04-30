const { faker } = require("@faker-js/faker");
faker.locale = "es";

module.exports = class RandomProducsDao {
  //randomizador de productos de prueba (faker)
  async randomProducts(cant) {
    let objetos = [];
    for (let i = 0; i < cant; i++) {
      let titulo = await faker.commerce.productName();
      let precio = (Math.floor(Math.random() * 15) + 5).toFixed(2);
      let imgUrl = await faker.image.technics(150, 150, true);
      objetos.push({ title: titulo, price: precio, thumbnail: imgUrl });
    }
    return objetos;
  }
};
