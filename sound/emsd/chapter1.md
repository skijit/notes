Chapter 1: Electronic Music and Sound Design
=============

## Sound Characteristics

- ![Sound wave](/resources/images/music/molecules.png)
- Speed of sound in air is approx 344 m/s.
    - Therefore a 1 Hz sound would have a wavelength of 344 m
    - Sim...
        - 10 Hz : wavelength = 34.4 m
        - 100 Hz : wavelength = 3.44 m
- In computer contexts, raw amplitude range = 0 - 1
    - anything outside that range is clipping    
- In mathematical contexts, raw amplitude usually goes between -1 and 1
- dB is a ratio (not a unit!) for measuring something logarithmically
    - lots of other things are measured logarithmically:
        - richter scale (earthquakes)
        - pH scale (acidity)
        - musical pitch
        - google page rank        
    - there are lots of different sound-based logarithmic measurements depending on context.
- In computer contexts, we use dbFS or Full-Scale dB
    - **dbFS** = `- -20 \log{\frac{SL}{FS}} `
        - *SL* = the current sample level
        - *FS* = the maximum value you can record.  (Full-Scale)
            - This value is often 1.
        - **NOTE**: I think this is a mistake.  It should probably be a positive (not-negative) 20 bc the sample level will always be less than or equal to 1 and the FS will be 1, making the log a negative value (bc log of a fraction is going to be negative always) and we want the ultimate dB value to be negative with a max value of 0.
- dBFS to amplitudes
    - 0 dB = 1
    - -6 dB = 0.5 
    - -12 dB = 0.25
    - -18 dB = 0.125
    - -inf DB = 0    
- basic decibel math facts
    - halving an amplitude = reducing it by 6 dB    
    - divide the amplitude by 10 = reduce by 20 dB
    - notice we're able to turn multiplicative operations into additive operations (thanks to logs)
    - Proofs:
        - halving an amplitude = reducing it by 6 dB  
            - Original sample level = `- x`
            - Original dB level = `- -20 \log{x} ` dB, since FS=1
            - New sample level = `- \frac{x}{2} `
            - New dB Level = `- -20 \log{\frac{x}{2}} `
            - `- -20 \log{\frac{x}{2}} = -20 \left(\log{x} - \log{2} \right) = - 20 \log{x} - 6.02 `
            - Orig db level is `- -20 \log{x} `  so new Db Level = Orig Db Level - 6.02
        - divide the amplitude by 10 = reduce by 20 dB
            - Original sample level = `- x`
            - Original dB level = `- -20 \log{x} ` dB, since FS=1
            - New sample level = `- \frac{x}{10} `
            - New dB Level = `- -20 \log{\frac{x}{10}} `
            - `- -20 \log{\frac{x}{10}} = -20 \left(\log{x} - \log{10} \right) = - 20 \log{x} - 20 `
            - Orig db level is `- -20 \log{x} `  so new Db Level = Orig Db Level -10
            - **TODO**: the sign is coming out positive when it should be negative - look into this...
