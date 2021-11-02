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
  if (!toDo) throw new CustomError('Not exist this to-do', 404);
  if (toDo.userId !== user.userId) {
    throw new CustomError('You not have authorization to remove this to-do', 401);
  }

  const isRemoved = await toDoModel.remove(id);
  if (!isRemoved) throw new CustomError('Not removed', 500);

  return toDo;
};

const update = async (updatedToDo) => {
  isValid.updatedToDo(updatedToDo);
  await toDoModel.update(updatedToDo);

  return updatedToDo;
};

module.exports = {
  create,
  findAll,
  remove,
  update,
};
