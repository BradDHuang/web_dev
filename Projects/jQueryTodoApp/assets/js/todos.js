// alert("connected");

$("li").click(function() {
    // alert("clicked li");
    // if ($(this).css("color") === "gray") { // It is a rgb value!
    /*
    if ($(this).css("color") === "rgb(128, 128, 128)") { // It is a rgb value!
        $(this).css({
            color: "black",
            textDecoration: "none"
        });
    }
    else {
        // $("li").css("color", "red");
        // $(this).css("color", "gray");
        // $(this).css("text-decoration", "line-through");
        $(this).css({
            color: "gray",
            // text-decoration: line-through // '-' wont work with .js
            textDecoration: "line-through"
        });
    }
    */
    
    $(this).toggleClass("completed");
});

$("span").click(function(event) {
    // alert("clicked a span");
    // $(this).remove();
    // $(this).parent().remove();
    // $(this).parent().fadeOut();
    $(this).parent().fadeOut(500, function() { // this: span
        $(this).remove(); // this: li(parent of span) 
        // fadeOut first and then remove.
    });
    
    event.stopPropagation(); // this method is used for stopping the event Bubbling!
});