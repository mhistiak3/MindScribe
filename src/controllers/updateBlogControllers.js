/*
 * Title: MindScribe Application.
 * Description: Update Blog Controllers
 * Author: Istiak Ahammad
 * Date: 9/9/2024
 *
 */

/**
 * custom modules
 **/
const Blog = require("../models/blogModel");
const uploadToCloudinary = require("../config/cloudinary_config");

// Retrives a blog from database and render a page for updating it.
const renderEditBlog = async (req, res) => {
  try {
    // Blog Id
    const { blogId } = req.params;
    // Username
    const { username } = req.session.user;

    const currentBlog = await Blog.findById(blogId)
      .select("banner title content owner")
      .populate({
        path: "owner",
        select: "username",
      });
    // Handle case where current user try to edit other user blog

    if (currentBlog.owner.username !== username) {
      res
        .status(403)
        .send(
          "<h2>Sorry, you don't have permission to edit this articale as you are not the author.</h2>"
        );
    }

    res.render("./pages/updateBlog", {
      sessionUser: req.session.user,
      currentBlog,
    });
  } catch (error) {
    console.log("Error rendering blog edit page: ", error.message);
    throw error;
  }
};

const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content, banner } = req.body;

    // Find the blog wich one user want to update
    const updatedBlog = await Blog.findById(blogId).select(
      "title content banner"
    );

    if (banner) {
      const bannerURL = await uploadToCloudinary(
        banner,
        updatedBlog.banner.public_id
      );
      updatedBlog.banner.url = bannerURL;
    }
    updatedBlog.title = title;
    updatedBlog.content = content;

    await updatedBlog.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("Error to update blog: ", error.message);
    throw error;
  }
};

module.exports = { renderEditBlog, updateBlog };
