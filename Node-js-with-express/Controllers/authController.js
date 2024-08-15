const User = require('../Models/userModel');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const CustomError = require('../Utils/customError');

const signupToken = id => {
  return jwt.sign({ id }, process.env.SECRET_STRING, {
    expiresIn: Number(process.env.LOGIN_EXPIRES)
  })
}

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signupToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  })
})

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user enter email and password or not
  if (!email || !password) {
    const error = new CustomError("Please Provide Email ID and Password for login!", 400);
    return next(error);
  }

  // check if user exist in DB of above email or not
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePasswordinDB(password, user.password))) {
    const error = new CustomError("Incorrect Email or Password", 400);
    return next(error);
  }
  const token = signupToken(user._id);


  res.status(200).json({
    status: 'success',
    token
  })
})