const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//** User Schema */
const userSchema = require('../models/userSchema');
const User = mongoose.model('User', userSchema);

//** Get all users */
router.get('/all', (req, res) => {
  res.json({
    success: true,
    message: 'All users',
  });
});

//** crate user */
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'This route is for creating users',
  });
});

module.exports = router;
