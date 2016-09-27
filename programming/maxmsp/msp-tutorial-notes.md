MSP Tutorial Notes
===========

## Audio vs Control Rates
- Max objects are processed in Logical time (observes sequencing rules), whereas MSP objects are processed at Audio Rate.
- Control Rate vs Audio Rate
    - Max objects observe the Control Rate which is essentially has a 1ms cycle (ie 1000 per sec)
    - MSP objects observe the Audio Rate which is, assuming 44.1k sampling rate, 44 times the Control Rate.
- Objects that link Max to MSP: `line~`, `sig~`
- Objects that link MSP to Max: `snapshot~`
    - but remember this can only peek as frequently as 1 ms, since that is the Control Rate
- Expensive MSP objects: 
    - `\~` 
    - `reson~`, `biquad~` (bc they perform many calcs per sample), 
    - `fft~`, `ifft~` (spectral analyzer),
    - `play~`, `groove~`, `comb~`, `tapout~` (ONLY WHEN THEY"RE CONTROLLED BY AN AUDIO SIGNAL)
- "Vector Size" in Max/MSP is the same as Block Size
    - You can specify the block size for I/O to your audio device separately from the calculation block size
    - You want the i/o vector size to be small to reduce latency, but managing each block entails some computational overhead.  
        - The computational aspect is really an optimization of the tradeoff between small block size (faster calculation, more overhead) and larger block size (slower calcualtion, less overhead).  - Audio is calculated in Interrupts- it pre-empts whatever other processing is occurring and handles that calculation.
    - Certain objects benefit from a smaller calculation vector size- for example `tapin~`/`tapout~` smallest delay amount is based on the amount of time consumed by the signal (ie calculation) vector.
        - at 64 samples and 44.1k, this 1.45 ms
- You can easily calculate how much audio is precalculated based on the Vector Size [BlockSize*(1/SR)]
- Overdrive setting lets you run the event scheduler at interrupt-level.  These are control-events.  Generally entails much faster performance.
- If you have selected Overdrive, you can also select 'Scheduler in Audio Interrupt' which runs the event schedulededuler before processing each signal vector's audio content.  This can improve timing of audio events that are triggered by control events.
- "Mixer Crossfade" lets you introduce some latency for live patching, such that changing the signal nw will not result in clicks (bc old new output will be xfaded with new)
- [Audio Rate Sequencing Tutorial](https://cycling74.com/wiki/index.php?title=MSP_Sequencing_Tutorial_1:_Audio-Rate_Sequencing)


## 1 - Wavetable Synthesis
- `cycle~` is a wavetable synthesis routine:
    - Unless otherwise specified, it reads a table of 512 samples which represent one cosine cycle.
    - It determines how quickly to read through the table based on the frequency that is specified
    - You can also point it at your own wavetables (spec: 512 samples, amps between -1 and 1)

## 2 - Adjustable Oscillator
- `togedge` is like the control message equivalent of `edge~`
- Toggle object is not just sending bangs, it sends a 0 or 1 which can be more useful than a bang.

## 3 - WaveTable Oscillator
- `cycle~ typically generates a cosine wave, reading through a 512 sample internal buffer which represents a single cycle of the waveform
- `cycle~` can read from any other 512 sample buffer, just set a parameter to the name of the `buffer~` object
    - `buffer~` needs to have a name
    - `cycle~` will only read 512 samples from `buffer~`, even though the length of buffer can be anything
    - you can also specify the start point where `cycle~` begins reading
- pass a 'read' message to `buffer~` to assign it some data
- `noise~` : white noise
- implicit add: any time a two signals are going into the same object will be implicitly added together

## 4 - Routing Signals
- `value`:  a variable name for a global value.  you can set duplicate copies of this object as you like.
- `pv`: same a the value object, except that it is only inherited by subpatches.  so in a subpatch, this would be like a local value.
- `loadmess`:  like loadbang except it sends a message instead of a bang when the file/patch is loaded.
- `recieve~`: specifies a subject to listen for, but you can also set this dynamically
- `gate~`: route a signal through a variety of outlets.  Note that the signal goes in the right inlet and the left inlet specifies the routing (can be a signal or int)
- funny trick: if you set a cycle to 0 Hz, but vary it's phase from 0 to 1 over the course of a second, you actually result with a 1 Hz cosine signal
- `phasor~` often used as to input into to `cycle~`'s phase input.  (hence the name)  as the value varies from 0 to 1, it will access different parts of the 512 sample buffer
    - when you do use a `phasor~` to drive a cycle~, the default freq param of the `cycle~` is typically 0
    - it's no problem if you specify a value outside of 0-1 to input to the `cycle~`'s phase inlet, bc it will wrap
- **Difference between PD and Max:**
    - For wavetable synthesis, it seems like 
        - `Max`: (phasor~) -> cycle buffername       [buffer~ buffername]
        - `PD`:  (phasor~) -> tabread4

## 5 - Turning Signals On/Off
- inverse of `gate~` is `selector~`:  it has multiple (variable) inlets and only one outlet.
    - this can be useful for creating bypasses (example in the tutorial was whether to enable an effects loop or not)
- `poly~` is primarily used for creating polyphonic synths, but zooming out it's use is for:
    - managing multiple copies of the same MSP subpatch within one object
-`poly~` arguments:
    - name of subpatch
    - number of instances
- control messages to `poly~` are typically routed to a `thispatcher`
- if you send a mute message to the `poly~`, you'll see that it disables the audio in all the subpatches.  this is useful b/c it will reduce CPU consumption, perhaps drastically!
    - so if you're concerned about CPU usage in a subpatch, wrap it in a poly~

## 7 - Additive Synthesis
- `function` can draw envelopes which, when banged, get output as value/time pairs, suitable for input a `line~`
    - can also be used as an interpolating table source for data
    - note that you can also move around function breakpoints programmatically
- `pass~` eliminates noise in a muted subpatcher

## 8 - Tremolo and Ring Modulation
- The 'critical band' is the range wherein AM modulator is fast enough to no longer sound like a tremolo, but not large enough to give the impression of two tones (the sum and difference frequencies)
- See the Sound-on-sound notes on AM for better explanations

## 9 - Amplitude Modulation
- Ring modulation is like a simplified version of a more general AM
- AM (general case) allows you to vary the carrier on more than just the instantaneous amplitude of the modulator
    - A depth setting is introduced!
    - But this introduces a problem: Depth control involves scaling the modulator, which since it will ultimately be multiplied by the carrier, will scale the amplitude range of the carrier- which is bad.
    - Solution: induce a DC-offset in the modulator before multiplying it by the carrier, so that the modulator range always goes to 1
    - This is also good because this means that the carrier frequency stays in the end product (in addition to the sum and difference frequencies)
- So you might get up to 4 different frequencies at any point:
    - Carrier
    - Sum
    - Difference
    - Modulator (if audio-range)

## 10 - Vibrato and FM
- If the vibrato rate is slow and the depth is large, then you won't really hear the vibrato centered on the middle/carrier frequency.  It will be like a sweep around the min and max.
    - Tutorial 17 explains how to fix that
- Percieved F0 and sidebands is based on the relationship between the carrier and modulator
- Computationally, FM is way more efficient than additive synthesis

## 11 - FM
- Modulating the frequency of one sound with another results in many more frequencies that are present in the input
- Frequencies of Sidebands:
    - Depends on relationship of carrier frequency (`- F_c`) and modulator frequency (`- F_m`)
    - Harmonicity Ratio (`- F_m / F_c `) Determines:
        - Frequencies of sidebands
        - Whether sidebands have a harmonic or inharmonic relationship with carrier
    - `- = F_c +/- n(F_m) ` where n = an integer
        - `- F_c, F_c + F_m, F_c - F_m, F_c + 2F_m, F_c - 2F_m, ` ...
- Amplitude of Sidebands (ie timbre):
    - Depends on relationship of modulator amplitude (`- A_m`) and modulator frequency (`- F_m`)
    - Modulation Index (`- A_m / F_m`) Determines:
        - "Brightness" of these harmonics 
    - Typically a multiple of `- F_c ` * Harmonicity
        - Why?  BC it gets multiplied by the modulator `cycle~` output, which is between -1 and 1, so we want to scale that value by carrier \* harmonicity \* index.
            
## 12 - Waveshaping
- Waveshaping can help you get dynamically changing timbres in a repeating waveform
- You will store some transfer function, either in a:
    - `table` - array of numbers typical range is 0-127
    - `buffer~` (at least 512 samples, particularly if being accessed via a `lookup~`)
- `lookup~ <buffername>`
    - takes a signal input (range between -1 and 1, or smaller segments as desired) (e.g. from `cycle~`) and accesses the value in the referred `buffer~`, presumably to be used as some transfer function
- rule of thumb with transfer functions:
    - usually the extreme input values (close to -1 or 1) will cause the signal to become brighter (ie more harmonics)
- waveshaping technique:
    - the `buffer~`, which holds the transfer function, is actually the output.  you vary the range and offset of input to the `lookup~` object, which is a cosine wave, and it will play back the particular regions of the buffer.
    - the big point is to affect the `lookup~` input (cosine) with envelopes or with some modulation so that you get some time-varying timbral changes to your sample wav.
- How does waveshaping differ from wave table synthesis:
    - waveshaping is only playing back segments of the transfer function, based on it's input.
        - if this transfer function is sampled audio, it might not be so different from what you can do with a sampler
        - if the transfer function is modelling amplitude-dependent distortion (clipping), then it's a more straightforward/intuitive use of wave shaping  
    - wave table synthesis is playing back a single cycle of a waveform at various speeds.

## WIKI TUTORIAL ON WAVESHAPING
- [Source](https://cycling74.com/wiki/index.php?title=MSP_Sampling_Tutorial_5:_Waveshaping)
- With waveshaping, samples can be used as lookup tables to transform the shape of other waveforms.
    - This allows us to create complex spectra from sinusoidal input
    - It is also the basic signal processing technique in amplitude dependent distortion
        - Can be used to model the nonlinearities of different kinds of amplifiers
- Double-clicking a `buffer~` will show you it's waveform
- If you want to figure out how many milliseconds are in a given number of samples (like 512), use the `sampstoms~` object
- `lookup~` takes 3 arguments: buffername, sampleStart, sampleEnd
- `waveform~` allows us to:
    - view a buffer
    - select regions of a buffer (you have to enable this mode, via a message)
    - directly modify the contents of a buffer  (when you enable draw mode via messages)
- `peek~` object lets you set particular samples in a buffer
- this tutorial uses an `uzi` connected to `peek~` to set the contents of a buffer, to function as the transform
- chebyshev polynomials are transfer functions designed to take a sinusoidal input and return different harmonic multiples
    - `- y = 2 * x^2 - 1 ` (doubles the frequency)
    - `- y = 4 * x^3 - 3 * x` (triples the frequency)
    - `- y = 8 * x^4 - 8 * x^3 + 1` (quadruples the frequency)
- Per [Columbia's Music and Computers Book](http://music.columbia.edu/cmc/MusicAndComputers/chapter4/04_06.php)
    - To be useful, Transfer functions should have certain properties:
        - They should be 0 when input is 0 (b/c why output audio when there is not input)
        - If you want them to do more than just scale the input, the function needs to be transcendental (have sines, logs, exponents, )
        - it's good if they transfer function range of outputs is between -1 and 1 (for audio)
        - Regarding Chebyshevs:
            - We know that the highest harmonic that can be generated by a polynomial of order N will be the Nth harmonic.  That is great: this means they're band-limited!
            - If you input a signal with amplitude 1, you get N times the base frequency
            - Lower amplitudes and you get a mix of harmonic content.
            - Typically, you would not calculate chebyshev on the fly- you precalculate the transfer function and put it in a table (`buffer~`, in this case) for optimization
- `peek~` vs `poke~` vs `index~`:
    - `peek~` lets you read/write samples to a buffer, but the values and indices are max messages not signals, (and it works even with audio off)
    - `index~` lets you read from a buffer (with no interpolation),
    - `poke~` lets you set buffer values at particular indexes using signal data (for both)

## 13 - Recording and Playback
- You can record audio into a buffer, by:
    1. Create a `buffer~` object, specifying buffer name, length, and channels as creation parameters
    2. Send 0 and 1 messages (stop and start, respectively) to a `record~` object, which has the buffer name as its creation parameter
    3. You should also have audio lines in (probably from `adc~` object) connected to the `record~` object
- Things we've seen about `buffer~`:
    1. Record into it with the `record~`
    2. Write to a file with a write message
    3. Play it with the `play~` object
    4. use it as a transfer function for `lookup~` (next tutorial)
    5. use the first 513 samples for wavetable playback/synthesis (tutorial 3)
- using `count~` and `index~` to walk through a buffer:
    - `count~` simply increments some value (signal output)
    - `index~` receives a signal input of some offset and uses that to read the buffer referred to by it's creation parameter
    - typical usage: `count~` -> `index~ <buffername> <channel>` -> `dac~`
- if you want to control playback differently, try using the `play~` object
    - why can't you use `index~` with a variable speed playback?  BC IT DOESN'T INTERPOLATE.  `play~` DOES!
- variable speed playback with `play~`:
    - message box -> `line~` -> `play~ <buffername>`
    - you could also replace the line~ with a curve~ to get an exponential curve or an appropriately scaled cycle~ object

## 14 - Playback with loops
- `groove~` is the most versatile way to handle `buffer~`-based playback
- specify:
    - buffer
    - starting point / end point
    - loop points
    - playback speed (can be varied continuously- requires signal input)
- for smoother looping, enable loopinterp (via message) to crossfade at endpoints

## 15 - Variable Length Wavetable
- recall `cycle~` lets you use any 512 sample buffer as a wavetable
- `wave~` lets you use any range of a `buffer~` as a wavetable
    - inlets:
        - `phasor~` output
        - startpoint
        - endpoint        
- since the sample doesn't represent a single cycle of a waveform, the `phasor~` rate doesn't have direct control over the frequencies.
    - moreover, you'll probably get aliasing b/c the waveform will have frequency components in excess of nyquist... so it will sound crummy.
- if you want to read the buffer back and forth, use a cosine (`cycle~`) as the primary index (but you will have to shift it between 0-1)
    - the big difference between `wave~` and `lookup~` is that `wave~` takes 0-1 input and `lookup~` takes -1 - +1
- you can also use a signal to continuously change start and end points of the loop

## 18 - Mapping MIDI to MSP
- linear rescaling:
    - formula for a line given two points: `- y - y_1      = m (x - x_1)`
    - scaling range \[1,100\] to \[200, 1000\] means finding a line given two points: (1,200) and (100,1000)
    - why? b/c we know this new scaling function must be a linear function and satisfy:
        - f(old_min) = new_min
        - f(old_max) = new_max
        - E.G.
            - f(1) = 200
            - f(100) = 1000
    - therefore 1,200 is on the line and 100,1000 is on the line
    - now to find the new formula, we just need to sub in these two points in the linear formula at the top.
    - once we have the new formula, we can plug in our values to rescale.
- linear to logarithmic rescaling:
    - typical formula a for a log function: `- f(x) = k \log x + c`
        - where *k* and *c* are constants
    - again, we know that:
        - f(old_min) = new_min
        - f(old_max) = new_max
        - and therefore...
        - f(1) = 200
        - f(100) = 1000
    - so as before, (1,200) and (100,1000) are both points on the line. 
    - now we can use this to derive the log function by plugging in both points and solving for the unknowns:
        - point 1 (1,200): `- 200 = k \log 1 + c `
        - point 2 (100, 1000): `- 1000 = k \log 100 + c`
        - so c = 200 bc log 1 = 0
        - and solving for k we get:
            - `- 1000 = k \log 100 + 200`
            - `- 800 = k \log 100`
            - `- 800 = k 2`
            - `- 400 = k`
        - so the new function is: `- f(x) = 400 \log x + 200`
- notes on mapping frequencies:
    - 0-1 => 1 octave jump                     
        - new_freq = base_freq * 2^x
        - if x=0, new_freq = base_freq
        - if x=1, new_freq = base_freq \* 2
         - if x=2, new_freq = base_freq \* 4
- interesting how as you get higher up, there's more distance (and therefore room for other partials) between the frequencies

## 19 - MIDI Synthesizer Control
- note that you will want envelopes to occur relative to the velocity of the note:
    - louder notes will have a faster attack
- also true that you want a sound to have more harmonics as it's played louder

## 20 - MIDI Sampler Control
- `info~`: get sr info on a file
- `dspstate~`: get sr info on MSP		
- `poly` (not `poly~`) can be used for simple voice allocation based on incoming midi notes
    - outlets are voice, pitch, and velocity
- `if`:
    - one way of using it is to pass it a packed list and then say: "if $i3 then $i2" which means if the third integer is non-zero, then pass the second integer
    - only has one outlet and the 'then' or 'else' clause determines what is passed
- `funbuff`: stores pairs of numbers.  then when you pass in the key number or any number less than the next key, the value for that key is returned.
    - it's good for denoting/resolving ranges
    - you can initialize it internally or with message boxes
- `groove~`:  (some useful info)
    - right outlet is a signal ramp whose freq is 1 cycle over the buffer
    - the left inlet is a signal which determine playback speed such that:
        - 1 = normal speed
        - -1 = normal speed in reverse
        - 0 = stopped        
    - if you're dealing with a file whose SR is different from the dsp engine, then you'll need to adjust the playback speed (left inlet signal) to `groove~` accordingly

## 22 - MIDI Panning
- There are 3 basic methods to using a midi control value 0-127 to control panning:
1. Linear Crossfade
    - conceptually similar: map the 0-127 midi cc value as a 0-1 amplitude corresponding to the right gain.  left gain = 1.0 - rGain
    - therefore the sum of the amplitudes always equals 1.
    - two issues though:
        1. 64 is supposed to be centered, but since midi range is 0-127, 64 would actually be center of 0-128 range. so we divide the cc value by 128 if between 0 - 64, and 127 if greater.
            - i guess there are a couple ways we could handle this, but for sheer usability, we need to maintain 64 as the center point
        2. the intensity of the overall sound is proportional to the sum of the amplitudes, not the sum of the amplitudes.  therefore, you perceive greater intensity when it's NOT panned center.
            - example:
                - (0.75 \* 0.75) + (0.25 \* 0.25) = 0.625
                - (0.5 \* 0.5) + (0.5 \* 0.5) = 0.5
            - this is especially crappy because this means we won't maintain the impression of the same distance from the speaker as we pan
                      
2. Equal Distance Crossfade
    - the best way to maintain a constant distance is to move the values along an arc
    - we'll just map the midi cc values (including the mapping/midpoint trickery mentioned above) to a 0-0.25 range and then feed that into a sine and cosine values for r / l channels, respectively
    at any point from 0 - 0.25, the sum of the squares of the sin/cos are equal to 1.
    - note the values returned by `cycle~` are stationary as long as the cc doesn't change bc the input is going to the phase inlet
    
3. Speaker-to-Speaker Crossfade
    - In the equal distance crossfade, this simulates the movement of the sound along an arc with the listener at the center, but if you wanted the effect of a pan moving in a straight line from one speaker to the next, that means the sound will be closer, and thus louder, to the listener when panned center.  so the gain needs to be proportional to the distance of the source to the sound the the listener, which is partially a function of the width/narrowness of speaker placement.  plus there's some extra trig work here.
    - generally, it's not worth doing it this way b/c for narrow speaker placements, it's not noticeable and for wide speaker placements, its too extreme.


## 23 - Viewing Signal Data
- `number~` and `meter~` are updating every 250 ms by default, but you can change this with it's 'interval' attribute
- you can use the `number~` inspector to allow/block its different modes:
    - signal monitor mode
    - signal output mode
- `number~` can also recieve a number in it's right inlet which tells it how quickly to 'interpolate'- it step up into the new value (like `line~`)
    - once you've set this number, it will remember it for all value changes
- `snapshot~` will take intervals messages also
- `capture~`: double click on this and it will show you the most recent frame
- `delta~`: good for not only getting the direction (magnitude of output), but also reconstructing the previous signal (current signal - delta).


## 24 - Oscilloscope
- Important parameters for `scope~`:
    - **bufsize**: the number of pixels in each redraw
        - by default this is 128
    - **calcount**: the number of samples to map to each pixel in the bufsize
        - this is an integer value which goes into the left inlet
        - smaller values: make the `scope~` update more rapidly, give more detail
        - larger values: make the `scope~` update less rapidly
    - **Example**
        - if you set calcount to 344, and bufsize 128, and 44.1kHz SR, you're displaying ~1 sec of signal bc 344*128 = 44,032
    - to tweak values for `scope~`, I suggest working in this order:
        - use the default bufsize of 128
        - adjust the calcount and window-size of the `scope~`
            - changing the window-size won't affect the shape which is drawn, it will just make it change size.
        - if necessary, adjust the bufsize    
    - signal -> resampling to scope~ buffer -> resampling to draw window


## 25 - Using the FFT
- DFT: time domain -> freq domain
- IDFT: freq domain -> time domain
- If you use window sizes which are multiples of 2, you can use the FFT algorithm, which is implemented by the fft~ object
    - typical window size is 512 samples and since at 44.1kHz, each ms has about 44.1 samples, this means you're about 11.6 ms per window
    - ifft~ has to be connected to the fft~
- The Short-term Fourier Transform is when you use fft for spectral processing and then use the ifft~ to transform back to time domain
    - **I think `pfft~` (NEXT TUTORIAL) is generally better for these purposes than `fft~`**
    - STFT uses overlapping windows and and an envelope function (e.g. triangular (not so great) window or hanning (best) window)
- The output of `fft~` is a signal of the freq-domain (so not suitable for audio).  
    - each output is the same size as its windowed input: so presumably 512 samples
    - each sample index is the same indexed harmonic of a fundamental (index 0) frequency, which is the window frequency's sr (so in this case, 44.1k / 512)
- One problem with `fft~` is that it assumes that each window will contain exactly 1 cycle of the input frequency
    - its not so bad if you have an input signal which is a multiple of the windowing frequency, but this is seldom the case
    - to resolve this, we use STFT with its:
        - overlapping windows
        - envelope (windowing function): which helps filter out the false frequencies introduced by discontinuities at the signal endpoints due to the signal's cycle not being a strict multiple of the window length
- This is how the tutorial implements the STFT:
    - uses a `cycle~` referring to a triangular wave `buffer~`, which is driven at the frequency of 44.1kHz/512 (ie the windowing frequency)
        - not that this envelope function has to be multiplied by the input signal (pre fft~) and the output signal (post ifft~), so we use the sqrt of this
    - we're using two overlapping fft~'s which are phase offset by half a cycle, which is specified in sample length (and must be a multiple of signal vector buffer size)
        - this means there needs to be two cycles which, although referring to the same buffer~, are also offset by 0.5
    - since we have two overlapping fft~/ifft~'s running the output must also be multiplied by the triangular envelope function
        - it smooths out the discontinuties in both input and output of data
        - i think we still will see some spurious energy coming back though
- `fft~` arguments:
    - input window (or frame) size
    - output window (or frame) size
    - offset (in number of samples, must be a multiple of signal vector)


## 26 - Spectral Processing with pfft~
- terminology:
    - **frame**: set of samples that are input to the fft
    - **bins** or **frequency bins**: the output of the fft.  these are the pairs of real and imaginary numbers which contain information about the amplitude and phase.  these exact values are not the amplitude and phase, but they can be derived from them. 
    - **fft size** or **point size**: the number of samples in a frame.  can be any power of 2.
- tradeoff in time vs frequency resolution:
    - frequency resolution: means you want larger frame size, so you lose timing information
    - timing resolution: means you have a smaller frame size, but less frequency bins / resolution
- `pfft~` is more convenient for spectral processing than fft~/ifft~ because it allows you to abstract away from frame size, overlap, and windowing function and focus a subpatch on spectral processing.
    - recall for overlaps, we had to specify multiple instances of fft~/ifft~ which was very inconvenient.
- `pfft~` arguments:
    - subpatch name, which contains fftin~ and fftout~ objects
    - frame size, in samples (must be a power of 2)
    - overlap factor (hop size in samples = framesize / overlap_factor) (overlap_factor must be a power of 2)
- `pfft~` inlets:
    - depend on the number of fftin~ objects in the corresponding subpatch
- `pfft~` outlets:
    - probably the same as above- except based on the fftout~ objects
- you can also use an 'in' object in pfft~-based patches for other inputs
- `fftin~`/`fftout~` arguments:
    - what windowing function to use: 1=hanning (sine), hamming, blackman, triangle, and square
    - which you choose depends on the sound you're looking at
    - Computer Music Tutorial by Roads is a good introduction to FFT analysis
    - nofft argument allows the raw, unwindowed time-domain signal to be passed in, for debugging/diagnostics
- `fftin~` oulets:
    - real:
        - This output frame is only half the size of the parent `pfft~`'s FFT size because the spectrum of a real input signal is symmetrical and therefore half of it is redundant. The real and imaginary pairs for one spectrum are called a spectral frame.  
        - this represents the amplitude of each bin
    - imaginary:
        - imaginary values, corresponding with the real data.  again, the frame size is halved b/c the output of the fft is symmetrical
    - bin index:
        - A stream of samples corresponding to the index of the current bin whose data is being sent out the first two outlets. This is a number from 0 - (frame size - 1). The spectral frame size inside a pfft~ object's subpatch is equal to half the FFT window size.
        - range: 0 - (windowsize/2)-1
        - to get the frequency this represents, multiply the signal (called the sync signal) by the base frequency, or fundamental, of the FFT (= SR / fft frame size).  This base frequency is the lowest frequency the fft can analyze.
- fftout~ inlets:
    - real
    - imaginary
- convolution: multiplication of signals in the frequency domain
- `fftinfo~`:
    - accessible inside the pfft~ subpatch
    - will give you fft framesize, half-frame-size (ie number of bins), and the hopsize
    - you can get the fft base frequency by using this information in combination with the `dspstate~` object to get the sr
- Dealing with Phase and Amplitude Values returned by `fftin~`:
    - **SHOCKER**: They are not raw phase and amplitude values.  Instead we need to convert them to a different scale (and convert back before sending into fftout~)
    - Units returned by `fftin~`:	Cartesian
    - Units we like to work with:	Polar
    - **Cartesian:**
        - The amplitude/phase values are like x,y coordinates where the x dimension is real number (amplitude) and the y dimension is imaginary (phase)
    - **Polar**:  (the naming here doesn't make a lot of sense to me)
        - amplitude: the length of the line segment traced from origin to the x,y pair
        - phase: the angle of the line from origin to x,y pair
    - How to convert: `cartopol~` and `poltocar~`
- Interesting Examples of Convolution (and an optimized version) in this tutorial
    - Phase Vocoder Example:
        - Original algorithm for time stretching: playback converted spectral data at a different rate
    - The calculations for storing spectral data involve a few different pieces of info, which are slightly complicated when you're dealing with overlapping data:
        - Things you might want to know:
            - Buffer Space allocation for spectral data
            - Number of Frames
        - Examples:
            - Given 1000 ms at 44.1kHz, we need 44100 samples
            - If your FFT size is 1024 with no overlap then your number of frames is:
                - 44100 / (1024/2) = 86 frames
                - (1024/2) bc spectral frame size is half of the fft size 
- We know that a larger FFT size increases frequency resolution, bc the amount of spectral bins will be increased.
- But, that also means decreased timing resolution.
- The compromise is to use overlapping windows- 
    - pfft~ abstracts away from the windowing details
- FFT Fundamental is determine by the point-size and represents the lowest note possible:
    - FFT Fundamental= SR / PointSize
    - **Ex**: 
        - 44100 / 1024 = 43 Hz
        - 44100 / 512 = 86 Hz
- Processing/Sampling pipline for pfft~:
    - This is important so you can set Buffer sizes and # of Frames appropriately
    - Parent Patch: Processing at SR
    -  `pfft~`:
        - Sampling Rate determined by Point Size
        - Spectral frame size will be half the Point Size
        - Overlapping factor of X means each frame will correspond to Point Size / X input samples
        - SR / Overlap / PointSize = Size of Input Frame (in samples)
        - Size of Input Frame / 2 = Size of Corresponding Spectral Frame (in samples)
        - Input Audio Length (IAT) (ms) => Size of Spectral Frame (samples) for a buffer
        - IAT / 1000 / SR = Length of Audio (IAS) (samples)
        - IAS / Overlap / PointSize = Windowed Size of Input Frame (FI) (samples)
        - IAS / FI = Number of Input Frames (NFI)
        - FI / 2 = Size of Spectral Frame (FS) (samples)
        - NFI * FS = Sie of Spectral Frame (samples) for a buffer
        (I think this is correct)
    - THere are objects which can be overlapping-frame-aware for you `pfft~` patch:
        - `framedelta~` will calculate the delta for corresponding frequency bins for successive frames
        - `frameaccum~` does the inverse to recalculate the accurate phase for overlapping windows


## 27 - Delay Lines
- delay amounts of 100ms create a 'slapback' effect and delays of longer will eventually sound like independent events
- very short delay times can create comb filters


## 28 - Delay Lines with Feedback
- alternative to `clip~` could be `normalize~`, which will normalize a signal in real time, such that you specify a max amp to output and it will scale everything based on the maximum input (so far).  
- although sometimes this makes quiet sounds way too quiet, so you send it a 'reset' message.
- delayed signals emulate a reflection, but since acoustics are complicated, you want multiple reflection sources and a good way to approximate that is via feeback on a delay line


## 29 - Flanging
- When a signal with a time-varying delay (especially a very short delay) is added together with the original undelayed signal, the result is a continually varying comb filter effect known as flanging. Flanging can create both subtle and extreme effects, depending on the rate and depth of the modulation.
    - so basically, we're just using an lfo on the delay time.  the key parameters are modulation rate and depth.


## 30 - Chorus
- Instead of a regular delay amout like in the flanging example, we can change the delay amount randomly and get a chorus effect.
    - `noise~` generates white noise, but this would not be a good modulation source for the chorusing becuase it would change so quickly that it would just sound like added noise.
    - `rand~` also chooses a random number between -1 and 1, but it does so less frequencly and linearly interpolates between all of those values.
        - `rand~` is like a low-frequency noise bc the spectral energy will typically be concentrated most in the freqs below it's own
    - adding feedback also adds some nice chorusy effects


## 31 - Comb Filter
- The MINIMUM delay time that a tapin can use is set by the signal vector size
- Effects which rely on shorter durations need to use special msp objects, like `comb~`
- A comb filter accentuates and attenuates the input signal at regularly spaced frequency intervals -- that is, at integer multiples of some fundamental frequency.
    - this makes is sound like a harmonic sound
    - best to use a comb filter on a harmonically rich sound source
- `comb~` output is a single signal
- `comb~` input is a combination of 4 params:
    - base delay time
    - gain of input signal
    - gain of delay
    - feedback gain
- so the fundamental frequency of the comb filter is set by the base delay time
- A band-limited pulse has a harmonic spectrum with equal energy at all harmonics, but has a limited number of harmonics in order to prevent aliasing. 
- `gain~` can be really useful in scaling a linear amplitude range (eg 0-127) into an exponential one so that perceived amplitude conforms with the linearly-ranged input value.  it also takes an interpolation time so there are no sudden discontinuities.  (see mapping tutorials and the inspector for this object)
- you can modulate the signals sent into a comb filter and do any number of wackadoodle things!

## Compression Tutorial
- There are two circuits in a compressor:
    1. Threshold/Level Detection
    2. Gain Adjustment
- The level detection circuit is using `average~` in rms mode with frames of 1000 samples long.  I guess this is to smooth any spurious values exceeding the threshold, so that we know no gain adjustments will take place unless it's true- this equals about 22ms of response time.
- The attack and release times use `rampsmooth~`: this records a rampup and rampdown time (set by messages).  then whenever the incoming message value changes, it begins to ramp up/down linearly according to the ramp up/down times set.
- Remember, its the absolute amplitude we're interested in: we compare abs(signal_val) to the threshold
- Typically, compressors respond to average levels whereas limiters respond to peak levels
- `meter~` will show you some levels.  i think there are live meters out there too.
- `omx.peaklim~` gives you a brick wall limiter
- `omx.Comp~`
- `omx.4band~` is a multiband compresson
- good idea to put a noise gate in front of any compressor for raw recordings


## Misc Useful Stuff
- `sync~`:
    - just like `phasor~` except that it understands speed in BPM, not Hz
    - you can set the BPM through tapping or direct number box entry
    - used for synchronizing events
- `rate~`:
    - takes a (typically raming) signal input (like from sync), and you specify a scaling factor as an argument and it will time scale it
	    - 2: double the period
	    - 0.25: quarter the period
- using `line~` to simulate an envelope: you can send `line~` a message of pairs of values and it will simulate an envelope:
    - eg "0 0 1 1 0 5" will set it to 0 immediately, ramp it to 1 in 1 ms, and then back down to 0 in 5ms
- `listfunnel~`:
    - parses a list and then sends out each element prepended by it's index number
    - eg "foo bar snack time" -> 0 foo, 1 bar, 2 snack, 3 time
- `techno~`:
    - audio-rate step sequencer
    - 3 outputs:
        - midi freq of note for current step (AS A SIGNAL - so use mtof~)
        - amplitude of each note
        - current step
    - inputs:
        - ramp signal (such as provided by phasor~ or sync~)
        - messages:
            - "length x" : how many steps in the sequence
            - "pitch <step_ind> <val>"
            - "amplitude <step_ind> <val>"
            - "attack <step_ind> <val>"
            - "decay <step_ind> <val>"
            - "curve <step_ind> <val>"  amount of portamento/glide
    - you can wire it up to a multislider for steps and amps (+ listfunnel and prepend if you like)
- `seq~` object:
    - can record and playback sequences of numbers timestamped according to a master clock signal.
    - typically this master clock signal would be a signal ramp, but it could be signal outside 0 to 1 or be a curve of some kind
    - records and returns (max) numbers instead of signals, so this would typically be midi data.
- You can have any number of delay lines associated with the same `tapout~` source.
	- they can have different delay amounts
	- specify a series of arguments (delay amts) for each delay line and you'll get that many outlets
		- (this is like a multitap delay- multiple delays from the same source)
Sending a signal input into a `tapout~`:
	- This uses a continuous delay algorithm
	- Useful for pitch shifting (see delicious max tutorial on youtube - #7, maybe)
		- Why that works in general: doppler effect.  the pitch shifting is only possible while the distance is between source and observer is changing.  (see notes)
