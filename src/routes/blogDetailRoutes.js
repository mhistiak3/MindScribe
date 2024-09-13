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
const {
  updateReadingList,
  removeReadingList,
} = require("../controllers/readingListController");
const { updateVisit } = require("../controllers/visitController");


// * GET Route: Render the blog details
router.get("/:blogId", renderBlogDetail);

// * PUT Route: Update blog reactions
router.put("/:blogId/reactions", updateReaction);

// * DELETE Route: Remove blog reactions
router.delete("/:blogId/reactions", removeReaction);

// * PUT Route: Update blog Reading List
router.put("/:blogId/readingList", updateReadingList);

// * DELETE Route: Remove from blog Reading List
router.delete("/:blogId/readingList", removeReadingList);

// * PUT Route: Update Blog Visit
router.put("/:blogId/visit", updateVisit);

module.exports = router;
