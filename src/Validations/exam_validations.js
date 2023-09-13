const Joi = require("joi");

class Examvalidation {
  static register({start_exam,group_name,pass_exam_score,end_exam}) {
    const {error} = Joi.object({
      start_exam: Joi.string().required(),
      group_name: Joi.string().required(),
      pass_exam_score: Joi.number().required(),
      end_exam: Joi.string().required(),
    }).validate({start_exam,group_name,pass_exam_score,end_exam});

    if (error) {
      return error;
    } else {
      return false;
    }
  }
}

module.exports = Examvalidation;