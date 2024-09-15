/*
 * Title: MindScribe Application.
 * Description: Settings Profile Routes
 * Author: Istiak Ahammad
 * Date: 14/9/2024
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
const { renderSettings, updateBasicInfo } = require("../controllers/settingsControllers");

// * GET Route: Render the settings page.
router.get("/", renderSettings);
router.put("/basic-info", updateBasicInfo);

module.exports = router;
