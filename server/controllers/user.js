const bcrypt = require('bcrypt');
const { isEmpty } = require('lodash');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { userName, name, password } = request.body;

  const sameUserName = await User.findOne({ userName });
  if (!isEmpty(sameUserName)) return response.status(400).end();

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    userName,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.json(savedUser);
});

usersRouter.get('/', async (request, response) => response.json(await User.find({}).populate('blogs')));

module.exports = usersRouter;
