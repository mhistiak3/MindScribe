/*
 * Title: MindScribe Application.
 * Description: Create Blog Controllers
 * Author: Istiak Ahammad
 * Date: 8/13/2024
 *
 */

const renderCreateBlog = async (req, res, next) => {
  try {
    res.render("./pages/createBlog", {
      sessionUser: req.session.user,
      route: req.originalUrl,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const postCreateBlog = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { renderCreateBlog, postCreateBlog };
