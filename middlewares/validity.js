const { Joi, celebrate, CelebrateError } = require('celebrate');
const validator = require('validator');

const ulrValidity = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError(`${value} 'Вы ввели не URL'`);
  }
  return value;
};

const signInValidity = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});

const signUpValidity = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
    name: Joi.string().min(2).max(30),
  }),
});

const updateUserValidity = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
});

const createMovieValidity = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(ulrValidity),
    trailerLink: Joi.string().required().custom(ulrValidity),
    thumbnail: Joi.string().required().custom(ulrValidity),
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const removeMovieValidity = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  signInValidity,
  signUpValidity,
  updateUserValidity,
  createMovieValidity,
  removeMovieValidity,
};
