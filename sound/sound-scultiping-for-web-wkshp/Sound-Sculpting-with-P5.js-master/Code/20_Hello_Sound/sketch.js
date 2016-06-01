var sound;

function preload() {
  // initialize sound
  sound = loadSound('sound.mp3');
}


function setup() {
  createCanvas(200, 200);

  // display instructions
  textAlign(CENTER);
  fill(100);
  noStroke();
  text("Click to play sound", width / 2, height / 2);
}

function draw() {

}

function mousePressed() {
  // trigger sound
  sound.play();

  // change background color
  background(random(255), random(255), random(255));

}