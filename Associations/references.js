var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_4");

var Post = require("./models/post");

var User = require("./models/user");

// User.create({
//     email: "guagua@ta.edu",
//     name: "guagua"
// });

Post.create({
    title: "v3 how to cook",
    content: "just save!"
}, function(err, post){
    if (err) {
        console.log(err);
    } else {
        // console.log(post);
        User.findOne({email: "guagua@ta.edu"}, function(err, foundUser){
            if (err) {
                console.log(err);
            } else {
                // user.posts.push({title: "titleNew", content: "New content"});
                // user.posts.push(post);
                foundUser.posts.push(post._id);
            
                foundUser.save(function(err, data){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
    }
});

// User.findOne({email: "guagua@ta.edu"}).populate("posts").exec(function(err, user){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });