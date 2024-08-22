/*
 * Title: MindScribe Application.
 * Description: Create Blog Controllers
 * Author: Istiak Ahammad
 * Date: 8/13/2024
 *
 */

/**
 *  node modules
 **/
const crypto = require("crypto");

/**
 *  custom modules
 **/
const uploadToCloudinary = require("../config/cloudinary_config");
const Blog = require("../models/blogModel");
const User = require("../models/UserModel");
const getReadingTime = require("../utilities/getReadingTime");

const renderCreateBlog = async (req, res) => {
  try {
    res.render("./pages/createBlog", {
      sessionUser: req.session.user,
      route: req.originalUrl,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const postCreateBlog = async (req, res, next) => {
  try {
    const { banner, title, content } = req.body;
    // Upload blog banner to Clodinary
    const public_id = crypto.randomBytes(10).toString("hex");
    const bannerURL = await uploadToCloudinary(banner, public_id);

    // Find the User who is creting the blog
    const user = await User.findOne({
      username: req.session.user.username,
    }).select("_id blogs blogPublished");

    // Creating a new blog post
    const newBlog = await Blog.create({
      banner: {
        url: bannerURL,
        public_id,
      },
      title,
      content,
      owner: user._id,
      readingTime: getReadingTime(content),
    });

    // Update user's blog
    user.blogs.push(newBlog._id);
    user.blogPublished++;
    await user.save();
    
    // redirect to the newly created blogpost page
    // res.redirect(`/blogs/${newBlog._id}`);
    res.redirect(`/`)
    
  } catch (error) {
    console.log("error to create blog" + error.message);
    throw error;
  }
};

module.exports = { renderCreateBlog, postCreateBlog };
