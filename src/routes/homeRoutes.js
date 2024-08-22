/*
 *
 * Title: MindScribe Application.
 * Description: Home Routes
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

const { renderHome } = require("../controllers/homeControllers");

// * GET Route: Render The Home Page
router.get(["/", "/page/:pageNumber"], renderHome);


module.exports = router;
