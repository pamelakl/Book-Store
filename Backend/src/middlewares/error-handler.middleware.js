

const errorHandler = (err, req, res) => {
    console.error("error was:" + err)
    console.error("stack trace:", err.stack);
    res.status(err.statusCode || 500).json({ error: err.message || "Internal Server Error"})
};
 
module.exports = errorHandler;