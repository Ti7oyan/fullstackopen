const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
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
    title, author, url, likes,
  } = request.body;
  const { token } = request;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'Token missing or invalid',
    });
  }

  const user = await User.findById(decodedToken.id);

  if (title && url) {
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user.id,
    });

    const savedBlog = await blog.save();
    await User.findByIdAndUpdate(user.id, { blogs: user.blogs.concat(savedBlog) });
    return response.json(savedBlog);
  }

  return response.status(400).end();
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'Token missing or invalid',
    });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(id).populate('user');
  if (blog.user.id.toString() === user.id.toString()) {
    await blog.remove();
    return response.status(204).end();
  }

  return response.status(401).json({ error: "You don't have permissions to do this." });
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
