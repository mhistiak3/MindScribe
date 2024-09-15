/*
 * Title: Visit Controller.
 * Description: Update visit count.
 * Author: Istiak Ahammad
 * Date: 9/6/2024
 *
 */

/**
 *
 **/
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
/**
 *  custom modules
 **/
const uploadToCloudinary = require("../config/cloudinary_config");
const User = require("../models/UserModel");
const Blog = require("../models/blogModel");

// Add Rewaction in Blog
const renderSettings = async (req, res) => {
  try {
    // Destructer user from session user
    const { username } = req.session.user;

    // Current User
    const currentUser = await User.findOne({ username });

    res.render("./pages/settings", {
      sessionUser: req.session.user,
      currentUser,
    });
  } catch (error) {
    console.log("Error to vist update: ", error.message);
    throw error;
  }
};

// update profile basic info
const updateBasicInfo = async (req, res) => {
  try {
    // Destructer user from session user
    const { username: sessionUsername } = req.session.user;

    const currentUser = await User.findOne({
      username: sessionUsername,
    }).select("profilePhoto name username email bio");

    // destructer user from req.body
    const { profilePhoto, name, username, email, bio } = req.body;

    // Handle case where email is already associated with an account
    if (email) {
      if (await User.exists({ email })) {
        return res.status(400).json({
          message:
            "Sorry, an account is already associated with this email address.",
        });
      }
      currentUser.email = email;
    }

    // Handle case where username is already associated with an account
    if (username) {
      if (await User.exists({ username })) {
        return res.status(400).json({
          message:
            "Sorry, that username is already taken, Please choose a different one.",
        });
      }
      currentUser.username = username;
      req.session.user.username = username;
    }

    // if profilePhoto provided upload it to cloudinary
    if (profilePhoto) {
      const public_id = currentUser.username;
      const imageURL = await uploadToCloudinary(profilePhoto, public_id);

      currentUser.profilePhoto = {
        url: imageURL,
        public_id,
      };
      req.session.user.profilePhoto = imageURL;
    }

    // update name and bio for currentUser and sessionUser
    currentUser.name = name;
    req.session.user.name = name;
    currentUser.bio = bio;

    // Save updated User Information
    await currentUser.save();

    res.sendStatus(200);
  } catch (error) {
    console.log("Error to vist update: ", error.message);
    throw error;
  }
};

// Update password
const updatePassword = async (req, res) => {
  try {
    // Destructer user from session user
    const { username: sessionUsername } = req.session.user;

    const currentUser = await User.findOne({
      username: sessionUsername,
    }).select("password");

    // destructers passwords
    const { password, old_password } = req.body;

    // Validate old passowrd
    const isOldPassValid = await bcrypt.compare(
      old_password,
      currentUser.password
    );

    // Handle case where old password is not valid
    if (!isOldPassValid) {
      return res
        .status(400)
        .json({ message: "Your old password is not valid." });
    }

    // Hash the new password
    const newPassword = await bcrypt.hash(password, 10);
    currentUser.password = newPassword;

    // save new password
    await currentUser.save();

    res.sendStatus(200);
  } catch (error) {
    console.log("Error to vist update: ", error.message);
    throw error;
  }
};

const deleteAccount = async (req, res) => {
  try {
    // Destructer user from session user
    const { username } = req.session.user;

    const currentUser = await User.findOne({
      username,
    }).select("blogs");

    // delete all blog of this user
    await Blog.deleteMany({ _id: { $in: currentUser.blogs } });
    // delete currentUser accout
    await User.deleteOne({ username });

    // /Destroy current user session from all devices
    const Session = mongoose.connection.db.collection("sessions");
    await Session.deleteMany({ session: { $regex: username, $options: "i" } });
    // destroy from client device
    req.session.destroy();

    res.sendStatus(200);
  } catch (error) {
    console.log("Error to vist update: ", error.message);
    throw error;
  }
};
module.exports = {
  renderSettings,
  updateBasicInfo,
  updatePassword,
  deleteAccount,
};
