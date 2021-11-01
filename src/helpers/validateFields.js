const Joi = require('joi');
const CustomError = require('./CustomError');

const newUser = (user) => {
  const { error } = Joi.object({
    name: Joi.string().min(3).not().empty()
      .required(),
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().length(6).not().empty()
      .required(),
  }).validate(user);

  if (error) throw new CustomError(error.message, 400);
};

module.exports = {
  newUser,
};