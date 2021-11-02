const getDateFormated = require('../helpers/getDateFormated');
const toDoModel = require('../models/toDoModel');
const isValid = require('../helpers/validateFields');

const create = async (newToDo, user) => {
  isValid.newToDo(newToDo);
  const { userId } = user;
  const toDo = await toDoModel.create({ ...newToDo, userId, creationDate: getDateFormated() });

  return toDo;
};

const findAll = async (userId) => {
  const toDos = await toDoModel.findAll(userId);

  return toDos;
};

module.exports = {
  create,
  findAll,
};
