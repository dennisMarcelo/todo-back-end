const express = require('express');
const rescue = require('express-rescue');
const { validateJWT } = require('../middleware/authorization');

const toDoService = require('../services/toDoService');

const router = express.Router();

router.post('/', validateJWT, rescue(async (req, res) => {
  const toDo = await toDoService.create(req.body, req.user);

  res.status(201).json({ message: 'ToDo created successfully', toDo });
}));

module.exports = router;
