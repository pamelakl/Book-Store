class Response {
    constructor(isSuccess, status, statusText) {
        this.isSuccess = isSuccess;
        this.status = status;
        this.statusText = statusText;
    }
}

class SuccessResponse extends Response {
    constructor(isSuccess, status, statusText, data, message) {
        super(isSuccess, status, statusText);

        this.data = data;
        this.message = message;
    }
}

class ErrorResponse extends Response {
    constructor(isSuccess, status, statusText){
        super(isSuccess, status, statusText);
    }
}

module.exports = {
    Response,
    SuccessResponse,
    ErrorResponse
}