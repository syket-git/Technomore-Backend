const mongoose = require('mongoose');
const slugify = require('slugify');
const config = require('../config');

//** User Schema */
const blogSchema = require('../models/blogSchema');
const Blog = mongoose.model('Blog', blogSchema);

const createBlog = async (req, res) => {
  try {
    const slugifyTitle = slugify(req.body.title, '-');

    const findSlug = await Blog.find({ slug: slugifyTitle });

    if (findSlug && findSlug?.length > 0) {
      res
        .status(400)
        .json({ success: false, message: 'Title is already taken' });
    }

    const newBlog = new Blog({
      title: req.body.title,
      description: req.body.description,
      slug: slugifyTitle,
    });

    await newBlog.save();

    res
      .status(200)
      .json({ success: true, message: 'Blog created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server side error' });
  }
};

module.exports = { createBlog };
