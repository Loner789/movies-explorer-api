const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');
const { DEV_SECRET } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(UNAUTHORIZED_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    next(new AuthError(UNAUTHORIZED_MESSAGE));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
