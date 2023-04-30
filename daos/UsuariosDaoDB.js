const userModel = require("../models/usuario.js");
const bcript = require("bcryptjs");

module.exports = class UserHandler {
  constructor(url) {
    this.url = url;
  }

  async saveUser(user) {
    const findUser = await this.findUserByMail(user.email);
    if (findUser) {
      console.log("ya hay un usuario registrado");
      return null;
    } else {
      try {
        const newUser = new userModel({
          id: await this.getHighestId(),
          email: user.email,
          password: await bcript.hash(user.password, 10),
        });
        await newUser.save();
        return newUser;
      } catch (err) {
        logger.error(err);
        return null;
      }
    }
  }

  async findUserByMail(email) {
    const response = await userModel.findOne({ email: email });
    return response;
  }

  async findUserById(id) {
    const response = await userModel.findOne({ id: id });
    return response;
  }

  async getHighestId() {
    const data = await userModel.find({}, { id: 1, _id: 0 });
    if (data.length == 0) {
      return 1;
    } else {
      const highest = Math.max(...data.map((o) => o.id));
      const result = highest + 1;
      return result;
    }
  }
};
