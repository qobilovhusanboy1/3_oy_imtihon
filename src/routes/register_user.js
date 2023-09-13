
const {register,getall_user,getUser} = require("../controllers/user_register");
const isadmin = require('../middlewares/isadmin')
const router = require("express").Router();

router.post("/register", register);
router.get("/getall_user",isadmin,getall_user)
router.get("/get_user",getUser)
module.exports = router;