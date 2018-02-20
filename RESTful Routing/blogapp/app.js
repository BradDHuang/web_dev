var express      = require("express"),

methodOverride   = require("method-override"),

expressSanitizer = require("express-sanitizer"),

bodyParser       = require("body-parser"),
mongoose         = require("mongoose"),
app              = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app');
// mongoose.connect('mongodb://localhost/users_test');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "2nd test blog",
//     image: "https://cdn.pixabay.com/photo/2016/02/15/13/26/horse-1201143_1280.jpg",
//     body: "2nd blog post!"
// })

// RESTFUL ROUTES

app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log("ERROR!");
        } else {
            res.render("index.ejs", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new.ejs");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // create and then redirect
    
    console.log(req.body);
    // req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("=========");
    console.log(req.body);
    
    Blog.create(req.body.blog, function(err, newBlog){
        if (err) {
            // console.log("ERROR!");
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    // res.send("SHOW PAGE!");
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show.ejs", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit.ejs", {blog: foundBlog});
        }
    });
    // res.render("edit.ejs");
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    // res.send("UPDATE PAGE!");
    
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, UpdatedBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DESTROY/DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    // res.send("delete page.");
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
})

