const Blog = require('../models/blog');

const initialBlogs = [
  {
    "title": "Tech STUFF",
    "author": "German Ornell",
    "url": "https://google.com/",
    "likes": 200,
    "id": "62c4b7fe53229a622a00f088"
  },
  {
    "title": "COOKING WITH GRANDMA",
    "author": "Gilda Lauren",
    "url": "https://duckduckgo.com/",
    "likes": 400,
    "id": "62c4c97b39c1ad5111ccc82d"
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'REMOVE_ASAP',
    author: 'NO_ONE',
    likes: 50,
    url: 'https://yahoo.com'
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}