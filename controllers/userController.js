const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config');

//** User Schema */
const userSchema = require('../models/userSchema');
const User = mongoose.model('User', userSchema);

//** Create User Controller */

const { saltRound } = config;

const createUserController = async (req, res) => {
  console.log(req.body);
  try {
    const findUsername = await User.find({ username: req.body.username });
    console.log(findUsername);
    if (findUsername && findUsername?.length <= 0) {
      const hashPassword = await bcrypt.hash(req.body.password, saltRound);

      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      });

      await newUser.save();

      res.status(200).json({
        success: true,
        message: 'User created successfully',
      });
    } else {
      res
        .status(409)
        .json({ success: false, message: 'Username is not available' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server side error' });
  }

  res.json({
    success: true,
    message: 'All users',
  });
};

module.exports = {
  createUserController,
};
