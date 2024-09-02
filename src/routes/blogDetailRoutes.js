/*
 * Title: MindScribe Application.
 * Description: Blog Details Routes
 * Author: Istiak Ahammad
 * Date: 9/3/2024
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
const renderBlogDetail = require("../controllers/blogDetailController");


// * GET Route: Render the login form
router.get("/:blogId", renderBlogDetail);



module.exports = router;
