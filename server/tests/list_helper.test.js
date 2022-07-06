const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

const listWithOneBlog = [
  {
    "title": "Tech STUFF",
    "author": "German Ornell",
    "url": "https://google.com/",
    "likes": 200,
    "id": "62c4b7fe53229a622a00f088"
  }
]

const listWithTwoBlogs = [
  ...listWithOneBlog,
  {
    "title": "COOKING WITH GRANDMA",
    "author": "Gilda Lauren",
    "url": "https://duckduckgo.com/",
    "likes": 400,
    "id": "62c4c97b39c1ad5111ccc82d"
  }
]

const listWithThreeBlogs = [
  ...listWithTwoBlogs,
  {
    "title": "Mother Histories",
    "author": "Gilda Lauren",
    "url": "https://bing.com/",
    "likes": 395,
    "id": "62c4d01753fac9f6877af0d4"
  }
]

describe('total likes', () => {
  test('When list has only one blog, equals the likes of that.', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(200)
  })

  test('When there are more than one list, return the total likes of them.', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(600)
  })
})

describe('favourite blog', () => {
  test('When there is only one blog, return it.', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('When there is more than one blog, return the most liked one.', () => {
    const result = listHelper.favouriteBlog(listWithTwoBlogs)
    expect(result).toEqual(listWithTwoBlogs[1])
  })
})

describe('most blogs', () => {
  test('When there is only one blog, return its author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ name: 'German Ornell', blogs: 1 })
  })

  test('When there are more than one blog, return the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs)
    expect(result).toEqual({ name: 'Gilda Lauren', blogs: 2 })
  })
})

describe('most likes', () => {
  test('When there is only one blog, return its author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ name: 'German Ornell', likes: 200 })
  })

  test('When there are more than one blog, return the most liked author and their likes', () => {
    const result = listHelper.mostLikes(listWithThreeBlogs);
    expect(result).toEqual({ name: 'Gilda Lauren', likes: 795 })
  })
})