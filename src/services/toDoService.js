const getDateFormated = require('../helpers/getDateFormated');
const toDoModel = require('../models/toDoModel');

const create = async (newToDo, user) => {
  const { userId } = user;
  const toDo = await toDoModel.create({ ...newToDo, userId, creationDate: getDateFormated() });

  return toDo;
};

module.exports = {
  create,
};
