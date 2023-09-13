const CustomError = require('../utils/custom_errror');
const jwt = require('../utils/jwt');

const isAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log(new Date());

        if (!token) { throw new CustomError('Invalid token', 401) };
        jwt.verify(token, (err, result) => {
            if (err) return res.status(401).json({message:"Invalid Token"})
            req.verify = result
            next();
        });
    } catch (error) {
        next(error);
    }
}

module.exports = isAuth;