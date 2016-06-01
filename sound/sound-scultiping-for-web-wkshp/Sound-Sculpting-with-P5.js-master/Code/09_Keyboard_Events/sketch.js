// x position variable
var xpos = 200;

// y position variable
var ypos = 100;

function setup() {
  // set canvas size
  createCanvas(400, 200);
}

function draw() {
  // clear background
  background(255);

  // set the fill color
  fill(255, 0, 0);

  // black outline
  stroke(0);

  // set the ellipse mode
  ellipseMode(CENTER);

  // draw a circle
  ellipse(xpos, ypos, 25, 25);
}

function keyPressed() {
  xpos = random(0, width);
  ypos = random(0, height);
}