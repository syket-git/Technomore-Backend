const mongoose = require('mongoose');

const userSchema = mongoose.Model({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    required: true,
  },
});

module.exports = userSchema;
