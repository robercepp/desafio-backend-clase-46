const RandomProductsDao = require("../daos/RandomProducts");

module.exports = class RandomProducsRepository extends RandomProductsDao {
  
    async random(cant) {
    const data = await this.randomProducts(cant);
    return data;
  }
};
