const express  = require("express");
const router = express.Router()
const { registerUser, loginUser, logout } = require("../controllers/user.controller");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout)

module.exports = router;
