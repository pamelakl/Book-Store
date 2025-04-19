const express = require('express');
const app = require('../app')

const validate = require('../middlewares/validate.middleware');
const auth = require('../middlewares/auth.middleware');
const {loginRequestSchema} = require('../schemas/login.schema')

const userController = require('../controlllers/user.controller')

const userRouter = express.Router();

userRouter.post('/users/login', validate(loginRequestSchema), userController.login);

userRouter.post('/users/signup', validate(loginRequestSchema) ,userController.createUser);

userRouter.post('/users/logout', auth, userController.logout);

userRouter.get('/users/:id', auth, userController.getBooksInCart)

userRouter.post('/users/:id', auth,  userController.addBookToCart);

userRouter.post('/users/updateInfo/:id', auth, userController.changeAccountInfo)

userRouter.delete('/users/:id', auth, userController.deleteBookFromCart); 

userRouter.delete('/users/accounts/:id', auth, userController.deleteAccount);

module.exports = userRouter;