const express    = require("express"),
      router     = express.Router(),
      passport   = require("passport"),
      isLoggedIn = require("../middleware/auth"),
      User       = require("../models/user");

// LANDING PAGE
router.get("/", (req, res) => {
  res.render("landing");
});

//SHOW REGISTER ROUTE
router.get("/register", (req, res) => {
  res.render("register");
});
//HANDLES SIGN UP LOGIC
router.post("/register", (req, res) => {
  let newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.redirect("/register");
    } 
    //Authenticates user using the local strategy and redirecting to the homepage
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campgrounds"); 
    });
  }); 
});

//SHOW LOGIN FORM
router.get("/login", (req, res) => {
  res.render("login");
});

//HANDLING LOGIN LOGIC
//passport.authenticate() is acting as middleware to handle routing if login is successful or not
//passport.authenticate() was set up in line 22
router.post("/login", passport.authenticate("local", 
{
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), (req, res) => {
  //MIDDLEWARE HANDLES ROUTING
});

//LOGOUT ROUTE
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;