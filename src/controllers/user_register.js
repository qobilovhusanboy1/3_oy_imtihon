
const Uservalidation = require('../Validations/user_validations')
const User = require('../model/users_table')
const CustomError = require('../utils/custom_errror')
const Exam = require('../model/exam_table')
const {v4} = require("uuid");
const {extname} = require("path");

const register = async(req,res)=>{

    try {
        const {firstname,lastname,group_name} = req.body
        const {photo} = req.files;
    
        const imageName = `${v4()}${extname(photo.name)}`;
        photo.mv(`${process.cwd()}/uploads/${imageName}`);

        let finish_exam2 = new Date()
        let finish_exam = String(finish_exam2)

        const error = Uservalidation.register({firstname,lastname,group_name,exam_file:imageName,finish_exam})
        if (error) throw new CustomError(400, error.message);

        const group = await Exam.findOne({group_name:group_name})
        if (!group) return res .status(400).json({message:"Group not found"})
        if(group.finished_exam==true) return res.status(400).json({message:"Exam already Finished"})

        let newdate= new Date()
        let arr = group.end_exam.split('-')

        if((arr[0]-newdate.getFullYear())==0){
            if(arr[1]==newdate.getMonth()+1){
                if(arr[2]==newdate.getDate()){
                    let time = arr[3]
                    let hour= time.split(':')
                    if(hour[0]==newdate.getHours()){
                        if(hour[1]==newdate.getMinutes()){
                            await Exam.updateOne({group_name:group_name},{finished_exam: true})
                            return res.status(400).json({message:"Exam already Finished"})
                        }
                    }else if(hour[0]<newdate.getHours()){
                        await Exam.updateOne({group_name:group_name},{finished_exam: true})
                         return res.status(400).json({message:"Exam already Finished"})
                    }
                }else if (arr[2]<newdate.getDate()) {
                    await Exam.updateOne({group_name:group_name},{finished_exam: true})
                    return res.status(400).json({message:"Exam already Finished"})
                }
            }else if (arr[1]<newdate.getMonth()+1){
                await Exam.updateOne({group_name:group_name},{finished_exam: true})
                return res.status(400).json({message:"Exam already Finished"})
            }
        }else if(arr[0]<newdate.getFullYear()){
            await Exam.updateOne({group_name:group_name},{finished_exam: true})
            return res.status(400).json({message:"Exam already Finished"})
        }

        const data =  await User.create({firstname,lastname,group_name,exam_file:imageName,finish_exam});    


        return res.status(201).json({message:"Successfully User",data:data})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const getall_user = async(req,res)=>{
    try {
        const data = await User.find({})
        return res.status(200).json({message:"User get",data:data})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}





const getUser = async(req, res) =>{
    try {
        const {firstname,lastname,group_name} = req.body

        if(!firstname || !group_name || !lastname) return res.status(401).json({message:"Invalid fistname,lastname or group name"})

        const data  = await User.findOne({firstname:firstname,group_name:group_name,lastname:lastname})
        if (!data) return res.status(402).json({message:"User not found"})

        if (data.exam_score=="no check") return res.status(403).json({message:"Exam no checked"});

        const exam_info = await Exam.findOne({group_name:group_name})
        if(!exam_info) return res.status(403).json({message:"Exam not found"})

        if(data.exam_score >= exam_info.pass_exam_score){
            await User.updateOne({firstname:firstname,lastname:lastname,group_name:group_name},{status:true})
            const newdata = await User.findOne({firstname:firstname,lastname:lastname,group_name:group_name})
            return res.status(403).json({message:"You passed the exam",data:newdata})
        }else{
            const newdata = await User.findOne({firstname:firstname,lastname:lastname,group_name:group_name})
            return res.status(403).json({message:"You failed the exam",data:newdata})
        }
        

    } catch (error) {
        return res.status(401).json({message:error.message});
    }
}

module.exports = {register,getall_user,getUser}