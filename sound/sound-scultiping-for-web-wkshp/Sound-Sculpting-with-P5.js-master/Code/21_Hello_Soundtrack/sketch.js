var soundtrack;
var playbutton, stopbutton;
var analyzer;

function preload() {
  soundtrack = loadSound('soundtrack.mp3');
}

function setup() {
  createCanvas(400, 400);

  // loop sound
  soundtrack.loop();

  // stop sound to prevent it from playing automatically
  soundtrack.stop();

  // play button
  playbutton = createButton('Play');
  playbutton.position(25, 25);
  playbutton.mousePressed(playsound);

  // stop button
  stopbutton = createButton('Stop');
  stopbutton.position(75, 25);
  stopbutton.mousePressed(stopsound);

  // music visualizer
  analyzer = new p5.Amplitude();
  analyzer.setInput(soundtrack);
}

function draw() {
  background(255);

  // draw an ellipse based on current volume level
  var vol = analyzer.getLevel();
  noStroke();
  fill(255, 0, 0);
  ellipse(width / 2, height / 2, map(vol, 0, 1, 0, width), map(vol, 0, 1, 0, height));

}

function playsound() {
  if (soundtrack.isPlaying() == false) {
    soundtrack.play();
  }
}

function stopsound() {
  if (soundtrack.isPlaying() == true) {
    soundtrack.pause();
  }
}