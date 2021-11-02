const { ObjectId } = require('mongodb');
const CustomError = require('../helpers/CustomError');
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

const findById = async (id) => {
  const collection = await getConnectionWithCollection();
  const toDo = await collection.findOne(ObjectId(id));

  return toDo;
};

const remove = async (id) => {
  const collection = await getConnectionWithCollection();
  const { deletedCount } = await collection.deleteOne({ _id: ObjectId(id) });

  if (deletedCount > 0) return true;

  return false;
};

const update = async ({ _id, toDo, toDoStatus }) => {
  const collection = await getConnectionWithCollection();
  const { modifiedCount } = await collection.updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        toDo,
        toDoStatus,
      },
    },
  );

  if (modifiedCount < 1) throw new CustomError('not updated', 500);
};

module.exports = {
  create,
  findAll,
  findById,
  remove,
  update,
};
