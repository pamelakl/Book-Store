const { NotExistError, AlreadyExistsError, BadRequestError } = require('../utils/error.utils');
const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const Book = require('../models/book.model')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');
const booksService = require('../services/books.service');

const getUsers = () => {
    return users;
};

const getUser = async (id) => {
    const user = await User.findById(id);
    return user;
}

const getBooksInCart = async (userId) => {
    const user = await User.findById(userId).populate('books');
    const books = user.books;

    return books;
}

const changeAccountInfo = async (userId, newData) => {
    const user = await User.findById(userId);
    if(newData.password){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newData.password, salt);
    }
    else{
        user.email = newData.email;
    }
    
    await user.save();

    const retUser = {
        _id: userId,
        admin: user.admin
    }

    const token = jwt.sign({id: user._id}, config.get('jwtPrivateKey'));

    return {user: retUser, token};
}



const deleteBookFromCart = async (userId, bookId) => {
    const user = await getUser(userId);
    const book = await booksService.getBook(bookId);
    if(!user || !book){
        throw new NotExistError("info not found");
    }
    
    user.books = user.books.filter(b => !b.equals(bookId));

    await user.save();
}

const emptyCart = async (userId) => {
    const user = await getUser(userId);
    if (!user) {
        throw new NotExistError("user not found");
    }
    user.books = [];
    await user.save();
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
    login,
    changeAccountInfo,
    getBooksInCart,
    deleteBookFromCart,
    deleteAccount,
    emptyCart
}