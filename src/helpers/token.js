const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = (user) => {
  if (typeof user !== 'object') {
    throw new Error('The parameter must be a object.');
  }

  const secretKey = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  return jwt.sign(user, secretKey, jwtConfig);
};

module.exports = {
  tokenGenerator,
};
