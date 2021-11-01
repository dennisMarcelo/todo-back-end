const mongoConnection = require('./connection');

const getConnectionWithCollection = async () => {
  const connnectionWithCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('user'));

  return connnectionWithCollection;
};

const create = async ({ name, email, password }) => {
  const collection = await getConnectionWithCollection();
  const { insertedId: id } = await collection
    .insertOne({ name, email, password });

  return id;
};

const findByEmail = async (email) => {
  const collection = await getConnectionWithCollection();
  const user = await collection.findOne({ email });

  return user;
};

module.exports = {
  create,
  findByEmail,
};
