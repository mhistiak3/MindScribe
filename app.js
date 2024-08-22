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
const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/**
 * custome module
 **/
const register = require("./src/routes/registerRoutes");
const login = require("./src/routes/loginRoutes");
const logout = require("./src/routes/logoutRoute");
const home = require("./src/routes/homeRoutes");
const createBlog = require("./src/routes/createBlogRoutes");
const {
  APP_PORT,
  MONGO_CONNECTION_URL,
  SESSION_SECRET,
  SESSION_MAX_AGE,
} = require("./src/config");
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
 * parsing json data
 **/
app.use(express.json({ limit: "10mb" }));

/**
 * instance for session
 **/
const store = new MongoStore({
  mongoUrl: MONGO_CONNECTION_URL,
  collectionName: "sessions",
  dbName: "MindScribe",
});

/**
 * initial express session
 **/
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: Number(SESSION_MAX_AGE),
    },
  })
);

/**
 * Application Routes
 **/
app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/", home);
app.use("/createblog", createBlog);

/**
 * Start Server
 **/
const server = app.listen(APP_PORT, async () => {
  console.log(`Server Start On: http://localhost:${APP_PORT}`);
  await connectDB(MONGO_CONNECTION_URL);
});

server.on("close", async () => await disconnectDB());
