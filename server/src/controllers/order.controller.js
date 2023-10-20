const catchAsyncError = require("../middlewares/catchAsyncErrors");
const Order = require("../models/order.model");

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