const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const authValidator = require("../../validator/authValidator");
const authController = require("../../controller/auth.controller");

//@route  GET api/auth/
//@desc   Get user info
//@access Public
router.get("/", auth, authController.getAuthController);

// @route  Post api/auth/
// @desc   Login
// @access Public
router.post(
  "/login",
  authValidator.loginValidator,
  authController.loginController
);

//@route  post api/users/
//@desc   register user
//@access Public
router.post(
  "/register",
  authValidator.registerValidator,
  authController.registerController
);

module.exports = router;
