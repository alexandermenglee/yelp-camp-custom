const express       = require("express"),
      bodyParser    = require("body-parser"),
      Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      mongoose      = require("mongoose"),
      passport      = require("passport"),
      localStrategy = require("passport-local"),
      User          = require("./models/user"),
      app           = express(),
      seedDB        = require("./seeds");
  
const campgroundRoutes = require("./controller/campground"),
      commentRoutes = require("./controller/comments"),
      indexRoutes = require("./controller/index");

// seedDB();
app.use(express.static("public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "justice league",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MIDDLEWARE TO ADD CURRENT USER LOGIC TO ALL ROUTES
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//Connecting to MongoDB
mongoose.connect("mongodb://localhost/yelp_camp", err => {
    if(err){
        console.log(err);
    } else{
        console.log("MONGODB CONNECTION SUCCESSFUL");
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, (err) => {
  if(err){
    console.log(err);
  } else{
    console.log("Listening...");
  }
});
