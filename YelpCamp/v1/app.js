var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
        {name: "location 1", image: "https://www.pixelslogodesign.com/blog/wp-content/uploads/2018/01/csm_Meng_Meng_Baby_1_88cad0f74f.jpg"},
        {name: "location 2", image: "http://cdn.akc.org/Marketplace/Breeds/Labrador_Retriever_SERP.jpg"},
        {name: "location 3", image: "http://cattime.com/assets/uploads/gallery/british-shorthair-cats-and-kittens/british-shorthair-cats-and-kittens-1.jpg"},
        {name: "location 1", image: "https://www.pixelslogodesign.com/blog/wp-content/uploads/2018/01/csm_Meng_Meng_Baby_1_88cad0f74f.jpg"},
        {name: "location 2", image: "http://cdn.akc.org/Marketplace/Breeds/Labrador_Retriever_SERP.jpg"},
        {name: "location 3", image: "http://cattime.com/assets/uploads/gallery/british-shorthair-cats-and-kittens/british-shorthair-cats-and-kittens-1.jpg"},
        {name: "location 1", image: "https://www.pixelslogodesign.com/blog/wp-content/uploads/2018/01/csm_Meng_Meng_Baby_1_88cad0f74f.jpg"},
        {name: "location 2", image: "http://cdn.akc.org/Marketplace/Breeds/Labrador_Retriever_SERP.jpg"},
        {name: "location 3", image: "http://cattime.com/assets/uploads/gallery/british-shorthair-cats-and-kittens/british-shorthair-cats-and-kittens-1.jpg"},
        {name: "location 1", image: "https://www.pixelslogodesign.com/blog/wp-content/uploads/2018/01/csm_Meng_Meng_Baby_1_88cad0f74f.jpg"}
        ];

app.get("/", function(req, res){
    // res.send("home");
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new"); // shows a form + POST
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds"); // redirect to .get page
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the Camp Server is running...");
});