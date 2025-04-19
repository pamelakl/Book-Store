class AlreadyExistsError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 409;
    }
}

class NotExistError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 404;
    }
}

class BadRequestError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 400
    }
}

module.exports = {
    AlreadyExistsError,
    NotExistError,
    BadRequestError
}