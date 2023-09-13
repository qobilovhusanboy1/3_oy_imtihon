const { register_exam,getall_exam,get_exam,check_exam} = require("../controllers/exam")
const router = require("express").Router();
const isadmin = require('../middlewares/isadmin')
router.post('/create_exam',isadmin,register_exam);
router.get('/getall_exam',isadmin,getall_exam);
router.get('/get_exam',isadmin,get_exam);
router.post('/check_exam',isadmin,check_exam);


module.exports = router;