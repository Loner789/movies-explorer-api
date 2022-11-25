const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate('user')
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) next(new BadRequestError('Ошибка валидации.'));
      else next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным _id не найден.');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(movieId).then((element) => res.send(element));
      } else {
        throw new ForbiddenError('Недостаточно прав для удаления фильма.');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) next(new BadRequestError('Некорректный _id фильма.'));
      else next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
