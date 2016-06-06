Reactive and Spatial Arrangments
==============
A Moogfest 2016 workshop by [Dave and Gabe](http://www.daveandgabe.care/)
 
## Multichannel 
- Workflow:
    - Interface (midi) -> Live + Max4L -> Jack -> Max (standalone) + SPAT -> Multichannel
    - One issue with this approach is using Ableton -> Jack -> Max all on one computer.
        - A better approach would be to find some streaming audio approach and offload the work to another machine. 
        - **TODO: find a good way to stream audio between machines**
- SPAT
    - Developed by IRCAM
    - Supports lots of panning algorithms
    - references:
        - [SPAT Reference] (http://www.daveandgabe.care/moogfest)
        - [Official ref - less good](http://forumnet.ircam.fr/wp-content/uploads/2012/10/Spat4-UserManual1.pdf) 

## Reactive 
- Two areas for interactivity in music:
    - Interface design
    - Reactive spatialization
    - For success, there needs a clear connection between user input - ouput
- [Teensy](https://www.sparkfun.com/products/13736) microcontrollers
    - This is a very small microcontroller, like arduino, that you can attach to your computer via USB
    - Security people seem to like them for their ability to emulate USB-devices like keyboards, etc.
    - Music applications involve having it send USB-Midi
        - So you can develop new music interface devices by attaching sensors / hardware to it
    - Looks like it is typically developer for using C 

## Info on creating my own MultiChannel speaker setup
- Good Audio Interface: [Motu 828](http://www.motu.com/products/motuaudio/828x)
- Amps:
    - You need one for each channel
    - They recommended the [Crown CTS 8150](http://www.crownaudio.com/en/products/ct-8150)
        - 8 channels
        - Quite expensive
    - There are probably some other good options
- Speaker design is not so difficult 
    - Look into [Parts-Express](https://www.parts-express.com/)
    - Look into crossover circuits
        - Spatial subs - maybe not needed
 
 ## Misc
- [Workshop home page with lots of useful links](http://www.daveandgabe.care/moogfest)
- [National Sawdust](http://nationalsawdust.org/)- a neat multichannel venue in NY
- Interesting 8bit chiptune band- Anamanaguchi
- Max/MSP stuff
    - plugsync~ will give you ableton transport info
        - bar
        - beat
        - tempo
        - clicks
        - time signature
- VR is driving a lot of interest in 3D audio



    

