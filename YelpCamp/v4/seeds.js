var mongoose = require("mongoose");

var Campground = require("./models/campground");

var Comment = require("./models/comment");

var data = [
    {
        name: "to be 1",
        image: "http://cdn.akc.org/Marketplace/Breeds/Labrador_Retriever_SERP.jpg",
        description: "puppy"
    },    
    {
        name: "to be 2",
        image: "http://cdn.akc.org/Marketplace/Breeds/Labrador_Retriever_SERP.jpg",
        description: "puppy"
    },
    {
        name: "to be 3",
        image: "http://cdn.akc.org/Marketplace/Breeds/Labrador_Retriever_SERP.jpg",
        description: "puppy"
    }
];

function seedDB(){
    // Remove all
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } 
        console.log("All removed!");
        
        // Add some
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err) {
                    console.log(err);
                } else {
                    console.log("Some added!");
                    
                    Comment.create(
                        {
                            text: "this is the 1st comment!",
                            author: "by some nobody"
                        }, function(err, comment){
                            if (err) {
                                console.log(err);
                            } else {
                                // campground.comments.push(comment);
                                campground.comments.push(comment._id);
                                
                                campground.save();
                                console.log("Comment created!");
                            }
                        }
                    );
                }
            });
        });
    });
    
}

module.exports = seedDB;