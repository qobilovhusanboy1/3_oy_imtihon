const {Schema, model} = require("mongoose");


const Exam = new Schema(
  {
    group_name:{
      type: String,
      allowNull: false,
      unique: true,
    },
    pass_exam_score:{
      type: Number,
      allowNull: false
    },
    end_exam:{
      type: String,
      default:false
    },
    finished_exam:{
      type: Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
)

module.exports = model("imtihon", Exam);