//script
//******************************************************

/*context.strokeStyle= "rgb(0,0,255)";
context.lineWidth= "5";
context.beginPath();
context.moveTo(0,0);
context.lineTo(100,100);

context.stroke();

// return Math.random()*x;

*/
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length; i>=1; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
		
		//console.log(i-1);
		//console.log(j);
		//console.log(";");
    }
	return a
}

function shuffleImages(context,myImages) {
	
	for (var i=0; i<8 ; ++i){
		myImages.push(myImages[i]);  // double the array
	}
	myImages = shuffleArray(myImages); // shuffle the array

	var grid = new Array(4); // create a 2D array
	for (var i = 0; i < 4; ++i) {
		grid[i] = new Array(4);
	}
	grid[0][0] = 3.0;
	var counter = 0;
	for (var i=0; i<4;++i){
		for (var j=0; j<4 ;++j){
			grid[i][j] = myImages[counter];
			++counter;
			
		}
	}

	draw(context, grid);
}

function draw(context, grid) {
	counter = 0;
	for (var i=0; i<4; ++i) {
		for (var j=0; j<4; ++j) {
			var x = (WIDTH/4)*j;
			var y = (HEIGHT/4)*i;
			context.drawImage(grid[i][j],x,y,WIDTH/4,HEIGHT/4);	
			//++counter;
		}	
	}
}

function initAndStart(context) {
	var names = ["./images/bunny.jpg", "./images/bunny2.jpg","./images/cat.jpg", "./images/eiffeltower.jpg", 
			"./images/landscape.jpg", "./images/nederlanden.jpg", 
			"./images/redsquare.jpg", "./images/windclock.jpg"];
	
	loadImages(context, names, shuffleImages);
}

function loadImages(context,filenames,callback) {
	var myImages = new Array(filenames.length);
	var imageCount = 0;
	for (var i=0; i< filenames.length;++i) {
		myImages[i] = new Image();
		myImages[i].onload = function() {
			imageCount++;
			if (imageCount==filenames.length) callback(context,myImages);
		}
		myImages[i].src = filenames[i];
	}
}

var canvas = document.getElementById("puzzle_canvas");
var context = canvas.getContext("2d"); // Check for context
//******************************************************
var WIDTH = canvas.width;
var HEIGHT = canvas.height;

initAndStart(context);
