const express = require('express');
const app = require('../app')
const auth = require('../middlewares/auth.middleware');

const booksController = require('../controlllers/books.controller')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


const booksRouter = express.Router();

booksRouter.get('/books/cart', auth, booksController.getBooksInCart);

booksRouter.post('/books/cart', auth,  booksController.addBookToCart);

booksRouter.delete('/books/cart', auth, booksController.deleteBookFromCart); 

booksRouter.get('/books', booksController.getBooks);

booksRouter.get('/books/:id', booksController.getBook);

booksRouter.post('/books', auth, upload.single('cover'), booksController.addBook)

booksRouter.delete('/books/:id', auth ,booksController.deleteBook);

booksRouter.patch('/books/:id',auth, booksController.changeBookInfo);

booksRouter.delete('/books', auth ,booksController.emptyCart);



module.exports = booksRouter;