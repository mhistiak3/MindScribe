/*
 * Title: MindScribe Application.
 * Description: Dashboard Controllers
 * Author: Istiak Ahammad
 * Date: 8/13/2024
 *
 */

/**
 *  custom modules
 **/
const Blog = require("../models/blogModel");
const User = require("../models//UserModel");

const deleteBlog = async (req, res) => {
  try {
    // get logged username
    const { username } = req.session.user;
    // blog id
    const { blogId } = req.params;

    const deletedBlog = await Blog.findOne({ _id: blogId }).select(
      "reaction totalVisit"
    );

    const currentUser = await User.findOne({ username }).select(
      "blogPublished totalVisits totalReactions blogs"
    );

    // Update user informaion
    currentUser.blogPublished--;
    currentUser.totalVisits -= deletedBlog.totalVisit;
    currentUser.totalReactions -= deletedBlog.reaction;
    currentUser.blogs.splice(currentUser.blogs.indexOf(blogId),1)
    await currentUser.save();

    // Delete blog from database
    await Blog.deleteOne({ _id: blogId });

    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = { deleteBlog };
