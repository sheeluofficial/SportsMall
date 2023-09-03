const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs")
// Authenticate function
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
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

// Generate a password reset token and send an email

exports.generateResetPasswordToken = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return next(new ErrorHandler("Email does not exist in our database", 404));
      }
  
      // Create a random token
      const resetToken = crypto.randomBytes(20).toString("hex");
  
      // Storing token and Expire time in DB
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes in milliseconds
  
      // Save the token to the user's document in the database
      await user.save();

  console.log(user)

      const RESET_PASSWORD_URL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
      const message = `Your password reset token is : \n \n ${RESET_PASSWORD_URL} \n \n If you have not requested for password reset, Then please ignore this email`;
  
   await sendEmail({email,message,res, next})

    } catch (error) {
      console.error(error);
      return next(new ErrorHandler("Internal server error", 500));
    }
  });
  

// Reset password using token
exports.resetPassword = catchAsyncError(async (req, res,next) => {
    const { token, newPassword,confirmPassword } = req.body;
  
   
      const user = await User.findOne({ resetPasswordToken: token,resetPasswordExpire:{$gt:Date.now()} });
  
      if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
      } 
  
      // Update the user's password and clear the reset token
     

      if(newPassword !== confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
      }

        const hashedPassword = await bcrypt.hash(newPassword,8);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
      
      return  res.status(200).json({ message: 'Password reset successful' });
  
     
    });
