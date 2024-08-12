/*
 * Title: Mongoose Model
 * Description: User Model Schema
 * Author: Istiak Ahammad
 * Date: 8/12/2024
 *
 */

/**
 * node modules
 **/
const mongoose = require("mongoose");

const UserShcema = new mongoose.Schema(
  {
    profilePhoto: {
      url: String,
      public_id: String,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    blogs: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Blog",
    },
    blogPublished: {
      type: Number,
      default: 0,
    },
    reactedBlogs: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Blog",
    },
    readingList: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Blog",
    },
    totalVisits: {
      type: Number,
      default: 0,
    },
    totalReactions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserShcema);
