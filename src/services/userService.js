const isValid = require('../helpers/validateFields');
const { tokenGenerator } = require('../helpers/token');

const userModel = require('../models/userModel');

const create = async (newUser) => {
  isValid.newUser(newUser);
  const id = await userModel.create(newUser);
  const { name, email } = newUser;

  const token = tokenGenerator({ id, name, email });

  return token;
};

module.exports = {
  create,
};
