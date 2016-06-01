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

  // instructions
  fill(0);
  text('Press the R, G or B key to change the background color', 25, 25);

}

function keyPressed() {
  // R key
  if (key == 'R' || key == 'r') {
    c = color(255, 0, 0);
  }

  // G key
  if (key == 'G' || key == 'g') {
    c = color(0, 255, 0);
  }

  // B key
  if (key == 'B' || key == 'b') {
    c = color(0, 0, 255);
  }
}