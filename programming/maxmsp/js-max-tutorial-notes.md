Notes on JavaScript Programming in MAX
===============
These are mostly notes from the Javascript Tutorials

- The ```js``` object 
	- Executes javascript code
	- The first argument can be the name of an external javascript file in the max search path
	- alternately, it's fine to keep the script inside the current patch too
- Required int variables to set:
	- ```inlets```
	- ```outlets```
- define new values with ```var```
	- these variables, if in the outer block, are global (within JS) which could be good for setting/retaining state.
- when you update your code, you need to save it.  max window will tell you its recompiling.
- ```post()``` : function to write to the max window
	- use a carriage return (\n) at the end of your messages
- built-in function handlers for messages
```(javascript)
	function bang() { ... }
	function msg_float(val) { ... }
	function msg_int(val) { ... }
	function list(val)  //if you get list input. ```
	- to handle dynamic numbers of params passed in, use ```arguments.length``` and ```arguments[n]``` to access parms.
	- if you send it a message 'doThing 12' from a message box:
	```(javascript)
		function doThing(val) { ... } ```
- Question: why the use of arguments array instead of the parameter val (ie function(val) whateverFunc)? Maybe bc the first parameter (val) is reserved for the inlet index (0 indexed)
- return values: call ```outlet()```:
```(javascript)
outlet(outlet_index, val)  //outlet index starts with 0```
- Comparing ```js``` vs ```expr```:
	- with ```expr```, there'd be no state, so you'd have to do some recursion (w/ an intervening num box)
	- it would look more messy, eg: ```expr $f1*$f2*(1.-$f2)```
- js can also be used to dynamically create patcher objects!
	- *Maxobj* is a javascript representation of a max object in a patcher.
		- it is returned by methods such as ```newObject``` (see below)
	- creating objects:
		- Simple approach: ```this.patcher.newdefault(xPos, yPos, "objectTypeNameHere", parameterValueForObject)```
		- More complicated (and fine-grain controlled method): ```this.patcher.newobject(...)``
	- creating connections between objects: ```this.patcher.connect(outGoingObj, outGoingObjOutletIndex, incomingObj, incomingObjInletIndex)
		- if you want to programmatically connect something to the same instance js object, you can use the ```connect()``` method above and get a reference to this instance via: ```this.box```
- When designing JavaScript functions to act as methods for Max messages, the arguments passed with the messages are available through the arguments array from within the function.
- ```funnel``` object: takes in lots of inlets and will pass the values through with the number of inlet prepended to them
- Repeated Tasks:
	- You can define a js task which will repeated at a specified interval, started and cancelled on commands, etc.
	- Define the task:
	```(javascript)
	var tsk = new Task(mytask, this);  //mytask is a function that will be repeated'''
	- Set interval, if desired
	```(javascript)
		tsk.interval = 200;  //in ms```
	- start, cancel, repeat
	```(javascript)
		tsk.repeat(20); //repeat 20 times
		tsk.execute();
		tsk.cancel();
		tsk.running;  //t|f
		tsk.iterations; //current num of repetitions```
	- communication over the repetitions:
		- via global vars
		- Task object properties:  (e.g. interval): ```arguments.callee.task.interval```
	- to make sure that the mytask function does not respond to similarly named messages, set the local property = 1 on the function ```mytask.local = 1```
- javascript Math library is available
- Getting arguments from the full js object: ```jsarguments array```
- Global Variables- In the Max Namespace  (i.e. not just global to the JS object)
	- You can create global variables that can be targeted by ```send``` (s) object OR be visible to other js object.
	- A global variable has two parts:
		1. address (it has only one)
		2. properties (it can have many)
	- Use the Global() to create:
	```(javascript)
	glob = new Global(“bounce”);  //set global address to bounce
	glob.starttime = 500;	//one property here can be starttime```
	- to send a message to this property, set a message box like this: ```; bounce starttime 200```
- ```jsui```:
	- use javascript to create user interfaces, using OpenGL (Vector Graphics - good resizability/scalability)
	- OpenGL API is available through the ```sketch``` object, in it entirety, plus some helpful high level methods.
		- most constants and methods are renamed though - just to follow a different casing standard (and remove GL prefixes)
	- Opening the file:
		- to open a ```jsui```, click a message box 'open' connected to it.
		- you can also set the corresponding js file in the inspector
			- inspector also lets you set size and border properties of the object
	- Whenever you want to redraw something, the ```jsui``` object needs to issue a bang
	- There are a variety of click, doubleclick, drag mouse event handlers available to use
- **Scheduling caveat with the js object**
	- One important thing to keep in mind is that all methods in the js object (whether triggered by Max messages or scheduled internally through tasks) are executed at low priority in the Max scheduler. This means that, while they will always execute and send data to Max in the correct order, they cannot be relied on for critically accurate timing if the scheduler is overloaded with other actions.
	- Good use-cases for ```js``` 
		- menu-related actions: Non-timing critical, but easier to specify.  (see also the m4l abstractions)
		- scheduled tasks
		- any graphics / redraws