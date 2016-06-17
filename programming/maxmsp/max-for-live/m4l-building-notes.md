Notes from the M4L Building Examples
===========

Processing Midi Notes Lesson:
-flush object will generate note-off messages for all notes which are routed through it.
-kslider object shows you a musical keyboard and echos whatever values it gets
-panel object is how you can circle something or highlight it
-midiselect object lets you specify an attribute (as paramter or in inspector) which says what kind of midi messages you want (bend, ch, ctl, pgm, note, poly).  ex:
	midiselct @note all
	selects all the midi note messages.  the last output will send out all the midi messages which were not selected.
-live.text object in button mode will send a bang.  good for connecting it to a midiflush object, for example.  also, if you connect to the right outlet, it will bang out the symbol message it displays... so essentially, like a message box.  there are all sorts of ways to customize this image as well.
-stripnote and makenote: to manage note-offs you often want to regenerate the midi note and have the patch control the note off messages.  so, you use a stripnote object to only pass note-on messages, then a makenote object which will generate the corresponding note-off messages (based on some input duration).
-midi output objects
	midiout (by default, this is in m4l midi devices)
	noteout (sends note data to live)
-translate object can convert notevalues into ms
-to get a menu of various metrical time units, just use a live.menu and set the values to a short enumeration of 8n, 8nt, 8nd, etc.
-live.text is like a button that puts out a 0 or 1 when you set it to 'toggle' mode.
-you can send a message to a device like 'active 1' or 'active 0' to toggle it on or off

Building Audio Delays Lesson:
-plugin~ and plugout~ are audio in/out objects
-tapin~ and tapout~ correspond to each other and you set a parameter for max buffer size on the tapin~ and a delay amount in the tapout~.  bc they are necessarily correspond with each other, its a control patch cord which connects them.
-you can use a signal to set the delay time
-dry/wet(2) is a good example of how to do a single dry/wet dial.  you should use multiply the resulting values by the line~ object with a ramp time of 50ms to avoid clicks.
-good way to generate a reverse ramp (for wet/dry dial or panpots): line~ -> !-~ 1
-pak vs pack object:
	pak -pronounced "pok:, re-outputs the list whenever any element changes
	pack -only the left inlet is hot
-multiply object (*) only multiplies 2 numbers to each other: you can set both operands with a list passed to the left inlet
-translate object will also output a bang if the global tempo changes  (use case translate notevalues ms)
-sah~ is the sample and hold object.  it has 2 inlets: one for a main signal which has the values which get passed on and the other for another signal that when it crosses a specified threshold will trigger output of the main signal value.
-the number~ object can be used to convert a number into a signal, which can be useful for certain programming strategies
-scope~ object creates a oscilloscope for a signal you pass in to it.
-you can use live.tab to select from a bank of options- like various time divisions
-filtergraph~ is an object to let you graphically build filter coefficients, which will be entered into the biquad~ object
-pfft~ object performs a windowed DFT and gives these results to the specified subpatcher (argument 1).  other arguments for pfft~ involve the window size and hop size.
	-inside the subpatcher you've specified, you have fftin1~ (do the fft, return freq domain) and fftout1~  (do an ifft, return time domain)
-gizmo~ object performs freq/pitch shifting in freq-domain.  use this inside your pfft~ subpatch
-clickless (no discontinuity) variable delay:
	they wrote an abstraction that allows you to change the delay amount without causing clicks.
	why the clicks?  when you change then delay amount in the tapout~, it will automatically start reading from a new location in the tapin~ buffer (hence a discontinuity)
	they create two cosine signals between 0-1 which are perfectly out of phase
	we also create two delay lines in our tapout~, and the change in delay value for each line will only happen when the corresponding modulator is below a threshold (handled by the sah~ object)
	so each delay-amount change triggers 2 discontinuities (one in each delay line)
	but you don't hear them because each tapout~ outlet is multiplied by it's modulators output (which for the one with the disconuity will be near 0)
	finally, the reason you don't hear this as an autopan is because the two signals are summed back together before outputting.

Building FM Synthesizers
-FM basics:
	carrier signal: static freq signal
	modulation signal: has a rate and depth setting.  the rate sets the modulation freq and it's amplitude (originally between -1 and 1) is multiplied by the depth.
	output: [ carrier signal + the modulation signal ]  -> cycle   : 
		so you have one audible oscillator whose freq just keeps changing depending on the modulator and carrier data
	basically like a vibrato that at higher rates and amounts produces timbral changes
-preset object is how you can store presets inside a patcher (or in a separate preset file- see pattr / presets notes below)
-to use different waveforms:
	use a buffer~ object
		the buffer will have a name and possibly refer to a 512 sample waveform file
	connect  a 'set <bufname>' message to cycle~ and you change the type
