

var express = require("express");
var app = express();

// ***order of routes matters***
// "/" => "Hi there!"
app.get("/", function(req, res){ // request, response are objests.
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
  res.send("Goodbye!!"); 
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    console.log("SOMEONE MADE A REQUEST TO /DOG!!!")
  res.send("MEOW!"); 
});

app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
  res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
//   res.send("WELCOME TO THE SUBREDDIT!"); 
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
    res.send("WELCOME TO THE COMMENTS PAGE!"); 
});

// ***order of routes matters***
app.get("*", function(req, res){
  res.send("YOU ARE A STAR!!!"); 
});


// Tell Express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});
// process.env.PORT return a port#