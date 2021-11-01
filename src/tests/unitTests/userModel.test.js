const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MD5 } = require('crypto-js');
require('dotenv').config();

const { getConnection } = require('./connection');
const userModel = require('../../models/userModel');
const { DB_NAME } = process.env;

const newUser = { 
  name:"joãozinho", 
  email:"jzdofeijao@gmail.com", 
  password: MD5('senhaSecreta').toString() 
}

describe('userModel', () => {
  let connection = null;
  beforeEach(async() => {
    connection = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connection);
  })

  after(async () => {
    await connection.db(DB_NAME).collection('users').drop();
    MongoClient.connect.restore();
  })

  describe('create function', () => {
    it('return user id when create new user', async () => {
      const id = await userModel.create(newUser)
      
      expect(id).to.be.a('object')
      expect(id.toString()).to.have.length(24);
    });
  });
});
