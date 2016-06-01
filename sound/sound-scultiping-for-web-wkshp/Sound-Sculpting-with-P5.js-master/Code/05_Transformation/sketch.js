function setup() {
  var arrowCanvas = createCanvas(300, 300);
  arrowCanvas.parent('spin');
  angleMode(DEGREES);
}

function draw() {
  background(255);

  // Red rectangle
  // Translate, then rotate
  fill(255, 0, 0);
  push();
  translate(150, 75);
  rotate(frameCount);
  line(-100, 0, 100, 0);
  line(0, -100, 0, 100);
  rect(0, 0, 60, 80);
  pop();

  // Green rectangle
  // Rotate, then translate
  fill(0, 255, 0);
  push();
  rotate(frameCount);
  translate(150, 150);
  line(-100, 0, 100, 0);
  line(0, -100, 0, 100);
  rect(0, 0, 60, 80);
  pop();

  // Blue rectangle
  // Translate, then rotate, draw at a position of -w/2, -h/2
  //   where w and h are the width and height of the the rectangle
  fill(0, 0, 255);
  push();
  translate(150, 225);
  rotate(frameCount);
  line(-100, 0, 100, 0);
  line(0, -100, 0, 100);
  rect(-30, -40, 60, 80);
  pop();
}