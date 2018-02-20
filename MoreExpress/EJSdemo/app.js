var express = require("express");
var app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

// route
app.get("/", function(req, res){
    // res.send("<h1>Welcome to the home page!</h1><h2>...</h2>");
    // res.render("home.ejs");
    res.render("home");
});

app.get("/fall/:thing", function(req, res){
    var thing = req.params.thing;
    // res.send(thing + " is falling");
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "post 1", author: "Susy"},
        {title: "post 2", author: "Tusy"},
        {title: "post 3", author: "Rusy"}
        ];
    res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running...");
});