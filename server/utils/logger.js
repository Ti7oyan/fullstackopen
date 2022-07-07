const consola = require('consola');

const info = (...params) => consola.info(...params);
const error = (...params) => consola.error(...params);

module.exports = {
  info, error,
};
