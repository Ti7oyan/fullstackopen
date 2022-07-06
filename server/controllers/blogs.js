const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  response.json(await Blog.find({}))
})

blogsRouter.get('/:id', async (request, response) => {
  const note = await Blog.findById(request.params.id);
  note ? response.json(note) : response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (title && url) {
    const blog = new Blog({
      title,
      author,
      url,
      likes: typeof likes === 'undefined' ? 0 : likes,
    })

    const savedBlog = await blog.save()
    response.json(savedBlog)
  }
  else {
    response.status(400).end()
  }

})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await Blog.findByIdAndRemove(id);
  response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const { id } = request.params;

  const blog = {
    title, author, url, likes
  }

  await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.status(204).end();
})

module.exports = blogsRouter;