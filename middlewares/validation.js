const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const urlRegExp = /^(https?:\/{2})(w{3})?([\w\-]+)(\.[\w\-]+)(\/[\w\-\.\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+)?/;

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegExp),
    trailerLink: Joi.string().required().pattern(urlRegExp),
    thumbnail: Joi.string().required().pattern(urlRegExp),
    owner: Joi.string().alphanum().length(24).hex(),
    movieId: Joi.string().alphanum().length(24).hex(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  loginValidation,
  userValidation,
  userProfileValidation,
  idValidation,
  movieValidation,
};
