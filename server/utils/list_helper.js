const _ = require('lodash');

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  return likes.reduce((prevValue, value) => prevValue + value, 0);
};

const favouriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const favourite = Math.max(...likes);
  return blogs[likes.indexOf(favourite)];
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const authorsData = _.values(
    _.groupBy(authors),
  ).map((author) => (
    { name: author[0], blogs: author.length }
  ));
  const blogsQuantity = authorsData.map((author) => author.blogs);
  const withMostBlogs = Math.max(...blogsQuantity);
  return authorsData[blogsQuantity.indexOf(withMostBlogs)];
};

const mostLikes = (blogs) => {
  const authors = _.uniq(blogs.map((blog) => blog.author));
  const authorsLikes = authors.map((author) => {
    const authorBlogs = blogs.filter(({ author: blogAuthor }) => blogAuthor === author);
    const authorLikes = authorBlogs.reduce((prevValue, { likes }) => prevValue + likes, 0);
    return authorLikes;
  });

  const maxLikes = Math.max(...authorsLikes);

  return {
    name: authors[authorsLikes.indexOf(maxLikes)],
    likes: maxLikes,
  };
};

module.exports = {
  totalLikes, favouriteBlog, mostBlogs, mostLikes,
};
