const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = (userOfDatabase) => {
  if (typeof userOfDatabase !== 'object') {
    throw new Error('The parameter must be a object.');
  }

  const secretKey = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  return jwt.sign(userOfDatabase, secretKey, jwtConfig);
};

module.exports = {
  tokenGenerator,
};
