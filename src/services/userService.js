const isValid = require('../helpers/validateFields');
const { tokenGenerator } = require('../helpers/token');

const userModel = require('../models/userModel');
const CustomError = require('../helpers/CustomError');

const create = async (newUser) => {
  isValid.newUser(newUser);
  const userExist = await userModel.findByEmail(newUser.email);
  if (userExist) throw new CustomError('Email already registered', 409);

  const id = await userModel.create(newUser);
  const { name, email } = newUser;

  const token = tokenGenerator({ id, name, email });

  return token;
};

module.exports = {
  create,
};
