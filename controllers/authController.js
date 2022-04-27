const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// CREATE NEW USER => api/v1/register
exports.createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "products/dsvbpny402gelwugv2le",
      url: "https://res.cloudinary.com/bookit/image/upload/v1608062030/products/dsvbpny402gelwugv2le.jpg",
    },
  });

  sendToken(user, 200, res)
});

// LOGIN USER => api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // CHECK IF EMAIL & PASSWORD ARE ENTERED BY USER
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & Password!", 400));
  }

  // CHECK IF USER EXIST IN DATABASE
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }

  // CHECK IS PASSWORD IS CORRECT OR NOT
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }

  sendToken(user, 200, res);
});
