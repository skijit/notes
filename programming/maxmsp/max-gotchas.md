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
    - this gets to the difference between `qmetro` and `metro`
        - `metro` runs in the high-priority thread and is for time-critical applications (music, triggers, etc)
        - `qmetro` runs in the low-priority thread and its for less time-critical applications, such as driving a video, where the perception of motion can be maintained with a variable and lower frequency.
            - note that some objects are smart enough to *dropframe* (cancel fulfillment of their request if they can't be serviced in realtime), but others (e.g. OpenGL drawing commands) and not able to do this.  Therefore, it is better to use `qmetro` to drive them
- When **overdrive** is selected, you can also enable another key performance-related configuration: **Audio Interrupt**.
    - It runs the Max event scheduler before each I/O vector.
        - Max has both I/O vectors and signal vectors, and sometimes people confuse them.
        - I/O vector determines the chunk sizes that are sent to your audio card, and therefore affects latency.
        - Signal vector <= I/O vector and determines the size of computational chunks within the I/O vector.
            - It can affect your CPU utilization, but no other audio-related factors (like latency).
        - I typically default to a signal vector equal to the I/O vector (perhaps this is why they're often confused.)    
    - Essentially, it is a way of getting control-rate processing running at audio rate.
    - Keep in mind, if you select **Audio Interrupt**, you're still dependendent on the vector size (as this determines overall latency).
        - Assuming 44.1 kHz:
            - Vector size of 512 samples => 11.61 ms latency
            - Vector size of 256 samples => 5.8ms ms latency
            - Latency = (1/SR)*Vector size
- [Info on running separate instances of max](https://cycling74.com/forums/running-multiple-max-applications-on-the-same-machine/)

## Building a Standalone Application From Max Patch
- Take a finished max patch and select File->Build Collective/Application
- In the script window, you can do things like specify an icon, etc.
- You choose a file format:
    - Max Collective: still depends on the max or the max runtime, but it is cross-platform
    - Application: standalone.  But you need to develop on the platform (mac, windows) you're targeting
- The `standalone` object lets you configure the standalone and reduce the total size of the application
    - you can enable overdrive
- If you have resources (e.g. audio files) you want included, add them to a folder and then in the build modal, specify that folder.
- Set the patcher level properties to open in presentation mode

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

## Live Objects and Abstractions
- You can't use any `live.*` objects (e.g. `live.object`, `live.path`, ...) in an abstraction, even if that abstraction is called by a M4L device.  
- They need to live in the amxd file
- They can live in an encapsulation, though.

## Search Path and Projects
- Search Path is evaluated in the following order:
    1. Folder of the most recently loaded patch
    2. Anything in or under the Cycling 74 folder.
        - This is also where the Max application runs from
    3. There are two predefined folders (and their subfolders):
        - patches
        - examples
    4. Any folders you have added via Options->File Preferences

- Project Best Practices
    - 
    - Create a project, this will create a folder named, 'WhateverProject', with a single file 'WhateverProject.maxproj' inside.
- I think project search path doesn't work with m4l devices...

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
        - #0 Doesn't work in subpatchers
        - The '#1', '#2', etc. are used to reference arguments in the abstraction
    - Prefixing the name with '---' (e.g. `send ---foo`) will make the value local to that **instance of the patch** ([source](https://cycling74.com/forums/topic/local-sendreceive-within-the-same-patch-only/))
        - This only works in M4L patches (need confirmation)

## BPatcher - Nutshell
- Great for components and also as a top-level wrapper
- To use:
    - Create a `bpatcher` object in the parent patch
    - Then go to the inspector for that object and select another patch for the property 'Patcher File'
    - Set the Patching Rectangle property to size the patch properly
    - Offset will move view of your bpatcher within the rectangle
    - Set the property to open in presentation view for the internal patch
    - You can use inlets and outlets as you normally would
    - You can create as many instance of the bpatcher as you would like


## Patching Mechanics
- To insert a new object between two connected objects:
    - select the patch cord, then press 'Shift+N'
    - You can also use this with any of the shortcuts like 'Shift+B' for a button, 'Shift+T' for a toggle, etc.
- If you want to make a new object and have it connected to the selected object, type `Shift+N'
- Selecting multiple patch-cords: 'Alt-Drag cursor', then you can drag them to a new input


## M4L Scheduling Issues
- Per [thread](https://cycling74.com/forums/topic/live-object-changes-cannot-be-triggered-by-notifications-2/#.WN0AMW_ythE), the scheduling and some behaviors seem to be very different when in edit mode or not in your M4L device.
    - For accurate debugging:
        - add the device but do not edit.
        - right-click on the device name in Live and show the Max window from there.
- Per the [M4L api overview](https://docs.cycling74.com/max5/refpages/m4l-ref/m4l_live_api_overview.html): changes to a Live Set and its contents are not possible from a notification. The error message in the Max Window is 'Changes cannot be triggered by notifications'. In many cases putting a deferlow between the notification outlet and the actual change helps to resolve the issue.
    - **YIKES**: this complicates things

## Patch Cord Alternatives
- Order of execution for patch cords when a single outlet has multiple destinations (i.e. a choise has to be made) depends on the position of the receiving object.
    1. right to left
    2. bottom to top
    3. depth first
- Sends and receives are decent alternatives for getting a message from one place to another without and you can use scoping prefixes (see above).
    - BUT the order of reception by two or more receive objects is not deterministic.
    - If you have multiple receivers, there's no telling who will get the value first.
- Values and Private values:
    - For sharing values (number, list, anything else), the `value` object might be a better option bc the value will be there when you need it
    - You can still use scoping prefixes too
- Best Practices:
    - Send/receive when you need to trigger something
        - Not for when there are multiple receivers
    - Value for when you need to share a value
        - And you can bang it when you need that value.
     
    