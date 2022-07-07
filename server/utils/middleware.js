const consola = require('consola');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  const { method, path, body } = request;

  logger.info('Method:', method);
  logger.info('Path:', path);
  logger.info('Body:', body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => response.status(404).send({ error: 'Unknown endpoint' });

const errorHandler = (error, request, response, next) => {
  consola.error(error.message);

  switch (error.name) {
    case 'CastError':
      return response.status(400).json({ error: 'Malformatted ID' });
    case 'ValidationError':
      return response.status(400).json({ error: error.message });
    default:
      return next(error);
  }
};

module.exports = {
  requestLogger, unknownEndpoint, errorHandler,
};
