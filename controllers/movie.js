const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send({ movie }))
    .catch(next);
};

const saveMovie = (req, res, next) => {
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
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound('Фильм не найден.');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movie.deleteOne(movie).then(() => {
          res.send({ movie });
        }).catch(next);
      } else {
        throw new Forbidden('Невозможно удалить фильм');
      }
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Фильм не найден.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserMovies,
  saveMovie,
  removeMovie,
};
