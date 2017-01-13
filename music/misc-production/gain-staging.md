Leve and Gain Staging Notes
===================
- [source](http://www.soundonsound.com/techniques/gain-staging-your-daw-software)
- [source](http://therecordingrevolution.com/are-you-recording-too-hot/)
- [source](http://www.soundonsound.com/sound-advice/q-how-much-headroom-should-i-leave-24-bit-recording)
- [source](http://www.massivemastering.com/blog/index_files/Proper_Audio_Recording_Levels.php)
- [source](http://www.soundonsound.com/sound-advice/q-whats-dynamic-range-channels-my-daw)
- [source](http://blog.prosig.com/2008/04/14/what-is-db-noise-floor-dynamic-range/)
- [TODO source](http://www.soundonsound.com/techniques/mix-mistakes)

## Intro
- The big question is how much do you want to increase the gain at each stage of your signal path.
- This matters because:
    - Lets you get the Best SNR
    - Leave enough headroom to prevent clipping
    - Leave enough headroom to allow mixing / mastering, if appropriate
    - Set input levels to non-linear components (pre-amps, compressors, distortion, etc.) at the proper level
- Depending on the media in each signal processing stage, you might have a different strategy:
    - Acoustic
    - Analog Electronic (on a wire)
    - Digital Electronic (post ADC)

## Misc    
- Gain Staging: ensuring the *appropriate* input-level at each stage of your signal path
    - Applies all the way from instruments, mics, preamps, to final stereo mix bus.
    - Appropriate input-level comprises 2 factors:
        1. Healthy SNR
        2. Leaving enough room to prevent signal clipping
- In the old analog recording days, you would typically record 'hot' to maximize your SNR
    - 'Hot': get your recording levels as high as possible without clipping
    - A slight amount of clipping via tape saturation was acceptable bc it sounds nice
    - Since each analog component in your signal chain contributes a certain (fixed) amount of noise, the louder the input you feed it, the better your SNR will be.
- Digital gear isn't as noisy as analog gear, so the noise floor (the constant amount of noise contributed at each stage of signl processing, or the quietest sound you can record(?)) is quite small by comparison.   
    - Typically, the analog electronics noise floor and the acoustic ambience will dominate over the DAW's noise floor.
- Line-level for final stereo mixes is 0VU
    - 0 VU = volume units .  These are the units displayed on Volume Meter.
        - VU meters are averaging- they don't show transient peaks
        - 0VU signal level basically equals +4dBu

- You also want to have decent headroom to make it easier to mix.
- Headroom goes away when you get to mastering phase... it's no longer needed!
- 0 dbFS is the maximum level we can deal with
- Digital Dynamic Range:
    


- Reasons you don't want to record with settings too low:
    - You will not pick up the quieter sounds
    - Worse SNR as your signal will be closer to the quantization noise  (but remember, this is because you're dealing with an analog interface: the ADC.  You don't have this problem in the purely digial world)
- What is the dynamic range on your DAW?
    - Although you might record your audio at 24bits, all processing on it is at 32bits (or perhaps 64?), which gives you a huge amount of dynamic range, and essentially no noise floor.
        - 

## Decibel Formats
- [src](http://www.audiorecording.me/what-is-the-difference-between-dbfs-vu-and-dbu-in-audio-recordings.html)
- [another src](http://duc.avid.com/archive/index.php/t-206620.html)
- We only care about dB in 3 different forms
    1. **Air** = measure sound pressure, which is *analog*
        - **dB SPL** = ```- 20 \log{\frac{P}{P_{ref}}  ```
        - P = sound pressure in dynes/cm2
        - ```- P_{ref} ``` = 0.0002 dyne/cm2 = **the (lower) threshold of hearing**
        - Note also that there are different weights (e.g. A, B, C) to adjust for the fact that our ears perceive level differently according to different frequencies.
    2. **Wire** = measure electrical power which is *analog*
        - There are a couple different formats here:
        - **dBm** = ```- 10 \log{\frac{p}{0.001}} ``` because ```- P_{ref}``` =1 milliwatt
            - Since we're already dealing with Power units, they've been squared.  Hence the factor of 10 instead of 20.
        - **dBu** (aka **dBv**)         
        - **dBu** = ```- 20 \log{\frac{V}{V_{ref}}} ``` where ```- V_{ref} = 0.775V ```
            - Usually used to measure max amplitude
            - Particularly useful for ADC
            - Each ADC has a different conversion rate:
                - US: +24 dBU = 0 dbFS
                - Europe: +18 dBU = 0 FS
                - etc.
        - **dBV** = ```- 20 \log{\frac{V}{V_{ref}}} ``` where ```- V_{ref} = 1V ```
        - **dBVU**
            - 0 VU = volume units .  These are the units displayed on Volume Meter.
                - VU meters are averaging- they don't show transient peaks
            - dBVU = dBVU + 4 dBu
            - also just abbreviated dbVU = +4 dBu
            - The reason for this is because in the old tape days, you could record louder (getting a better SNR) but they wanted to keep the Volume meter at the same level.
            - This is what you would use to monitor amplitude in a purely analog setup
    3. **Digital** = measure bit values, which is *digital*
        - **dbFS** = ```-20 \log{\frac{SL}{FS}} ```
            - *SL* = the current sample level
            - *FS* = the maximum value you can record.  (Full-Scale)
            - 0 dBFS is as loud as you can go without clipping
            - This is what you'd use to monitor if you've got a DAW involved, since that's the headroom you'll need to monitor


## Headroom
- [src](http://www.soundonsound.com/sound-advice/q-what-exactly-headroom-and-why-it-important)
- When do we need headroom:
    - To fully represent transient peaks
    - Mastering involves playing with dynamics and they'll need extra dynamic range to find the ideal settings
        - Most mastering engineers want at least -6dB of headroom to start
        - Excluding transients, your master track should hover around -18 dBFS
        - If you're final mix doesn't have enough headroom, you can lower the master fader.
            - Some people suggest against this, suggesting that you should instead adjust the individual track faders, but I don't follow their logic.  
            - [This thread](https://forum.reasontalk.com/viewtopic.php?t=7493397) explains why the master fader is particularly useful: if you have any non-linear/dynamics devices (like compressors), then changing the input will really mess up your mix (bc they're non-linear).
    - Mixing
        - Your bus (send) tracks will add the individual tracks.
- Analog systems => **Hidden Headroom Margin**
    - In analog systems, the VU goes up to 0 dBVU (= 4 dBu) but the clipping point is actually +24 dBU, so there's a hidden headroom margin of 20 dBu
- Digital systems => **No hidden Headroom Margin**
    - Typically 0 dBFS is clipping.
    - **Best Practice**: You want to keep signal level around -18 or -20 dbFS b/c this approximates the extra 20dB headroom present in analog systems

## Noise floor
- Noise floor is a measure of the summation of all the noise sources and unwanted signals generated within the entire data acquisition and signal processing system
    - Typically appears as a constant hum
    - Could be introduced by any 3 signal media:
        1. Acoustic
        2. Electronic
        3. Digial
    - **Important because...** Noise floor imposes a lower limit of signals that can be recorded due to noise
        - At that level, the signal cannot be extracted from the noise
- Do we care about the noise level bc:
    - gets commit to tape?
    - limits the range of stuff we can record
    - contributes to the overall SNR
- Noise can be introduced in two processes:
    1. Input / Data Capture / Recording        
    2. Output / Playback
- Noise introduced by signal media:
    - **Acoustic**
        - it is the SPL volume of the room when everything is off and quiet
    - **Analog Electronics**
        - Any number of sources: interference, heat, circuit specifics, etc.
    - **Digital Electronics**
        - its the same as the quantization noise 
        - noise introduced by rounding off analog values to the value which can be represented by the given bit-depth
        - There are reallty two digital noise floors to consider:
            - Noise floor from the ADC process  (SQNR for 24 bits)
            - Noise floor from the internal computations:
                - Your daw will use 32bit or 64bit floating point numbers which give it additional headroom
                - Noise floor when bit-reducing to a mastering format (like 16bit CD audio)
- Differentiate between noise floor 
    - input chain: noise which is committed to media at record time
        - this is the kind we care about
    - output chain: noise inherent in the output systems
        - Not much you can do about that

## Dynamic Range
- This is a ratio (expressed in dB) of the minimum (= noise floor) and maximum signals that can be represented.
- The Dynamic Range for a Digital system is dependent on two factors which intersect in the ADC :
    - ADC Input: The voltage dynamic range
        - typically +/- 10V
    - Resolution (i.e. bit depth)
- The Dynamic Range for a 16-bit system is calculated by...
    - Number of distinct amplitude values that can be represented is ```- 2^{16} = 65536```
    - If the voltage range of the ADC is +/- 10V, then it has a dynamic range of 20V
    - The smallest voltage that the system can distinguish is therefore: 20 / 65536 = 0.3 mV
    - Converting that to dB: ```- 20 \log{65536} = -96dB```    
- Following same procedure as above:
    - Dynamic range for a 24bit system is -144 dB
- **Affect on Noise Floor**
    - The dynamic range is also a measurement of the lowest theoretical noise floor:
        - Since the reference value in dB's calculation is the largest value that can be represented.
    - In reality though, the noise floor will always be higher due to misc electronic noise.
- **Comparing Analog to Digital**
    - Noise floor of analog console is around -90dBU.  
    - Recall that analog electronics have a hidden headroom of about 24 dBu.
    - So the total dynamic range in the best analog system is 90 + 24 = 114dBu.
    - 24 bit recording provide dynamic ranges of about 144dB!

### Actual Dynamic Range
- On a master track, your clipping point is indeed 0dB, however within an individual track (or processing chain) - before its audio is passed the master buss - you have more headroom because you're using 32bit floating point calculations instead of the 24bit audio buffers you pass to the sound card.
- **Fixed vs Floating Point**
    - [src](http://www.analog.com/en/education/education-library/articles/fixed-point-vs-floating-point-dsp.html)
    - Fixed Point
        - Integers
        - A 16-bit integer will hold ```- 2^{16}``` (65536) values ranging from ``- -2^{16}``` to ``- 2^{16} - 1```
        - Always use a min of 16-bits
        - Typically have a reserved (fixed) number of bits for each side of the decimal
    - Floating Point
        - Always use a min of 32-bits
        - Like scientific notation
        - Each number has a number (aka mantissa) and an exponent
            - ```- A x 2^B```
            - A = mantissa
            - B = exponent
        - ```- 2^{32}``` distinct values
        - Can represent a much wider range of values because the placement of the decimal varies.
        


## Gain Staging


- Questions:
- Add Line-level comparison
- Add Recording Level Tradeoffs  (in gain staging section)
- Recording at 24bit gives you 144dB of Dynamic Range
- Do we really clip at 0 dBFS?  What's the real digital headroom?
- Once in a digital domain, what are the non-linear devices that are sensitive to input gain and how do you optimize this?