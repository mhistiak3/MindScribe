/*
 *
 * Title: MindScribe Application.
 * Description: Create Blog Routes
 * Author: Istiak Ahammad
 * Date: 8/13/2024
 *
 */

/**
 * node modules
 **/
const express = require("express");
const router = express.Router();
/**
 * custom modules
 **/
const {
  renderCreateBlog,
  postCreateBlog,
} = require("../controllers/createBlogControllers");

// * GET Route: Render Create Blog Page
router.get("/", renderCreateBlog);

// *  POST Route: Create new blog post
router.post("/", postCreateBlog);

module.exports = router;
