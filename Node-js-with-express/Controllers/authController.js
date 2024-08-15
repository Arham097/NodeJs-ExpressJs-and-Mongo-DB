const User = require('../Models/userModel');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const CustomError = require('../Utils/customError');
const util = require('util');

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
    token,
    user,
  })
})


exports.protect = asyncErrorHandler(async (req, res, next) => {
  // 1.Read the token & check if it is exist or not

  const testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith('bearer')) {
    token = testToken.split(' ')[1];
  }
  if (!token) {
    next(new CustomError('You are not logged in! Please login to get access', 401));
  }
  // 2. Validate the token
  const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STRING);
  console.log(decodedToken);

  // 3. Check if user still exist in DB or not

  const user = await User.findById(decodedToken.id);

  if (!user) {
    const error = new CustomError('User with this token does not exist', 401);
    next(error);
  }

  // 4. Check if user changed password after the token was issued or not
  if (user.isPasswordChanged(decodedToken.iat)) {
    const error = new CustomError('Password has been changed recently, please  login again.', 401);
    next(error);
  }
  // 5. Allow Access to protected route.
  req.user = user;
  next();
})
