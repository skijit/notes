// are we in draw mode?
var isDrawing = false;

function setup() {
  // set canvas size
  createCanvas(400, 400);
}

function draw() {
  if (isDrawing == true) {
    // draw a line
    stroke(0);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

// when the mouse button is pressed
function mousePressed() {
  // set our isDrawing variable equal to true
  isDrawing = true;
}

// when the mouse button is released
function mouseReleased() {
  // set our isDrawing variable equal to false
  isDrawing = false;
}

// when a keyboard button is pressed
function keyPressed() {
  // Clear the background
  background(255);
}