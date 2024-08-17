const User = require('../Models/userModel');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const CustomError = require('../Utils/customError');
const util = require('util');
const sendEmail = require('../Utils/email');
const crypto = require('crypto');
const authController = require('./authController');

const filterReqObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(props => {
    if (allowedFields.includes(props)) {
      newObj[props] = obj[props];
    }
  })
  return newObj;
}

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  // Get current user data from database
  const user = await User.findById(req.user._id).select('+password');

  // check if the supllied password is correct
  if (!(await user.comparePasswordinDB(req.body.currentPassword, user.password))) {
    const error = new CustomError('Your current password is wrong', 401);
    return next(error);
  }

  // if supplied password correct, update password with new password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  //login user & send jwt
  authController.createSendToken(user, 200, res);
})

exports.updateMe = asyncErrorHandler(async (req, res, next) => {
  // Check if request data contain Password | confirmPassword
  if (req.body.password || req.body.confirmPassword) {
    return next(new CustomError("You cannot update password by using this end point", 400))
  }

  // Update user details
  const filterObj = filterReqObj(req.body, 'name', 'email');
  const user = await User.findByIdAndUpdate(req.user._id, filterObj, { runValidators: true, new: true });

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})