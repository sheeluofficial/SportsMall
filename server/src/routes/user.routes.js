const express  = require("express");
const router = express.Router()
const { registerUser, loginUser, logout } = require("../controllers/user.controller");
const { generateResetPasswordToken, resetPassword } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(generateResetPasswordToken);
router.route("/password/forgot-reset").put(resetPassword);

module.exports = router;
