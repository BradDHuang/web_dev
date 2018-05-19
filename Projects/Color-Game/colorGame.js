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
var pickedColor = colors[3];
var displayColor = document.querySelector("#displayColor");

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
			alert("Right!!!");
		} else {
			alert("Try again!");
		}
	});
}
