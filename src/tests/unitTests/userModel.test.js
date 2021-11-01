const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MD5 } = require('crypto-js');
require('dotenv').config();

const { getConnection } = require('./connection');
const userModel = require('../../models/userModel');
const { DB_NAME } = process.env;

const userId = '614bf57bb41a7734551f85c1';
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

  afterEach(async () => {
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

  describe('findByEmail function', () => {
    before(async ()=>{
      await connection.db(DB_NAME).collection('users')
        .insertOne({
          _id: userId,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password
        });
    });

    it('return user object with correct information', async () => {
      const user = await userModel.findByEmail(newUser.email)

      expect(user).to.be.a('object');
      expect(user).to.have.property('_id').equal(userId);
      expect(user).to.have.property('name').equal(newUser.name);
      expect(user).to.have.property('email').equal(newUser.email);
      expect(user).to.have.property('password').equal(newUser.password);
    });
  });
});
