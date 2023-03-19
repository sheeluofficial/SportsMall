const mongoose = require("mongoose")
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Please Enter Your Name"],
        maxLength:[30, "Name cannot exceed 30 characters"],
        minLength:[3,"Name should more than 3 characters"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
         
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select: false
    },
    avatar: {
        public_id:{
            type:String,
            required:true
        },
       url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})


module.exports = mongoose.model("user",userSchema)