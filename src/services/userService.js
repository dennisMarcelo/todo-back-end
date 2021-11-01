const md5 = require('crypto-js/md5');
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

const login = async (user) => {
  // validations
  isValid.login(user);
  const userExist = await userModel.findByEmail(user.email);
  if (!userExist) throw new CustomError('incorrect password or email address', 403);
  if (userExist.email !== user.email || userExist.password !== md5(user.password).toString()) {
    throw new CustomError('incorrect password or email address', 403);
  }

  const { _id, name, email } = userExist;
  const token = tokenGenerator({ _id, name, email });

  return token;
};

module.exports = {
  create,
  login,
};
