// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/y_camp");
// y_camp is the db.

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
//     {
//         name: "location 1", 
//         image: "https://www.pixelslogodesign.com/blog/wp-content/uploads/2018/01/csm_Meng_Meng_Baby_1_88cad0f74f.jpg",
//         description: "animals in the world"
//     }, function(err, campground){
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//         {name: "location 1", image: "https://www.pixelslogodesign.com/blog/wp-content/uploads/2018/01/csm_Meng_Meng_Baby_1_88cad0f74f.jpg"},
//         {name: "location 2", image: "http://cdn.akc.org/Marketplace/Breeds/Labrador_Retriever_SERP.jpg"},
//         {name: "location 3", image: "http://cattime.com/assets/uploads/gallery/british-shorthair-cats-and-kittens/british-shorthair-cats-and-kittens-1.jpg"},
//         {name: "location 1", image: "https://www.pixelslogodesign.com/blog/wp-content/uploads/2018/01/csm_Meng_Meng_Baby_1_88cad0f74f.jpg"},
//         {name: "location 2", image: "http://cdn.akc.org/Marketplace/Breeds/Labrador_Retriever_SERP.jpg"},
//         {name: "location 3", image: "http://cattime.com/assets/uploads/gallery/british-shorthair-cats-and-kittens/british-shorthair-cats-and-kittens-1.jpg"},
//         {name: "location 1", image: "https://www.pixelslogodesign.com/blog/wp-content/uploads/2018/01/csm_Meng_Meng_Baby_1_88cad0f74f.jpg"},
//         {name: "location 2", image: "http://cdn.akc.org/Marketplace/Breeds/Labrador_Retriever_SERP.jpg"},
//         {name: "location 3", image: "http://cattime.com/assets/uploads/gallery/british-shorthair-cats-and-kittens/british-shorthair-cats-and-kittens-1.jpg"},
//         {name: "location 1", image: "https://www.pixelslogodesign.com/blog/wp-content/uploads/2018/01/csm_Meng_Meng_Baby_1_88cad0f74f.jpg"}
//         ];

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
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the Camp Server is running...");
});