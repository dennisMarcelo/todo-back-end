const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_DB_URL } = process.env;
const { DB_NAME } = process.env;

let schema = null;

async function getConnection() {
  if (schema) return Promise.resolve(schema);

  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { getConnection };
