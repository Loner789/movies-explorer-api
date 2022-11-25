const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const AuthError = require('../errors/AuthError');

const { Schema } = mongoose;

const userSchema = new Schema({
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
      message: 'Некорректный email.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new AuthError('Передан неверный email или пароль.');

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new AuthError('Передан неверный email или пароль.');

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
