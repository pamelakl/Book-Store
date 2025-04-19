const {badRequest} = require('../utils/response.utils')
const jwt = require('jsonwebtoken');
const config = require('config');


const auth = async (req, res, next) => { 
    try{
        const token = req.headers.token;
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.userId = payload.id;
        next();
    } catch(err){
        console.log(err);
        next(err);
    }
};

module.exports = auth;