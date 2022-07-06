const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog')
const app = require('../app');

const api = supertest(app);

const [contentType, applicationJson] = ['Content-Type', 'application/json; charset=utf-8']

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('When there are some blogs initially stored', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect(contentType, applicationJson)
  })

  test('All blogs are returned', async () => {
    const { body } = await api.get('/api/blogs')

    expect(body).toHaveLength(helper.initialBlogs.length)
  })

  test('An ID field exists', async () => {
    const startingBlogs = await helper.blogsInDb()

    expect(startingBlogs[0].id).toBeDefined()
  })
})

describe('Testing endpoints', () => {
  describe('POST /api/blogs/', () => {
    test('A blog can be posted', async () => {
      const startingBlogs = await helper.blogsInDb()

      const newBlog = new Blog({
        title: 'TEST_BLOG',
        author: 'TESTER',
        likes: 69,
        url: 'https://test.com'
      })

      await newBlog.save();

      const actualBlogs = await helper.blogsInDb()

      expect(startingBlogs.length).toBeLessThan(actualBlogs.length);
    })

    test("If likes aren't present in the request, define its value to zero", async () => {
      await api
        .post('/api/blogs')
        .send({
          title: 'TEST_BLOG_WITHOUT_LIKES',
          author: 'TESTER',
          url: 'https://test.com'
        })
        .expect(200)

      const actualBlogs = await helper.blogsInDb()
      expect(actualBlogs[actualBlogs.length - 1].likes).toBe(0)
    })

    test('If title and url are not sent on the request, it returns a 400 Bad Request status', async () => {
      await api
        .post('/api/blogs')
        .send({
          author: 'TESTER',
          likes: 20
        })
        .expect(400)
    })
  })

  describe('DELETE /api/blogs/:id', () => {
    test('A blog can be removed', async () => {
      await Blog.findOneAndRemove({ title: 'TEST_BLOG' })

      const actualBlogs = await helper.blogsInDb()

      expect(actualBlogs).not.toContainEqual({
        title: 'TEST_BLOG',
        author: 'TESTER',
        likes: 69,
        url: 'https://test.com'
      })
    })
  })

  describe('PUT /api/blogs/:id', () => {
    test('A blog can be updated', async () => {
      const { id } = await Blog.findOne({ title: 'Tech STUFF' });
      await api
        .put(`/api/blogs/${id}`)
        .send({ likes: 250 })
        .expect(204)

      const updatedBlog = await Blog.findOne({ title: 'Tech STUFF' })

      expect(updatedBlog.likes).toBe(250)
    })
  })

})

afterAll(async () => {
  await Blog.deleteMany({ author: 'TESTER' })
  await Blog.deleteMany({ title: undefined, likes: 0 })
  mongoose.connection.close()
})