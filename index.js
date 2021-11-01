const express = require('express');
const cors = require('cors');
require('dotenv').config();

// controllers
const userController = require('./src/controllers/userController');

// Middlewares
const errorMiddleware = require('./src/middleware/error');

// config
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/user', userController);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('servidor online'));
