Computer Music And PD
==========================
- A collection of materials form the computer music class at UCSD with Miller Puckette
- [Book and Materials](http://msp.ucsd.edu/techniques.htm)
- [Assignments](http://msp.ucsd.edu/syllabi/171.15w/index.htm)
- [Transcript of lectures](http://pd-la.info/media/MUS171/Miller_MUS171_transcript.txt)

## Lecture 1  
- [link](https://www.youtube.com/watch?v=N9_J5qsntrc)	
- You can test the Audio by going to Media -> DSP ON, then select 'Test Audio and Midi...'
- Media -> Audio settings
    - you can reduce the delay and then test the keep on testing the test tone to make sure it sounds ok
- Put menu -> place objects and things...
- Some objects:
	- `osc~`
	- `*~`
	- `print~`	: printing blocks of signal data
	- `dac~`	: audio output
        - dont send values greater than 1 or less than 1
- To Turn things off, just click off the big DSP checkbox
	- Ctrl .	(OFF)
	- Ctrl /  (ON)
- Any object which ends with a ~ is running when DSP is ON
- Messages have thinner cords than signal cords
- Put the patch in performance or autopatch mode for things like bangs to work
- pd is going to process in blocks.  you can see this block by connecting an osc~ to print~.
- you could attach a `+~ 440` to an `osc~` and that would be the same as osc~ 440
- space is the only delimiter in PD
    - Edit mode: Alt ctrl E	
    - Performance mode:	Alt ctrl P


## Lecture 2
- graph object: rectangle you can stick an array inside
- array: 
	- you give it a name and a size (number of points it will have)
		- size: for 1 second, at normal sample rate, you would specify 44100 points.
		- y values range from -1 to 1 (like audio!)
	- also sometimes called a table	
	- right click on the array and you get lots of array and graph properties	
- `tabwrite`  will take in a value and write to a table (ie an array)
	- it will graph the audio signal into the array
	- to trigger it, connect it to a bang	
- if your audio is clipping, the clip object will do the clipping of the signal for you... so you can send that to an array and it will visualize what you are hearing accurately
- if you add an `osc~` with no parameters then it puts a static 1 V out which, if you add to osc~ 440, it will essentially add a bias (everything gets raised), and so the top of the wave gets clipped.  but you can add interesting timbres by raising the bias to give it some clipping at parts.
- waveshaping: purposeful clipping- like to get square wavs, etc.
- amplitude modulation is like multiplying the base wave
- i think fm operation is where you have two oscillators where 1 modulates the freq of the other, but mathematically (in pd) it is like add a combination of multiplication (depth(amp)) and additive (amount(freq)) operations
	- in essence, fm is a deep fast vibrato which creates timbral variations.


## Lecture 3
- the product of two sinusoids is the sum of two other sinusoids at different frequencies
- signal processing vs control messages
- second inlet on osc~ is how you set the phase.  varies from 0 to 2pi as the thing cycles.
- cosines are mathematically simpler, since they start at 1, but i'm not sure why that's simpler yet.
	- in some ways, it's the phase that is oscillating, and the value (what is graphed, is just the cosine (since it varies between -1 and 1) 
	- OR phase is the x axis and cosine is the y value
- he has an osc doing amp modulation on another osc, but then has a message box on the modulator osc with 0 message on the phase inlet... clicking this button gives it a new attack!
	- bc it resets the value to 0
	- the value input to the phase inlet in an osc should be between -1 and 1.  it's in units of cycles.  so you don't need to worry about pi.  1 cycle = 2pi
- discontinuities are clicks
- delay object
	- delay 400 will delay some bang 400ms
- recursive loops are not ok
- loops with the delay objects are ok, bc they're not going depth first.  they're 'terminal' objects.
- you can send messagers into `line~` to get it to ramp up or down:
	- 1 1000 means go to 1 in 1sec
	- 0 1000 means go to 0 in 1sec

## Lecture 4
- minimum ramp up/down times (with `line~`) is about 5 ms if you dont want clicks.  for lower freqs, it must be longer.  
	- how this works in the real life w/o creating clicks will be discussed later
- `line` object (not `line~` !) will send as messages in default rates of 20ms (which is optimized for midi)
	- although it takes arguments just like `line~`, so you can make it work at different rates
	- so plugging this into an `osc~` gives it an interesting stepwise / arp effect
- the 'central' frequency in an fm scenario might not be the F0- that's going to be the lowest osc freq	
- `cos~` gives you the cosine of the input (specified in cycles- so it multiplies it by 2pi)
- `mtof`
- `ftom`
- `dbtorms`
- `rmstodb`

## Lecture 5
- best not to daisy chain your delay objects bc they are single stated: they reset everytime they get a new bang.  better to anchor them off a common button.
- `phasor~` object: generates phases... not band limited (so it may have an infinite number of partials, which is not good)  (it's really just a sawtooth wave)
	- sounds unstable bc of 'fold over' - same as aliasing b/c the freq content is higher than nyquist
	- so it sucks for sound generation, but it is useful to look up wavetables!
- `phasor~` can be put into `cos~` and it will generate a cos signal
	- `cos~` is a table lookup function
- `osc~` is kinda equiv to `phasor~` -> `cos~`   (insofar as cos is equiv to sin)
	- but you do this same phasor input to other waveform types...
	- phasor is really the oscillator here.  cos~ is just the memory-less wavetables	
- `phasor~` will normally sweep from 0 to 1.  If you multiply this by 2, it will sweep from 0 to 2, but the period will remain unchanged.  the means the resulting cosine will have twice the original freq: octaves!
    - its like it will get thru the wavetable twice in the same amount of time, which means doubling the ultimaste frequncy
- you can also make your own waveforms
	- you can just draw on top of a new table/array
- `tabread` will let you read table/array values
	- `tabread` has no memory.. it will truncate the inputs to get the integer	
- you can also control amplitde and pitch with tables
	- amplitude: draw an envelope
	- frq: it's like a sequencer!
- you can only hear about 30 note events per second- after which it will just blend together into a sound
- good idea to experiment with `line~` input to `phasor~`.
- in midi, middle c is always 60, 440 is always 69
- you can feed a msgbox into dbtorms and then feed that output into a line~
- to draw into an array, you need to click over the values already in the array and then move them around.

## Lecture 6
- table population methods:
	- using `tabwrite` and `tabwrite~`:
		- `tabwrite` has 2 inlets: one for value (left index) and one for index (right index).
		- you can also send it a message that has the value and index (in left inlet)
		- if you use `tabwrite~`, you can send in a number box and a button and this will whack everything in that table to the new value.
	- sending with `send` and `receive` objects
		- send object with argument name of table
		- connect a message box to it (just like tabwrite)
		- read file1.txt -> send foo
			- this will read the first 12 lines of the file and then send them to the foo object			
	- pack:
		- number box -> mtof -> pack 0 0 -> tabwrite
		- where the second pack arg is a fixed index					
- Number boxes can have upper and lower values: this is very useful for amplitude control so you know you wont' blow your speaker!
	- it only affects how the mouse lets you set things.  you can still put something directly in.
- Just type in pd as an object with an argument for a name.  then double click it and it will open up as a subpatch.
- trigger generating outputs serially, right the left.
- example: number box with outlet to both inlets of a * object (trying to square) - but it doesn't work because it evals the left side with the old right val first.
- Correct way of managing gains:
	- number box (with upper and lower boudns) -> dbtorms -> pack 0 50 -> line~
	
## Lecture 7
- `pd` object
    - pd window-name  (hide stuff in a subwindow)
- `float` object
    - attach a number box to it (right inlet), and then it stores the number.  Then when you bang on it, it output the number.
    - you could use this to loop, with a +1 object
    - note: FLOAT WILL STORE ITS MOST RECENT VALUE!
- `line~`:
    - if you send it a message:  0, 100000 2268
    - this is telling it to jump to zero, then ramp to 100000 in 2.26 sec
- getting soundfiles in an out of an array:
    - send the following message to a soundfiler object: read <yoursoundfile.wav> <name_of_array_to_fill> 
    - remember the array doesn't know what the SR is... it will just stick in the points.
- for performance reasons, it's better to put things which have to be redrawn (arrays, number boxes, etc) in subwindows  
- when dealing with samples, such as in array, sometimes it's easier to interact with it with messages rather than signals (ie ripping through it with a `phasor~`)
- to get audio (from a wav file) into an array, you send a message like 'read voice.wav tablename' and connect it to a soundfiler object.  this will populate the array.
- so if you want to walk through a sample with `tabread`, you need to tell it how quickly to do so.  there are various ways:
    - with a `line~` and send it in a message with array_bound as 1 parameter, and array_bound/SR as 2nd parameter
        - play backwards: just send the line downwards
        - to transpose up an octave: play it in half the time        
        - BUT: you should use tabread4~ for best interpolation of the sample.  otherwise, you'll get yucky aliases.        
    - test output with sinusoids to make sure that it's right.  
    - another technique to walk through the sample (more signalbased approach):
        - with a `phasor~` lets you specify the length, offset, and speed of playback.        
        - (num box (for freq)) -> (phasor~) -> (*~ 5000 (how far to read)) -> (+~ 501 (starting offset)) -> (tabread4~)        
        - good part is that you can change the freq in the middle of playback  
- how to get a phasor~ count to 5:
    - phasor~ 1  -> *~ 5
        
## Lecture 8    
- if you send a message to a `line~` like 8000, then it will simply jump immediately to that value.
- bangs are messages with no data
- more sampling stuff: how to do transpositions and avoiding clicks as you scrub through a sample
- `hip~` object is a hipass filter
    - `hip~ 3` is good...it is at 3 Hz, so below the threshold for hearing but eliminates pops when you reconnect/patch 
        - also removes a dc offset (bias)
- easy way to transpose in a message-based sampling scenario:
    - use `mtof` in your input to `line~`
        - (number (represents note)) ->(mtof) -> (/ Freq_of_note_representing_no_transposition) -> (* range_value) -> (pack 0 Time_it_should_take) (line~ ) -> etc
        - so here we're keeping the time length the same and shifting the speed at which is traverses the buffer.  you could also do it in the inverse method (which would seem a little more commonsense/analog).
            - but if you use an envelope, things will change a bit too                    
- playing regions of samples:
    - you naturally need more control over clicks  (enter envelopes)
    - so just take the output of tabread4 and multiply by a line~
    - then you need some triggering and delaying of the new notes to decay before the new note arrives.
		

## Lecture 9
- How to make a sampler from phasor~ instead of message-based.
    - (num (how fast to repeat- in hz)) -> (phasor~) -> (*~ (how far into the array to read)) -> (+~ (array offset)) -> (tabread4~)                            
    - how do you avoid the clicks?  take the `cos~` of the `phasor~` value and make a few manipulations so that when `phasor~` is 0, `cos~` is also 0.  then you can multiply this by the `tabread4~` output.
        this is essentially a windowing function!    
    - `phasor~` based sampler gets you sample based accuracy but line~ is not bc it is quantized to 64 sample blocks
- How to make a polyphonic sampler:
    - remember- you can have a pd (sub) window / object point to a different file.  Then you can have multiple copies of the same patch, and if you modify one, it will modify them all!
    - so, that's the polyphonic part... just copy 1 patch of the sampler for each voice.  the harder part is dealing with voice allocation.
        - for the polypohic part, make sure any global objects (like a table) are only having 1 instance in the patch.
    - to make inlets for your subpatches... just use an inlet object.
        - `inlet~` is the inlet that expects audio signals!
    - `pipe` object will remember whatever you send it, store if for some period of time, then output it.
    - voice allocation (round robin):
        - have a loop that counts/loops over 8 (for 8 voices) 
        - send this into the left inlet of a [route 0 1 2 3 4 5 6 7 8], this is the voice allocator
        - each output for the route will point at the abstracted sampler
        
## Lecture 10
- **continue at 30min...** note the difference in graphing the phasor and the output of the tabread... happens around 25min or so...
- graph on parent abstraction: it's an abstraction that has a clickable user interface
- help patches section: 
    - useful for things like voice allocation    
- modes of vibration
    - all objects (like bells) have 1 or more modes of vibration
    - based on shape and construction
    - has 2 characteristics:
        - freq & damping
    - the partial patch used has 4 inputs: relative amplitude, relative duration, relative frequency, detune
        - then these are all subject to a global frequency and duration amount.
- observer patterns in pd:
    - `send` and `receive` objects are for messages
    - `throw~` and `catch~` are for signals, and you want to have a many (`throw~`) to one (`catch~`) relationship.  (like a bus)
    - `send~` and `receive~` are for signals, and you want to have a one (`send~`) to many (`receive~`) relationship. 
- for abstractions, you don't need in objects like max.  Just reference $n in objects in your abstraction.
    for message boxes a $1 will be more local... it will refer to whatever data is passed into it.  if you send it a packed message, a $2 will refer to the second message here.
- the arguments for `pack` will indicate default values with placeholders- this also indicates the message size (typically) (ie how many terms you want included in each packed message)

	
