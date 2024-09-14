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
const blogDetail = require("./src/routes/blogDetailRoutes");
const readingList = require("./src/routes/readingListRoutes");
const updateBlog = require("./src/routes/updateBlogRoutes");
const profile = require("./src/routes/profileRoutes");
const dashboard = require("./src/routes/dashboardRoutes");
const settings = require("./src/routes/settingsRoutes");
const deleteBlog = require("./src/routes/deleteBlogRoute");
const {
  APP_PORT,
  MONGO_CONNECTION_URL,
  SESSION_SECRET,
  SESSION_MAX_AGE,
} = require("./src/config");
const { connectDB, disconnectDB } = require("./src/config/mongoose_config");
const userAuth = require("./src/middlewares/userAuthMiddleware");
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
 * Application Public Routes
 **/
app.use("/register", register);
app.use("/login", login);
app.use("/", home);
app.use("/blogs", blogDetail);
app.use("/profile", profile);

/**
 * Application Authorization Routes
 **/
app.use(userAuth);
app.use("/createblog", createBlog);
app.use("/logout", logout);
app.use("/readinglist", readingList);
app.use("/blogs", updateBlog,deleteBlog);
app.use("/dashboard", dashboard);
app.use("/settings", settings);

/**
 * Start Server
 **/
const server = app.listen(APP_PORT, async () => {
  console.log(`Server Start On: http://localhost:${APP_PORT}`);
  await connectDB(MONGO_CONNECTION_URL);
});

server.on("close", async () => await disconnectDB());
