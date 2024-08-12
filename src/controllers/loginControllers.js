/*
 * Title: Login Controller
 * Description:  Login Page render, Jwt token generate
 * Author: Istiak Ahammad
 * Date: 8/12/2024
 *
 */

// * Render Login Page
const renderLogin = (req, res, next) => {
  res.render("./pages/login");
};

// * Login User with JWT
const userLogin = (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log("userLogin:", error.message);
    throw error;
  }
};
module.exports = { renderLogin, userLogin };
