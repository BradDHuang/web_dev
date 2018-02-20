var express = require("express");

var router = express.Router();

var Campground = require("../models/campground");

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
router.get("/new", function(req, res){
    res.render("campgrounds/new"); // shows a form + POST
});

// CREATE
router.post("/", function(req, res){
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
router.get("/:id", function(req, res){
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

module.exports = router;