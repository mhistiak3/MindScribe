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
const { APP_PORT } = require("./config");
/**
 * Initial Express
 **/
const app = express();

/**
 *  setting view engine
 **/
app.set("view engine", "ejs");

/**
 * setting public directory
 **/
app.use(express.static(`${__dirname}/public`));

/**
 * parsing urlencoded data
 **/
app.use(express.urlencoded({ extended: true }));

/**
 * Application Routes
 **/
app.use("/register", register);

/**
 * Start Server
 **/
app.listen(APP_PORT, () => {
  console.log(`Server Start On: http://localhost:${APP_PORT}`);
});
