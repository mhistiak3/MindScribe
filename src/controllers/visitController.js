/*
 * Title: Visit Controller.
 * Description: Update visit count.
 * Author: Istiak Ahammad
 * Date: 9/6/2024
 *
 */



/**
 *  custom modules
 **/
const Blog = require("../models/blogModel");


// Add Rewaction in Blog
const updateVisit = async (req, res) => {
  try {
   

    
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
