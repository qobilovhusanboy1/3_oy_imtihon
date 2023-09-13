const Checkvalidation = require('../Validations/exam_check');
const Examvalidation = require('../Validations/exam_validations');
const Exam = require('../model/exam_table');
const CustomError = require('../utils/custom_errror');
const User = require('../model/users_table')

const register_exam  = async(req,res)=>{

    try {
        const {group_name,pass_exam_score, end_exam} = req.body
        let start_exam = new Date()
        start_exam = String(start_exam)

        const error =Examvalidation.register({start_exam,group_name,pass_exam_score,end_exam});
        if (error) throw new CustomError(400, error.message);

        const data =  await Exam.create({start_exam,group_name,pass_exam_score,end_exam});    

        return res.status(201).json({message:"Successfully Exam created",data:data})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getall_exam = async(req,res)=>{
    try {
        const data = await Exam.find({})

        res.status(200).json({message:"Successfully",data:data})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const get_exam= async(req,res)=>{
    try {
        const {group_name} = req.body;

        if(!group_name) return res.status(500).json({message:"Invalid group name"})

        let data =  await Exam.findOne({group_name:group_name})
        if(!data) return res.status(500).json({message:"group not found"});

        return res.status(200).json({message:"success",data:data})

    } catch (error) {
        return res.status(500).json({message:"Invalid server error"});
    }
}

const check_exam = async(req,res)=>{
    try {
        const {firstname,lastname,group_name,exam_score} = req.body;

        const error = Checkvalidation.register({firstname,lastname,group_name,exam_score});
        if (error) throw new CustomError(400, error.message);


        const data = await User.updateOne({firstname,lastname,group_name},{exam_score:exam_score});
        
        return res.status(201).json({message: "Success", data: data});



    } catch (error) {
        return res.status(500).json({message:"Internal Server error"});
    }
}


module.exports ={register_exam,getall_exam,get_exam,check_exam}