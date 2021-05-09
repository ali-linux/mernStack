const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const profileController = require("../../controller/profile.controller");
const {
  profileValidator,
  experienceValidator,
  educationValidator,
} = require("../../validator/profileValidator");

//@route  GET api/profile/me
//@desc   Test route
//@access Private
router.get("/me", auth, profileController.getProfile);

//@route  POST api/profile/
//@desc   CREATE OR UPDATE USER PROFILE
//@access Private
router.post("/", auth, profileValidator, profileController.profile);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", profileController.getAllProfiles);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  profileController.getUserProfile
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, profileController.deleteProfile);

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  auth,
  experienceValidator,
  profileController.addExperience
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete("/experience/:exp_id", auth, profileController.deleteExperience);

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  auth,
  educationValidator,
  profileController.addEducation
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete("/education/:edu_id", auth, profileController.deleteEducation);

module.exports = router;
