// x position variable
var xpos = 0;

// speed variable
var speed = 2;

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

  // increment x variable
  xpos = xpos + speed;

  // if the circle moves off screen, change the speed's polarity
  if ((xpos > width) || (xpos < 0)) {
    speed = speed * -1;
  }

  // draw a circle
  ellipse(xpos, 100, 25, 25);

  // display xpos variable
  fill(0);
  text("xpos = " + xpos, 25, 25);
}