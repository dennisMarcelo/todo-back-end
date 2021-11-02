const mongoConnection = require('./connection');

const getConnectionWithCollection = async () => {
  const connnectionWithCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('toDos'));

  return connnectionWithCollection;
};

const create = async ({ userId, toDo, toDoStatus, creationDate }) => {
  const collection = await getConnectionWithCollection();
  const { insertedId: id } = await collection
    .insertOne({ userId, toDo, toDoStatus, creationDate });

  return {
    id, userId, toDo, toDoStatus, creationDate,
  };
};

const findAll = async (userId) => {
  const collection = await getConnectionWithCollection();
  const toDos = await collection.find({}, { where: { userId } }).toArray();

  return toDos;
};

module.exports = {
  create,
  findAll,
};
