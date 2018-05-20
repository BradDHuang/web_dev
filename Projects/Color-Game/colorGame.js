// alert("Connected!");

// var colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)"
// ];
var numOfColors = 6;
// var colors = getRandomColors(6);
var colors = getRandomColors(numOfColors);

var squares = document.querySelectorAll(".square");
// var pickedColor = colors[3];
// var num = Math.floor(Math.random(6)); // wrong syntax!
// var pickedColor = colors[num];
var pickedColor = pickColor();
var displayColor = document.querySelector("#displayColor");
var displayMsg = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
// var easyBtn = document.querySelector("#easy");
// var hardBtn = document.querySelector("#hard");
var modes = document.querySelectorAll(".mode");

for (var i = 0; i < modes.length; i++) {
	modes[i].addEventListener("click", function() {
		modes[0].classList.remove("selected");
		modes[1].classList.remove("selected");
		this.classList.add("selected");
		
		this.textContent === "Easy" ? numOfColors = 3 : numOfColors = 6;
		reset();
	});
}

function reset() {
	
	colors = getRandomColors(numOfColors);
	pickedColor = pickColor();
	
	displayColor.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		// squares[i].style.backgroundColor = colors[i];
		
		if (colors[i]) { // if (undefined), has an initial value of false.
		
			squares[i].style.display = "block"; // unhide the bottom 3 squares on Hard mode!
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none"; // hide the bottom 3 squares on Easy mode!
		}
	}
	
	h1.style.backgroundColor = "steelblue";
	
	displayMsg.textContent = "";
	resetBtn.textContent = "New Colors";
}

/*
easyBtn.addEventListener("click", function() {
	// alert("clicked a btn!");
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	numOfColors = 3;
	colors = getRandomColors(numOfColors);
	pickedColor = pickColor();
	
	displayColor.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		if (i < 3) {
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none"; // hide the bottom 3 squares!
		}
	}
	
	// h1.style.backgroundColor = "#000000";
});
hardBtn.addEventListener("click", function() {
	// alert("clicked a btn!");
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numOfColors = 6;
	colors = getRandomColors(numOfColors);
	pickedColor = pickColor();
	displayColor.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.display = "block"; // unhide.
		squares[i].style.backgroundColor = colors[i];
	}
});
*/
resetBtn.addEventListener("click", function() {
	// alert("clicked a btn!");
	reset();
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
	// var num = Math.floor(Math.random() * squares.length); 
	var num = Math.floor(Math.random() * colors.length); // there will be only 3 colors but still 6 squares on easy mode.
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
