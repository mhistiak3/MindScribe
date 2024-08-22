/*
 * Title: MindScribe Application.
 * Description: Home Page Controllers
 * Author: Istiak Ahammad
 * Date: 8/13/2024
 *
 */

const Blog = require("../models/blogModel");

const renderHome = async (req, res, next) => {
  try {
    // Retriving blog from the database, selecting specific fields adn populating 'owner' field
    const latestBlog = await Blog.find()
      .select("banner title createdAt readingTime reaction totalBookmark")
      .populate({
        path: "owner",
        select: "name username profilePhoto",
      }).sort({
        cretedAt:"desc"
      })

    res.render("./pages/home", {
      sessionUser: req.session.user,
      route: req.originalUrl,
      latestBlog,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = { renderHome };
