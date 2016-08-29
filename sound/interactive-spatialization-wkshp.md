Interactive spationalization of Sound
=====================
- A Moogfest 2016 workshop given by Ivica Ico Bukvic
- He contends that 20th century was (maybe) about emancitpation of timbre and that the 21st century may be about emancipation of spatialization

## History of spatialization
- 1931: Allan Blumline invents stereophonic panning
- 1958: Stockhausen - Contact - Quadrophnic sound
- 1958 Worlds Fair, [Phillips Pavillion](https://en.wikipedia.org/wiki/Philips_Pavilion) - hundreds of speakers  (look this up)
- 1970: Ambisonics - spatialization technique
- 1988: Wavefield synthesis 
    - Adjacent, densley packed, speakers fire with slight delays to recreate the wavefront
        - Center speaker starts, Side speakers with progressive delays
- 1997: Vector based amplitude panning
- Sonic Particles software - algorithm 
- 2013: Cube at VaTech
    - 40 x 40 ft
    - 128 speakers
    - Can use all the existing algorithms / methods
    - Can be used with VR
    - Used for sonification purposes
    - Ultrasonic speakers are projected downwards from the ceiling.
        - They become audible when they bounce off a surface.
        - They are like audio spotlights.
        - The fidelity is pretty low: like AM radio
        
## D^4: A new software-based solution 
- Developed by his [group](http://l2ork.music.vt.edu/main/) at VaTech 
- Approach: 
    - Irregular high density Loudspeak Arrays (HDLA)
        - Doesn't require specific formations or densities
    - Focus on flexibility to minimize the idiosyncrasies that attend predecessor algorithms
    - Be able to have different experiences as you move around the space / field
    - Easy to use
    - scalable
- Features / Characteristics:
    - LBAP Algorithm (monophonic to HDLA)
    - Rapid prototyping library
    - For max/msp
    - Should be released in a month or so...
    - Also lets you apply a 'mask' which includes/excludes specific areas of the audio image
        - Ex: Map 3 sounds to R,G,B and input an image: interesting sonification technique
    - You can also crossfade to different masks / audio images
        - You draw each mask, and trigger the animation which will xfade from one image to the next
        - You can see a 3d representation of speakers and what they do
    - Lets you reconfigure speaker calibration
        - you will able to have speaker configuration files    