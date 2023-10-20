const catchAsyncError = require("../middlewares/catchAsyncErrors");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const ErrorHandler = require("../utils/errorhandler");

// Create new error
exports.newOrder = catchAsyncError(async (req, res, next)=>{

    const {
        shippingInfo,
        OrderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        paidAt:Date.now,
        user : req.user._id
    })

res.status(201).json({
    success: true,
    order
})
});

// get Single Order

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

 const order = await Order.findById(req.params.id).populate("user","name email");

if(!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
}

res.status(200).json({
    success:true,
    order
})

});

// get all Orders => user

exports.myOrders = catchAsyncError(async (req, res, next) => {

 const orders = await Order.find({user:req.user._id});
 

res.status(200).json({
    success:true,
    orders
})

});


// get all Orders => admin

exports.getAllOrders = catchAsyncError(async (req, res, next) => {

 const orders = await Order.find();

 let totalAmount = 0;

 orders.forEach(order =>{
    totalAmount +=order.totalPrice;
 })

res.status(200).json({
    success:true,
    orders,
    totalAmount
})

});


// uodate order => admin

exports.updateOrder = catchAsyncError(async (req, res, next) => {

 const order = await Order.findById(req.params.id);
   
 if(!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
}

 if(order.orderStatus === "Delivered") {

    return next(new ErrorHandler("You have already delivered this order", 400));

 }


 order.orderItems.forEach( async (item) => {
    await updateStock(item.product, item.quantity);
 });


 order.orderStatus = req.body.status;

 if(req.body.status ===  "Delivered") {
    order.deliveredAt = Date.now();
 }

 await order.save({validateBeforeSave:flase});

res.status(200).json({
    success:true,
  
})

});

async function updateStock(id,quantity) {

    const product = await Product.findById(id);

    product.Stock = product.Stock - quantity;

    product.save({validateBeforeSave:false});

}

// Delete order => admin

exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);
    
    if(!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

     await order.remove();
   
   res.status(200).json({
       success:true,
   })
   
   });