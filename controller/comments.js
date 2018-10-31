const express    = require("express"),
      router     = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      isLoggedIn = require("../middleware/auth"),
      Comment    = require("../models/comment");

//NEW COMMENT ROUTE
router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err){
      console.log(err);
    } else{
      res.render("comments/new", {campground: campground});
    }
  });
});

//CREATE COMMENT ROUTES
router.post("/", isLoggedIn, (req, res)=> {
  Campground.findById(req.params.id,(err, campground) => {
    if(err){
      console.log(err);
      res.redirect("index");
    } else{
      Comment.create(req.body.comment,(err, comment) => {
        if(err){
          console.log(err);
        } else{
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

module.exports = router;