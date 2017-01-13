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
     - Applies all the way from instruments, mics, preamps, to final stereo mix bus.
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

## Noise Floor
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

## Fixed vs Floating Point and Dynamic Range
- [src](http://www.analog.com/en/education/education-library/articles/fixed-point-vs-floating-point-dsp.html)
- [src](http://www.dspguide.com/ch28/4.htm)
- [src](http://www.exploringbinary.com/the-spacing-of-binary-floating-point-numbers/)
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
- Precision vs Accuracy:
- In scientific contexts:
    - Precision: consistency of results
    - Accuracy: whether the result represents truth.
- [In computing (floating point) contexts](http://ask.metafilter.com/204661/What-is-the-difference-between-floating-point-accuracy-and-precision):
    - Accuracy: how close the result is to the truth.
        - "How good it is"
    - Precision: the resolution, amount of detail, or just plain number of bits used to represent a number
        - The amount of storage space you have.
        - The number of bits allocated to the significand or mantissa. (they're the same thing)
- Floating points will trade off a certain amount of precision to have a larger range (giving them a possibility for more accuracy) given a constant amount of storage space.
    - Integers have a very high degree of accuracy, but their range is limited. 
    - More precision typically means more accuracy.
    - Example of how a lack of precision can make you lose some accuracy:
        - (1.0 / 3.0) * 3.0 = 0.99999
        - In reality, the compiler would probably optimize this out.
        - You can often get better accuracy by performing operations that reduce accuracy at the end of the calculation. 

- Fixed point is typically 16bit, but some are higher
- Floating point is minimum of 32 bits
- Floating point typical largest is +/-3.4E+38 and smallest is +/-1.2E-38
    - The represented values are spaced unequally (logarithmically) between these extremes
    - the gap between any two numbers is about ten-million times smaller than the value of the numbers
- Limited precision makes binary floating-point numbers discontinuous; there are gaps between them.
    - If you think of Xeno's paradox, then you'll see why there have to be gaps between the different real numbers that are represented by a floating point scheme.
    - Precision determines the **number of gaps**:
        - or worded differently, the placement along a number line of each real number represented by the float, is determined by the number of bits in the mantissa
    - **Gap size** is the same between in each consecutive power of two.
        - Gap size increases up the number line only as you reach the next power of 2
    ![floating-point](/resources/images/programming/floating-point-system-1.png)
    ![floating-point](/resources/images/programming/floating-point-system-2.png)
    
| Scientific Notation | Binary | Decimal | 
| :---: | :---: | :---: | 
| 1.000 x 2E-1	| 0.1 |0.5 |
| 1.001 x 2E-1	| 0.1001 | 0.5625 |
| 1.010 x 2E-1	|	0.101|0.625 |
| 1.011 x 2E-1	|	0.1011|0.6875 |
| 1.100 x 2E-1	|	0.11 | 0.75 |
| 1.101 x 2E-1	|	0.1101 | 0.8125 |
| 1.110 x 2E-1	|	0.111 | 0.875 |
| 1.111 x 2E-1	|	0.1111 | 0.9375 |
| 1.000 x 2E0	|	1 | 1 |
| 1.001 x 2E0	|	1.001 | 1.125 |
| 1.010 x 2E0	|	1.01 | 1.25 |
| 1.011 x 2E0	|	1.011 | 1.375 |
| 1.100 x 2E0	|	1.1 | 1.5 |
| 1.101 x 2E0	|	1.101 | 1.625 |
| 1.110 x 2E0	|	1.11 | 1.75 |
| 1.111 x 2E0	|	1.111 | 1.875 |
| 1.000 x 2E1	|	10 | 2 |
| 1.001 x 2E1	|	10.01 | 2.25 |
| 1.010 x 2E1	|	10.1 | 2.5 |
| 1.011 x 2E1	|	10.11 | 2.75 |
| 1.100 x 2E1	|	11 | 3 |
| 1.101 x 2E1	|	11.01 | 3.25 |
| 1.110 x 2E1	|	11.1 | 3.5 |
| 1.111 x 2E1	|	11.11 | 3.75 |

    - The takeaway here is that the gaps get much bigger as you progress along the number line.
        - They have to since you have a consistent number of gaps between each power of 2.
        - This means we're 'compressing' the values to cover a larger range.
        - Often said that the gap between any two numbers is about 10 million times smaller than the value of the numbers.
- DSP and Floating vs Fixed Point
    - Speed:
        - In general purpose processors fixed point arithmetic is faster
        - In DSP's the speed is about the same
    - Precision:
        - Based on number of bits, so in a default comparison, the 32-bit float is better than the 16-bit int
    - Dynamic Range
        - Floating point is going to be better here

- Each time we stor a number in floating point, we're adding noise to the signal since there has to be a certain amount of rounding
    - Rounding error is a max of 1/2 the gap size
    
Now let's turn our attention to performance; what can a 32-bit floating point system do that a 16-bit fixed point can't? The answer to this question is signal-to-noise ratio. Suppose we store a number in a 32 bit floating point format. As previously mentioned, the gap between this number and its adjacent neighbor is about one ten-millionth of the value of the number. To store the number, it must be round up or down by a maximum of one-half the gap size. In other words, each time we store a number in floating point notation, we add noise to the signal.

The same thing happens when a number is stored as a 16-bit fixed point value, except that the added noise is much worse. This is because the gaps between adjacent numbers are much larger. For instance, suppose we store the number 10,000 as a signed integer (running from -32,768 to 32,767). The gap between numbers is one ten-thousandth of the value of the number we are storing. If we want to store the number 1000, the gap between numbers is only one one-thousandth of the value.

Noise in signals is usually represented by its standard deviation. This was discussed in detail in Chapter 2. For here, the important fact is that the standard deviation of this quantization noise is about one-third of the gap size. This means that the signal-to-noise ratio for storing a floating point number is about 30 million to one, while for a fixed point number it is only about ten-thousand to one. In other words, floating point has roughly 30,000 times less quantization noise than fixed point.




## Actual Dynamic Range
- On a master track, your clipping point is indeed 0dB
- Within an individual track (or processing chain) before its audio is passed the master bus - you have more headroom because you're using 32bit floating point calculations instead of the 24bit audio buffers you pass to the sound card.
- 32-bit

-
-

## Gain Staging

## Recording Levels
- In the old analog recording days, you would typically record 'hot' to maximize your SNR
    - 'Hot': get your recording levels as high as possible without clipping
    - A slight amount of clipping via tape saturation was acceptable bc it sounds nice
    - Since each analog component in your signal chain contributes a certain (fixed) amount of noise, the louder the input you feed it, the better your SNR will be.
- Digital gear isn't as noisy as analog gear, so the noise floor (the constant amount of noise contributed at each stage of signl processing, or the quietest sound you can record(?)) is quite small by comparison.   
    - Typically, the analog electronics noise floor and the acoustic ambience will dominate over the DAW's noise floor.
- Reasons you don't want to record with settings too low:
    - You will not pick up the quieter sounds
    - Worse SNR as your signal will be closer to the quantization noise  (but remember, this is because you're dealing with an analog interface: the ADC.  You don't have this problem in the purely digital world)
- For practical purposes
    - you don't want recording levels too high or too low.
    - There's no single formula, because your preamp, ADC will sound different at different levels with different content.
    - You just have to experiment and see what works. 

## Questions:
- Add Line-level comparison
- Add Recording Level Tradeoffs  (in gain staging section)
- Recording at 24bit gives you 144dB of Dynamic Range
- Do we really clip at 0 dBFS?  What's the real digital headroom?
- Once in a digital domain, what are the non-linear devices that are sensitive to input gain and how do you optimize this?