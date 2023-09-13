const config = require("config");
const jwt = require("jsonwebtoken");

const {env} = process
const secret= env.JWT_SECRET_KEY
const verify = (payload, callback) => jwt.verify(payload, secret, callback);
const sign = (payload) => jwt.sign(payload, secret, {expiresIn: "24h"});

module.exports = {
  verify,
  sign,
};