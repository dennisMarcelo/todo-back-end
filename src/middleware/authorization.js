const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'token is required' });

  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    const { userId, name, email } = decoded;

    req.user = { userId, name, email };
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  validateJWT,
};
