// alert("Connected!");

// var colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)"
// ];
var colors = getRandomColors(6);

var squares = document.querySelectorAll(".square");
// var pickedColor = colors[3];
// var num = Math.floor(Math.random(6)); // wrong syntax!
// var pickedColor = colors[num];
var pickedColor = pickColor();
var displayColor = document.querySelector("#displayColor");
var displayMsg = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", function() {
	// alert("clicked a btn!");
	colors = getRandomColors(6);
	pickedColor = pickColor();
	
	displayColor.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
	
	h1.style.backgroundColor = "#000000";
});

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
			resetBtn.textContent = "Play Again?";
		
			h1.style.backgroundColor = pickedColor;
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

function getRandomColors(n) {
	// get n random colors;
	var arr = [];
	for (var i = 0; i < n; i++) {
		arr.push(getRandomColor());
	}
	return arr;
}
function getRandomColor() {
	// get a random color (in rgb);
	var r = Math.floor(Math.random() * 256); 
	var g = Math.floor(Math.random() * 256); 
	var b = Math.floor(Math.random() * 256);
	// "rgb(r, g, b)"
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
