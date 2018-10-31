const express    = require("express"),
      router     = express.Router(),
      isLoggedIn = require("../middleware/auth"),
      Campground = require("../models/campground");


//INDEX PAGE DISPLAYING ALL CAMPGROUNDS
router.get("/", isLoggedIn, (req, res) => {
    //Get all campgrounds from database
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log("Couldn't get all campgrounds: " + err)
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds,});
        }
    });
});

//CREATE ROUTE
router.post("/", (req, res) => {
  // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    //Sets default image if no image is entered
    if (image === ""){
        image = "https://d2cmub9v8qb8gq.cloudfront.net/0.19.0/static/img/no-image-available.jpg";
    }
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, (err, campground) => {
       if(err){
           console.log("Error adding new campground: " + err);
       } else{
            res.redirect("/campgrounds");
       }
    });
});

//NEW ROUTE
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

//SHOW ROUTE
router.get("/:id", (req, res) => {
     //find campground with the id
     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Couldn't find campground: " + err);
        } else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
     });
});

module.exports = router;