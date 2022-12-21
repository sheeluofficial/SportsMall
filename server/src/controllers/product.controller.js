const Product = require("../models/product.model");
const ErrorHandler = require("../utils/errorhandler");


// Create new product -- Admin

exports.createProduct = async (req,res)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })

}

// Update product --Admin

exports.updateProduct = async(req,res) =>{
    let product =await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
   
    res.status(200).json({
        message:"Product updated",
        product
    })
   
}
// Delete product --Admin

exports.deleteProduct = async(req,res) =>{
    let product =await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndDelete(req.params.id);
   
    res.status(200).json({
        message:"Product Deleted",
        success:true
    })
   
}




// Get Product details


exports.getProductDetails = async(req,res,next) =>{

    let product =await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found"))
    }

 
   
    res.status(200).json({
        message:"Product found",
        success:true,
        product
    })
   
}

// get All product
exports.getAllProducts = async(req,res) =>{
    const products =await Product.find().lean().exec()
console.log("coming")
    res.status(200).json({
        message:"Data fetched",
        products
    })
    // res.status(200).send({message:"All product"})
}
