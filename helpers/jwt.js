const {expressjwt: jwt} = require('express-jwt');

function authJwt(){
    const secret =process.env.secret;
    return jwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path : ['/api/v1/users/login']
    })
}

module.exports = authJwt;