const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');

//** User Schema */
const userSchema = require('../models/userSchema');
const User = mongoose.model('User', userSchema);

const { saltRound } = config;

//** Get all users */

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: true, message: 'Server side error' });
  }
};

//** Get user by id */

const getUserById = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }).select(
      '-password'
    );
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: true, message: 'Server side error' });
  }
};

//** Create User Controller */
const createUserController = async (req, res) => {
  try {
    const findUsername = await User.find({ username: req.body.username });

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
};

//**Login Controller */
const loginController = async (req, res) => {
  try {
    const findUser = await User.find({ username: req.body.username });
    if (findUser?.length > 0) {
      console.log(findUser);
      const user = findUser[0];
      const hashPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (hashPassword) {
        const token = jwt.sign(
          {
            userId: user?._id,
            userName: user?.username,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.status(200).json({
          success: true,
          data: {
            name: user?.name,
            username: user?.username,
            email: user?.email,
            token,
          },
          message: 'Login successfully!',
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: 'Something went wrong' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Something went wrong' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server side error' });
  }
};

module.exports = {
  createUserController,
  loginController,
  getAllUsers,
  getUserById,
};
