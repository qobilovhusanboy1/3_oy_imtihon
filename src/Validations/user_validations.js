const Joi = require("joi");

class Uservalidation {
  static register({firstname,lastname,group_name,exam_file,finish_exam}) {
    const {error} = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      group_name: Joi.string().required(),
      exam_file: Joi.string().required(),
      finish_exam: Joi.string().required(),
    }).validate({firstname,lastname,group_name,exam_file,finish_exam});

    if (error) {
      return error;
    } else {
      return false;
    }
  }
}

module.exports = Uservalidation;
