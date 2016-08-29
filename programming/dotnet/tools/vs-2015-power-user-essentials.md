Visual Studio 2015: Essentials to the Power-User
===========================
(from series on Pluralsight)

## Video 1: Getting Started
- The internal organization of a native vs managed exe or dll is different (as expected)
- Each project in a solution is an independently buildable thing
- Each project can only have 1 language
- Solutions are what you open in VS- even if you only have 1 project
- You can also build the solution
- Settings vs Properties:
	- Settings: choices you make about how things look like (font choices, tool pane layout) and they are persistent across solutions.
	- Properties: Apply to a particular project or solution
- StartUp Project Tells VS which project to RUN (not just compile)
	- You can right click the project OR go to *Solution* properties (not Project Properties)
- Various Collections of Default Settings are available in packages called **Preset**.
	- Many presets exist for C++, C#, Web development, etc.
	- You can import, export, or reset your presets
- Visual Studio SKU's: Community, Professional, Enterprise
- Reasons to Sign In: 
	- Synchronize your settings across machines
	- Simplifies signing into Visual studio ONline (TFS online)
	- Registers Licenses for your MSDN subscription

## Video 2: Projects and Solutions
- An empty solution is created (by default) when you create a project
- You can always create a blank solution and add projects to it later
- There is a setting (under options) that will hide the solution node in solution explorer
- By default, projects under the same solution won't know about each other.  You'll need to add references to them.

## Video 3: Namespaces, Folders, Files
- Solution folder
	- Project folder
		- bin (anything you built or assemblies you referenced)
		- properties
- Solution file structure:
	- has version of visual studio it corresponds with
	- has projects and their location in the file system
- Project file structure:
	- may be xml
	- has references
	- has item groups (ie the files included in the project)
- In application tab or project properties, you can change the name of the assembly that's compiled

## Video 4: Understanding and Personalizing the UI Components
- Start Page
	- Recent solutions
		- If you right-click on a recent solution:
			- you can delete from list
			- you can open containing folder
	- Has these settings at the bottom of the left-gray-rail:
		- Keep page open after project loads
		- Show start page on startup
	- Useful articles, new videos
	- Open new project
- Toolbars
	- > 30 toolbars available, but they appear based on context or user-specification
		- They also have the keyboard shortcuts listed as a tooltip
	- To see the toolbars, right-click on the toolbar area
- Object Explorer (accessible from view menu) is very useful.  Don't forget it.
- Docking: You can pull something onto another monitor
- You can pin down any file tab (if you want it to stay in the far-left, for example)
- Bottom right corner lets you zoom on file fonts easily
	- Zoom out: ctrl + shift + comma
	- Zoom in:  ctrl + shift + period

## Video 5: Exploring Relationships in your code
- Class view
	- lets you look at your project's classes' hierarchy, members, etc
	- right-click on the lower surface lets you filter the types of members it shows you
- Go to Definition
	- F12
	- Takes you directly to definition
- Peek Definition
	- shows this in an inline 'peek' window which goes away
- Call Hierarchy View
	- Right-click a method at design time and choose 'Call Hierarchy' and it will show you the hierarchy for calling in to the application
	- Similar to 'find all references', but adds basic call nesting
- Navigating files 
	- Forward (ctrl-shift-minus) and back (ctrl-minus) buttons
	- Toggle/Add a bookmark (Ctrl-B-T) to the current line
		- Bookmarks Window (Ctrl-W-B) 
			- lets you see all bookmarks 
			- you can assign each a name
			- you can create folders of bookmarks		
			- You can also toggle on and off the bookmarks
	- 3 Editor dropdowns at top of each code file:
		- File / Class / Members.  (and it will take you to the code when you select it)
	- Outline / Collapse methods:
		- Zoom out all the way
		- Collapse toggle Ctrl+M+L
		- You can hide anything which even isn't normally collapsable with Ctrl+M+H
	- Enhanced scrollbar (on the right) shows you:
		- Current position
		- Errors
		- Bookmarks
		- Find Results
		- And more...
	-You can also use a scrollbar on map mode, which will show the high level view (like sublime text)

## Video 6:   Using Search and Find Effectively
- To go to next search result: F3
- To go to previous search result: Ctrl+F3
- For normal find (ctrl+f), you can search for whole word or toggle case sensitivity
- NavigateTo (Ctrl+comma) will give you a predictive autocomplete drop down on all the symbols in your project
- you can also search in solution explorer too (Ctrl+semicolon)
	- it only searches the content that is typically shown in solution explorer
	- 

## Video 7: Letting Visual Studio Help You
- Letting VS fix your errors for you:
	- The lightbulb in the right margin indicates that VS sees an error and it has an idea of what should be done.  Each possibility is a 'Quick Action'.  To expand the list of Quick Actions, hover over the lightbulb or Ctrl+period
	- Example: If you reference a method that doesn't exist, a quick action will show up that asks whether you want VS to create it automatically (w/ a not implemented exception).
- Snippets:
	- Good for example pieces of code
	- To get existing snippets to come up, press 'Tab' twice. 
		- To move to the next symbol in the snippet, press 'Tab' once.
	- Examples:
		- if + tab + tab
		- switch + tab + tab
	- Ctrl+K+X lets you navigate through various snippets that exist
- SurroundWith (Control+K+S) is very useful to refactoring when you're working from the inside / out.
	- use this Quick Actions method to do a lot of similar refactoring
