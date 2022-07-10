require('express-async-errors');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');

// Routers
const usersRouter = require('./controllers/user');
const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');

const app = express();

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Conected to MongoDB'))
  .catch((error) => logger.error('There was an error:', error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
