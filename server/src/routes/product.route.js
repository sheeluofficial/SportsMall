
const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/product.controller")
const router = express.Router()


router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/product/:id").put(updateProduct)
router.route("/product/:id").delete(deleteProduct)
router.route("/product/:id").get(getProductDetails)

module.exports = router
// router.route("/product/:id").put(updateProduct).delete(deleteProduct)