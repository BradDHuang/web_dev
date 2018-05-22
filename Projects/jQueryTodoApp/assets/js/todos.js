// alert("connected");

// $("li").click(function() {
    
$("ul").on("click", "li", function() {    
    
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

// $("span").click(function(event) {
$("ul").on("click", "span", function(event) {
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

// $("input").keypress(function() {
$("input[type='text']").keypress(function(event) {
    // console.log(event);
    if (event.which === 13) { // keyCode/which of "Enter" is 13.
    // "which" is supported by more browsers.
        // console.log("Enter key was pressed.");
        // console.log($(this).val()); // this: the input text.
        // get the input text:
        var todoText = $(this).val();
        // create a New <li> with the todoText and add it to the <ul>:
        // $("ul").append("<li>a New li appended</li>");
        // $("ul").append("<li>" + todoText + "</li>");
        
        // now we need to empty the input text.
        $(this).val("");
        // adding the <span>.
        $("ul").append("<li><span>X</span> " + todoText + "</li>");
    }
});