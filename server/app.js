require('express-async-errors');
const express = require('express');
const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Conected to MongoDB'))
  .catch((error) => logger.error('There was an error:', error.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
