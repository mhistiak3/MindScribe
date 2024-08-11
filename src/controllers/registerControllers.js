/*
 * Title: MindScribe
 * Description: Register Controllers
 * Author: Istiak Ahammad
 * Date: 8/11/2024
 *
 */

/**
 *   Controller for Render the registration page
 **/
const renderRegister = (req, res, next) => {
  res.render("pages/register");
};

module.exports = { renderRegister };
