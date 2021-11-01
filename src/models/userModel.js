const md5 = require('crypto-js/md5');

const mongoConnection = require('./connection');

const getConnectionWithCollection = async () => {
  const connnectionWithCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  return connnectionWithCollection;
};

const create = async ({ name, email, password }) => {
  const collection = await getConnectionWithCollection();
  const { insertedId: id } = await collection
    .insertOne({ name, email, password: md5(password).toString() });

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
