const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) next(new ConflictError('Пользователь с таким email уже существует.'));
      else if (err instanceof mongoose.Error.ValidationError) next(new BadRequestError('Ошибка валидации.'));
      else next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    })
    .then((newProfile) => res.send(newProfile))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) next(new BadRequestError('Ошибка валидации.'));
      else if (err instanceof mongoose.Error.CastError) next(new BadRequestError('Некорректный _id пользователя.'));
      else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: 'true',
        sameSite: 'none',
      })
        .send({ message: 'Авторизация прошла успешно!', jwt: token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt', { secure: 'true', sameSite: 'none' }).send();
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUserProfile,
  login,
  logout,
};
