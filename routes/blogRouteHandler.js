const express = require('express');

const { createBlog } = require('../controllers/blogController');
const checkLogin = require('../middlewares/checkLogin');
const router = express.Router();

//** Create Blog */

router.post('/', checkLogin, createBlog);

module.exports = router;
