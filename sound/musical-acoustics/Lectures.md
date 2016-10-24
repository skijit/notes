Lecture Notes
===============

- Lecture 2
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
    
         
    
    
    
    
    
    