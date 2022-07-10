const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { body } = request;
  const user = await User.findOne({ username: body.username });
  const passwordCorrect = user === null
    ? null
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(400).json({
      error: 'Invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
