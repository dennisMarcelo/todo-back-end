const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const userService = require('../services/userService');

router.post('/', rescue(async (req, res, next) => {
  const userRegistered = await userService.create(req.body);

  if (!userRegistered) return next({ message: 'User not registered, try again.' });

  res.status(201).json({ message: 'Success' });
}));

module.exports = router;
