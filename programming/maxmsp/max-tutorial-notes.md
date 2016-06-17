Max Tutorial Notes
=================
Misc Notes from reading through the tutorials

## Tutorial 2 : Bang! Message!
- button object outputs 'bang'.
- 'bang' message tells objects to do what you do.
- bang is just a message with no content
- for debugging: if you set the first parameter to a print object, this will be the label in the max window (instead of 'print')
- one bang can be sent to many objects
- when a single object is connected to many objects, the order is right-to-left (so it depends on the spatial view)

## Tutorial 3: Numbers and lists
- number: object for ints
- flonum: object for floating point numbers
    - if you are manually increment/decrementing a flonum box, whether it changes the integral or fractional part is dependent on where you put the mouse.  thus you have coarse and fine settings.
- set: if the content of a message is 'set 15' and it is connected to a number object, then when this message is clicked, it will change the value of the number object w/o emitting a bang.
    - if, the message just says '15', then it will update the value and output a bang
- Lists:
    - list literals can be specified in a messagebox object
    - lists can be passed around as a single object
    - lists can contain numeric or character data in same list
    - list delimeter is a space
    - if your list literal begins with numeric data, then it must be prefixed by the 'list '
- Message objects can contain replacement parameters $1-$9
    - example:
    > number: 8 3
    > message: 'my least favorite number is $1\, not $2'

## Tutorial 4: Metro and Toggle
- Toggle: 2 modes
    - Self-trigger: will generate a 0 or 1
    - Triggered by other object:
        - will echo whatever value it recieves downstream
        - 0 will turn it off, 1 will turn it on
        - bang will cause it to flip its current state
- metro:
    - produces bang messages on some interval
    - 0 (or a stop message) will turn it off, 1 (or greater) will turn if on.  (often see if connected to a toggle)

## Tutorial 5: Message Order and Debugging
- while it appears that all the processing is parallel: things happen in a specific order which needs to be understood
- you can set 'watchpoints' (breakpoints) on patch cords- then enable debugging- and a debugging window will show up with information.
- message order (based on position of recieving object):
    1. right to left
    2. bottom to top
    3. depth first
- bangbang object:
    - generates bangs in a right-to-left order based on the position of it's OUTLETS.  (this is different b/c normally the message ordering is based on the spatial position of the recieving objects)
    - parameter should indicate how many outlets it needs.  e.g. bangbang 3 generates 3 bangs
- many objects that have multiple outlets will process messages in their outlets r-to-l (just like bangbang)!!
- trigger object:  (or just t)
    - message processing is based on r-to-l order of outlets, not spatial orientation of receiving objects (i.e. it is like bangbang)
    - different from bangbang bc it can generate more types of ouputs, each of which is specified as a parameter:
        - l: list
        - b: bang
        - i: int
        - s: string
        - f: float
        - any string: constant
    - it will echo out the casted value of whatever is provided to its inlet
    - example: t b i f
        - this will output the float, then int, then bang messages
- message loops: NOT SUPPORTED!!  (will give a Stack overflow)

## Tutorial 6: math
- Sending a message in the right inlet of many objects may not generate a subsequent message
    - example: the rh operands in math operator objects
    - these rh inlets are called 'cold inlets'
    - hot inlets will generate a message
- Setting type:
    - default numeric type is int
    - if you want to use floating point, all your constants should have a traling '.'
        - ex: 5.
- You can use cold inlets for recursive accumulation (see example in lesson)

## Tutorial 7: Numerical User Interfaces
- Attributes can be set:
    - statically (default) for objects can be set in the Inspector
    - statically by directly including the attribute name (prefixed by an '@') and the corresponding value in the object (on the des. surface)
    - dynamically for objects by connecting them to messages which reference the attribute and the value
        - to determine the name of the attribute, just drag the attribute from Inspector to the design surface
    - You can also connect an ```attrui``` object to any object to get a menu of attributes associated iwth it.
- Messages can also be sent to objects
    - Messages might also have parameters and change the state.

