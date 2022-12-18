
const express = require("express")
const { getAllProducts, createProduct, updateProduct } = require("../controllers/product.controller")
const router = express.Router()


// get Products
router.route("/products").get(getAllProducts);

// Create new product -- Admin

router.route("/products/new").post(createProduct);

router.route("/product/:id").put(updateProduct)

module.exports = router