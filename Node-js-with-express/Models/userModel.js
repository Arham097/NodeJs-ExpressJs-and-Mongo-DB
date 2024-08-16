const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // validator only works for (create) or (save) methods
      validator: function (val) {
        return val === this.password
      },
      message: 'Password and Confirm Password are not matched'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  //encrypt password before saving it
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
})

userSchema.methods.comparePasswordinDB = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB)
}

userSchema.methods.isPasswordChanged = function (JWTtimesptamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    console.log(passwordChangedTimestamp, JWTtimesptamp);

    return JWTtimesptamp < passwordChangedTimestamp;
  }
  return false;
}

userSchema.methods.createResetPasswordToken = function () {
  const ResetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(ResetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  console.log(ResetToken, this.passwordResetToken);
  return ResetToken;
}
const user = mongoose.model('User', userSchema);
module.exports = user;