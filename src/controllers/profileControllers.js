/*
 * Title: renderProfile Controller
 * Description:Handle  Profile related controls
 * Author: Istiak Ahammad
 * Date: 10/9/2024
 *
 */

/**
 * custome module
 **/
const User = require("../models/UserModel");
const Blog = require("../models/blogModel");
const getPagination = require("../utilities/getPagination");

const renderProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // Hanbdle case where user not exits
    const userExist = await User.exists({ username });
    if (!userExist) return res.render("./pages/404");

    // Finde user Profile based on username
    const profile = await User.findOne({ username }).select(
      "profilePhoto username name bio blogs blogPublished createdAt"
    );

    // get pagination
    const pagination = getPagination(
      `/profile/${username}`,
      req.params,
      20,
      profile.blogs.length
    );

    // Get User Blog
    const profileBlogs = await Blog.find({ _id: { $in: profile.blogs } })
      .select("title createdAt readingTime reaction totalBookmark")
      .populate({
        path: "owner",
        select: "name username profilePhoto",
      })
      .sort({ createdAt: "desc" })
      .limit(pagination.limit)
      .skip(pagination.skip);

    res.render("./pages/profile", {
      sessionUser: req.session.user,
      profile,
      pagination,
      profileBlogs,
    });
  } catch (error) {
    console.log("Profile Render Error: " + error.message);
    throw error;
  }
};

module.exports = renderProfile;
