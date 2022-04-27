const Mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new Mongoose.Schema({
  name: { 
    type: String,
    required: [true, "Please Enter your name!"],
    maxlength: [25, "Your name cannot be longer than 25 charactors"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email!"],
    unique: [true, 'This email already exist'],
    validate: [validator.isEmail, "Please Enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password!"],
    minlength: [6, "Password cannot be smaller than 6 charactors"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// ENCRYPTING PASSWORD BEFORE SAVING USER
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password) 
}

//RETURN JWT TOKEN
userSchema.methods.getJwtToken = function () {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  })
}
module.exports = Mongoose.model("users", userSchema);
