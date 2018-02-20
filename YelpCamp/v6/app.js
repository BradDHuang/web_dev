var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    
    Campground = require("./models/campground"),
    
    Comment = require("./models/comment"),
    
    User = require("./models/user"),
    
    seedDB = require("./seeds");
    // seedDB();

// passport config
app.use(require("express-session")({
    secret: "secret here",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

mongoose.connect("mongodb://localhost/y_camp_v6");
// y_camp is the db.

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
// console.log(__dirname); // /home/ubuntu/workspace/YelpCamp/v5

seedDB();

app.get("/", function(req, res){
    // res.send("home");
    res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res){
    
    // req.user
    
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            // res.render("campgrounds/index", {campgrounds: allCampgrounds});
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});

// NEW
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new"); // shows a form + POST
});

// CREATE
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var descr = req.body.description;
    var newCampground = {name: name, image: image, description: descr};
    // campgrounds.push(newCampground);
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds"); // redirect to .get page
        }
    });
});

// SHOW
app.get("/campgrounds/:id", function(req, res){
    // res.send("home");
    // Campground.findById(req.params.id, function(err, foundCampground){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// *********
// Nested Routes: Comments Routes
// *********

// NEW 
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){

    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    // res.send("comments");
    // res.render("comments/new");
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds"); 
        } else {
            // var text = req.body.text;
            // var author = req.body.author;
            // both are grouped together in comments/new.ejs
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment._id);
                    campground.save();
                    // res.redirect("/campgrounds/:id");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    
});

// ***************
// Auth Routes
// ***************
// show sign up form
app.get("/register", function(req, res){
    res.render("register");
});
// handle the sign up
app.post("/register", function(req, res){
    // res.send("register here");
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// show login form
app.get("/login", function(req, res){
    res.render("login");
});

// handle the login

// middleware: passport.authenticate()

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout handling
app.get("/logout", function(req, res){
    // res.send("Logging out!");
    
    req.logout();
    
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the Camp Server is running...");
});