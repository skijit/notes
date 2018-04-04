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

    
## Lecture 5

- Listened to a tape piece, Somges, by Risset which involved real instruments playing music using the tempered/western scale, followed by sinusoidal segments also tuned to tempered, but containing harmonics which (by definition, are whole number multiples of the F0).
    - Plays with onsets and how you hear a single or multiple tones
    - he uses harmonics which do not match the spectra of the real instruments
- Beating is the resulting sinusoid of two different frequencies being super-imposed
    - You wouldn't get it if the sinusoids had the same frequency (regardless of offset)
    - the beating frequency is always |f-g|
- Given two sinusoid of:
    - 440 Hz
    - 441 Hz
    - beating is happening at 1 Hz
- Given two sinusoids of:
    - 440.5 Hz multiplied by...
    - another sinsoid with a frequency of 0.5 Hz
    - You get the same sound (except lower amplitude) as the previous example!
    - Why?
        - Second sinusoid controls is the beating
            - it is multiplied to the first sinusoid.
            - The 0.5 is because a cycle typically includes two peaks (one positive, one negative).
                - We don't care whether a peak is positive or negative, so we just halve the rate we want to modulate by.
        - first is the interpolation (avg) of the two previous frequencies
    - We're doing amplitude modulation in the multiplication example
- Given two sinusoids of
    - 440
    - 460
    - This will match another two sinusoids:
        - 450 being multiplied by a sinusoid of 10
- so this is an interesting lesson about getting equivalent results when you multiplying two sinusoids (f, g) as as when you add them (a, b), particularly when there's a beat.
    - **This is a demonstration of the fundamental law of electronic music**
- example:
    - input tone of 100 Hz being multiplied by a sinusoid of 75 hz
    - will produce two frequencies:
        - 25 hz
        - 175 Hz
    - This is Ring modulation
        - when you pass in a complex periodic tone, this operation is going to break down the harmonic relationship between the F0 and harmonics
    - this is all given the F.L.E.M.
    - there is an input in ring modulation which will produce a harmonic sound (ie a complex periodic tone)
        - TODO: look into this
    - ring modulation: multiply by a sinusoid to mess up the inner frequencies
        - term derives from the way the electronic components are laid out
- power: energy per time
- how you measure power depends on the medium you're in
- although on avg, a particular light bulb might be consuming 60 Watts, at any given time it could be anything since the voltage cycles at 60 hz
- in a sound wave, the spots where the pressure is the highest is also where the individual air molecules are moving fastest
- avg power adds a bias to the output.  everything will be above 0.
- your typical meter is measuring power not amplitude 
- meters 
    - have to be in decibels
    - we don't measure amplitude directly, we measure power
        - probably bc its more robust for nonsinusoidal content
    - in his example, 100 will correspond with an average power of 1
        - that means the ref power is 10-5
        - you can meter in many ways... 
            - metering the output that is sent to a DAC, you will typically see the ref amplitude set to 1 (max output), so clipping occurs at 0 dB
            - in this example, he making the ref power 10-5, so the powers will be mostly positive
- some decibel / power conversions
    - given a signal whose peak amplitude is 1, we'd expect the power to be 1/2 * 1^2 = 0.5
    - power in decibels uses the formula: 10 * log10(P) = 10 * log10(0.5) = -3.0103    
    - therefore a meter based on power in decibels will drop by 3
    - power to decibels:
        - take the log of power and mulitply by 10
    - decibels to power:   
        - take the db and divide it by 10 and raise to to that power
- are audio meters typically measuring power?
    - I would guess so because Non-sinusoidal signals' peak amplitudes don't give you a good idea of their strength
    - remember instanteous power is x(t)^2, avg power is half that

