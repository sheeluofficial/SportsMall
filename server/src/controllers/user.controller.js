const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");

const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepicUrl",
    },
  });

  sendToken(user, 200, res);
});

// Login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & password", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  console.log(user);
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Generate a password reset token and send an email

exports.generateResetPasswordToken = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(
        new ErrorHandler("Email does not exist in our database", 404)
      );
    }

    // Create a random token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Storing token and Expire time in DB
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes in milliseconds

    // Save the token to the user's document in the database
    await user.save();

    console.log(user);

    const RESET_PASSWORD_URL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is : \n \n ${RESET_PASSWORD_URL} \n \n If you have not requested for password reset, Then please ignore this email`;

    await sendEmail({ email, message, res, next });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
});

// Reset password using token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const { token, newPassword, confirmPassword } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired",
        400
      )
    );
  }

  // Update the user's password and clear the reset token

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 8);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return res.status(200).json({ message: "Password reset successful" });
});

// Get User Details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

// Update user password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password incorrect", 400));
  }

  if (oldPassword === newPassword) {
    return next(
      new ErrorHandler("New password Can not be same as old password", 400)
    );
  }

  if (confirmPassword !== newPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
});

// Update user profile Route

exports.updateProfile= catchAsyncError(async (req, res, next) => {
   
   const newUserData  = {
    name: req.body.name,
    email:req.body.email
   }

// Add clowdanary 
   const user =  await User.findByIdAndUpdate(req.user.id, newUserData,{
    new:true,
    runValidators: true,
    useFindAndModify:false
   })
  
    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  });


  // Get all users --Admin
  
exports.getAllUsers= catchAsyncError(async (req, res, next) => {
   
   const users = await User.find();
  
    res
      .status(200)
      .json({ success: true,users, message: "Users details fetched successfully" });
  });


  // Get single users --Admin

exports.getSingleUser= catchAsyncError(async (req, res, next) => {
   
   const user = await User.findById(req.params.id);

   if(!user) {
    return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}`,404 ))
   }
  
    res
      .status(200)
      .json({ success: true,user, message: "User details fetched successfully" });
  });


  // Update user profile --Admin 

  exports.updateUserRole = catchAsyncError(async (req, res, next) => {
   
    const newUserData  = {
     name: req.body.name,
     email:req.body.email,
     role : req.body.role
    }
 
 // Add clowdanary 

 let user = User.findById(req.params.id);

 if(!user) {
     return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}`));
 }

     user =  await User.findByIdAndUpdate(req.params.id, newUserData,{
     new:true,
     runValidators: true,
     useFindAndModify:false
    })
   
     res
       .status(200)
       .json({ success: true, message: "User updated successfully" });
   });




    // Delete user profile --Admin 

  exports.deleteUser = catchAsyncError(async (req, res, next) => {
   

    const user = User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}`));
    }

   await User.findByIdAndDelete(req.params.id)
   
     res
       .status(200)
       .json({ success: true, message: "User Deleted successfully" });
   });