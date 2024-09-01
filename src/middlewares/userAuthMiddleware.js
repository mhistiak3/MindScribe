/*
 * Title: User Auth Middleware
 * Description:  Middleware funtion to check if user is authenticated.
 * Author: Istiak Ahammad
 * Date: 8/23/2024
 *
 */

const userAuth = (req, res, next) => {
  const { userAuthenticated } = req.session?.user || {};
  
//   Handle case where user is authenticated
  if (userAuthenticated) return next();
//   Redirect to login page if user is not authenticated
res.redirect("/login")
};
module.exports = userAuth;
