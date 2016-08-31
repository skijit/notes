
Visual Studio 2015
==================
These are some notes on new or useful features in Visual Studio 2015 (or old features I wasn't aware of)

## Node Tools
- Video [here](https://channel9.msdn.com/Events/Visual-Studio/Visual-Studio-2015-Final-Release-Event/Nodejs-Tools-for-Visual-Studio)
- Install the Node Tools Extension and when that finishes, you'll be prompted to install node.js and other required packages.
> The **npm** appears most useful for managing packages related to node.js projects.  I thought **npm** would be also used to manage other, non-node.js packages/dependencies, but I haven't see that yet.

## IntelliTrace
- Video [here](https://channel9.msdn.com/Events/Visual-Studio/Visual-Studio-2015-Final-Release-Event/IntelliTrace-in-Visual-Studio-2015-DEMO-ONLY)
- Intellitrace is a recorder for your debugger
	- It monitors for 'interesting' user or system events
	- For each event, it captures the call stack and local parameters, which are viewable
- When using this feature, it is a good idea to pause execution.
- It's integrated in the diagnostic tools window, with a section for:
	- Event Timeline
	- Event table
		- Click on an event to see more detail, and if you double-click (or press the 'historical debugging') link, it will begin historical debugging, where you can view:
			- Call Stack
			- Local Variables
			- The line of code that generated the event
- You can do this on remote/prod machines in addition to locally
> The big benefit appears to be that you get some breakpoint-like functionality by default (along with associated data).

## Typescript and Angular 2 Integration
- Video [here](https://channel9.msdn.com/Events/Visual-Studio/Visual-Studio-2015-Final-Release-Event/TypeScript-and-Angular-2-in-Visual-Studio-2015)
- 3 features in Typescript which make it work well with modern frameworks/libraries
	- Classes
	- Modules
	- Decorators: allow you to define your class and separate out how the class is configured and how it connects to data sources.  
		- **NOTE**: Decorators appear to be experimental at the time of this video, so verify this is prod-released before moving further with it.
- This demo shows a Typescript project which is converted to an Angular2 project in the following steps:
	- Importing Angular 2 into the TS file: 
		```import {Component, View, NgFor, bootstrap} from "angular2/angular2"```
	- Refactoring ts file to use a:
		- Class: encapsulate existing properties and functionality using a class
		- Decorator: There are 2 decorators used:
			- @Component: the name of the component selector (ie like a webcomponent or custom tag)
			- @View: the html template for the component, which has inline ng directives like NgFor
	- Update index.html:
		- Add script references and custom component reference
		- Has unfamiliar reference:
			```<script>System.import("app");</script>```
			<i class="icon-help"></i> Apparently this is the system.js module loader in action.  I'm not clear on whether that's provided via angular, typescript, or something else.

## BreakPoint Configuration
- Video [here](https://channel9.msdn.com/Events/Visual-Studio/Visual-Studio-2015-Final-Release-Event/Breakpoint-Configuration-Experience-in-Visual-Studio-2015)
- Toolbar appears when setting breakpoints, which lets you set conditions or actions.  (Appears in the 'Peek' view)
	- Condition Types:
		- Filter Condition: Good for multithreading (set thread, machine, etc)
		- Hit Count: set =, >= count
		- Conditional Expression: type in any boolean expression in code
	- Actions Types:
		- Log as message to the Ouput Window
			- Plain Text
			- Text inside curly braces will be eval'ed
			- \$PseudoVariables... predefined variables (you get intellisense when you press $, so try and inspect)
				- You could log the following to the output window:
					- $FUNCTION: i is {i} and x is {x}
	- Immediate Window:
		- Lambda Expressions can now be evaluated!  (also in the watch windows)
	- When you hit a breakpoint, you can use 'Edit and Continue' to make debug-time changes active.

## Exception Settings Changes
- Video [here](https://channel9.msdn.com/Events/Visual-Studio/Visual-Studio-2015-Final-Release-Event/Revamped-Exception-Settings-Experience-in-Visual-Studio-2015)
- Problem is that you're handling an exception but you're not sure where.  You don't want to put a breakpoint in all catch clauses, nor do you want to comment out try/catch clauses.
- Debug-> Windows -> Exception Settings: 
		- CLR exceptions are .NET exceptions
		- Lists all the exceptions types that are set to breakpoint
		- You can add to this list, based on exact exception type or a parent type.
- Debug : **Set Next Statement** can let you reorder execution steps:
	- So you can re-do something if you want
	- This is especially useful if you want to change your code inline, then step back to re-execute something which had previously failed.

	
