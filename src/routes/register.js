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
const {
  renderRegister,
  userRegister,
} = require("../controllers/registerControllers");

// * GET Route: Render the registration form
router.get("/", renderRegister);

// * POST Rout: Register form submission for user register
router.post("/", userRegister);

module.exports = router;
