JavaScript Events
=================
- Sources
    - [Mozilla Overview of Events and Handlers](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Overview_of_Events_and_Handlers)
    - [Creating and Triggering Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)
    - [Event handling post](http://eloquentjavascript.net/14_event.html)

- Events are not just baed on user interaction.
- Non-interaction based events include:
    - preparing to display page
    - animation
    - media playback
    - interacting with device
- All events have
    - name (string)
    - data structure to represent the key properties
    - javascript object that 'emit's the event
- All handlers will
    - accepts the corresponding event's data strcuture as an argument
    - registers/subscribes to the event's name with the object that emits the event
- Event data structure derived from EventPrototype Object, instead of ObjectPrototype Object
- Registration function is `addEventListener` which is defined on the emitter
    - So the emitter knows all of its subscribers
- Handler functions are called async
    - The events must be placed in the event queue 
- Some Important Events Emitters
    - `window` object (e.g. resize the browser)
    - `window.screen` object (e.g. change in device orientation)
    - `document` object (e.g. loading, modification, user interaction)
    - `XMLHttpRequest`
    - media objects like `audio` and `video`
- Event
    -  interface representing an event in the DOM .[see ref](https://developer.mozilla.org/en-US/docs/Web/API/Event)
        - it has all the common properties for events    
    - `target`: A reference to the target which originally dispatched the event 
    - `preventDefault()`
- EventTarget
    - interface implemented by Event Emitters, which includes...
        - `addEventListener()`
        - `removeEventListener()`
        - `dispatchEvent(event)`: the EventTarget that calls this method is used to initialize the `event.target` value, and thereby determine which listeners to invoke.  Calling dispatchEvent(event) avoids the Event Loop (i.e. it is synchronous)
            

