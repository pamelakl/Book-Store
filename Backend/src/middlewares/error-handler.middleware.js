const { response } = require('../app');
const {internalServerError} = require('../utils/response.utils')

const errorHandler = (err, req, res, next) => {
    console.log("got to error handler")
    console.error("error was:" + err)
    console.error("stack trace:", err.stack);
    res.status(err.statusCode || 500).json({ error: err.message || "Internal Server Error"})
};
 
module.exports = errorHandler;