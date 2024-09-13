/*
 *
 * Title: MindScribe Application.
 * Description: Delete Blog Routes
 * Author: Istiak Ahammad
 * Date: 14/9/2024
 *
 */

/**
 * node modules
 **/
const express = require("express");
const { deleteBlog } = require("../controllers/deleteBlogController");
const router = express.Router();
/**
 * custom modules
 **/


// * DELETE Route: DELETE Blog
router.delete("/:blogId/delete", deleteBlog);

module.exports = router;