-a lot of times you need to use the number~ object to convert a number into a signal
-lesson 6 Envelopes:
	live.text object in button mode will not only display text, but output a bang
	live.numbox has 3 styles: normal, slider, triangle
	function ui object lets you draw an envelope.  you can then use this as an input to a line~ to generate the envelope.
		you set the domain attribute to specify the max x value and another attribute for the min/max y values
		to reset the domain, pass it a message 'setdomain <newvalue>'

lesson 7: Adding in a MIDI Note
	-to scale a midi note into an audio amplitude, just divide the value by 0
	-adsr~ object is an envelope generator.  a,d,r stages are milliseconds and s is in amplitude.  s stage is triggered when an amplitude of 0 is reached.  
		(so, it can't intrinsically handle polyphony)
		actually, an overlapping note will not get it's own attack with this scheme.
	-notein object captures midi input, and stripnote will filter out the note off messages.
		-in this example, we handle the velocity and note messages differently: the note on messages (which will be passed to +~ modulation amount then to a cycle) go through a stripnote (we don't care about the note off).  the velocity is is scaled to audio range (0-1) and passed into the adsr~ object.  the output of adsr~ is multiplied by the cycle.  so when adsr~ gets a 0, it will trigger release stage and at it's completion, return 0.  however, the brightness table is only banged on new note-on messages.  

lesson 8: Adding Polyphony
	-poly~ lets you add polyphony by adding copies of the same subpatch (abstraction), but all using the same object. the second argument to poly~ is how many instances/voices you want.
	-poly~ uses in, in~, out, and out~ objects instead of the typical subpatcher io objects, inlet and outlet.
	-inside the poly~, the object thispoly~ is used for managing voices:
		-poly~ has to decide which instance to use for a note.  the thispoly~ accepts 'mute 1' (=voice is in use) or 'mute 0' (voice is available) messages, from adsr~ which tells poly~ whether to use this instance or not.
		-a new midi note is converted to a message: 'midinote <note> <velocity>', so that poly~ understands a new note is being submitted.
	-the leftmost inlet for a poly~ object is the only inlet that accepts messages targeted to a particular instance.  all other inlets correspond to all instances.
		-leftmost inlet is also where you send poly~-specific messages.
	-sending the poly~ a message "target <int>" sets the specific instance of an abstraction that should receive messages.  if <int> is 0, this targets all instances.
	-zl.reg object stores the envelope data- then every time it gets banged (corresponding to a new midi note, it will output this data to the line~, generating an envelope)
	-sig~ object converts a number to a signal.  big difference between sig~ and number~, I think, is that sig~ will output the signal through its outlet whereas number~ will not.
	-how to tell whether a patchers is loaded as an encapsulation or an abstraction: check the bottom, left hand corner of the patcher.  if it has the 'modify read-only' button enabled, it was loaded as an abstraction.
	-how to change your subpatch/encapsulation into an abstraction:  save it as... make sure there are no spaces in the filename!  give it a different name than your subpatch... b/c then you'll go the main patch and create a new p object pointing to that filename and if it resolves, then it worked, and you can delete your old subpatch(es).
	-also: the patch (p) object is only for enapsulations!  abstractions aren't preceeded by p!  they're just like regular objects!
	-vibrato in the extreme -> FM, and autopanning in the extreme -> ring modulation
		-we get an autopanning effect from using tremolo (amplitude modulation) b/c the freqshift~ object we're using has 2 outlets- one for pos, one for neg sidebands, which are separated into l/r outputs for stereo widening.

lesson 9: randomization
	decide object lets you choose randomly between 0 and 1
	you can use a decision process with cascading decide -> select 0 1 statements
		in this example, each subpatches runs through a series of decisions:
			should i change the value?
			if so, should I change to default or random?
				if random, what?


MIDI Generation Lesson
	-makenote object: specify a note, velocity, and duration and it will generate the note-on and note-off messages
		-sending it a 'stop' message makes it send note-off's for all its incomplete notes
		-you might also want to set the '@repeatnote' attribute to define what it should do when receiving a note when there is currently the same, incomplete note
	-kslider object: keyboard which outputs notes and velocities
	-live.text : can be a button
	-live.numbox (works better with live)
		can display numbers, beat divisions, percents, etc.
	-live.menu: can associate text with numbers
	-live.line is a ui object that creates a line (for visual separation)
	-live.tab ui object for sending lots of different kinds of messages or selections (filter types, transformation messages to a live.step, etc.)
	-live.step:  		and you can change step sizes, loop regions, and interval updates
		you can fold it to see only the notes, etc you're using        
		there are a number of messages you can send it        	-2 ways to set defaults:
		1) use a loadbang to send a message setting the default
		2) live objects have an initial enable property (see inspector) which will set their default value
	-2 useful messages you might send to a metro:
		interval <x: where x = note unit, eg 4n> : sets the metro interval
		quantize <x: where x = note unit, eg 4n> : set output on that boundary
	-itable object can store probability weights and if you send it a bang, it will output one of it's indexes based on the weight stored in it
	-funnel object takes any number of inlets (spec'ed as parameter) and will pass that data through along with the index value (inlet number) prefixed to the outputt'ed value
	-metro and counter objects can work together for timing-related events which are synchronized to the live transport
	-you can have many different metros in a patch and they can do many things beyond just creating notes!
 

MIDI Note Operations
	-a trigger object can also send a message.  for example:  
	-floating windows:
		-based on creating a new presentation view in a subpatcher
		-involves objects pcontrol and thispatcher
		-pcontrol object is attached to a patcher object (encapsulation or abstraction) in the parent, and you'll send it an 'open' message.
		-thispatcher object needs to recieve a bunch of 'window ...' messages for sizing and setting window behavior.  see help for info.
	-M4L.api.GetSelectedNotes:
		-This is a helper abstraction to load the notes from the selected clip into a jitter matrix.
		-First, send a message: 'path live_set view detail_clip' into a live.path object.  This navigates to the clip currently displayed in the clip view.
		-The live.path object outputs the live object's id and this will get passed to a live.object.  
		-Then you send a message to live.object that corresponds to a method the object will understand.  in this case 'call get_selected_notes'.
		-Once you've loaded an object with live.object, even if that object is moved, it will be a valid refernce.
		-After you call a method on a live object, you'll want to capture that output with a route object:
				route <methodname>
			That is bc the arguments to route will try to match the first item in any message send to it, and presumably the first item in the output from live.object's invocation
			of this method is the name of the method.  hen message is different from last
			-eclis: slice a list in reverse order
			-delace: de-interleave a message
			-iter: breaks up a list's items into groups of n    
			-median: return the median of a list of numbers
			-filter: remove items from a list
			-len: get list length
			-nth: output nth item of a list (1 indexed)
			-mth: output mth item of a list (zero indexed)   
			-reg: store a list in the right inlet, bang it out later
			-queue: enqueue and dequeue items
			-thin: dedupe a list
			-union: ...
			-sort:  ...
			-sum:   ...
	-jitter matrix: good for holding note values
		to set a value: setcell <x> <y> val <val>        
	-calling get_selected_notes on a clip returns data like this:
		notes <count>
     		note <pitch> <starttime> <duration> <velocity> <ismuted>
		note <pitch> <starttime> <duration> <velocity> <ismuted>
		note <pitch> <starttime> <duration> <velocity> <ismuted>
		done
	
	-live.path
		<I have notes on these m4l objects elsewhere... see those>  

	-live.object
		<I have notes on these m4l objects elsewhere... see those>

	-ReverseNotes patcher:
		-Sorts the incoming matrix based on the specified data plane (time)
		-sends name to a trigger object which initializes the return value (jit matrix), sets the dimensions with a dim message, and clears values with a clear message
		-sets a descending counter based on n-1 (n= note count)
		...

	-Calling methods against a live.object:
		conventions vary per the method, so refer to the live.api/lom documentation.
		example- Clip.set_notes() looks like this:
			call set_notes 
			call notes 2 
			call note 60 0.0 0.5 100 0 
			call note 62 0.5 0.5 64 0 
			call done 

	-Open question:
		-some of these tasks would probably be easier using a js object, however i think there scheduling is less prioritized than regular max objects.  Might be worth clarifying the various scheduling paradigms within max and the various m4l apis (ie one is max, the other is js)

	-To have the most recent data from some object set a message box, use 'prepend set'.  To collect all this data into a message box, use 'prepend append'.

	-jit.iter object lets you iterate through a jitter matrix- sending a message for each cell.
		-the middle outlet will send the coordinates
		-the rightmost outlet sends a 'done' message when it's finished traversing

	
Basic Mapping Tools Tutorial:
	-device id 0 is a way of freeing up a live.object or live.remote object to no longer be bound to a real live object.
	-the first device lets you remotely control some other parameter in live - kinda like a macro knob but the new controller knob is not a macro control but a slider in the m4l device
	-deferlow object:  defers all messages to the tail of the low priority queue  (NOT SURE WHY TO USE THIS)
	-defer object: defers all messages to the head of the low priority queue.  This is useful in overdrive mode, but I'm not sure how that matters!
	-substitute objet: you specify two arguments and if a message passing through substitute contains some element matching the first argument, it is replaced with the second argument.  
		-you can also set an attribute to get it to only replace the first instance of a match

	-live.thisdevice: send a bang when the device is loaded
	-patcherargs: retrieves patcher arguments
	-saving references to objects:
		the live.object has a setting 'Save Mapping in Live Set' which will persist the object reference even when the live set is saved.
	-live.remote~ gives you realtime control of device parameters

