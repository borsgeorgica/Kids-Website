

function Block (x,y,img) {
	this.x = x+5;
	this.y = y+5;
	this.width = WIDTH/4-10;
	this.height  = HEIGHT/4-10;
	this.img = img;
}

Block.prototype.drawFaceDown = function(){
	
	context.fillStyle= "rgb(0,0,255)";
	context.beginPath();
	context.rect(this.x,this.y,this.width,this.height); 
	context.fill();
	this.isFaceUp = false;

	
}

Block.prototype.drawImage = function(){
	//context.beginPath();
	//context.lineWidth = "1";
	//context.rect(this.x+5,this.y+5,this.width,this.height);
	//context.stroke();
	context.drawImage(this.img,this.x,this.y,this.width,this.height);
	this.isFaceUp = true;
}

Block.prototype.blockIsClicked = function(x,y) {
	//return (x>= this.x) && (x<=this.x + this.width) && (y >= this.y) && (y<= this.y + this.height);
	return x >= this.x && x <= this.x + this.width  &&
        y >= this.y && y <= this.y + this.height;
}


function shuffleArray(a) {
    var j, x, i;
    for (i = a.length; i>=1; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
	return a
}

function shuffleImages(context,myImages) {
	
	for (var i=0; i<8 ; ++i){
		myImages.push(myImages[i]);  // double the array
	}
	myImages = shuffleArray(myImages); // shuffle the array

	var blocks = [];
	counter = 0;
	for (var i=0; i < NUM_ROWS; i++) {  //add the images to the blocks
		for (var j=0; j < NUM_COLS; j++) {
			blocks.push(new Block(j*(WIDTH/4),i*(HEIGHT/4),myImages[counter]));
			++counter;
		}
	}
	//start game
	finalBlocks = blocks;
	//imagesShuffled = true;
	gameStart();

}

function  gameStart() {
	
	for (var i = 0; i < finalBlocks.length; i++) {
		finalBlocks[i].drawFaceDown();
	}
	/*while (gameStarted) {
		if(userClickedBlock && puzzleFinished){
			window.alert("Game is finished!!");
			resetGame();
			
		}
			
	}
	*/
	// start animation
	
	
	//imagesShuffled = false;
	
}

function uncoverBlock(block){
	block.drawFaceDown();
	flippedBlocks = 0;
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

function mouseClicked (evt) {	
	
	var rect = canvas.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y = evt.clientY - rect.top;

	for (var i=0; i<finalBlocks.length; ++i) {
		if (finalBlocks[i].blockIsClicked (x,y) == true) {
			if(flippedBlocks < 2 && !finalBlocks[i].isFaceUp) {
				finalBlocks[i].drawImage();
				previousBlock = currentBlock;
				currentBlock = finalBlocks[i];
				++flippedBlocks;
				//userClickedBlock = true;
				
				if (flippedBlocks == 2 && previousBlock.img != currentBlock.img){
					
					setTimeout(uncoverBlock,500,previousBlock);
					setTimeout(uncoverBlock,500,currentBlock);
				}
			
				if (flippedBlocks == 2 && previousBlock.img == currentBlock.img){
					flippedBlocks = 0;
				}
				
				if (puzzleFinished()) {
					setTimeout(finish,100);
					
					
					
				}
				
			}
		}
		//if (puzzleFinished())
		//	window.alert("Game is finished!!");
	}
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

function finish() {
	//window.alert("Game finished!!!!");
	animation();
}

function initAndStart(context) {
	var names = ["./images/bunny.jpg", "./images/bunny2.jpg","./images/cat.jpg", "./images/eiffeltower.jpg", 
			"./images/landscape.jpg", "./images/nederlanden.jpg", 
			"./images/redsquare.jpg", "./images/windclock.jpg"];
	
	loadImages(context, names, shuffleImages);
}

function resetGame() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
	gameStarted = false;
	//userClickedBlock = false;
	
}

function puzzleFinished(){
	var finished = true;
	for(var i=0; i< finalBlocks.length; ++i){
		if (!finalBlocks[i].isFaceUp)
			finished = false;
	}
	return finished;
}

/******************************************************/

function nextFrame() {
	timeOut = setTimeout(function() {
		requestId = requestAnimationFrame(nextFrame);
		update();
		draw();
		console.log("after draw");
		console.log(gameStarted);
	}, 100); // render one frame every second
}

/*
function nextFrame() {
 /* setTimeout(function() {
    requestId = requestAnimationFrame(nextFrame);
    //update();
    draw();
  }, 50);
  requestId = requestAnimationFrame(nextFrame);
  //update();
  timeOut = setTimeout(draw,1000);
  var date = new Date();
  var now = date.getTime();
  //displayTime(now-startTime);
  if (now-startTime > timePeriod) {
    stop();
  }
}
*/

function animation() {
	
	x = 100;
	y = 100;
	
	dx = 2;
	dy = 3;
	draw();
	nextFrame();
}

function draw() {


	context.clearRect(0, 0, WIDTH, HEIGHT);
	var r = Math.floor(Math.random()*255);
	var g = Math.floor(Math.random()*255);
	var b = Math.floor(Math.random()*255);
	context.fillStyle = "rgb("+r+","+g+","+b+")";

	context.font = "40px Verdana";
	context.fillText("FINISH", x, y);

//context.strokeStyle = "rgb(255,0,255)";

}

function stop() {
	
	
	if (requestId) {
		cancelAnimationFrame(requestId);
		
		console.log("uite");
	}

	if(timeOut) {
		 clearTimeout(timeOut);
	}
	//gameStarted = false;
}

function update() {
  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;
  if (y + dy > HEIGHT || y + dy < 0)
    dy = -dy;
    
  x += dx;
  y += dy;
}
// call animation ;
// variables for text animation //
var x, y, dx, dy;

var requestId;
var timeOut;
/////////////////////////////////
var canvas = document.getElementById("puzzle_canvas");
var context = canvas.getContext("2d"); // Check for context
//******************************************************
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
//console.log(WIDTH + "width");
//console.log(HEIGHT + "height");
var NUM_COLS = 4;
var NUM_ROWS = 4;

var startButton = document.getElementById("startgame");
var resetButton = document.getElementById("resetgame");
var stopButton = document.getElementById("stop");

var flippedBlocks = 0;
var previousBlock;
var currentBlock;
var finalBlocks;
var gameStarted = false;
//var userClickedBlock = false;
//var timePeriod = 20000;
//var startTime;

//var imagesShuffled = false;

resetButton.addEventListener("click", function() {
	if (gameStarted){
		stop();
		resetGame();
	}
		
});
	
canvas.addEventListener("click", function(evt) { 
	if (gameStarted){
		mouseClicked(evt);
	}
} );

startButton.addEventListener ("click", function() {
	if (!gameStarted) {
		initAndStart(context);
		gameStarted = true;
	}
	
});

stopButton.addEventListener("click", stop); 

//animation();


//initAndStart(context);
