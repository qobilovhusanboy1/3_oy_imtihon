const CustomError = require("../utils/custom_errror");
const { sign,verify } = require("../utils/jwt");
const Admin = require("../model/admin_table")
const adminsValidation = require("../Validations/admin_validations")

const register = async(req,res)=>{
    try {
        const {username,password} = req.body

        const error = adminsValidation.register({username,password})

        if(error) throw new CustomError(404,error.message)

        const data = await Admin.create({username,password})

        const token = sign({password:password});

        return res.status(200).json({message:"Success Admin ",data:data,token:token})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}



const login  = async(req, res, next) => {
    try {
        const {username, password}= req.body;

        const {error} = adminsValidation.register({username,password})
        if(error) throw new CustomError(404,error.message)

        const data = await Admin.findOne({username:username,password:password})
        if (!data.username) throw new CustomError(401, "username  or password incorrect")

        const token = sign({password:password});

        res.status(200).send({message: "Success", token: token})
    } catch (error) {
        next(error);
    }
}
module.exports = {register,login};