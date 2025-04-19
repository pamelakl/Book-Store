const { SuccessResponse, ErrorResponse } = require("../models/response.model");

const ok = (res, data, message) => {
    res.send(new SuccessResponse(true, 200, "OK", data, message));
}

const created = (res, data, message) => {
    typeof(data);
    res.status(201).send(new SuccessResponse(true, 201, 'Created', data, message))
}

const badRequest = (res) => {
    res.status(400).send(new ErrorResponse(false, 400, 'Bad request'));
}

const notFound = (res, message) => {
    res.status(404).send(new ErrorResponse(false, 404, 'Not found', message));
}

const limit = (res, message) => {
    res.status(404).send(new ErrorResponse(false, 404, 'Not found', message));
}

const internalServerError = (res, message) => {
    res.status(500).send(new ErrorResponse(false, 500, 'Internal Server Error', message));
}

module.exports = {
    ok,
    created,
    badRequest,
    notFound,
    internalServerError
};