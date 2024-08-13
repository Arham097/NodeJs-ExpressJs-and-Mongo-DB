const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Enter a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password']
  }
})

const user = mongoose.model('User', userSchema);
module.exports = user;