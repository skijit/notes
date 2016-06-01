// color variable
var c;

function setup() {
  // set canvas size
  createCanvas(400, 200);

  // set default background color
  c = color(255, 255, 255);
}

function draw() {
  // clear background
  background(c);

  // mouse coordinates
  fill(0);
  text('X: ' + mouseX + ' Y: ' + mouseY, 25, 25);

}

function mousePressed() {
  // create a random background color
  c = color(random(255), random(255), random(255));
}