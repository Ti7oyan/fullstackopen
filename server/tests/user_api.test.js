const bcrypt = require('bcrypt');
const api = require('supertest').agent(require('../app'));
const mongoose = require('mongoose');
const User = require('../models/user');
const { usersInDb, contentType, applicationJson } = require('./test_helper');

describe('When there is initially a user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('rootpassword', 10);
    const user = new User({ userName: 'root', name: 'root', passwordHash });
    await user.save();
  });

  test('A fresh user can be created', async () => {
    const usersAtStart = await usersInDb();

    const user = {
      userName: 'FreshUser202',
      name: 'Fresh User',
      password: 'freshUserPassword',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect(contentType, applicationJson);

    const actualUsers = await usersInDb();

    expect(actualUsers.length).toBeGreaterThan(usersAtStart.length);
  });

  test('If tries to create a user with a taken username, fail with proper status code', async () => {
    const user = {
      userName: 'root',
      name: 'George Lucas',
      password: 'notThatFresh2023',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(400);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
