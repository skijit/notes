Sound Sculpting in a Website
===========================
A Moogfest 2016 workshop given by Matt Ganucheau about p5.js

## Info
- [Github link](https://github.com/mganucheau/Sound-sculpting-with-p5.js) to workshop materials
    - Lots of p5 examples involving setup, 2d animation, and audio processing
- P5 is a more portable, javascript implementation of Processing
- If you want to do 3d stuff, you should integrate with another library: three.js
- Very good as a prototyping tool... where low-latency performance is required look at other stuff
- Audio examples that were covered:
    - Delay (in this case, ping pong)
    - Synthesis (in this case, FM, AM)
    - reverb
    - recording   
- See OSC notes in the keyboard example
- Note that the P5 Editor comes with lots of built-in examples to get started.
- Look into [MQTT](http://mqtt.org/) (similar to OSC)
- Look into the [Makey makey](http://www.makeymakey.com/) as an interface for js
    - It's a little USB device that simulates keypresses or mouse interaction
    - It takes its input from an array of alligator clips which can be connected to anything:
        - Bananas
        - Play doh
        - etc
- There are tons of other libraries to use on the P5 website
    - p5.sound
- You're not limited to just interaction with a canvas.  You can have hooks with DOM elements/events:
    - You have the Dom library will lets you create DOM elements which can interact with what happens on the canvas.
    - Touch events are handled in the API
   
## Hello world
- this is a `- test`
- this is a `normal codespan`
- same as this `normal codespan` ?

```(js)
function setup() {
    createCanvas(640, 480);
}

function draw() {
    ellipse(100,100,80,80);
}```

## Some more drawing

```(js)
function setup() {
    createCanvas(640, 480);
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(random(255));
    }
    ellipse(mouseX,mouseY,80,80);
}```
 