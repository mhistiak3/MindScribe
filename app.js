/*
 * Title: MindScribe
 * Description: A Blog Application
 * Author: Istiak Ahammad
 * Date: 8/11/2025
 *
 */

/**
 * node modules
 **/
const express = require("express");

/**
 * custome module
 **/
const register = require("./src/routes/register");

/**
 * Initial Express
 **/
const app = express();

/**
 *  Middleware
 **/
app.set("view engine", "ejs");
/**
 * Application Routes
 **/
app.use("/register", register);

/**
 * Start Server
 **/
app.listen(3000, () => {
  console.log(`Server Start On: http://localhost:3000`);
});
