const getDateFormated = require('../helpers/getDateFormated');
const toDoModel = require('../models/toDoModel');
const isValid = require('../helpers/validateFields');
const CustomError = require('../helpers/CustomError');

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

const remove = async (id, user) => {
  const toDo = await toDoModel.findById(id);
  if (!toDo) throw new CustomError('Not exist this to-do');
  if (toDo.userId !== user.id) {
    throw new CustomError('You not have authorization to remove this to-do', 401);
  }

  const isRemoved = await toDoModel.remove(id);
  return isRemoved;
};

module.exports = {
  create,
  findAll,
  remove,
};
