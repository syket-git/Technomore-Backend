const express = require('express');

const {
  createBlog,
  getAllBlogs,
  getSpecificBlog,
} = require('../controllers/blogController');
const checkLogin = require('../middlewares/checkLogin');
const router = express.Router();

//** Get all Blogs */
router.get('/all', getAllBlogs);

//** Get Specific blog */
router.get('/:slug', getSpecificBlog);

//** Create Blog */
router.post('/', checkLogin, createBlog);

module.exports = router;
