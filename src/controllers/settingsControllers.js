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
const User = require("../models/UserModel");

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

module.exports = { renderSettings };
