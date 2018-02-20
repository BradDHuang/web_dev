var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

app.set("view engine", "ejs");

var friends = ["Adam", "Brad", "Cindy", "David", "Emma"];

app.get("/", function(req, res){
    res.render("home");
});

app.post("/addfriend", function(req, res){
    // console.log(req.body); // body-parser required!
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    // res.send("added");
    res.redirect("/friends");
});

app.get("/friends", function(req, res){
    // var friends = ["Adam", "Brad", "Cindy", "David", "Emma"];
    res.render("friends", {friends: friends});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running...");
});