const Joi = require("joi");

class Checkvalidation {
  static register({firstname,lastname,group_name,exam_score}) {
    const {error} = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      group_name: Joi.string().required(),
      exam_score: Joi.string().required()
    }).validate({firstname,lastname,group_name,exam_score});

    if (error) {
      return error;
    } else {
      return false;
    }
  }
}

module.exports = Checkvalidation;