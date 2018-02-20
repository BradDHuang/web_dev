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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
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
    
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;