var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

// https://web-dev-happitt.c9users.io/results
app.get("/results", function(req, res) {
    // res.send("It works!");
    request("http://www.omdbapi.com/?s=x-men&apikey=thewdb", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // res.send(body); 
            // body is a String!
            var data = JSON.parse(body);
            // res.send(results["Search"][0]["Title"]);
            // res.render("results.ejs");
            // res.render("results"); // results.ejs
            res.render("results", {data: data}); // [object Object] 
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("MovieAPI has started!");
});

