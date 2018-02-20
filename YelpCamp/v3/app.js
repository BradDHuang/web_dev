var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    
    Campground = require("./models/campground"),
    
    seedDB = require("./seeds");
    // seedDB();

mongoose.connect("mongodb://localhost/y_camp_v3");
// y_camp is the db.

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

seedDB();

app.get("/", function(req, res){
    // res.send("home");
    res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});

// NEW
app.get("/campgrounds/new", function(req, res){
    res.render("new"); // shows a form + POST
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
            
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the Camp Server is running...");
});