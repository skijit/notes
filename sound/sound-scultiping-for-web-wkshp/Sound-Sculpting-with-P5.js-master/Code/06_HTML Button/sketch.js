var textColorButton;

var textColor;

function setup() {
  createCanvas(400, 400);

  // default text color
  textColor = color(0, 0, 0);

  // create clear button
  textColorButton = createButton('Change Color');
  textColorButton.position(25, 25);
  textColorButton.mousePressed(changeColor); 
}

function draw() 
{
  background(255);
  
  // display text
  noStroke();
  fill(textColor);
  textAlign(CENTER);
  textFont("Georgia");
  textSize(72); 
  text("Color", width/2, height/2); 
}

function changeColor()
{
  textColor = color(random(255), random(255), random(255));
}