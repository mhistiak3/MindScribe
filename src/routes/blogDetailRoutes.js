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
const {
  updateReaction,
  removeReaction,
} = require("../controllers/reactionController");


// * GET Route: Render the blog details
router.get("/:blogId", renderBlogDetail);

// * PUT Route: Update blog reactions
router.put("/:blogId/reactions", updateReaction);

// * DELETE Route: Remove blog reactions
router.delete("/:blogId/reactions", removeReaction);

module.exports = router;
