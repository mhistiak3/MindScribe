/*
 * Title: MindScribe Application.
 * Description: Home Page Controllers
 * Author: Istiak Ahammad
 * Date: 8/13/2024
 *
 */

const renderHome = async (req, res, next) => {
  try {
    res.render("./pages/home", {
      sessionUser: req.session.user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { renderHome };
