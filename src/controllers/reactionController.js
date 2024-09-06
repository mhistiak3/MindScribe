/*
 * Title: Reaction Controller.
 * Description: Update user reaction for reacted blog.
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
const updateReaction = async (req, res) => {
  try {
    //  Handle case where user is not autherize
    if (!req.session.user) return res.sendStatus(401);

    // Destructer user from session user
    const { username } = req.session.user;
    // Destructer blogId from request param
    const { blogId } = req.params;

    // Check user is already reacted
    const currentUser = await User.findOne({ username }).select("reactedBlogs");
    if (currentUser.reactedBlogs.includes(blogId)) {
      return res.sendStatus(400);
    }

    // Find the blog and update reaction count
    const reactedBlogs = await Blog.findById(blogId)
      .select("reaction owner")
      .populate({
        path: "owner",
        select: "totalReactions",
      });
    reactedBlogs.reaction++;
    await reactedBlogs.save();

    // Update current user's rections
    currentUser.reactedBlogs.push(reactedBlogs._id);
    await currentUser.save();

    // Update Reacted User total reaction
    reactedBlogs.owner.totalReactions++;
    await reactedBlogs.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("Error to reaction: ", error.message);
    throw error;
  }
};

// Remove rection in blog
const removeReaction = async (req, res) => {
  try {
    //  Handle case where user is not autherize
    if (!req.session.user) return res.sendStatus(401);

    // Destructer user from session user
    const { username } = req.session.user;
    // Destructer blogId from request param
    const { blogId } = req.params;

    // Check user is not reacted
    const currentUser = await User.findOne({ username }).select("reactedBlogs");
    if (!currentUser.reactedBlogs.includes(blogId)) {
      return res.sendStatus(400);
    }

    // Find the blog and update reaction count
    const reactedBlogs = await Blog.findById(blogId)
      .select("reaction owner")
      .populate({
        path: "owner",
        select: "totalReactions",
      });
    reactedBlogs.reaction--;
    await reactedBlogs.save();

    // Update current user's rections
    currentUser.reactedBlogs.splice(
      currentUser.reactedBlogs.indexOf(reactedBlogs._id),
      1
    );
    await currentUser.save();

    // Update Reacted User total reaction
    reactedBlogs.owner.totalReactions--;
    await reactedBlogs.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("Error to delete reaction: ", error.message);
    throw error;
  }
};

module.exports = { updateReaction, removeReaction };
