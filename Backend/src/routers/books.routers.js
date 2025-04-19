const express = require('express');
const app = require('../app')
const auth = require('../middlewares/auth.middleware');

const booksController = require('../controlllers/books.controller')

const booksRouter = express.Router();

booksRouter.get('/books', booksController.getBooks);

booksRouter.get('/books/:id', booksController.getBook);

booksRouter.post('/books', auth, booksController.addBook)

booksRouter.delete('/books/:id', auth ,booksController.deleteBook);

booksRouter.patch('/books/:id',auth, booksController.changeBookInfo);

module.exports = booksRouter;