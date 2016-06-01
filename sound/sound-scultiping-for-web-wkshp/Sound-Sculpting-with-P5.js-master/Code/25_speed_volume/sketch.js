var mic, recorder, soundFile;

var state = 0; 

function setup() {
  var canvas = createCanvas(710, 400);

  mic = new p5.AudioIn();
  mic.start();

  recorder = new p5.SoundRecorder();

  recorder.setInput(mic);

  soundFile = new p5.SoundFile();

  fft = new p5.FFT();
  fft.setInput(mic);


}

function mousePressed() {
  //this will change the state between start(0), recording(1), playing(2)

  state++;
  if (state === 1 && mic.enabled) {
    recorder.record(soundFile);
  }

  else if (state === 2) {
    recorder.stop(); 
    soundFile.loop();
  }
  else if (state === 3) {
    //reset state
    soundFile.stop();
    state=0;
  }
}

function draw() {
  if (state<2) {
      //start or recording
      if (state===0){
        //start state
        background(200);
        text('Enable mic and click the mouse to begin recording', 20, 20);
      } else {
        //recording
        background(255,0,0);
        text('Recording. Click to stop and play', 20, 20);
      }
      //show spectrum
      var spectrum = fft.analyze();
      noFill();
      beginShape();
      for (i = 0; i<spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 255, height, 0) );
      }
      endShape();

  } else {
      //playback
      background(0,255,0);
      text('Recording stopped. Now playing. Drag the mouse around to rate and amplitude', 20, 20);

    // Set the volume to a range between 0 and 1.0
      text('Volume', 300, 40);
      var volume = map(mouseX, 0, width, 0, 1);
      volume = constrain(volume, 0, 1);
      soundFile.amp(volume);

      // Set the rate to a range between 0.1 and 4
      text('Speed', 20, 200);
      var speed = map(mouseY, 0.1, height, 0, 2);
      speed = constrain(speed, 0.01, 4);
      soundFile.rate(speed);

      // Draw some circles to show what is going on
      stroke(0);
      fill(51, 100);
      ellipse(mouseX, 100, 48, 48);
      stroke(0);
      fill(51, 100);
      ellipse(100, mouseY, 48, 48);
  }
}