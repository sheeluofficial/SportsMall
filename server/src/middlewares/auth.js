const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

// Authenticate function
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const tokenExpirationTime = decodedData.exp * 1000; // Convert seconds to milliseconds
  const currentTime = Date.now();
  const tokenMaxAge = process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  
  if (tokenExpirationTime > currentTime && (tokenExpirationTime - currentTime) < tokenMaxAge) {
      // Token is not expired within the allowed max age
      req.user = await User.findById(decodedData.id);
      next();
  } else {
      return next(new ErrorHandler("Token is expired or invalid, please login again", 401));
  }


  
});

// Role authorization function
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};

