Chapter 1: Electronic Music and Sound Design
=============

- ![Sound wave](/resources/images/music/molecules.png)
- Speed of sound in air is approx 344 m/s.
    - Therefore a 1 Hz sound would have a wavelength of 344 m
    - Sim...
        - 10 Hz : wavelength = 34.4 m
        - 100 Hz : wavelength = 3.44 m
- In computer contexts:
    - raw amplitude range = 0 - 1
        - anything outside that range is clipping
    - 0 dB = 1
    - -6 dB = 0.5 
    - -12 dB = 0.25
    - -18 dB = 0.125
    - -inf DB = 0    
    - **dbFS** = `- -20 \log{\frac{SL}{FS}} `
        - *SL* = the current sample level
        - *FS* = the maximum value you can record.  (Full-Scale)
            - This value is often 1.        
- basic decibel math facts
    - halving an amplitude = reducing it by 6 dB    
    - divide the amplitude by 10 = reduce by 20 dB
    - notice we're able to turn multiplicative operations into additive operations (thanks to logs)
    - Proofs:
        - halving an amplitude = reducing it by 6 dB  
            - Original sample level = `- x`
            - Original dB level = `- -20 \log{x} ` dB, since FS=1
            - New sample level = `- \frac{x}{2}`
            - New dB Level = `- -20 \log{\frac{x}{2}} `
            - `- -20 \log{\frac{x}{2}} = -20 \left(\log{x} - \log{2} \right) = - 20 \log{x} - 6.02 `
            - Orig db level `- -20 \log{x} `  so new Db Level = Orig Db Level - 6.02
         