require('dotenv/config')


const {env} = process;

const config = {
    port:env.PORT || 5000,
    db_url:env.DB_URL,
    jwt_secret:env.JWT_SECRET_KEY
}


module.exports = config