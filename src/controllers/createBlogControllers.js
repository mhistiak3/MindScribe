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
    const publioc_id = crypto.randomBytes(10).toString("hex")
    const bannerURL = await uploadToCloudinary(banner, publioc_id);
    console.log(bannerURL);
    
  } catch (error) {
    console.log("error to create blog" + error.message);
    throw error;
  }
};

module.exports = { renderCreateBlog, postCreateBlog };
