var textSizeSlider;

function setup() {
  createCanvas(400, 400);

  // create a slider (min, max, default value)
  textSizeSlider = createSlider(10, 72, 36);
  textSizeSlider.position(25, 25);
}

function draw() 
{
  background(255);
  
  // display text
  noStroke();
  fill(100);
  textAlign(CENTER);
  textFont("Georgia");
  textSize(textSizeSlider.value()); 
  text("Size: " + textSizeSlider.value(), width/2, height/2); 
}