Level and Gain Staging Notes
===================
- Sources
    - [SoS Article about gain staging](http://www.soundonsound.com/techniques/gain-staging-your-daw-software)
    - [Are you recording too hot?](http://therecordingrevolution.com/are-you-recording-too-hot/)
    - [SoS Article about Headroom](http://www.soundonsound.com/sound-advice/q-how-much-headroom-should-i-leave-24-bit-recording)
    - [Blog about Proper Recording Levels](http://www.massivemastering.com/blog/index_files/Proper_Audio_Recording_Levels.php)
    - [SoS article about dynamic range](http://www.soundonsound.com/sound-advice/q-whats-dynamic-range-channels-my-daw)
    - [Good blog about noise floor](http://blog.prosig.com/2008/04/14/what-is-db-noise-floor-dynamic-range/)
    - [TODO source: SoS article about mix mistakes](http://www.soundonsound.com/techniques/mix-mistakes)

## Intro
- The big question is how much do you want to increase the gain at each stage of your signal path.
     - Applies all the way from instruments, mics, preamps, to final stereo mix.
- This matters because:
    - Lets you get the Best SNR
    - Leave enough headroom to prevent clipping
    - Leave enough headroom to allow mixing / mastering
    - Set input levels to non-linear components (pre-amps, compressors, distortion, etc.) at the proper level
- Depending on the domains (see below) in each signal processing stage, you might have a different gain staging strategy.    
    - **Acoustic**
        - In the air
        - Analog
    - **Analog Electronic**
        - on a Wire
        - Analog
    - **Digital Electronic**
        - In a Digital Eletronic device (incl. Computer)
        - Digial
        - Typically anything in your signal chain which is post ADC


## Decibel Formats
- Sources
    - [blog on various db formats](http://www.audiorecording.me/what-is-the-difference-between-dbfs-vu-and-dbu-in-audio-recordings.html)
    - [avid forum post](http://duc.avid.com/archive/index.php/t-206620.html)
- Gain is about increasing amplitude
- We typically measure amplitude in decibels (dB) because like our perception of sound, it is logarithmic.
    - Also makes calculations easier: whereas in some cases you would want to multiply amplitudes, it's quite easy to add decibels.
- We only care about dB in 3 different domains
    1. **Acoustic** 
        - measure sound pressure
        - **dB SPL** = ```- 20 \log{\frac{P}{P_{ref}}}  ```
        - P = sound pressure in dynes/cm2
        - ```- P_{ref} ``` = 0.0002 dyne/cm2 = **the (lower) threshold of hearing**
            - A lot of times the reference amplitude will be a higher threshold (making our decibels negative).
            - **In this case**, it's a lower threshold, the dB is a positive value.
        - Note also that there are different weights (e.g. A, B, C) to adjust for the fact that our ears perceive level differently across frequency bands.
    2. **Analog Electronic** 
        - measure electrical power
        - There are a couple different formats here:
        - **dBm** = ```- 10 \log{\frac{p}{0.001}} ``` because ```- P_{ref}``` =1 milliwatt
            - Since we're already dealing with Power units, they've been squared.  Hence the factor of 10 instead of 20.        
        - **dBu** = ```- 20 \log{\frac{V}{V_{ref}}} ``` where ```- V_{ref} = 0.775V ```
            - Usually used to measure max amplitude
            - Particularly useful for ADC
            - Each ADC has a different conversion rate:
                - US: +24 dBu = 0 dbFS
                - Europe: +18 dBu = 0 FS
                - etc.
        - **dBv** is same as **dBu**
        - **dBV** = ```- 20 \log{\frac{V}{V_{ref}}} ``` where ```- V_{ref} = 1V ```
        - **dBVU**
            - VU = volume units .  
            - These are the units displayed on Volume Meter.
            - VU meters are averaging- they don't show transient peaks            
            - dbVU = +4 dBu
                - The volume meter is actually 4 dB's louder than dBu
                - The reason for this is because in the old days when tape came out, you could record louder (getting a better SNR) but they wanted to keep the Volume meter at the same level.
                - So it uses the same ```- P_{ref} ``` as dBu.
            - This is what you would use to monitor amplitude in a purely analog setup
    3. **Digital Electronic** 
        - measure bit values 
        - **dbFS** = ```- 20 \log{\frac{SL}{FS}} ```
            - *SL* = the current sample level
            - *FS* = the maximum value you can record.  (Full-Scale)
                - This value is often 1.
            - 0 dBFS is as loud as you can go without clipping
            - This is what you'd use to monitor if you've got a DAW involved, since that's the headroom you'll need to monitor
- **Example: Adding Decibels**
    - Say we have 2 signals of the same magnitude (-20 dBFS) that are getting added together, such as in a mixer.
    - What will the new dBFS level be?
    - Remember ```- dbFS = -20 \log{\frac{SL}{FS}} ```
        - Where **FS = 1**, and (**this part is new**) **SL = SL_1 + SL_2 + ... SL_N**
    - **First let's get signal level from dBFS:**
        - ```- -20 dBFS = 20 \log{\frac{x}{1}} ```
        - ```- -1 = \log{\frac{x}{1}} ```
        - ```- 10^{-1} = x ```
        - ```- x = \frac{1}{10} = 0.10 ``` 
        - **Signal level = 0.10**
    - **Now let's add the signals together:**
        - ```- 20 \log{\frac{0.1 + 0.1}{1}} = 20 \log 0.2 = -13 ```
        - **New dBFS is -13 dBFS**
    - **So**: we doubled a signal at -20 dB and it only became -13 dB.


## Headroom
- Sources
    - [SoS Article About Headroom](http://www.soundonsound.com/sound-advice/q-what-exactly-headroom-and-why-it-important)
- When do we need headroom?
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
- There is one case when you have hidden headroom in a digital system:
    - When your DAW is treating your audio as 32bit float (see floating point section)
    - **Fine Print**: that headroom is fleeting.  If you send the audio signal out to the DAC or export to a common audio format (mp3, wav, etc.) then you'll be working on a smaller word size (e.g. 24bit), and so you might actually end up clipping.
        


## Noise Floor
- Noise floor is a measure of the summation of all the noise sources and unwanted signals generated within the entire data acquisition and signal processing system
    - Typically appears as a constant hum
    - Could be introduced by any 3 signal domains:
        1. Acoustic
        2. Analog Electronic
        3. Digital Electronic
    - **Important because...** Noise floor imposes a lower limit of signals that can be recorded due to noise
        - At this level, the signal cannot be extracted from the noise
- We care about the noise level bc:
    - gets included in the recording, downgrading the fidelity
    - limits the range of stuff we can record
    - contributes to the overall SNR
- Noise can be introduced in two processes:
    1. Input / Data Capture / Recording        
        - this is the kind we care about
    2. Output / Playback
        - Not much we can do about this... (buy a nicer stereo?)
- Noise introduced by signal domains:
    - **Acoustic**
        - it is the SPL volume of the room when everything is off and quiet
    - **Analog Electronics**
        - Any number of sources: interference, heat, circuit specifics, etc.
    - **Digital Electronics**
        - its the same as the quantization noise 
        - noise introduced by rounding off analog values to the value which can be represented by the given bit-depth
        - There are really two digital noise floors to consider:
            - Noise floor from the ADC process  (SQNR for 24 bits)
            - Noise floor from the internal computations:
                - Your daw will use 32bit or 64bit floating point numbers which give it additional headroom
                - Noise floor when bit-reducing to a mastering format (like 16bit CD audio)


## Dynamic Range
- This is a ratio (expressed in dB) of the minimum (= noise floor) and maximum signals that can be represented.
- The Dynamic Range for a Digital system is dependent on two factors which intersect in the ADC :
    - ADC Input: The voltage dynamic range
        - typically +/- 10V
    - Resolution (i.e. bit depth)
- The Dynamic Range for a 16-bit system is calculated by...
    - Number of distinct amplitude values that can be represented is ```- 2^{16} = 65536```
    - Converting that to dB: ```- 20 \log{65536} = -96dB``` (this is the dynamic range of the system) 
    - Taking it a step further:
        - If the voltage range of the ADC is +/- 10V, then it has a dynamic range of 20V    
        - The smallest voltage that the system can distinguish is therefore: 20 / 65536 = 0.3 mV 
        - We can calculate the minimum theoretical noise floor from this number:
            - **dBu** = ```- 20 \log{\frac{V}{V_{ref}}} ``` where ```- V_{ref} = 0.775V ```
            - ```- 20 log{\frac{0.003}{0.775}} = -48.24 dBu```
- Following same procedure as above:
    - Dynamic range for a 24bit system is -144 dB
- **Affect on Noise Floor**
    - The dynamic range is also a measurement of the lowest theoretical noise floor:
        - Since the reference value in dB's calculation is the largest value that can be represented.
    - In reality though, the noise floor will always be higher due to misc electronic noise.
- **Comparing Analog to Digital**
    - Noise floor of analog console is around -90dBu.  
    - Recall that analog electronics have a hidden headroom of about 24 dBu.
    - So the total dynamic range in the best analog system is 90 + 24 = 114dBu.
    - 24 bit recording provide dynamic ranges of about 144dB!


## Fixed vs Floating Point and Dynamic Range
- Sources
    - [analog.com article](http://www.analog.com/en/education/education-library/articles/fixed-point-vs-floating-point-dsp.html)
    - [dspguide.com](http://www.dspguide.com/ch28/4.htm)
    - [exploringbinary.com](http://www.exploringbinary.com/the-spacing-of-binary-floating-point-numbers/)
    - [useful blog here](http://steve.hollasch.net/cgindex/coding/ieeefloat.html)
    - [explanation of subnormal](http://stackoverflow.com/questions/8341395/what-is-a-subnormal-floating-point-number)
    - [representation basics](http://www.geeksforgeeks.org/floating-point-representation-basics/)
- Floating point representation is defined by standard IEEE 754
- Floating Point representation has 2 essential properties:
    - Binary
    - Scientific Notation
- Significant Digits and Scientific Notation
    - Significant Digits
        - In calculations, the point is that the output should never have more precision (see below) than your inputs
        - Which digits are giving information regarding the actual precision of the calculation
        - Consider numbers as having both scale and precision.
            - Scale: You can represent different ways
                - 502, 5.02E3, 0.00502E6
            - Precision:
                - After the first non-zero digit in an amount, the additional, meaningful information which refines the quantity.
                    - 502 has a precision of 3 
            - **Precision = significant digits** 
        - Rules:
            - Non-zero digits and 0's in between => Significant
            - Leading zeros: not significant
            - Trailing Zeros:
                - If the decimal is included => Significant
                - If no decimal => Not significant
        - Why are leading 0's which are **after** the decimal place insignificant?
            - Ex.  42 g has 2 significant digits
            - 0.042 kg is the same number and it clearly it cannot have increased the number of significant digits
            - **So**: significant digits are **different** from the digits that imply scale.  
            - Significant digits are those that contribute to the precision!
    - Scientific Notation
        - Separates the Scale (=exponent) from the Precision (=significand)
        - Ex: 5.02E3
            - Significant = 5.02
            - Exponent (base 10) = 3
        - The point is...
            - shorthand for a wide range of quantities
            - you use only the significant figures in your amount
            - simplifies calculation
        - Formatting note: The part to the left of the decimal should always be <= 1 and > 10
- Precision vs Accuracy in Scientific contexts    
    - `Accuracy`: whether the result represents truth
    - `Precision`: consistency of results        
- Precision vs Accuracy in Computing (floating point) contexts
    - [Decent discussion here](http://ask.metafilter.com/204661/What-is-the-difference-between-floating-point-accuracy-and-precision):
    - `Accuracy`
        - How close the result is to the truth.
        - The reason we might have an imperfect value is not because of some methodological issue (e.g. bad data, measurement, etc.) as with a purely scientific context (above), but rather we might need to represent a number imperfectly (i.e. we might need to round it).
        - Any digital format has space limitations, and so not every real number (since the number of reals is infinite) can be represented. Some rounding may be necessary.        
        - Accuracy may change due to different types of mathematical operations having differing levels of rounding in the results.
            - [Some reasons we have to round](http://floating-point-gui.de/errors/rounding/)
            - [Some descriptions of safe and unsafe operations](http://floating-point-gui.de/errors/propagation/)
                - Safe: Multiplication & Division
                - Not Safe: Addition & Subtraction when one number is really big and another is really small
    - `Precision`
        - The number of bits you allocate to storing the significand   
- Floating Point Format
    - Bits are divided in 3 sections:
        - Mantissa (significand)
        - Expoonent
        - Sign
    - bit allocation:
    |  | Sign | Mantissa| Exponent | 
    | :---: | :---: | :---: |  :---: | 
    | Single Precision	| 1 | 23 | 8 |
    | Double Precision	| 1 | 52 | 11 |
    - Layout:
        - **Single**: SEEEEEEE EMMMMMMM MMMMMMMM MMMMMMMM
        - **Double**: SEEEEEEE EEEEMMMM MMMMMMMM MMMMMMMM MMMMMMMM MMMMMMMM MMMMMMMM MMMMMMMM
    - Sign Bit: 1 = negative, 0 = positive
    - Exponent:
        - Needs to represent positive and negative values
        - Uses a bias (single=127, double=1023) such that:
            - Actual\_Exponent\_value = Bias - Stored\_Exponent\_Value
        - Bias makes sense since, a single has 8 bits in it's exponent, ```- 2^8 = 256 ``` which is (basically) half
    - Mantissa:
        - Note that in scientific notation you can represent the same number in various ways:
            - 0.5E2
            - 5000E-2 
            - etc.
        - To prevent this, floating point uses Normalized form:
            - Strips off all the leading insignificant digits
            - Puts the decimal place after the first significant digit
            - But, since the bit has to be a 0 or 1, and 0 is insignificant, you can actually assume a leading one and use the entire mantissa for the parts after the decimal point.
                - This implied bit gives us an extra bit of precision!
                - Only exception to this rule is for denormalized numbers
- Example toy floating point system
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

- Floating point Special Cases
    - Overflow: when a result is out of range
    - Underflow: when a result is too small to be represented
    - There are also special bit patterns for 0, +inf, -inf, and NaN (not-a-number)
    - Denormalized numbers:
        - They're bigger than 0 but smaller than ```- 1 x 2^{e_{min} ```
        - The purpose of having subnormal numbers is to smooth the gap between the smallest normal number and zero.
        - Format: 
            - Exponent is all 0's 
            - Mantissa is non-zero
            - The implied bit is assumed to be a zero
        - Representation is ```- (−1)^s × 0.f × 2^{−126} ``` where s = sign bit and f = fraction
        - As denormalized numbers get smaller, they gradually lose precision as the left bits of the fraction become zeros.
            - That's the precision is linked to the size of the mantissa which is typically all significant bits.
            - However, now the mantissa is being used to scale down the number having exhausted the range available to the exponent.
        - In practice, when you encounter denormalized numbers, you should consider scaling the number set.

- Floating Point Arrangement on the Number Line
    - Floating point typical largest is +/-3.4E+38 and smallest is +/-1.2E-38
    - Values which don't have to be rounded at all are spaced unequally (logarithmically) between these extremes
    - The distance between each of these values are called **gaps**
    - For each set of consecutive power of 2, the number of gaps is constant
    - Within each set of consecutive powers of 2, the size of the gaps is constant
    - However for each set of consecutive powers of the 2, the size of the gaps increases
    ![floating-point](/resources/images/programming/floating-point-system-1.png)
    ![floating-point](/resources/images/programming/floating-point-system-2.png)
- Gaps and Precision
    - Precision determines the number of gaps
    - Often said that the number of gaps between any two numbers powers of 2 10 million times smaller than the value of the numbers.
        - **Given** 32-bit float, 24b mantissa, 8b exponent
        - Number of gaps per order of magnitude: ```- 2^{numBits(mantissa)-1} = 2^{23} ``` 
        - Take the interval over ``` 2^{9} ``` to ```- 2^{10} ``` (512 to 1024)
        - There are 512 integers in this interval but ```- 2^23 ``` values available
        - ```- 2^23 ``` = 8,388,608 = (approx) 10,000,000
    - You can calculate a float's precision in number of decimal places 
        - mantissa = 23 bits
        - ```- \log_{10}2^{23} ``` = 6.924 = 7 decimal places
- Fixed Point
    - Typically 16-bits or higher
    - Have a reserved (fixed) number of bits for each side of the decimal
    - Gap size is constant
    - No difference between representing integers or reals with a fixed number of decimal places: multiply it by a constant to get the value you want.
- Floating Point vs Fixed Point
    - Precision and Accuracy
        - Accuracy is primarily driven by the number of bits available.
            - 16 bit fixed point vs 32 bit floating point is not a totally fair comparison
        - You get arbitrary precision in a fixed point scheme because you have no control over how many bits will be allocated to insignificant digits (e.g. leading or trailing zeros)
        - For floating point, you have a constant precision (except in cases of denormals)   
    - The big difference: Dynamic Range
        - Floating points trade off a certain amount of precision (via mantissa) to have a larger range (via exponent)
        - Fixed point schemes are accurate enough, but their range is limited. 
    - **Summary**
        - Floating point wins on dynamic range and precision
        - Fairly even on accuracy
- Floating vs Fixed Point Performance   
    - In general purpose processors fixed point arithmetic is faster
    - In DSP's the speed is about the same
- **Application to Audio**
    - Dynamic Range (the bigger deal)
        - Floating point numbers have much greater dynamic range than fixed point systems, which means less clipping
        - Although we can't send a 32-bit audio frame to a sound card (yet?), this does give the inner signal processing chains much more useful headroom. 
            - This is the "hidden" dynamic range.
    - Quantization Noise (the lesser big deal)
        - Primary source of noise in digital electronics is SQNR (quantization noise- noise from rounding)
        - Each time we store a number, we're adding noise to the signal if there has to be a certain amount of rounding
        - Rounding error is a max of 1/2 the gap size, which varies along the range
        - Std Deviation of rounding error (=signal to noise ratio) is about 1/3 of the gap size.  
        - Quantization noise imposed from rounding will be worse in a fixed point system as the gap sizes are bigger.
            - **Confirm** Although, as you get into the higher range of a floating point number, the gap size gets pretty big.  Maybe bigger than a fixed point numbers...
            - HOWEVER, you probably wouldn't be able to represent that number in a fixed point system due to the smaller dynamic range.
    

## Actual Dynamic Range
- On a master track, your clipping point is indeed 0dB
- Within an individual track (or processing chain) before its audio is passed the master bus - you have more headroom because you're using 32bit floating point calculations instead of the 24bit audio buffers you pass to the sound card.
- 32-bit



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
- One simple approach:
    - You're not getting noise from digital components: floating point to the rescue!  But you need to leave enough headroom.
    - There's not much you can do about ambient noise.
    - The main source of noise is in your analog electronics- preamps, ADC, etc.
        - The noise level is typically constant (or independent of signal level)
        - So you make signal level high enough to make the noise comparatively small.
        - Just leave enough room so you don't clip/distort.
        