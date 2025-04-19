const apiService = require('../services/api.service');

const SuccessResponse = require('../models/response.model');
const {ok, created, notFound, badRequest} = require('../utils/response.utils');

const getBook = async (req, res, next) => {
   try {
    const book = await apiService.getBook(req.params.id);
    ok(res, {book}, 'Retrieved book successfuly');
   } catch (err) {
    next(err)
   }
}

const addBook = async (req, res, next) => {
    try{
        const { bookId, title, author, price, cover, description } = req.body;
        const book = await apiService.addNewBook(bookId, title, author, price, cover, description);
        ok(res, {book}, 'Added book')
    } catch(err){
        next(err);
    }
}

const getBooks = async (req, res, next) => {
   try {
    const books = await apiService.getBooks();
    ok(res, {books}, 'Retrieved books successfuly');
   } catch (err) {
    next(err)
   }
}

const deleteBook = async (req, res, next) => {
    try{
        const bookId = req.params.id;
        const book = await apiService.deleteBook(bookId);
        ok(res, {book}, "deleted book successfully");
    } catch(err) {
        next(err);
    }
}

const changeBookInfo = async (req, res, next) => {
    try{
        const bookId = req.params.id;
        const newBookInfo = req.body;
        const book = await apiService.changeBookInfo(bookId, newBookInfo);

        ok(res, {book}, "Updated book succesfully");
    }catch(err){
        next(err);
    }
}

module.exports = {
    getBook,
    getBooks,
    addBook,
    deleteBook,
    changeBookInfo
}