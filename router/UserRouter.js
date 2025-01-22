const express = require('express');
const { UserController } = require('../controllers/UserController');
const userController = new UserController();
const userRouter = express.Router();

userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:id', userController.getOneUser);
userRouter.patch('/users/:id', userController.patchUser);
userRouter.delete('/users/:id', userController.deleteUser);

module.exports = { userRouter };