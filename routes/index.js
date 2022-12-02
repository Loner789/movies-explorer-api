const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { WRONG_PATH_MESSAGE } = require('../utils/constants');
const { auth } = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const { loginValidation, userValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);
router.post('/signup', userValidation, createUser);
router.post('/signout', logout);

router.use(auth);
router.use(userRouter);
router.use(movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(WRONG_PATH_MESSAGE));
});

module.exports = router;
