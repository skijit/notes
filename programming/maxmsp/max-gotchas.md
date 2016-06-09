Max/MSP Gotchas and Misc Notes
=============

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

## Misc
- ```pack``` requires you to define the exact types in each inlet (e.g. symbols, ints, list, etc).  If you're not sure, ```join``` is a nice alternative that is type-agnostic

## Parameter Automation in Max4Live
- You can automate any live UI object directly OR you can expose pattr objects for automation.  See [here](https://docs.cycling74.com/max5/vignettes/core/live_parameters.html)