const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please Enter product Name"]
    },
    description: {
        type:String,
        required:[true,"Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLength:[8,"Price cannot exceeed 9 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            public_id:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter product Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLength:[4,"Product cannot exceed 4 characters"],
        default:0
    },
    numOfReviews:

})