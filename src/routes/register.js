/*
 * Title: MindScribe Application.
 * Description: Register Routes
 * Author: Istiak Ahammad
 * Date: 8/11/2024
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
const { renderRegister } = require("../controllers/registerControllers");

// * Get Route: Render the registration form
router.get("/", renderRegister);

module.exports = router;
