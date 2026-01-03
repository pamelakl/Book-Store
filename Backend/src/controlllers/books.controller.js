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
        const { title, author, price, description } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'No cover image uploaded' });
        }
        const cover = 'uploads/' + req.file.filename;
        const book = await apiService.addNewBook(title, author, price, cover, description);
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

const getBooksInCart = async(req, res, next) => {
    try{
        const userId = req.userId;
        const books = await apiService.getBooksInCart(userId);
        ok(res, books, "Got list of books on cart");
    } catch(err){
        next(err);
    }
}

const addBookToCart = async(req, res, next) => {
    try{
        const userId = req.userId;
        const bookData = req.body;
        
        await apiService.addBookToUser(userId, bookData);
        console.log("Successfully added book to cart", bookData)
        ok(res, bookData, "Book successfully assigned to user");

    } catch (error) {
      next(error)
    }
}

const deleteBookFromCart = async(req, res, next) => {
    try{

        const userId = req.userId;
        const bookId = req.body.bookId;

        await apiService.deleteBookFromCart(userId, bookId);

        ok(res, bookId, "Deleted book successfully");
    } catch(error) {
        next(error)
    }
}

const emptyCart = async(req, res, next) => {
    try{
        const userId = req.userId;

        await apiService.emptyCart(userId);

        ok(res, userId, "Emptied cart successfully");
    } catch(error) {
        next(error)
    }
 }
module.exports = {
    getBook,
    getBooks,
    addBook,
    deleteBook,
    changeBookInfo,
    addBookToCart,
    getBooksInCart,
    deleteBookFromCart,
    emptyCart
}