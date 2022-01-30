const mongoose = require('mongoose');
const config = require('../config');

//** User Schema */
const blogSchema = require('../models/blogSchema');
const Blog = mongoose.model('Blog', blogSchema);

const createBlog = (req, res) => {
  res.json({ success: true });
};

module.exports = { createBlog };
