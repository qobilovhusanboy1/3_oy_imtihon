const Joi = require("joi");

class Adminvalidation {
  static register({username,password}) {
    const {error} = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }).validate({username,password});

    if (error) {
      return error;
    } else {
      return false;
    }
  }
}

module.exports = Adminvalidation;