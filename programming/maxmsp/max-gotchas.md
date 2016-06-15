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



