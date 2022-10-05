const userRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/user');

const {
  updateUserValidity,
} = require('../middlewares/validity');

userRouter.get('/me', getUser);
userRouter.patch('/me', updateUserValidity, updateUser);

module.exports = userRouter;
