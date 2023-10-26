const express = require("express");

const { isAuthenticatedUser } = require("../middlewares/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/payment.controller");

const router  = express.Router();



router.route("/payment/process").post(isAuthenticatedUser , processPayment);

router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;