const User = require('../Models/userModel');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const CustomError = require('../Utils/customError');
const util = require('util');
const sendEmail = require('../Utils/email');

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
  const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
  if (isPasswordChanged) {
    const error = new CustomError('Password has been changed recently, please  login again.', 401);
    next(error);
  }
  // 5. Allow Access to protected route.
  req.user = user;
  next();
})

exports.restrict = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      const error = new CustomError("You are not have permission to perform this action", 403);
      next(error);
    }
    next();
  }
}

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  // 1. Get user based on POSTed email from DB
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    const error = new CustomError('There is no user with this email address', 404);
    return next(error);
  }
  // 2. Generate the random reset token
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // 3. Send it to user's email
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  const message = "We have received a password reset request. The token is valid for 10 minutes only. Please visit the link below to reset your password. \n\n" + resetUrl;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password changed request received",
      message: message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  }
  catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });
    return next(new CustomError('There was an error sending the password reset email. Try again later!', 500));
  }



});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {

});