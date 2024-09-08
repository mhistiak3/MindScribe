/*
 * Title: Reading List
 * Description: Reading List Routes
 * Author: Istiak Ahammad
 * Date: 8/9/2024
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
const { renderReadingList } = require("../controllers/readingListController");

// GET Route: Render Reading List
router.get(["/", "/page/:pageNumber"], renderReadingList);

module.exports = router;