- Psychoacoustically, frequency and intensity have a variable relationship:
    - Example 1: Above 2,000 Hz if you increase intensity while holding frequency fixed, it will be perceived to be rising
    - Example 2: Below 1,000 Hz if you increase intensity while holding frquency fixed, it will be percieved to be decreasing
    - Example 3: We are less sensitive to intensity decreases at lower frequencies 
        - And conversely more senstive to intensity descreases at high/midrange frequencies
    - Recall the mixing trick with [pink noise](https://www.soundonsound.com/techniques/mixing-pink-noise-reference)
- Isophonic curves represent the contours of equal loudness.
    - The curve represents a constant percived intensity (measured in 'phons') across varying actual intensity and spectrum
    - ![Equal Loudness Contour](/resources/images/music/equal-loudness.png)
- Common Waveforms
    - ![Simple Waveforms](/resources/images/music/simplewaves.jpeg)
    - triangle wave has odd numbered harmonics, such that energy level =  `- \frac{1}{N^2} ` where N = harmonic number
    - sawtooth (or a ramp) has both even and odd harmonics which decrease over time at `- \frac{1}{N} `
        - in digital audio, you need to put a limit on the amount of harmonics present or they will exceed the nyquist frequency and create aliasing
    - Pulse (or rectangle or square) waveforms have energy over a broad area of the spectrum, but only for a brief period of time.
        - Square has only odd harmonics
- Duty cycle affects the width of a square (actually rectangular) wave
    - it is a number between 0 and 1
    - refers to the percentage of time the phase is positive
    - ![Duty Cycle](/resources/images/music/duty-cycle.JPG)
- Bipolar waves are those which go above and below 0
    - These are generall audible because they need to include compression and rarefication
- Unipolar waves are those which only say above or below 0.
    - These are typically used to modify a sound parameter

## Envelopes
- Envelope is the particular macro-countour of a sound's amplitude over time.
- Phases include:
    - Attack
    - Decay
    - Sustain
    - Release
- ![ADSR](/resources/images/music/note-adsr.gif)
- Many instruments may not have all these envelope phases - it just depends
- ![Real-life envelopes](/resources/images/music/Envelope.gif)
- During attack phase, frequency is often unstable
- Application of an envelope to a sound in a computer equates to scaling (multiplying) the sounds amplitude by a value between 0 and 1
- Envelope phases can be:
    - Linear
    - Exponential
    - Logarithmic
- ![non-linear envelopes](/resources/images/music/nord_shape.jpg)
- Large instantaneous jumps (discontinuities) in envelopes will create audible 'clicks'
- Many instruments have logarithmic or exponential envelopes, particularly plucked strings or percussion sounds

## Glissandi
- A glissando is a sound whose frequency moves up, down or both throughout it's duration
- Since the distance between adjacent pitches grows exponentially, a glissando is typically an exponential curve

## Frequency and Interval
- The octave is a musical interval used in all musical cultures
    - Other cultures use different intervals
- Dominant western tuning since the beginning of the 18th century is **equal temperment**   
    - The octave is divided into 12 equal regions (semitones)
    - displays *intevallic equivalence*: all intervals of the same type share a constant frequency ratio
- Deriving the base semitone ratio:
    - First begin with the observation that octaves (see above: the only real true octave) is a logarithmic unit.
    - The frequency of a note I octaves from a base frequency is: ```- f_{new} = f_{base} \cdot 2^I```
    - That means if you want to know how many octaves, I, are between any two frequencies: ```- I = \log_2 \left( \frac{f_{new}}{f_{base}} \right) ```
        - QED, octaves are logarithmic.  (And really this means pitch is logarithmic function of frequency)
    - Each octave I is divided in to 12 semitones, so to express interval in units of semitones (H) instead of octaves (I):
        ```+ H = 12 \cdot I```
        or
        ```+ I = H / 12 ```
        So...
        ```+ f_{new} = f_{base} \cdot 2^{\frac{H}{12}}```
        and because ```- x^{\frac{m}{n}} = \sqrt[n]{m}``` ...
         ```+ f_{new} = f_{base} \cdot \sqrt[12]{2^H}```
    - Given a semitone interval of one (i.e. adjacent notes, H=1)
        ```+ \sqrt[12]{2} = 1.059463```
    - So...
        ```+ f_{C4} = f_{B3} \cdot 1.059463```

- Psychoacoustically:
    - Under 600 Hz, a frequency ration of 2:1 will sound like the octave was somewhat compressed
    - Above 600 Hz, a frequency ratio of 2:1 will sound like the octave was somewhat compressed
    - The effect increases the farther we get from 600 Hz
- The Reality of tuning stringed instruments:
    - None of the actual strings are completely ideal, insofar as the set of harmonics they produce
    - In a perfect, theoretical string, the only force wanting to bring a vibrating string back to rest is the tension between its two ends.
    - In reality, strings have a slight reluctance to being bent.  This additional resistance affects the set of partials created by it's vibration.
        - This property is known as it's *inharmonicity*
    - Piano tuners know this well and have to accomodate this.

## Panning
- [See this other set of notes for panning stuff](/programming/maxmsp/msp-tutorial-notes#22-MIDI-Panning)

