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
const { renderCreateBlog } = require("../controllers/createBlogControllers");

// * GET Route: Render Create Blog Page
router.get("/", renderCreateBlog);

module.exports = router;
