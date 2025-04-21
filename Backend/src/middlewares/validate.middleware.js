const { BadRequestError } = require('../utils/error.utils');
const {badRequest} = require('../utils/response.utils')

const validate = (schema) => async (req, res, next) => { 
    try{
        await schema.validate({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        next();
    } catch(err){
        next(err);
    }
};

module.exports = validate;