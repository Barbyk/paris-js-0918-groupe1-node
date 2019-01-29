const expressJwt = require('express-jwt');
require('dotenv').config()

module.exports = jwt;

function jwt() {
    return expressJwt({
        secret:process.env.SECRET_KEY_JWT}).unless({
        path:  [/\/api\/public\//i]
    });
}