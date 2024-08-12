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
const register = require("./src/routes/registerRoutes");
const login = require("./src/routes/loginRoutes");
const { APP_PORT, MONGO_CONNECTION_URL } = require("./src/config");
const { connectDB, disconnectDB } = require("./src/config/mongoose_config");
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
app.use("/login", login);

/**
 * Start Server
 **/
const server = app.listen(APP_PORT, async () => {
  console.log(`Server Start On: http://localhost:${APP_PORT}`);
  await connectDB(MONGO_CONNECTION_URL);
});

server.on("close", async () => await disconnectDB());
