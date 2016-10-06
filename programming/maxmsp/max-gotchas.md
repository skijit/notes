Max/MSP Gotchas and Misc Notes
=============

## Misc
- ```pack``` requires you to define the exact types in each inlet (e.g. symbols, ints, list, etc).  If you're not sure, ```join``` is a nice alternative that is type-agnostic
- M4L Loadbang stuff:  ```loadmess``` or ```loadbang``` may not work as expected in a M4L device. 
    - be sure to freeze the M4L device
    - consider using ```live.thisdevice``` to send bangs on device loaded or saved events
- [Max 7 Documentaion online](https://docs.cycling74.com/max7)

## JavaScript Execution
- takeaways from the following forum [thread](https://cycling74.com/forums/topic/javascript-performance-vs-max-objects/)
    - Runs on the low-priority thread along with the UI and can be blocked by UI
    - Recall JS is single-threaded
    - Cost to marshall data into and out of the JS environment
    - Cost to interpret js
    - For control-rate operations and non-performance-related functionalities, it's probably ok
    - For audio-rate stuff, dsp, etc. it is **not ok**
    

## General Performance
- See [my old thread](https://cycling74.com/forums/topic/event-scheduler-interval-vs-execution-time/) on the forum about intentional latency (e.g. I'm windowing a signal) vs computational overhead (e.g. inefficient algorithm)
- [this](https://cycling74.com/2004/09/09/event-priority-in-max-scheduler-vs-queue/#.V2Q7GeYrIW0) link has useful notes about execution.  Here are some notes...
    - Event examples:
		- External sources: midi note, keypress, mouse click
		- Internal sources: metronome, delay, pipe
	- Event is a fundamental unit of execution
	- Note in preferences, there is a setting, 'Scheduler Interval (ms)' which you can set... typically to 1ms.
	- Events are triggers... but they are not the object-to-object messaging
	- Events are processed off a scheduler, which, I think operates at control-rate.
		- Therefore, I think you can regard the sequence of control message processing to happen within a control rate cycle, rather than one message per cycle.
		- This is also supported by the idea that events are the fundamental unit of execution.
	- Some events have timing associated with them: metronome, midi note, delay, pipe, etc.  Others (e.g. mouseclick) do not.
		- If they do have timing associated with them, and **overdrive** is selected, there are two scheduling queues:
            - high-priority 
            - low priority.  
        - high-priority will also interrupt the low priority execution.
		- If overdrive is not selected, events are processed in the same queue.
		- This also means that you have a shared patcher state which might be operated on by out-of-order processing (e.g. if a high-priority event interrupts an incomplete low-priority event)
	- Sometimes you have a high-priority thread that tries to do something that is not safe at a high priority, like redrawing, file i/o, user-input, etc.  For these circumstances, you can use the following objects to transfer execution to the low priority queue:
		- ```defer```: moves to the head of the low-priority queue
		- ```deferlow```: moves to the tail of the low-priority queue
	- to promote a sequence from low-priority to hi-priority, use pipe or delay on the message.
	- this also explains the conditions in which feedback/recursion works:
		- you need to interject a delay or pipe or deferlow because then it creates a new event to schedule, rather than just processing depth-first until stack-overflow.
	- you can start to overflow the scheduler if new events are added faster than they can be serviced.  e.g. a rapid metronome or a snapshot~ updating every ~1ms
		- in this case, use the ```qlim``` or ```speedlim``` object.


## M4L Folder
- To register a M4L Device with Ableton, you drop it into a track and it will populate in the Ableton Browser.
    - This is called 'Importing'
    - This copies the file into <UserLibrary>/Presets/MIDI Effects/Max MIDI Effect/Imported
    - If you start the M4L Device 'fresh' from a blank M4L device, it goes into the parent directory
    - Any changes from Ableton will write to **THIS** file, so be sure to Save As when appropriate
    - If you delete this file, then the Ableton browser will update once you open/close the parent directory
- Sometimes when Importing, Ableton keeps old versions of abstractions your M4L Device relies upon.
    - When this happens, remove...
        - The device from the live set
        - The device file from the UserLibrary
        - The device reference in the UserLibrary from the Ableton Browser (if necessary)
    - That should get rid of the cached copies...

## Parameter Automation in Max4Live
- You can automate any live UI object directly OR you can expose pattr objects for automation.  See [here](https://docs.cycling74.com/max5/vignettes/core/live_parameters.html)

## Setting ToolTips on Abstraction's Inlets/Outlets
- In the inspector set both the ```comments``` and ```hint``` properties.
    - ```comments``` is what shows up when you use the abstraction
    - ```hint``` shows up when you hover over the inlet from within the abstraction

## Max 7 Projects
- Helps you collect all the dependencies (patches, abstractions, javscript files, media files, data files, 3rd party externals, etc.) into a single place and allow you to find/link to them outside the typical Search Path mechanism in Max.  Your project folder will be searched first! 
- Each M4L device is a project (when unfrozen, unpacks to a M4L Device Project folder) to help organize and manage it's dependencies.  Freezing a device includes all project files/dependencies into  the device.  [Details](https://docs.cycling74.com/max7/vignettes/projects_devices)
- You can save an existing pacher as a project.  It will close and reopen as a project.
- You can set 'Open Actions', which are messages which get send to the max, dsp or jitter objects in this window.  [Example](https://docs.cycling74.com/max7/vignettes/projects_openactions)
- Files in the project window can be 'implicit' (ie they live outside the project folder, but are dependencies), and 'explicit' which are members of the project folder.
- Project mgmt actions:
    - Consolidate: Copy all files/dependencies into the local project.
    - Snapshot: Archites your project state. 
- Project search path info [here](https://docs.cycling74.com/max7/vignettes/projects_searchpath)


## Max/MSP Prototypes
- Saves the styling along with the particular object type.  However, you can save prototypes on a blank object (jbogus) and get the styling, then change the object type to whatever you want and keep the styling.

## Scopes
- In objects like `v`, `pv`, `send`, `receive`...
    - Prefixing the name with '#0' in an abstraction will prepend a unique integer to the name (which is making it local)
        - Doesn't work in subpatchers
        - The '#1', '#2', etc. are used to reference arguments in the abstraction
    - Prefixing the name with '-' (e.g. `send -foo`) will make the value local to that **instance of the patch** ([source](https://cycling74.com/forums/topic/local-sendreceive-within-the-same-patch-only/))
        - This might only work in M4L patches (need confirmation)
     

