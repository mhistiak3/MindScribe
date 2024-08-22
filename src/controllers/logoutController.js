/*
 * Title: Logout Controller
 * Description: Logout the user by destroying the session and redireting to the home page
 * Author: Istiak Ahammad
 * Date: 8/23/2024
 *
 */

const logoutController = async(req, res, next) => {
try {
    req.session.destroy()
    res.redirect("/")
} catch (error) {
   console.log("Logout Error: "+ error.message);
   throw error
    
}
};

module.exports = logoutController;