## Tutorial 8: Keyboard and Mouse Input
- ```mousestate``` : tracks any mouse events/positions
- ```modifiers``` : tracks any modification keys pressed
- ```key``` : returns the ascii value of any keys pressed
- ```keyup``` : returns the ascii value of any keys pressed (only once keyup is triggered)
- ```numkey``` : accumulates integers and when return is pressed, bangs them out
    - to accumulate floats, set it's param to 0.0
- ```mousefilter``` : only bang out changes once keyaction is complete (ie buttonup)

## Tutorial 9: 2-d Drawing
- right-clicking on an inlet will show you all supported attributes and messages which can be sent in
- window->clue window: will give you info about each object when you hover over it.  even in locked mode.
-gate: useful for routing
    - you specify a static parameter, such as 2
    - then the number sent into the left inlet of gate opens the corresponding outlet.  (0 closes them all)
    - the number sent into the right inlet sets the value of the gate is (or isn't) passing onwards
- unpack: specify a list of default parameter values (can be int, float, char).  the number of parms will determine the number of outlets to unpack.  extra list elements piped into the unpack object will simply not be output.
- pack:  inverse unpack- see above
    - left inlet is the only hot inlet, however
- prepend: insert something to the beginning of a list.  this is often use a message name bc the concatenation of message name and list will be useful to pipe into another object.

## Tutorial 10: random drawing
- ```random``` : generates a random number when left inlet is sent a bang.  
    - right inlet specifies the top value in the range (bottom is 0).  this can also be set with the first static parameter.
- ```drunk``` : generates a random number when left inlet is sent a bang.  
    - it is lke random object except the third inlet/parameter specifies a max single step range.

## Tutorial 11: Procedural Drawing
- ```counter``` : incrementer/decrementer on bangs.  
    - allows you to set bottom range, top range, and direction.  
    - you can also reset on current or next bang.
- ```line```: specify a starting and ending number and the amount of milliseconds required to get there.  
    - you can also specify the 'grain' which is the output interval (like fps or sampling rate, but for output)
    - if you specify a message input: 1 param only means it is the start point.  the second message (separated from the first by a comma) could be a list which has the destination and time to get there (ms)
- ```scale``` : you specify the low/high inputs and outputs.  
    - out of range values on input will produce out of range values on output.

## Tutorial 12: Movie Playback
- ```imovie``` : uses the quicktime library to play/manipulate video.  
    - once you get familiar with it, the corresponding object in jitter is much more useful (and similar): jit.qt.movie
    - you can send in all sorts of messages to change rate/playback characteristics
- ```change``` : output a number that is passed to it only if it is different from the currently stored number
- ```key``` : monitors key presses and returns ascii
- ```select``` : (basically a switch statement) you specify some static parameters and it creates that many inlet/outlets.  
    - if any of them are hit, it bangs on the corresponding outlets.  t
    - The rightmost outlet send out the original input (not bangs) if there is no match.

## Tutorial 13: Movie Sequencing
- ```rslider``` : like two sliders where you indicate a high and low value with each.  
    - will output the high number on the range out the right and the low number out the left
- ```loadbang``` : will fire off a bang as soon as the patch is loaded.  
    - also, you can click on it and it will bang.
- ```umenu``` : ddl of selections.  
    - outputs index in left outlet and text in right outlet.
- recall trigger object and how it sequences message output right-to-left based on outlets
- ```screensize``` : gets screensize- usually connected to a loadbang

## Tutorial 14: Encapulation (ie The ```patcher``` object)
- you can just enter 'p'.  the first argument is just a name you can give it, like 'draw_menu'
- encapsulated patches can be saved off in separate files (if you want) for reuse (separating it in another file is called 'abstraction'), or it can be embedded in the current pach.
- to see the contents of the patcher object, double click on that object while patcher window is locked.
- you can specify as many inlets and outlets you want on an encapsulated object: spatial orientation in the subpatch sets the order for the corresponding patcher object.
    - ```inlet``` and ```outlet``` are objects
    - when you drag them around, you will see their numbers change to indicate their inlet position
    - on the inlets and outlets, you might specify the description to be helpful.
- to encapsulate (or decapsulate) from existing objects: 
    - select objects in a patcher window, then click edit->encapsulate
- to encapsulate without having existing objects: 
    - create a new patcher object, double click it to open it, add inlets and outlets and the appropriate code.

## Tutorial 15: Abstraction
- separating an encapsulated patcher is called abstraction
- as long as your abstracted patch is in the max file path, then you can call up it's name directly from the new object menu
- when you open an abstracted patch, you cannot put it into edit mode.  you have to open that file directly to edit it.
- if you want to use parameters in your (not inlets) in your abstraction, just reference them literally by #1, #2, etc. and they will be replaced appropriately.  but you can only see this if you open the abstraction separately from the calling patch (ie through the file menu).
    - #0 
        - is a special symbol available in abstractions (only) that evaluates to a random / unique (to the abstraction instance) integer.  
        - can be useful for getting unique names for objects or messages 

## Tutorial 16: Remote Messaging
- So far, we have only passed data between objects in a patch using Patch Cords.  However, you can also use the Send and Receive objects.
- Basically a pub/sub operation:  sender will specify a topic and reciever will specify the same topic.
    ```
    send fred
    receive fred```
- you can name the objects 's' and 'r' for shortcuts
- this communication also works ACROSS PATCHES!
- another shortcut is using the ';' in a message box to send it's contents.
    ```
    ; bob 155```
    - this will send the contents of the message box (155) to any receive objects listening to bob
- one message box can send multiple messages with multiple subjects:
    ```
    ; lcd1 clear
    ; lcd2 clear```
- The ```forward``` object can be connected to any number of message boxes with messages of 'send foo'.  
    - this will set the topic of the any messages sent by this forward object to be foo.
- You can also specify a receive object with no topic argument but connect it to multiple message boxes with contents like 'set bob' or 'set fred' and this will change the subject it is listening to.
- The right inlets on the ```int``` and ```float``` objects allow you to **store a variable**, without propagating a message.  
    - when the next bang is passed through it, it will fwd any updated value.
    - you can also set the default value for these objects with an argument.
-The ```value``` object is like a send/receive object all in one, and it can hold any number of data types (eg lists, floats, ints, symbols).
    - ```value``` objects are only evaluated when a bang is sent through them.  

## Tutorial 17: Data Structures and Probability
- ```itable``` is just like the table object, except the presentation in patcher window is slightly different
    - think of itable as a way to create transfer functions: it basically just holds x, y pairs
        - you can draw in the itable to set these combinations
        - if you attach a message box with contents '50 80', this will set the value of 50 (x) to 80 (y)
        - if you send the message 'clear', the table is cleared
        - passing a number through it with a number will output its corresponding value
- ```uzi``` takes an argument which will tell it how many rapid-fire bangs to send.
    - the third outlet is the index of the fire- which you can use like a counter.
- two kinds of subtraction objects:
    - ```-```	: normal.  so a - 1 would subtract 1 from it's first inlet.
    - ```!-```  : inverse subtraction:  so a !- 127 would subtract whatever it gets from its 127 argument.
- ```swap```  will output whatever it gets in it's two inlets but with the ordering reversed.
- ```histo``` is like a table, but the y value is how many times the input has been entered into it.
    - passing it a bang, it will randomly select some input and then output the corresponding value
    - you can also draw on the histo table

## Tutorial 18: Data Collections- Using Databases
- ```coll``` is like a collection of key/val pairs, and ```route``` is like a big switch statement.  (the value can be a list)
- if you connect a message box to ```coll``` with contents of 1 -50 then whenever you pass a number 1 into coll, it will give you 50
    - you can store symbols as keynames: a message box with contents of 'store foo 20' will set things up so when you pass in a 'foo', it returns 20
    - in the coll inspector, you can select to save the data with the patcher!
    - you can point the coll at a data file: just save the name of the file as an argument, or pass it into the coll with the message read yourfilenamehere.txt
    - if you double click on the coll object you can see the data collection (internal)
        - you can store pairs with items separated by commas and pairs separated by semicolons
    - passing messages like start, next, prev will be used to move throughout the collection
    - you can give your coll a name by specifying a string as a first argument and then you can duplicate that (with data) throughout your patcher.
        - kind of like the value object in this regard
- the ```route``` object will have x + 1 outlets for x arguments you specify
    - the argument is a key and the input is a list of a key and a value(s) (which could be a list)
    - it outputs the value through the outlet with the same position as it's matching argument
    - the last outlet is the else condition
- what is the difference between ```route``` and ```select```
    - you can use 'sel' for select
    - for select you specify one target (as an argument)
        - if input matches, a bang from first outlet is sent
        - if input doesn't match, a original input data is sent from SECOND
- difference between ```route``` and ```gate```
    - gates argument is the number of outlets
    - gates first inlet is a specified for which outlet should be opened 
    - second inlet is the value that should be passed
- switch object lets you define a number of outputs, and it has the same number of corresponding inputs.  one inlet defines which to pass, the other has the input.
    - difference between ```switch``` and ```gate```: they are basically inverse:
        - ```gate``` has 1 input and many outlets
        - ```switch``` has many inlets and 1 outlet
- ```router``` object is different from route object

## Tutorial 19: Timing - Scheduling Events
- ```pipe``` object allows you to delay sending a message for some period
    - first argument is the default delay in ms
    - first inlet is the message to delay outputting
    - second inlet is the delay amount
- ```delay``` object is just like ```pipe```, but it specifically delays bang messages
- ```clocker``` object outputs intervallic messages (based on first argument) that indicate the elapsed time since it banged to a start
    - you can stop it with a 'stop' message
- ```timer``` object has 2 inlets which take bangs: left is start, right is stop (at which point it outputs the elapsed time)
- boolean objects include >, ==, <, !=, &&, || and they output 0 or 1
- ```transport``` object is the central metrical organizing object
    - start/stop by sending it a 1/0 (good for toggles)
    - send it a bang will cause it to output the time in bars/beats/ticks
        - there are 480 'ticks' (i.e. pulses) per quarter note, i.e. 480 ppq 
    - you can specify the tempo for the transport in the inspector
    - will broadcast metrical information to all metros and timing objects
    - then you can use timing values like 4n, 4nt, 4nd, etc.
    - you can send it messages, like a 0. which will reset it to 0. or a tempo message to change the message. 
        - Sending it the value 0 turns it off but Sending it a message, resets it. (interesting)
    - even with a ```transport``` object, you can mix and match between metrical and non-metrical time measurements
- ```bucket``` object is like an n-stage shift register... shifting from left to right, like a bucket-brigade.
- ```change``` object stores the most recent value and only sends an ouput when the value changes
- ```timepoint``` object specifies some bars/beats/ticks time which, when reached by the transport, the timepoint generates a bang (you can use this for generating loops)
- ```split``` object specifies two numbers as arguments.  a number is sent to its input and if the input is between these numbers, the number is returned through its left outlet.  otherwise, it shows up in the right outlet.
- performance tip: make sure 'overdrive' is selected in the options screen.  this makes sure latency is minimized (over drawing functions)

## Tutorial 20: Adding Objects to Presentation Mode
- Use presentation mode and add objects (w inspector) wherever appropriate

## Tutorial 21: Controlling Data Flow
- ```radiogroup``` defines a group of radio buttons which output their index (starting with 0).  you specify the number of buttons in its inspector.
- ```router``` is often paired with ```matrixctrl```
    - in ```matrixctrl```:
        - vertical lines are input and horizontal lines are output
        - you can observe the communication between matrixctrl and router by checking the max window
            0 3 0  -> inlet 0, outlet 3, state 0 (off)
            0 3 1  -> inlet 0, outlet 3, state 1 (on)

## Tutorial 21: Designing Equations
- ```expr``` lets you design complicated math formulas
- you can reference standard c math library functions here
    - To reference an input...
        - ```$f1``` : inlet 1, a floating point

## Tutorial 22: MIDI Basics
- ```notein``` / ```noteout``` ignore everything but note messages
- ```notein``` returns 3 pieces of data:
    1. note number
    2. velocity
    3. channel
- note off is usually the same note with a velocity of 0
- ```ctlin``` / ```ctlout``` are specifically for dealing with midi controller messages

## Tutorial 23: MIDI Note Management
- ```makenote``` will generate pairs of on/off messages for the specified note, velocity, and duration
- ```stripnote``` will eliminate the corresponding note off, so we can generate it programmatically
- ```flush``` accumulates a table of notes that are sent to it, and then when it receives a bang, it will generate note off messages
- ```sustain``` simulates the sustain pedal- rightmost inlet toggles it on and off.

## Tutorial 24: MIDI Parsing
- ```midiparse``` lets us see the raw components of the midi stream
    - basically a midi listener
    - outlets return different data types depending on the data:
        - notes, poly pressure, and control changes are lists (use unpack)
        - program change, aftertouch, pitch bend are integers
- ```midiformat``` helps us build up midi messages
    - basically, the inverse of midiparse
    - be sure you're not overwhelming a midi device with messages!
- ```speedlim``` slows down how often some data updates (if its overwhelming)
    - the argument specifies the number of milliseconds per message

## Tutorial 25: MIDI Basic Sequencing
- ```seq``` will play the a midi sequence
    - it might be helpful to connect it to a ```midiflush``` (not sure how this is different from ```flush```) to terminate hanging notes
    - you can send it messages like 'start' or 'stop'
    - the first argument can be the midi file to sequence
    - if you pass seq a message like 'start 1024', the sequence will be played at normal speed.  twice the speed is start 2048, and so forth.
    - if you pass the seq a message 'start -1', the internal transport is disengaged and it depends on incoming tick messages (note that is a tick message- not object)
- ```tempo``` will generate bangs on a fixed bpm: you specify arguments for the bpm, a multiplier (default is 1), and the number of ticks per beat.
    - you can connect an object to set the bpm...
        - use a line object to ramp up the bpm
        - do a wobble playback

## Tutorial 26: Advanced MIDI Sequencing
- you can record a MIDI sequence with the ```seq``` object
- the right outlet produces a bang when the playback concludes, so you can use this to loop it.
- all sorts of messages you can send to seq:
    record / start / stop / write / read / read yourfilename.midi	

## Tutorial 27: Data Viewing
- you can use a ```multislider``` for a step sequencer: each slider has 127 values and you create lots of steps.
    - set message will initialize the steps
    - fetch message will get the value at a given step
    - you can also use a multislider for data output: set it slider style to 'scroll' and it will output data.

## Tutorial 28: Data Scaling
- ```iter``` helps you tokenize a list into individual parts and generate a trigger for each
- ```peak``` sends a trigger when there's a new max value in a stream
- ```trough``` does the opposite of ```peak```
- ```slide``` lets you smooth upward and downward movement by independent smoothing factors (can be arguments)
    - 1: no smoothing
    - 50: lots of smoothing
- often good to get the min/max of a dataset before you graph or display it on a multislider (there are usually initialization messages you can send to these objects w min/max too)

## Tutorial 29: Gesture Capture
- you can also interactively write to a ```coll``` object
- if you want to use a ```counter```, but don't know how high it might go, use a combination of integer objects

## Tutorial X: BPatcher
- BPatcher is wrapper object for an abstraction where you can display it's visual interface
- You could open the file corresponding to a bpatcher by sending it the message 'open'
    - Alternately, you could right-click on the object, select 'Object' (last item in the context menu)
- When you open Bpatchers, usually they Patcher inspector will have the 'Open in Presentation Mode' setting checked
- You can insert a ```thispatch``` into a bpatcher and the parent patch can send it offset messages to quicky scroll to different segments of the view of the patcher
- You can specify arguments/parameters for the abstraction/bpatcher by setting them in the bpatcher's inspector.  Then inside the abstraction, you refer to them via the #1, #2, etc. notation.