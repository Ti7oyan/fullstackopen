const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  response.json(await Blog.find({}).populate('user'));
});

blogsRouter.get('/:id', async (request, response) => {
  const note = await Blog.findById(request.params.id);
  if (note) return response.json(note);

  return response.status(404).end();
});

blogsRouter.post('/', async (request, response) => {
  const {
    title, author, url, likes, userId,
  } = request.body;

  if (title && url) {
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: userId,
    });

    const savedBlog = await blog.save();
    const user = await User.findById(userId);
    await User.findByIdAndUpdate(userId, { blogs: user.blogs.concat(savedBlog) });
    response.json(savedBlog);
  } else {
    response.status(400).end();
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const {
    title, author, url, likes,
  } = request.body;
  const { id } = request.params;

  const blog = {
    title, author, url, likes,
  };

  await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.status(204).end();
});

module.exports = blogsRouter;
