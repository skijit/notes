Max/MSP Preset System
==============
- Collection of notes about handling presets in Max and M4L.
- **UNCLEAR - Needs rewrite**

## Preset Approaches

- the live UI objects will work normally with Live's preset system, but other non-live max UI elements wont (eg the function object)
- to get these to work, you need to use the `pattr` (patcher attribute) system
- with `pattr`, you give it a name and you set the attribute @parameter_enable 1 (this enables the `pattr` setting to be connected with max4live)
- `pattr` stores it's own data, which can be shared with other objects
- `pattr` is typically bound to a ui element
- you send `pattr` a 'bindto' message to bind it to a UI object, referencing the ui object's name
    - you can also bind to a specific attribute of a ui object (like it's background color)
		- reference syntax:
			- <patcher (if necessary)>::<object name>::<attribute (if necessary)>
		- in m4l, if you use the parameter_enable attribute, then this data will be saved with the live preset		

- **pattr tutorial 1**
    - `pattr` (and its set of pattr-family objects) are useful for the more complicated state management tasks you might encounter
    - you can bind a `pattr` to another object, eg a number box.  
        - then you can get/set the value in the number box it is bound to
    - you can send (setting) messages to a `pattrhub`, these will first specify the `pattr`'s name and the new value.  
    - you can bind a pattr object to another object using the @bindto attribute or connecting the middle outlet of the pattr to the inlet of the object it should drive (but in this case it can only bind to one object)
    - you could also let the `pattr` store the data itself
        - then it could connect to a message box and set the corresponding value (possibly with a 'prepend set' (?))in the object you want
    - you can dynamically bind a `pattr` to an object by setting the bindto attribute with a message
    - recursive loops with `pattr` are ok (for some reason)
    - multiple data bound objects are ok, but they should be connected to the left outlet of the `pattr` (patchcord based, not bindto based)
    - binding appears to be two-way in all cases
    - you can send a `pattrhub` a get message by saying 'get<pattrName>' with no space between and it will send you back your message
&nbsp;   
&nbsp;   
&nbsp;   
- **pattr tutorial 2**
    - `autopattr` helps bind large groups of objects to the `pattr` system
        - whereas before you had a message sent to a `pattrhub`, and the message would include the targeted `pattr` name, now you can just send a message with the object name in it and send it to an `autopattr` and it will forward that directly to the object.  
            - so it takes away the need for a `pattrhub` -> `pattr` -> object.  instead it goes: `autopattr` -> object
    - `pattrstorage` helps to store and recall large states / data collections
    - message box with a leading ';', enables a send:
      ```
            ;
            helpMesg help```
        - a message box with this content will send this message to a recieve object named 'helpMesg'
        - remember comma is the message delimeter
        - if you send your message to an object named max, it will send the data to the max window
    - viewing the various named fields connected to the `pattr` system:
        - click 'clientwindow' messagebox connected to the `pattrstorage`
        - or just double click the `pattr` object and it will open up (along with some metadata about each field)
    - viewing the state settings:
        - click the 'storagewindow' messagebox connected to the pattrstorage
    - storing states
        - send a 'store <integer>' message connected to a pattrstorage object.  this will take the current control values and save them to a state slot (ie preset), whose index is indicated by the integer
        - if you click the 'storagewindow' messagebox connected to the pattrstorage, you will see each saved state, along with their values.
    - recalling states
        - send a number connected to the pattrstorage and the state slot for that index will be recalled
        - you can pass it a floating point number and it will interpolate between the two state slots
        - you can also pass a 'fade a b n' message to the pattrstorage where a and b are two non-adjacent state slots and n is a value between 0 and 1 indicating the placement between the two slots
    - writing states to a file: 
        - pass a message "write" to the pattrstorage and it will prompt you how to save data as an xml or json file
    - reading states from a file:
        - pass a message "read" to the pattrstorage and it will prompt an open box
&nbsp;
&nbsp;    
&nbsp;        
- `presets`:
    - can be used as a user interface to a `pattrstorage` object
    - send the `preset` a message 'pattrstorage <pattrStorageName>' and it will estable a link (index of preset will correspond to the pattrstorage index) to the named `pattrstorage`
- How to set a preset using the preset object:
    - Just arrange the controls as you like and then send the preset object a message: 'store 1' .  This will store the data in slot 1.
    - There are lots of save/recall/clear messages you can send to a preset object.
&nbsp;
&nbsp;    
&nbsp;        
- **BIG PICTURE:**
    - To save non-live object patcher data in a Live preset, connect these values with the `pattrStorage`.
    - The preset object can also be connected to a `pattr`... like a front-end.  However, this might be most valuable for demoware... not sure.
