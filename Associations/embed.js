var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var postSchema = new mongoose.Schema({
    
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    
    email: String,
    name: String,
    
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);



// var newUser = new User({
//     email: "dgh@b.edu",
//     name: "dgh",
    
//     // posts: [
//     //     {title: "title1", content: "content"},
//     //     {title: "title2", content: "content"},
//     //     {title: "title3", content: "content"}
//     //     ]
//     });
    
// newUser.posts.push({
//     title: "title4",
//     content: "null"
// });
    
// newUser.save(function(err, user){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "ed",
//     content: "dg"
//     });
// newPost.save(function(err, post){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "dgh"}, function(err, user){
    if (err) {
        console.log(err);
    } else {
        // console.log(user);
        user.posts.push({
            title: "titleNew",
            content: "New content"
        });
        
        user.save(function(err, user){
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});