/*
 * Title: Visit Controller.
 * Description: Update visit count.
 * Author: Istiak Ahammad
 * Date: 9/6/2024
 *
 */

/**
 *  node modules
 **/
const mongoose = require("mongoose");

/**
 *  custom modules
 **/
const Blog = require("../models/blogModel");
const User = require("../models/UserModel");

// Add Rewaction in Blog
const updateVisit = async (req, res) => {
  try {
   

    // Destructer user from session user
    const { username } = req.session.user;
    // Destructer blogId from request param
    const { blogId } = req.params;

    const visitedBlog = await Blog.findById(blogId).select('totalVisit owner').populate({
        path:'owner',
        select:'totalVisits'
    })
    // Update visited blog
    visitedBlog.totalVisit++
    await visitedBlog.save()

    // update vsited blog owner
    visitedBlog.owner.totalVisits++
     await visitedBlog.owner.save();

    

   
    res.sendStatus(200);
  } catch (error) {
    console.log("Error to vist update: ", error.message);
    throw error;
  }
};


module.exports = { updateVisit };
