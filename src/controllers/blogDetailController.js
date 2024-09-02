/*
 * Title: MindScribe Application.
 * Description: Blog Details Routes
 * Author: Istiak Ahammad
 * Date: 9/3/2024
 *
 */

/**
 *  node modules
 **/
const mongoose = require("mongoose");
const Blog = require("../models/blogModel");

/**
 *  custom modules
 **/

const renderBlogDetail = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    // Handle case where provided blog id is not valid
    const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);

    if (!isValidObjectId) {
      return res.render("./pages/404");
    }
    // handle case where no blog found with provided blog id
    const blogExist = await Blog.exists({
      _id: new mongoose.Types.ObjectId(blogId),
    });

    if (!blogExist) {
      return res.render("./pages/404");
    }

    // Retrive blog detail and populate owner info
    const blog = await Blog.findById(blogId).populate({
      path: "owner",
      select: "name username profilePhoto",
    });

    // Retrive more blog from this user
    const ownerBlog = await Blog.find({ owner: { _id: blog.owner._id } })
      .select("title reaction totalBookmark owner readingTime createdAt")
      .populate({
        path: "owner",
        select: "name username profilePhoto",
      })
      .where("_id")
      .nin(blogId)
      .sort({ createAt: "desc" })
      .limit(3);


    res.render("./pages/blogDetail", {
      sessionUser: req.session?.user,
      route: req.originalUrl,
      blog,
      ownerBlog,
    });
  } catch (error) {
    console.log("Error Rendering blog details: ", error.message);
    throw error;
  }
};
module.exports = renderBlogDetail;
