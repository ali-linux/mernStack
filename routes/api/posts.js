const express = require("express");
const router = express.Router();
const postController = require("../../controller/posts.controller");
const postValidator = require("../../validator/postsValidator");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/User");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post("/", auth, postValidator.addPostValidator, postController.addPost);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, postController.getAllPosts);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", auth, checkObjectId("id"), postController.getPostById);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete(
  "/:id",
  [auth, checkObjectId("id")],
  postController.deletePostById
);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", auth, checkObjectId("id"), postController.likePost);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:id", auth, checkObjectId("id"), postController.unlikePost);

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment/:id",
  auth,
  checkObjectId("id"),
  postValidator.commentValidator,
  postController.addComment
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, postController.deleteComment);

module.exports = router;
