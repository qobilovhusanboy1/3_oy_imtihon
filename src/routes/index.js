const register = require('./register_user')
const exam = require('./exam_register')
const admin = require('./admin_routes')
module.exports = [register,exam,admin]