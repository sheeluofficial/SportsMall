const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Note: To be updated

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;


     const isUserPresent = await User.find({email :email});

     if(isUserPresent) {
     
        return next(new ErrorHandler("user Already present with this Email, Please login to continue", 409));
      
     }

  const hashedPassword = await bcrypt.hash(password, 8);

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "Avatar", // this folder cloudainry data base manage by us
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
console.log(user);
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

  let resetPasswordUrl = "";

  const isLocal = req.hostname === "localhost" || req.hostname === "127.0.0.1";
  if (isLocal) {
    resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  } else {
    resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
  }

  console.log(resetPasswordUrl);

  //   const RESET_PASSWORD_URL = `${req.protocol}://${req.get(
  //     "host"
  //   )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is : \n \n ${resetPasswordUrl} \n \n If you have not requested for password reset, Then please ignore this email`;

  try {
    await sendEmail({ email, message, subject: `Ecommerce Password Recovery` });

  return  res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });

  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    console.error(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
});

// Reset password using token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
 const token = req.params.token;
  console.log(token);
  
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

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

 return sendToken(user, 200, res);
  // return res.status(200).json({ message: "Password reset successful" });
});

// Get User Details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
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

  sendToken(user, 200, res);
  //   res
  //     .status(200)
  //     .json({ success: true, message: "Password updated successfully" });
});

// Update user profile Route
// Note : Update it

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };


  // Add clowdanary

  // if avatar not empty then
  if (req.body.avatar !== "") {
    const user = await userModel.findById(req.user.id);
    const imageId = user.avatar.public_id;

    //  await cloudinary.v2.uploader.destroy(imageId); // delete old Image from cloudnairy
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Avatar", // this folder cloudainry data base manage by us
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id, // id for img
      url: myCloud.secure_url, // new User data
    };
  }


  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res
    .status(200)
    .json({ success: true, message: "Profile updated successfully" });
});

// Get all users --Admin

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
    message: "Users details fetched successfully",
  });
});

// Get single users --Admin

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with ID : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
    message: "User details fetched successfully",
  });
});

// Update user profile --Admin
// Note : Update it add clowdanary
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // Add clowdanary

  let user = User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with ID : ${req.params.id}`)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, message: "User updated successfully" });
});

// Delete user profile --Admin

// Note : Update it with cloud remove image.
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with ID : ${req.params.id}`)
    );
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, message: "User Deleted successfully" });
});
