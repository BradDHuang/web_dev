var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    
    Campground = require("./models/campground"),
    
    Comment = require("./models/comment"),
    
    seedDB = require("./seeds");
    // seedDB();

mongoose.connect("mongodb://localhost/y_camp_v5");
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
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
app.get("/campgrounds/:id/comments/new", function(req, res){

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

app.post("/campgrounds/:id/comments", function(req, res){
    
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the Camp Server is running...");
});