/*
 * Title: Update Reading List
 * Description: Bookmark Blog in to Reading Listr
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
const getPagination = require("../utilities/getPagination");

const updateReadingList = async (req, res) => {
  try {
    //  Handle case where user is not autherize
    if (!req.session.user) return res.sendStatus(401);

    // Destructer user from session user
    const { username } = req.session.user;
    // Destructer blogId from request param
    const { blogId } = req.params;

    /**
     * Find currentuser and check,
     * if already added current blog to reading list
     **/
    const currentUser = await User.findOne({ username }).select("readingList");
    if (currentUser.readingList.includes(blogId)) {
      return res.sendStatus(400);
    }

    // Update current user reading list and save
    currentUser.readingList.push(blogId);
    await currentUser.save();

    //   Find total bookmark and save
    const readingListBlogs = await Blog.findById(blogId).select(
      "totalBookmark"
    );

    readingListBlogs.totalBookmark++;
    await readingListBlogs.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("Error to update readiung List: ", error.message);
    throw error;
  }
};

// Remove from reding list controller
const removeReadingList = async (req, res) => {
  try {
    //  Handle case where user is not autherize
    if (!req.session.user) return res.sendStatus(401);

    // Destructer user from session user
    const { username } = req.session.user;
    // Destructer blogId from request param
    const { blogId } = req.params;

    /**
     * Find currentuser and check,
     * if  current blog not to reading list
     **/
    const currentUser = await User.findOne({ username }).select("readingList");
    if (!currentUser.readingList.includes(blogId)) {
      return res.sendStatus(400);
    }

    // remove from current user reading list and save
    currentUser.readingList.splice(currentUser.readingList.indexOf(blogId), 1);
    await currentUser.save();

    //   Find total bookmark and save
    const readingListBlogs = await Blog.findById(blogId).select(
      "totalBookmark"
    );

    readingListBlogs.totalBookmark--;
    await readingListBlogs.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("Error to update readiung List: ", error.message);
    throw error;
  }
};

// Render user reading list
const renderReadingList = async (req, res) => {
  try {
    // Destructer user from session user
    const { username } = req.session.user;

    // Retrive total amount of reading lsit
    const { readingList } = await User.findOne({ username }).select(
      "readingList"
    );
    // Get paginationb object
    const pagination = getPagination(
      "/readingList/",
      req.params,
      5,
      readingList.length
    );

    // retrive reading list based on pagination
    const readingListBlogs = await Blog.find({ _id: { $in: readingList } })
      .select("owner createdAt readingTime title reaction totalBookmark")
      .populate({ path: "owner", select: "name username profilePhoto" })
      .limit(pagination.limit)
      .skip(pagination.skip);

    res.render("./pages/readingList", {
      sessionUser: req.session.user,
      readingListBlogs,
      pagination,
    });
  } catch (error) {
    console.log("Error rendering reading list: ", error.message);
    throw error;
  }
};
module.exports = { updateReadingList, removeReadingList, renderReadingList };
