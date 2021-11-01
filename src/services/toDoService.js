const toDoModel = require('../models/toDoModel');

const create = async (newToDo, user) => {
  const { userId } = user;
  const toDo = await toDoModel.create({ ...newToDo, userId });

  return toDo;
};

module.exports = {
  create,
};
