/*
 * Title: Logout
 * Description: Logout Route 
 * Author: Istiak Ahammad 
 * Date: 8/23/2024
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
const logoutController = require("../controllers/logoutController");


// POST Route: Handle User Logout
router.post("/", logoutController);

module.exports = router;
