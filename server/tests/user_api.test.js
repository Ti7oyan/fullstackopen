const bcrypt = require('bcrypt');
const api = require('supertest').agent(require('../app'));
const mongoose = require('mongoose');
const User = require('../models/user');
const { usersInDb, contentType, applicationJson } = require('./test_helper');

describe('When there is initially a user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('rootpassword', 10);
    const user = new User({ username: 'root', name: 'root', passwordHash });
    await user.save();
  });

  test('A fresh user can be created', async () => {
    const usersAtStart = await usersInDb();

    const user = {
      username: 'FreshUser202',
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

  describe('Registration requisites:', () => {
    test('If tries to create a user with a taken username, fail with proper status code', async () => {
      const user = {
        username: 'root',
        name: 'George Lucas',
        password: 'notThatFresh2023',
      };

      await api
        .post('/api/users')
        .send(user)
        .expect(400);
    });

    test('If tries to create a user with a password with less than 3 characters, fail with proper status code', async () => {
      const user = {
        username: 'George',
        password: '21',
      };

      await api
        .post('/api/users')
        .send(user)
        .expect(400);
    });

    test('If tries to create a user with a password with less than 3 characters, fail with proper status code', async () => {
      const user = {
        username: 'As',
        password: 'Ii282jj3',
      };

      await api
        .post('/api/users')
        .send(user)
        .expect(400);
    });
  });

  describe('Authorized actions', () => {
    test('Login with username and password', async () => {
      const user = {
        username: 'root',
        password: 'rootpassword',
      };

      await api
        .post('/api/login')
        .send(user)
        .expect(200);
    });

    test('Login and then create a blog', async () => {
      const blog = {
        title: 'TEST_BLOG',
        author: 'TESTER',
        likes: 777,
        url: 'https://blogspot.com',
      };

      const user = {
        username: 'root',
        password: 'rootpassword',
      };

      const login = await api
        .post('/api/login')
        .send(user)
        .expect(200);

      await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', `Bearer ${login.body.token}`)
        .expect(200);
    });
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
