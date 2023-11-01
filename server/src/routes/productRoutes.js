
const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router()


router.route("/product").get(  getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct)
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails)
router.route("/review/new").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/review/delete").delete(isAuthenticatedUser,authorizeRoles("admin"), deleteReview);

module.exports = router
// router.route("/product/:id").put(updateProduct).delete(deleteProduct)