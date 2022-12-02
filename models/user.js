const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const AuthError = require('../errors/AuthError');
const { LOGIN_ERROR_MESSAGE, WRONG_EMAIL_MESSAGE } = require('../utils/constants');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => isEmail(email),
        message: WRONG_EMAIL_MESSAGE,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new AuthError(LOGIN_ERROR_MESSAGE);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new AuthError(LOGIN_ERROR_MESSAGE);

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
