var express = require("express");

var router = express.Router();

var Campground = require("../models/campground");

// var middleware = require("../middleware/index.js");
var middleware = require("../middleware");
// require index.js by default

// INDEX
router.get("/", function(req, res){
    
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
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new"); // shows a form + POST
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var descr = req.body.description;
    
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    // var newCampground = {name: name, image: image, description: descr};
    var newCampground = 
        {name: name, image: image, description: descr, author: author};
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
router.get("/:id", function(req, res){
    // res.send("home");
    // Campground.findById(req.params.id, function(err, foundCampground){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err || !foundCampground) {
            console.log(err);
            req.flash('error', 'Not found!');
            return res.redirect('/campgrounds');
        }
        console.log(foundCampground);
            
        res.render("campgrounds/show", {campground: foundCampground});
        
    });
});

// EDIT
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkPostOwnership, function(req, res) {
    
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash("error", "Not found!");
            res.redirect("/campgrounds");
        }
        // res.render("campgrounds/edit", {campground: foundCampground});
        res.render("campgrounds/edit", {campground: req.campground});
    });
});

// UPDATE
router.put("/:id", middleware.checkPostOwnership, function(req, res){
    
    Campground.findByIdAndUpdate(
        req.params.id, 
        req.body.campground, 
        function(err, updatedCampground){
            if (err) {
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
    });
});

// DESTROY
router.delete("/:id", middleware.checkPostOwnership, function(req, res){
    // res.send("deleting");
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;