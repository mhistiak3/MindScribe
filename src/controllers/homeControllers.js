/*
 * Title: MindScribe Application.
 * Description: Home Page Controllers
 * Author: Istiak Ahammad
 * Date: 8/13/2024
 *
 */

/**
 *  custom module
**/
const Blog = require("../models/blogModel");
const getPagination = require("../utilities/getPagination");

const renderHome = async (req, res, next) => {
  try {
    // Retrive total amount of creted blog
    const totalBlogs = await Blog.countDocuments()

    // Get pagination object
    const pagination = getPagination("/", req.params, 5, totalBlogs);
    

    // Retriving blog from the database, selecting specific fields adn populating 'owner' field
    const latestBlog = await Blog.find()
      .select("banner title createdAt readingTime reaction totalBookmark")
      .populate({
        path: "owner",
        select: "name username profilePhoto",
      })
      .sort({
        createdAt: -1,
      }).limit(pagination.limit).skip(pagination.skip)
      

    res.render("./pages/home", {
      sessionUser: req.session.user,
      route: req.originalUrl,
      latestBlog,
      pagination
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = { renderHome };
