var express = require("express"),
    passport = require("passport");

var router = express.Router();

var User = require("../models/user");

router.get("/", function(req, res){
    // res.send("home");
    res.render("landing");
});

// ***************
// Auth Routes
// ***************
// show sign up form
router.get("/register", function(req, res){
    res.render("register");
});
// handle the sign up
router.post("/register", function(req, res){
    // res.send("register here");
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            // console.log(err);
            req.flash("error", err.message);
            res.redirect("/register");
            // either set a flash message on the req.flash object before returning a res.redirect() 
            // or pass the req.flash object into the res.render() function
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", user.username + ", welcome!");
            
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
    // res.render("login", {message: req.flash("error")});
});

// handle the login

// middleware: passport.authenticate()

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout handling
router.get("/logout", function(req, res){
    // res.send("Logging out!");
    
    req.logout();
    req.flash("success", "You're logged out");
    res.redirect("/campgrounds");
});

module.exports = router;