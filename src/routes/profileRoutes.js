/*
 *
 * Title: MindScribe Application.
 * Description: Profile Routes
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
const renderProfile = require("../controllers/profileControllers");


// * GET Route: Render Create Blog Page
router.get(["/:username", "/:username/page/:pageNumber"], renderProfile);


module.exports = router;
