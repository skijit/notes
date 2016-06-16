Max For Live API and OM
====================
A Collection of Notes for making sense of M4L API objects and the LOM

## Links
- [Live API Overview](https://docs.cycling74.com/max5/refpages/m4l-ref/m4l_live_api_overview.html)
- [Live Object Model](https://docs.cycling74.com/max5/refpages/m4l-ref/m4l_live_object_model.html)
- [Ableton Max For Live Production Guidelines PDF](https://downloads.ableton.com/misc/maxforlive_production_guidelines.pdf)

## Live API Objects
- **live.thisdevice**:  loadbang for m4l devices.  also fires whenever the device is saved (which reloads it in Live) 
- **live.param~**: this lets you receive automation data from Max at signal rate
- **live.observer**:
- **live.remote~**: this allows you to change certain class of objects called 'DeviceParameter's at audio rate
    - DeviceParameters are child object of the more prominent LOM classes like Device, MixerDevice (which is a child of Track), or ChainMixerDevice
    - You can change these values without affecting the Undo history
    - ```live.remote``` is way faster than message rate, but also much more resource intensive, so use it wisely.    
- **live.path**:
- **live.object**:

### To Clarify...
- ```live.param~``` is about getting automation data from live at signal rate and ```live.remote``` is about setting it at signal rate.

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
- [see this](#to-clarify)

## Some Key Terms and Insights for Navigating the LOM
- **TODO** add explanation for terms like cannonical path, etc. from [Live API Overview](https://docs.cycling74.com/max5/refpages/m4l-ref/m4l_live_api_overview.html)
