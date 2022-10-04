const movieRouter = require('express').Router();

const {
  getUserMovies,
  saveMovie,
  removeMovie,
} = require('../controllers/movie');

const {
  createMovieValidity,
  removeMovieValidity,
} = require('../middlewares/validity');

movieRouter.get('', getUserMovies);
movieRouter.post('', createMovieValidity, saveMovie);
movieRouter.delete('/:movieId', removeMovieValidity, removeMovie);

module.exports = movieRouter;
