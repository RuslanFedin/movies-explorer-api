const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');

const {
  login,
  createUser,
} = require('../controllers/user');

const {
  signInValidity,
  signUpValidity,
} = require('../middlewares/validity');

router.post('/signin', signInValidity, login);
router.post('/signup', signUpValidity, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
