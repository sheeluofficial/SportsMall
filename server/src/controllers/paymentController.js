const catchAsyncError = require("../middlewares/catchAsyncErrors");


// process the payment
exports.processPayment = catchAsyncError(async (req, res, next) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // asigning key as well

  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.ammount,
    currency: "inr",
    metadata: {
      company: "SportsMall", // not mandatory
    },
  });

  res
    .status(200)
    .json({ sucess: true, client_secret: myPayment.client_secret });
});

// send STRIPE_API_KEY to user =>

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
