/*
 *
 * Title: MindScribe Application.
 * Description: Create Blog Routes
 * Author: Istiak Ahammad
 * Date: 12/9/2024
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
const { renderDashboard } = require("../controllers/dashboardControllers");


// * GET Route: Render Dashboard Page
router.get("/", renderDashboard);


module.exports = router;
