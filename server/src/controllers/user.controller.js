const  catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");


exports.registerUser = catchAsyncError(async (req,res,next)=>{
    const {name, email, password} = req.body;

     const hashedPassword = await bcrypt.hash(password,8);
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        avatar:{
            public_id:"this is a sample id",
            url: "profilepicUrl",
        },
    })

 sendToken(user,200,res)
});


// Login user

exports.loginUser = catchAsyncError(async (req,res,next)=>{

    const {email,password} = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email & password",401));

    }

   const user = await User.findOne({email}).select("+password")
   
   if(!user) {
    return next (new ErrorHandler("Invalid email or password",401));
   }

   console.log(user)
   const isPasswordMatched = await bcrypt.compare(password,user.password);

   if(!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password",401))
   }

   sendToken(user,200,res)

})

// Logout User

exports.logout = catchAsyncError(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success: true,
        message:"Logged Out"
    })
})