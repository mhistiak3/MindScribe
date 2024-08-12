/*
 * Title: MindScribe
 * Description: Register Controllers
 * Author: Istiak Ahammad
 * Date: 8/11/2024
 *
 */

/**
 * node module
 **/
const bcrypt = require("bcrypt");

/**
 * custome module
 **/
const User = require("../models/UserModel");
const generateUsername = require("../utilities/generateUsernameUtil");
/**
 *   Controller for Render the registration page
 **/
const renderRegister = (req, res, next) => {
  const { userAuthenticated } = req.session.user || {};

  // handle case where user alredy logged in
  if (userAuthenticated) {
    return res.redirect("/");
  }
  res.render("pages/register");
};

/**
 *   Controller for New User Register
 **/
const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // create username
    const username = generateUsername(name);

    // create hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user with provided data
    await User.create({ name, email, username, password: hashedPassword });

    // Redirect user to login page when successful singup
    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        return res.status(400).json({
          message: "This email is already associated with an account.",
        });
      }
      if (error.keyPattern.username) {
        return res.status(400).json({
          message: "This username is already in use.",
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: `Failed to register user.<br>${error.message}` });
    }
    console.log("userRegister: ", error.message);
    throw error;
  }
};

module.exports = { renderRegister, userRegister };
