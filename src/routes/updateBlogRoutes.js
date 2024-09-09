/*
 * Title: MindScribe Application.
 * Description: Update Blog Routes
 * Author: Istiak Ahammad
 * Date: 9/9/2024
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
const renderEditBlog = require("../controllers/updateBlogControllers");



// * GET Route: Render the edit blog page
router.get("/:blogId/edit", renderEditBlog);



module.exports = router;
