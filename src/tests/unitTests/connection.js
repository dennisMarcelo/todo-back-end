// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

const DBServer = new MongoMemoryServer();
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getConnection = async () => {
  const URLmock = await DBServer.getUri();
  return MongoClient.connect(URLmock, OPTIONS);
};

module.exports = { getConnection };
