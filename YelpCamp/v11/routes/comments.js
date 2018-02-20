var express = require("express");

// var router = express.Router();
var router = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middleware = require("../middleware");

// NEW 
router.get("/new", middleware.isLoggedIn, function(req, res){

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

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    
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
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                } else {
                    
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    
                    comment.save();
                    
                    campground.comments.push(comment._id);
                    campground.save();
                    // res.redirect("/campgrounds/:id");
                    req.flash("success", "Comment added!");
                    
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    
});

// EDIT
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
    // res.send("comment edit page");
    // res.render("comments/edit");
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("/back");
        }
        // res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        res.render("comments/edit", {campground_id: req.params.id, comment: req.comment});
    });
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // res.send("comment update page");
    // res.render("comments/edit");
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("/back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // res.send("deleting");
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;