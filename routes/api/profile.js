const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const profileController = require("../../controller/profile.controller");

//@route  GET api/profile/
//@desc   Test route
//@access Public
router.get("/", auth, (req, res) => res.send("profile route"));

//@route  GET api/profile/me
//@desc   Test route
//@access Private
router.get("/me", auth, profileController.getProfile);

module.exports = router;
