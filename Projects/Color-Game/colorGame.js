// alert("Connected!");

var colors = [
	"rgb(255, 0, 0)",
	"rgb(255, 255, 0)",
	"rgb(0, 255, 0)",
	"rgb(0, 255, 255)",
	"rgb(0, 0, 255)",
	"rgb(255, 0, 255)"
];

var squares = document.querySelectorAll(".square");
// var pickedColor = colors[3];
// var num = Math.floor(Math.random(6)); // wrong syntax!
// var pickedColor = colors[num];
var pickedColor = pickColor();
var displayColor = document.querySelector("#displayColor");
var displayMsg = document.querySelector("#message");

displayColor.textContent = pickedColor;

// style.backgroundColor (more Browsers support this syntax.)
// style.background

for (var i = 0; i < squares.length; i++) {
	// init.
	squares[i].style.backgroundColor = colors[i];

	// events
	squares[i].addEventListener("click", function() {
		// alert("clicked a square!");
		var clickedColor = this.style.backgroundColor;
		
		if (clickedColor === pickedColor) {
			// alert("Right!!!");
			changeColors(pickedColor);
			displayMsg.textContent = "You're right!";
		} else {
			// alert("Try again!");
			// fade out
			this.style.backgroundColor = "#000000";
			displayMsg.textContent = "Try again!";
		}
	});
}

function changeColors(color) {
	// change all squares and h1 colors when "right"

	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	// var num = Math.floor(Math.random(6)); // wrong syntax!
	// var num = Math.floor(Math.random() * 6); 
	var num = Math.floor(Math.random() * squares.length); 
	return colors[num];
}
