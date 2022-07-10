const bcrypt = require('bcrypt');
const { isEmpty } = require('lodash');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const sameusername = await User.findOne({ username });
  if (username.length < 3) return response.status(400).json({ error: 'username has to have at least three characters.' });
  if (password.length < 3) return response.status(400).json({ error: 'Password has to have at least three characters.' });
  if (!isEmpty(sameusername)) return response.status(400).json({ error: 'username already exists in database.' });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.json(savedUser);
});

usersRouter.get('/', async (request, response) => response.json(await User.find({}).populate('blogs')));

module.exports = usersRouter;
