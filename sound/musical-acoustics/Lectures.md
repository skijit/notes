Lecture Notes
===============

## Lecture 2
- DC Offset is when you have silence which is not centered on 0.
    - Can be caused by a number of things, including particulars of the ADC
- Audacity is 24bit word size, but on a raspberry pi, the hardware-imposed limit is 16 bit.
    - 2^16 means the range is 0-65535 or -32768 to 32767
    - Roundoff error is up to 1/2 of 1/65535 of the signal (see c1 book notes for explanation)
- Digitization of sound involves two corruptions of the signal:
    - Sampling, rather than the continuous aspect
    - Quantization error based on word size
- Trevor Wisharts's Piece about Princess Di
    - Defined wave sets - portion of sound that has adjacent zero crossings going in the same direction
    - Then regards the wave set as a period (which it would be if it was a sinusoid, but it's not in the case of a complex signal like speech)
    - Then he can loop these wavesets
    - Then you have overlapping wavesets which you can loop concurrently to get a variety of pitches
- Remember to distinguish amplitude vs peak amplitude
- When discussing phase, you really just mean the remainder when dividing by 2pi
- Periodicity in digital recordings is difficult bc this requires some interpolation (a specific value may never be repeated exactly)
- Comparing pitch vs decibel.
    - Pitches are based on octaves, which is based on a real property of similar pitches
    - Nothing like that for dealing with amplitude
        - Instead we just use orders of 10, related to some reference
- 'Level' typically implies the use of decibels

## Lecture 3
- When talking about how logarithms are used to scale the amplitude ranges, you should also include the base as another scaling consideration:
    - If it was base 2, it wouldn't scale to such a long range
    - Base 10, scales much farther
- Suppose you double the amplitude.  How many dB's does that change?
    - Worded differently, 'how many dB's are in a factor of 2'?
    - Worder differently again, what is the relationship of scaling factor to dB?
    - ```- dB = 20 \log \frac{2A}{A} = 20 \log 2 = 6.02```
    - If we scale by 4 (instead of 2), it has to be a dB increase of 12.02
    - If we scale by 1/2, then we are dividing amplitude by the same factor as the first example, so makes for a negative db: 16.02 dB
- Human hearing *range* is about 100dB (ie the ratio of the highest to lowest perceptible sounds)
- If the SNR for CD's is 96dB, that's a good match, EXCEPT there's that volume knob which can make it worse.
    - That's why when recording, you want to precisely control the gains (so that it matches the SNR)
- So that's why 24bits is so good!
- If you take a 10 Hz sine wave reduced to 4 bits, then you can hear it!
    - It's quantized so only 16 possible values are attained, so you end up hearing the differences between individual values which is like a sawtooth wave
- sample rate is, electronically, a strobe process
- foldover / aliasing is the same as when you see a video of a propeller and it's going backwards
- Sometimes people will record in 96kHz so that they can reprepresent up to 48kHz frequencies:
    - They only care about the first 24kHZ, so that range between 24-48kHz can be useful so that any filtering they do creates foldover in the range above what you hear.
    - I suspect that's why people upsample before filtering, but I might be wrong...
    - The 48 kHz sample rate is in practice a much better thing for this reason
- bitcrushing: bit-depth reduction.  decimation: dropping samples.
- review the foldover chart in the book
- 3 fundamental (linear) signal operations:
    1. Scale (multiple)
    2. Superposition (add)
    3. Delays
    - They preserve sinusoids: put in a sinusoid, you'll get another sinusoid out (maybe different phase, freq, or amplitude, though)
    - Filters are composed of these three things
    - Things that can't be realized by these operations:
        - Nonlinear stuff like distortion
    - The things you multiply, add, or delay by are scalars, not signals
- This concludes chapter one of the book notes.

## Lecture 4 

- note the bicycle wheel graphic in chapter 2 is missing f in the formula
- how to calculate harmonics: you can multiply frequency f by 2,3,4,5,6,7, etc and you get the 2nd, 3rd, 4th, etc. harmonics
- you can use this to create additive synthesis
    - interesting to see how you see things as single vs multiple pitches
    - the higher harmonics need to be a little quieter to hear as a single note (in general)
    - the individual tones will 'fuse' into a single sometimes... into a single percept
- f * sqrt(2) = tritone!

    
    
    
    