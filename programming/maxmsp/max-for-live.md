Max For Live API and OM
====================
A Collection of Notes for making sense of M4L API objects and the LOM

## Links
- [Live API Overview](https://docs.cycling74.com/max5/refpages/m4l-ref/m4l_live_api_overview.html)
- [Live Object Model](https://docs.cycling74.com/max5/refpages/m4l-ref/m4l_live_object_model.html)
- [Ableton Max For Live Production Guidelines PDF](https://downloads.ableton.com/misc/maxforlive_production_guidelines.pdf)

## Live API Objects
- **live.thisdevice**:  loadbang for m4l devices.  also fires whenever the device is saved (which reloads it in Live) 
- **live.param~**: this lets you receive automation data from Live at signal rate.  There are 2 main ways to expose your device parameters for automation (in arrangement or clip envelopes):
    1. Any live UI elements are automatically connected to the parameter system.
    2. coll objects can be connected to the parameter system with some extra configuration.
For more info on the parameter system, check [here](https://docs.cycling74.com/max5/vignettes/core/live_parameters.html) or see the notes below.
- **live.observer**: takes an id for a property (usually) and will output whenever the values are changed.  You can also observe children and list properties, in case their memberships change.
    - see note below about live.path and ```deferlow```
- **live.remote~**: this allows you to change certain class of objects called 'DeviceParameter's at audio rate
    - DeviceParameters are child object of the more prominent LOM classes like Device, MixerDevice (which is a child of Track), or ChainMixerDevice
    - You can change these values without affecting the Undo history
    - live.remote~ is way faster than message rate, but also much more resource intensive, so use it wisely.    
- **live.path**: you send it a message 'path' followed by a particular path and it will output an 'id ...' message.  The path can be to an object or property.
    - live.path is the other object (like live.observer) that will receive notifications when something changes.  
    - Sometimes you are most interested in the ultimate object, and sometimes you're interested in whatever object correspond to a static path (since that can change).  One outlet in live.path gives you the fixed object id (left), and another outlet (middle) will send you any notification 'id' messages if that's what you're interested in.
    - note about notification: any event based on a notification runs on a thread that prevents you from making changes.  If you need to make changes after a notification, those actions should occur after a ```deferlow``` call.
- **live.object**: this is where you send your get/set messages targeting properties.

## LiveAPI Choosers
- Right-click on a patcher and select 'Paste From' => 'C74' => 'Live API Choosers'
- Some of the things you get...
    - **TODO** Add some the choosers you get for M4L

## LiveAPI Abstractions
- Right-click on a patcher and select 'Paste From' => 'C74' => 'Live API Abstractions'
    - **TODO** add some of the abstractions you get for M4L
    - **Device.DeviceParameter**:  **TODO**
    - **Device.DeviceParameterRemote**: **TODO**
    - **Track.ChangeTrackVolume**: **TODO**

## Exposing a M4L Device Parameter for Automation
- [this](https://docs.cycling74.com/max5/vignettes/core/live_parameters.html)
- [and this](https://docs.cycling74.com/max5/vignettes/core/live_automation.html)
**TODO** clarify the different ways of exposing the parameters to the parameter system and whether names with spaces matter, etc.

## Basic Ideas about Navigating the LOM
- 2 kinds of paths can be:
    - absolute
        - begin with one of the 4 *root objects*: ```live_set```, ```live_app```, ```control_surfaces N```, or ```this_device```.
    - relative
        - see the live.path [documentation](https://docs.cycling74.com/max5/refpages/m4l-ref/live.path.html) for more information, but...
        - you can send live.path a message 'goto rel_path' where rel_path is the rest of the path following whatever the live.path is currently pointing at.
- There are multiple paths which are possible to get to the same object.
    - The **canonical path** is unique, absolute path for each object.
    - The edges in the LOM diagram are bold for canonical paths
    - You can get an objects cannonical path by sending the message 'getpath' to live.object
- Objects have:
    - properties: get/set/observable values
    - children: references to other objects
        - some children are single instances and some are lists (see the LOM diagram)
        - any time you try to access a specific item in a child list, use a 0-indexed number.
            - example: ```live_set tracks 3``` gets the fourth track
        - whether single or lists, they can also be observed.
    - functions: functions which are callable via messages
    - ID's
        - they are only valid in the given device
        - they don't change, unless you delete/recreate the object
        - won't be reused in the scope of the max device
        - ```id 0``` means nothing    
- Each object also has a ```canonical_parent``` child which can be useful. 
    - example: ```path this_device canonical_parent``` gets the track object

**TODO** comment on the different m4l gui elements