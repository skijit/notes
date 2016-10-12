Musical Acoustics Class Notes
==================
- [Class Videos](http://msp.ucsd.edu/170-webm/)
- [Syllabus](http://musicweb.ucsd.edu/~mpuckette/syllabi/170.13f/index.htm)
- [course notes / textbook](http://musicweb.ucsd.edu/~mpuckette/syllabi/170.13f/course-notes/index.html)

## Lecture 1
- Sound represented as a signal is typically a single channel of information, whereas a sound field in air is like an infinitude of channels.
    - The sound is different at each location in space.
- Digital Audio Workflow:
    - Sound -> microphone -> ADC -> computer/memory -> DAC -> Loudspeaker -> ear
- When you make a recording, you...
    - Take out the infinitude of channels
    - Throw out the time domain (b/c things are arranged spatially e.g. on a wax cylinder or in memory)

## Book - Chapter 1
- Big stuff you need to learn in Acoustics:
    - How sounds behave in the physical world
    - How human hearing works
    - how to manipulate sound (using computers)
- A sound is time-varying motion of air (or some other medium) with an accompanying change in pressure. 
    - motion and the pressure depend on physical location.
    - motion can be periodic or not 
    - Knowing the pressure and motion at *one point* in the air does *not* inform you what the pressure and motion might be at any *other point*.
- Sound can be mediated as signals which can be mediated as recordings
- Analog signal is a voltage or current that goes up and down in time *analog*ous to the changing pressure at a fixed location.
- Usually the analog signal doesn't reflect absolute pressure, but its deviation from the avg atmospheric presure, and thus it can positive and negative values.

&nbsp;
&nsbp;

**Common Signal Types**
- **Sinusoid**
    ```+
    x(t) = \alpha \cos(2\pi ft + \phi_0)
    ```
    - ```- \alpha ``` : amplitude
    - ```- f ``` : frequency in cycles per unit time
        - If time is measured in seconds, the frequency is measured in Hz
    - ```- \phi_0 ``` : initial phase
    - Relationship of Frequency (```- f ```) to Period (```- \tau ```)
        - ```- f = 1 / \tau ```
        - ```- \tau = 1 / f ```
- **White Noise**
    - Uniform White Noise: Every sample point is a random number between ```- -\alpha``` and ```- \alpha```, where ```- \alpha ``` is the amplitude.
    - Other types of white noise exist corresponding to various probabalistic distributions (e.g. gaussian)

&nbsp;   
&nbsp;   

** Pitch Units => Octaves**
- Octaves are a natural unit of measurement because changing the octave has a uniform effect on the perceived pitch
- Octaves are a logarithmic unit
    - each successive Octave's frequency is a doubling of the previous 
        - successive multiplications of a base = exponentiation
    - Or rather, related to a base frequency, ```- f_0``` (e.g. 440 Hz), the new frequency is:
    ```+ f = f_0 \cdot 2^I```
        - Where ```- I ``` is the interval in octaves
    - Solving for ```- I ```, you get:
    ```+ I = \log_2 \left( \frac{f_0}{440} \right) ```
- In western music, the octave is divided into 12 half steps, so you can relate ```- H ```, the number of half steps, to an interval ```- I ``` (in units of octaves) by:
    ```+ H = 12 \cdot I```
    or
    ```+ I = H / 12 ```

&nbsp;   
&nbsp;   

** Amplitude Units => Decibels **
- Decibels are a natural unit of measurement of loudness b/c
    - **Huge Range**: The ratio of just-audible to dangerously loud amplitudes is around 100,000
    - In sound engineering, most operations act multiplicatively, but with a logarithmic scale, you can treat these as additions.





