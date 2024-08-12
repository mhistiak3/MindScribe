/*
 * Title: MindScribe Application.
 * Description: Login Routes
 * Author: Istiak Ahammad
 * Date: 8/12/2024
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
const {
  renderLogin,
  userLogin,
} = require("../controllers/loginControllers");

// * GET Route: Render the login form
router.get("/", renderLogin);

// * POST Route: Login form submission for user register
router.post("/", userLogin);

module.exports = router;
