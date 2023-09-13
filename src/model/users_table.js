const {Schema, model} = require("mongoose");
const { text } = require("stream/consumers");

const Users = new Schema(
    { 
        firstname:{
            type:String, 
            allowNull:false
        },
        lastname:{
            type:String, 
            allowNull:false,
            unique:true
        },
        group_name:{
            type:String, 
            allowNull:false
        },
        exam_file:{
            type:String, 
            allowNull:false
        },
        exam_score:{
            type:String, 
            default:"no check",
        },
        finish_exam:{
            type:String, 
            allowNull:false
        },
        status:{
            type:Boolean,
            default:false
        }
    }
)

module.exports = model('foydalanuvchilar1',Users)
