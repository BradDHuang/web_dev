var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/cat_app", {useMongoClient: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);



// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// })

// george.save(function(err, cat){
//     if(err){
//         console.log("wrong!")
//     } else {
//         console.log("saved:")
//         console.log(cat);
//     }
// });

Cat.create({
    name: "White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

Cat.find({}, function(err, cats){
    if(err){
        console.log("error!");
        console.log(err);
    } else {
        console.log("all the cats...");
        console.log(cats);
    }
});