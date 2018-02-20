// All the middleware

var middlewareObj = {};

var Campground = require("../models/campground"),
    Comment = require("../models/comment");

middlewareObj.checkPostOwnership = function(req, res, next){
    // check 1: if logged in
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err || !foundCampground) {
                req.flash("error", "Not found!");
                
                res.redirect("/campgrounds");
            } else {
                
    // check 2: if match
                // foundCampground.author.id is an mongoose-object
                // req.user._id is a String
                if (foundCampground.author.id.equals(req.user._id)) {
                    // res.render("campgrounds/edit", {campground: foundCampground});
                    req.campground = foundCampground;
                    
                    next();
                } else {
                    // res.send("No permission");
                    req.flash("error", "You can't do that!");
                    
                    res.redirect('back');
                }
                
            }
        });
    } else {
        // console.log("login plz");
        // res.send("login plz");
        req.flash("error", "Please login first!");
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    // check 1: if logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err || !foundComment) {
                req.flash("error", "Not found!");
                res.redirect("back");
            } else {
                
    // check 2: if match
                // foundCampground.author.id is an mongoose-object
                // req.user._id is a String
                if (foundComment.author.id.equals(req.user._id)) {
                    // res.render("campgrounds/edit", {campground: foundCampground});
                    req.comment = foundComment;
                    
                    next();
                } else {
                    // res.send("No permission");
                    req.flash("error", "You can't do that!");
                    res.redirect('back');
                }
            }
        });
    } else {
        // console.log("login plz");
        // res.send("login plz");
        req.flash("error", "Please login first!");
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    
    req.flash("error", "Please login first!");
    res.redirect("/login");
};

module.exports = middlewareObj;