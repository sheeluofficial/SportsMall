
const express = require("express")
const { getAllProducts } = require("../controllers/product.controller")
const router = express.Router()

router.route("/products").get(getAllProducts);

module.exports = router