- Format document (ctrl+E+D)
- Help System
	- Highlight a system type or method (etc) and press F1 and you'll get the MSDN notes
		- This is aware of your version of .Net, etc. so you'll get the right version!
	- Help -> Set help preference will let you set whether help results come up in browser or embedded VS window.
	- Help-> Code Samples are a good way of building starter projects.
	- The quick launch (Ctrl+Q) bar in the upper right hand corner lets you search the menus, options, commands available in VS... and it will let you select/execute them.

## Video 8: Basic Debugging Features
- Build Configurations
	- Default configurations are Debug and Release
	- Project Properties ->  [Choose Build Configuration in the upper part of the menu] -> Choose any tab like Debug or Build, etc. -> You can see all the build configuration settings available, and what their values are.
		- You can define DEBUG (project properties -> Build tab -> Compilation symbols) symbols and then use:
			#if DEBUG
				code
			#endif

## Video 9: Additional Debugging Features
- You can pin a data tip (that's the window that appears when you hover over a variable at runtime
- If you want to momentarily hide the data tip window (ie so you can see code behind it), press Ctrl
- Autos window shows you variables involved in previous and next lines.
	- So it's a more focused view than just the locals
- Quick Watch
	- Highlight an expression (e.g. bunk() + junk()) then click quick watch from context menu (Ctrl + D+ Q), and it will evaluate that expression!
		- You can also type in an amendment to the expression and have it executed, although it will not change state.
	- Replaces / enhances some of the benefits of the immediate window
- Immediate Window
	- run expressions and evaluate them 
- Command Window (Ctrl + W + A)
	- Isn't only used for debugging
	- ?? will bring up the QuickWatch window
- Tracepoints can be used instead of breakpoints or conditional breakpoints
	- Basically this is setting an action like logging but selecting 'Continue Execution', so that it will generate messages to the output window but not break execution.
- Changing values vs Changing Code
	- Changing a value:
		- Select Edit from Local window (while Execution has paused)
	- Changing Code
		- Breakpoint -> 'Edit and Continue'
		- Just change the code while in a breakpoint- no further action.  
		- Of course, remember to save (or not) the file later.
- Reordering Execution with 'Set next statement' (Ctrl+Shift+F10)
		- You can change the ordering / skip reverse execution!
		- Really good when you need to back up or you want to skip some action
- 'Run to Cursor' is useful (Ctrl+F10)

## Video 11: Useful Extensions
- VS Extensions are plugins to extend / improve VS
	- www.visualstudiogallery.com	
	- add keystrokes, windows, etc.
- VSColorOutput is an extension that will add color to the output window messages
- Productivity Power Tools is a bunch of extensions that are grouped together
	- Developed by the VS team
	- File tabs are colored by project, but you can customize this
	- Has block highlighting, with tooltips.  Replaces things like //end if blah
	- Solution explorer highlights files that have compiler errors
	- Double click any window's title bar to toggle maximize
	- Will format document on save (if you select it to)
	- Will arrange/sort/remove (if unused) your using statements in order on save (if you select it to)
	- Right-click on any file in solution explorer, select 'Power Commands' and you gets lots of other useful stuff
		- Copy Path
		- Copy as Project Reference
		- Open Command File
		- Remove and sort usings
		- etc.
- Other types of extensions might provide:
	- new snippets
	- new project types
	- new sdk / languages
- Extension manager works for extensions installed as VSIX
	- Disable the extension if you want
- If you installed an extension as exe or msi, you would just need to uninstall

## Video 12: Intellitrace and Code map
- Code Map
	- Code Map button should appear in the debug toolbar while debugging
	- Visually shows you who calls what, and where the new breakpoints
	- Not so much a chronological graph, but shows the call, has, etc. relationships
	- Also shows you your current location in the map
	- You can annotate nodes in map with comments
	- You can specify varying levels of details for each node in the map:
		- Show methods this calls
		- Show containing type
		- etc.
	- You can share or copy as image, etc.
- Intellitrace
	- As you debug, it saves a trace file with state
	- Intellitrace Time-Travel methodology (aka Historical Debugging):
		- Debug the application straight through, generating trace files
		- View the Historical Events (in Diagnotist tools)

- **TODO: Tips for Expanding / Lambdas During Debugging**

## Useful Tool Tips (Recap)
- View / Outline / Hide
	- Zoom in: **Ctrl + shift + period**
	- Zoom out: **Ctrl + shift + comma**
	- Toggle collapse all: **Ctrl+M+L**
	- Select, then hide anything: **Ctrl + M + H**
	- Format document: **Ctrl + E + D**
- Searching
	- Next search result: **F3**
	- Previous search result: **Ctrl + F3**
	- Navigate To (searches only known symbols): **Ctrl + comma**
	- Search in solution explorer: **Ctrl + semicolon**
	- Quick Launch (search and execute VS commands): **Ctrl + Q**
- Quick Actions (context-sensitive fixes/refactoring): **Ctrl + period**
- Debugging:
	- Quick Watch (select and eval an expression): **Ctrl + D + Q**
	- Run to cursor: **Ctrl + F10**
	- Set next statement (skip/change execution order in any way): **Ctrl + Shift + F10**
- Snippets
	- Search Snippts: **Ctrl + K + X**
	- If: **if + tab + tab**
	- Switch: **switch + tab + tab**
	
