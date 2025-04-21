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

userRouter.post('/users/updateInfo', auth, userController.changeAccountInfo)

userRouter.delete('/users/accounts', auth, userController.deleteAccount);

module.exports = userRouter;