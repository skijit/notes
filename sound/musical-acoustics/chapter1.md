Acoustics - Chapter 1
==================
- [Class Videos](http://msp.ucsd.edu/170-webm/)
- [Syllabus](http://musicweb.ucsd.edu/~mpuckette/syllabi/170.13f/index.htm)
- [course notes / textbook](http://musicweb.ucsd.edu/~mpuckette/syllabi/170.13f/course-notes/index.html)

## Overview
- Big stuff you need to learn in Acoustics:
    - How sounds behave in the physical world
    - How human hearing works
    - How to manipulate sound (using computers)
- Sound is a time-varying motion of air (or some other medium) with an accompanying change in pressure. 
    - exact motion and the pressure depend on physical location of the observer / measurment
    - motion can be periodic or not 
- Sound in an air field is like an infinitude of signals
    - Knowing the pressure and motion of a sound at *one point* in the air does *not* inform you what the pressure and motion might be at any *other point*.
- When you make a recording, you...
    - Take out the infinitude of channels
    - Throw out the time domain (b/c things are arranged spatially e.g. on a wax cylinder or in memory)
- Analog signal is a voltage or current that goes up and down in time *analog*ous to the changing pressure at a fixed location.
- Usually the analog signal doesn't reflect absolute pressure, but its deviation from the avg atmospheric presure, and thus it can positive and negative values.

## Basic Signals

### Sinusoid
```+ x(t) = \alpha \cos(2\pi ft + \phi_0) ```
- ```- \alpha ``` : amplitude
- ```- f ``` : frequency in cycles per unit time
    - If time is measured in seconds, the frequency is measured in Hz
- ```- \phi_0 ``` : initial phase
- Relationship of Frequency (```- f ```) to Period (```- \tau ```)
    - ```- f = 1 / \tau ```
    - ```- \tau = 1 / f ```

### White Noise
- Uniform White Noise: Every sample point is a random number between ```- -\alpha``` and ```- \alpha```, where ```- \alpha ``` is the amplitude.
- Other types of white noise exist corresponding to various probabalistic distributions (e.g. gaussian)

## Pitch Units
- **Pitch Units => Octaves**
- Octaves are a natural unit of measurement because changing the octave has a uniform effect on the perceived pitch
- Octaves are a logarithmic unit
    - each successive Octave's frequency is a doubling of the previous 
        - successive multiplications of a base = exponentiation
    - Or rather, related to a base frequency, ```- f_{ref}``` (e.g. 440 Hz), the new frequency is:
    ```+ f = f_{ref} \cdot 2^I```
        - Where ```- I ``` is the interval in octaves
    - Solving for ```- I ```, you get:
    ```+ I = \log_2 \left( \frac{f_{ref}}{440} \right) ```
- In western music, the octave is divided into 12 half steps, so you can relate ```- H ```, the number of half steps, to an interval ```- I ``` (in units of octaves) by:
    ```+ H = 12 \cdot I```
    or
    ```+ I = H / 12 ```

## Amplitude Units
- ** Amplitude 'Unit' => Decibels **
- Decibels, also a logarithmic 'unit', are a natural unit of measurement of loudness b/c
    - **Huge Range**: The ratio of just-audible to dangerously loud amplitudes is around 100,000
    - **Convenience**: In sound engineering, most operations act multiplicatively, but with a logarithmic scale, you can treat these as additions.
    - **But not the best unit** for measuring amplitude: apparently, that's *sones*
    - **Not exactly a unit**: it's a ratio of two amplitudes with the same units.  Those units cancel each other out, and so it's just a ratio, and the log part returns the order of that ratio.
- Analogous to frequency (and ```- f_{ref} ```), you have to define a reference amplitude, ```- a_{ref} ```.
- The relative level ```- L ``` is given by:
    ```+ L = 20 \cdot \log \left( \frac{a}{a_{ref}} \right) ```
- ```- a_{ref}``` can be in any units:
    - volts for an analog electrical signal
    - 0.00002 ```- nm^{-2}``` for pressure deviation in air
        - usually, you use a normal (not a min) value so that your amplitude can have both positive and negative results.
    - no units (e.g. 1) for a digital audio recording
- **Where does the 20 come from in the decibel equation?**
    - It's more like a ```- 2 \cdot 10``` than a 20
        - 10: easy, that's bc the units is *deci*bels, not bels
        - 2: bc the ratio needs to be squared to make it not subject to the positive/negative sign of the amplitudes.
            - As a basic log property you can move the 2 out of the log term and multiply it by the final result, which is computationally more simple.

## Word Size And Linear Quantization
- Word Size AKA Bit-depth or bit-resolution
- The selection of a word size has an impact on the *SQNR*- Signal-to-quantization-noise-ratio (which is the digital counterpart to the analog-domain Signal to noise ratio (aka S/R, SNR)) 
- Linear Quantization is the process of taking an analog, real-valued signal and mapping it to a new number that fits within the prescribed word size.
    - Works by dividing the incoming signal into uniformly sized (hence *linear*) regions
    - Given an input signal with a range of ```- \pm E``` volts and a bit-depth N:
        - Total Input range = ```- 2E ```
        - Input signal will be divided into ```- 2^N ``` regions of size ```- 2E / 2^N ```
- A certain amount of quantization error (white noise - as it is primarily random) is introduced based on the bit-depth because bit-depth determines the range of values that can be mapped into.  
    - Intuitively, the maximum error for any sample point is one half the size of each region: ```- E / 2^N ```
    - SQNR = signal amplitude range / quantization error range
        - Again given an input signal with a range of ```- \pm E``` volts and a bit-depth N:
        - signal amplitude range = ```- 2E```
        - quantization error range = ```- 2 \cdot E / 2^N ```
        - SQNR = ```- \frac{2E}{2E/2^N} = 2^N ```
    - SQNR can be stated in decibels as:
    ```+ 20 \log 2^N \approx 6N ```
    which means that for each additional bit, we get an improvement of 6dB improvement in SQNR.
- SQNR is a theoretical best-case scenario b/c the avg quantization noise is going to be constant, whereas the amplitudes of a signal not using the full bit-depth-imposed-range will decrease.  
    - One reason, you don't want to record at a really quiet level: it will be competing with quantization noise (among other things, presumably)
    - Speaks to the importance of a good **preamp**
- 24 bit-depth is customary for digital audio records, yielding a SQNR of 144dB
- Audio CD's are typically 16-bits, for a SQNR of 96dB

## Sample Rate
- Subject to the *Nyquist Theorem* which states that the Sample Rate has to be at least twice as fast as the highest frequency you want to record.  Otherwise, you'll get aliasing / foldover.
    - Not suprisingly, standard audio sample rates are 44.1 kHz, which is slightly more than the upper limit on human hearing, 20,000 Hz 

## Operations
- **Amplification** is the process of multiplying a signal ```- x(t) ```, by a constant ```- k ```, yielding ```- k \cdot x(t) ```
    - If the original signal level is ```- L ```, the new level will be given by:
    ```+ L + 20 \log ( \lvert k \rvert)```

## Summary
- Sample Rate => frequency resolution 
- Bit-Depth => Signal to Noise





