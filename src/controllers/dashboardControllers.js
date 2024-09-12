/*
 * Title: MindScribe Application.
 * Description: Dashboard Controllers
 * Author: Istiak Ahammad
 * Date: 8/13/2024
 *
 */



/**
 *  custom modules
 **/
const User = require("../models/UserModel");

const renderDashboard = async (req, res) => {
  try {
    // get logged username
    const { username } = req.session.user;
    // get logged user data
    const loggedUser = await User.findOne({ username })
      .select("totalVisits totalReactions blogPublished blog")
      .populate({
        path: "blogs",
        select: "title createdAt updatedAt reaction totalVisit",
        options: { sort: { cretedAt: "desc" } },
      });
      console.log(loggedUser);
      
    res.render("./pages/dashboard", {
      sessionUser: req.session.user,
      loggedUser,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = { renderDashboard };
