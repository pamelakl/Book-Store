const { NotExistError, AlreadyExistsError, BadRequestError } = require('../utils/error.utils');
const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const Book = require('../models/book.model')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');
const userService = require('../services/user.service');

const getBooks = async () => {
    const books = await Book.find();
    return books;
}

const changeBookInfo = async (bookId, newBookInfo) => {
    const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { $set: newBookInfo },
        { new: true, runValidators: true }
    );

    if (!updatedBook) {
        const error = new Error("Book not found");
        error.status = 404;
        throw error;
    }

    return {updatedBook};
}

const getBook = async (id) => {
    const book = await Book.findById(id);
    return book;
}

const addNewBook = async (title, author, price, cover, description) => {
    const newBook = new Book({
        title,
        author,
        price,
        cover,
        description
    });

    await newBook.save();
    console.log("Succesfully added new book to cart", newBook )
    return newBook;
}

const addBookToUser = async (userId, bookData) => {
    const user = await userService.getUser(userId);
    if (!user) {
        throw new NotExistError("user not found");
    }
    const book = await booksService.getBook(bookData.bookId);
    user.books = user.books ? [...user.books, book._id] : [book._id];
    await user.save();
}

const deleteBook = async (bookId) => {
    await Book.findByIdAndDelete(bookId);
    await User.updateMany(
        { books: bookId },  
        { $pull: { books: bookId } }  
    );
}

module.exports = {
    getBooks,
    getBook,
    addNewBook,
    deleteBook,
    changeBookInfo,
    addBookToUser
}
