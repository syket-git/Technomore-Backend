const express = require('express');

const { createBlog, getAllBlogs } = require('../controllers/blogController');
const checkLogin = require('../middlewares/checkLogin');
const router = express.Router();

//** Create Blog */

router.post('/', checkLogin, createBlog);

//** Get all Blogs */
router.get('/all', getAllBlogs);

module.exports = router;
