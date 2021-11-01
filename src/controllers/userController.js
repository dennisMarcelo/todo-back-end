const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const userService = require('../services/userService');

router.post('/', rescue(async (req, res, next) => {
  const token = await userService.create(req.body);

  if (!token) return next({ message: 'User not registered, try again.' });

  res.status(201).json({ message: 'User registered successfully', token });
}));

router.post('/login', rescue(async (req, res) => {
  const token = await userService.login(req.body);

  res.status(201).json({ message: 'user authenticated', token });
}));

module.exports = router;
