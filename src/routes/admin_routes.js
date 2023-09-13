
const {register,login} = require('../controllers/admin_controllers')
const router = require('express').Router();

router.post('/admin',register)
router.post('/login',login)


module.exports = router