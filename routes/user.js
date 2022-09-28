const userRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/user');

userRouter.get('/me', getUser);
userRouter.patch('/me', updateUser);

module.exports = userRouter;
