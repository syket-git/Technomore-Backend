const express = require('express');

const {
  createBlog,
  getAllBlogs,
  getSpecificBlog,
  updateSpecificBlog,
  deleteSpecificBlog,
} = require('../controllers/blogController');
const checkLogin = require('../middlewares/checkLogin');
const router = express.Router();

//** Get all Blogs */
router.get('/all', getAllBlogs);

//** Get Specific blog */
router.get('/:slug', getSpecificBlog);

//** Create Blog */
router.post('/', checkLogin, createBlog);

//** Update specific blog */
router.put('/:slug', updateSpecificBlog);

//** Delete specific blog */
router.delete('/:slug', deleteSpecificBlog);

module.exports = router;
