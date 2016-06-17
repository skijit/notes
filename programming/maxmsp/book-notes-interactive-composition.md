Notes from the Book, Interactive Composition
========

'n' creates a new object
right-clicking on any object lets you open up the help ref for it
the first token in an object is its name, then a space, then arguments
'b' creates a new button
'i' creates a number box which will is just a pass-through display
	you can change the format to display midi notes, if that is what you want.  default format is 'decimal'
'm' is a message box- you'll put in a value here and then when you click on it, it will bang out that value
makenote: takes a midi pitch number and velocity as arguments and outputs the midi note number and velocity separately (velocity will go to 0 when the note is over- note- duration is )
	-makenote's output may (in)directly get connected to a noteout object
general note: the order/number of default parameters for an object does not match its inlets!  it could be totally different!
noteout: sends midi notes out onto the channel
't' creates a toggle button
metro: is like a metronome object that will send bangs at a specified length of time
	-you can use a toggle to turn it on and off
'c' is for comment, which you can add to presentation mode to use as a label, if an object doesn't have a label (e.g. number box)
'l' will show all live ui objects which are optimized versions of max ui objects and are more easily midi/macro mapped


---------
double clicking in the design surface will bring up the object explorer, where you can see all the available objects
reusing complicated patches: max has facilities for encapsulation and abstraction- see tutorials 14 and 15 for detailed explanation
msp objects end in ~ and process incoming audio at the current sample rate
set default amounts for ui objects with the 'initial enable' and 'initial' attributes
tapin~ / tapout~ : these have to be connected to each other for delay, however it isn't the signal passing through here.  the connection just indicates they're using shared memory.  
	you can have multiple inputs to the first tapout~ inlet: one from the corresponding tapin~ and another indicating the delay time.
	note that tapout will only return the delayed signal: not the original signal (unless you are doing some feedback perhaps?)
svf~ : state variable filter (can be a hp, lp, bp, or notch filter depending on inputs)
selector:
tab:
panel: creates a color background
	you can set gradients or send to back, etc.
background color can also be set on the patcher inspector
omx.peaklim~ : a limiter (good to patch in when you're using feedback)
cycle~ : sinusoid generator
gate~ : can turn on/off a signal passing through
number~ : monitor a signal... not just a normal value