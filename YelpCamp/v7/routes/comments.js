var express = require("express");

// var router = express.Router();
var router = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// NEW 
router.get("/new", isLoggedIn, function(req, res){

    // console.log(req.params.id);
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

router.post("/", isLoggedIn, function(req, res){
    
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

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;