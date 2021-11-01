const isValid = require('../helpers/validateFields');

const userModel = require('../models/userModel');

const create = async (newUser) => {
  isValid.newUser(newUser);
  const userRegistered = await userModel.create(newUser);

  return userRegistered;
};

module.exports = {
  create,
};
