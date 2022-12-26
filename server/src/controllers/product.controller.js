const  catchAsyncError = require("../middlewares/catchAsyncErrors");
const Product = require("../models/product.model");
const ErrorHandler = require("../utils/errorhandler");


// Create new product -- Admin

exports.createProduct = catchAsyncError(async (req,res,next)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })

})

// Update product --Admin

exports.updateProduct = catchAsyncError(async(req,res,next) =>{
    let product =await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found",401))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
   
    res.status(200).json({
        message:"Product updated",
        product
    })
   
});



// Delete product --Admin

exports.deleteProduct = catchAsyncError(async(req,res,next) =>{
    let product =await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found",401))
    }

    product = await Product.findByIdAndDelete(req.params.id);
   
    res.status(200).json({
        message:"Product Deleted",
        success:true
    })
   
})




// Get Product details


exports.getProductDetails = catchAsyncError(async(req,res,next) =>{

    let product =await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found",401))
    }

    res.status(200).json({
        message:"Product found",
        success:true,
        product
    })
   
})

// get All product
exports.getAllProducts = async(req,res,next) =>{
    const products =await Product.find().lean().exec()

    res.status(200).json({
        message:"Data fetched",
        products
    })
    // res.status(200).send({message:"All product"})
}
