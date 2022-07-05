const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then((blogs) => response.json(blogs))
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.
    findById(request.params.id)
    .then((note) => {
      if (note) return response.json(note);
      return response.status(404).end();
    })
    .catch((error) => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  })

  blog
    .save()
    .then((savedBlog) => response.json(savedBlog))
    .catch((error) => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params;

  Blog
    .findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const { id } = request.params;

  const blog = {
    title,
    author,
    url,
    likes
  }

  Blog
    .findByIdAndUpdate(id, blog, { new: true })
    .then((updatedBlog) => response.json(updatedBlog))
    .catch((error) => next(error))
})

module.exports = blogsRouter;