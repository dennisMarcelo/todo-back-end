const Joi = require('joi');
const CustomError = require('./CustomError');

const newUser = (user) => {
  const { error } = Joi.object({
    name: Joi.string().min(3).not().empty()
      .required(),
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().min(6).not().empty()
      .required(),
  }).validate(user);

  if (error) throw new CustomError(error.message, 400);
};

const login = (user) => {
  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().min(6).not().empty()
      .required(),
  }).validate(user);

  if (error) throw new CustomError(error.message, 400);
};

const newToDo = (todo) => {
  const { error } = Joi.object({
    toDo: Joi.string().not().empty()
      .required(),
    toDoStatus: Joi.string().min(5).not().empty()
      .required(),
  }).validate(todo);

  if (error) throw new CustomError(error.message, 400);
};

const updatedToDo = (todo) => {
  const { error } = Joi.object({
    _id: Joi.string().length(24).not().empty()
      .required(),
    userId: Joi.string().length(24).not().empty()
      .required(),
    toDo: Joi.string().not().empty()
      .required(),
    toDoStatus: Joi.string().min(5).not().empty()
      .required(),
  }).validate(todo);

  if (error) throw new CustomError(error.message, 400);
};

module.exports = {
  newUser,
  login,
  newToDo,
  updatedToDo,
};
