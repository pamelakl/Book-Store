const { NotExistError, AlreadyExistsError, BadRequestError } = require('../utils/error.utils');
const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const Book = require('../models/book.model')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');

const getUsers = () => {
    return users;
};

const getUser = async (id) => {
    const user = await User.findById(id);
    console.log(user);
    return user;
}

const getBooks = async () => {
    const books = await Book.find();
   // console.log(heroes)
    return books;
}

const getBooksInCart = async (userId) => {
    const user = await User.findById(userId).populate('books');
    console.log("the user:" + user);
    const books = user.books;
    console.log("his books:" + books);

    return books;
}

const changeAccountInfo = async (userId, newData) => {
    const user = await User.findById(userId);
    console.log("new data:"+ JSON.stringify(newData, null, 2));
    if(newData.password){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newData.password, salt);
    }
    else{
        user.email = newData.email;
    }
    
    await user.save();

    const retUser = {
        _id: userId
    }
    return {user: retUser};
}

const changeBookInfo = async (bookId, newBookInfo) => {
    console.log(bookId)
    console.log("new info:", newBookInfo)
    const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { $set: newBookInfo },
        { new: true, runValidators: true }
    );
    console.log("updatedBook", updatedBook);

    if (!updatedBook) {
        const error = new Error("Book not found");
        error.status = 404;
        throw error;
    }

    return {updatedBook};
}

const addBookToUser = async (userId, bookData) => {
    const user = await getUser(userId);
    if (!user) {
        throw new NotExistError("user not found");
    }
    const book = await getBook(bookData.bookId);
    user.books = user.books ? [...user.books, book._id] : [book._id];
    await user.save();
}

const deleteBookFromCart = async (userId, bookId) => {
    const user = await getUser(userId);
    const book = await getBook(bookId);
    console.log("user", user);
    console.log("book", book)
    if(!user || !book){
        throw new NotExistError("info not found");
    }
  //  const bookObjectId = new mongoose.Types.ObjectId(bookId.toString());
    
    user.books = user.books.filter(b => !b.equals(bookId));

    await user.save();

}

const getBook = async (id) => {
    const book = await Book.findById(id);
    return book;
}

const addNewBook = async (bookId, title, author, price, cover, description) => {
    const newBook = new Book({
        bookId,
        title,
        author,
        price,
        cover,
        description
    });

    await newBook.save();
    return newBook;
}

const deleteBook = async (bookId) => {
    await Book.findByIdAndDelete(bookId);
    await User.updateMany(
        { books: bookId },  
        { $pull: { books: bookId } }  
    );
}

const createUser = async (userData) => {
    let user = await User.findOne({ email: userData.email });
    if (user) throw new AlreadyExistsError("User already exists");
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    if (!passwordRegex.test(userData.password)) {
        throw new BadRequestError("Password must be at least 8 characters long, include one uppercase letter, one digit, and one non-alphanumeric character.");
    }

    user = new User(userData);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = jwt.sign({id: user._id}, config.get('jwtPrivateKey'));

    return {user, token};
}

const login = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    console.log("found user:", user);
    if(!user) throw new NotExistError("Email or password is wrong")
    const match = await bcrypt.compare(userData.password, user.password); 
    if(match){ 
        const token = jwt.sign({id: user._id}, config.get('jwtPrivateKey'));
        const retUser = {
            _id: user._id,
            admin: user.admin
        }
        return {user: retUser, token};
    }
    throw new NotExistError("Email or password is wrong");
}

const deleteAccount = async (userId)=> {
    await User.deleteOne({_id: userId});
}

module.exports = {
    getUsers, 
    getUser,
    createUser,
    getBooks,
    getBook,
    login,
    changeAccountInfo,
    getBooksInCart,
    addBookToUser,
    deleteBookFromCart,
    addNewBook,
    deleteBook,
    changeBookInfo,
    deleteAccount
}