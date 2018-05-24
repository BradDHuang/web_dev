var express = require("express");
var app = express();
var request = require("request");

// https://web-dev-happitt.c9users.io/results
app.get("/results", function(req, res) {
    // res.send("It works!");
    request("http://www.omdbapi.com/?s=harry&apikey=thewdb", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // res.send(body); 
            // body is a String!
            var results = JSON.parse(body);
            res.send(results["Search"][0]["Title"]);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("MovieAPI has started!");
});

