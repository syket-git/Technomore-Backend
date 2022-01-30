const mongoose = require('mongoose');
const slugify = require('slugify');
const config = require('../config');

//** User Schema */
const blogSchema = require('../models/blogSchema');
const userSchema = require('../models/userSchema');

const Blog = mongoose.model('Blog', blogSchema);
const User = mongoose.model('User', userSchema);

//** Get All blogs */

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate(
      'author',
      'name username email blogs'
    );
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: true, message: 'Server side error' });
  }
};

//** Get Specific blog */
const getSpecificBlog = async (req, res) => {
  try {
    const blog = await await Blog.find({ slug: req.params.slug }).populate(
      'author',
      'name username email blogs'
    );
    if (blog && blog?.length > 0) {
      res.status(200).json({ success: true, data: blog[0] });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'sorry! we could not find any data' });
    }
  } catch (error) {
    res.status(500).json({ success: true, message: 'Server side error' });
  }
};

//** Create Blog */
const createBlog = async (req, res) => {
  const slugifyTitle = slugify(req.body.title, '-');

  const findSlug = await Blog.find({ slug: slugifyTitle });

  if (findSlug && findSlug?.length > 0) {
    res.status(400).json({ success: false, message: 'Title is already taken' });
  }

  const newBlog = new Blog({
    title: req.body.title,
    description: req.body.description,
    slug: slugifyTitle,
    author: req.userId,
  });

  const savedBlog = await newBlog.save();

  await User.findOneAndUpdate(
    { _id: req.userId },
    {
      $push: {
        blogs: savedBlog._id,
      },
    },
    (err, data) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Server side error' });
      } else {
        res
          .status(200)
          .json({ success: true, message: 'Blog created successfully' });
      }
    }
  );
};

module.exports = { createBlog, getAllBlogs, getSpecificBlog };
