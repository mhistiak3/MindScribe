/*
 * Title: Login Controller
 * Description:  Login Page render, Jwt token generate
 * Author: Istiak Ahammad
 * Date: 8/12/2024
 *
 */

/**
 * node modules
 **/
const bcrypt = require("bcrypt");

/**
 * custome module
 **/
const User = require("../models/UserModel");

// * Render Login Page
const renderLogin = (req, res, next) => {
  res.render("./pages/login");
};

// * Login User with JWT
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find user from database
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res
        .status(400)
        .json({ message: "No user found with this eamil address." });
    }
    // check is password is valid
    const isValidPassword = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!isValidPassword) {
      return res
        .status(400)
        .json({
          message:
            "Invalid password. Please ensure you've enterd the correct password and try again.",
        });
    }
  } catch (error) {
    console.log("userLogin:", error.message);
    throw error;
  }
};
module.exports = { renderLogin, userLogin };
