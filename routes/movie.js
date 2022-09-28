const movieRouter = require('express').Router();

const {
  getUserMovies,
  saveMovie,
  removeMovie,
} = require('../controllers/movie');

movieRouter.get('', getUserMovies);
movieRouter.post('', saveMovie);
movieRouter.delete('/_id', removeMovie);

module.exports = movieRouter;
