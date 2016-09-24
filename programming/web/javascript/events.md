JavaScript Events
=================
- Sources
    - [Event handling post](http://eloquentjavascript.net/14_event.html)
    - [DOM events writeup from Smashing Magazine](https://www.smashingmagazine.com/2013/11/an-introduction-to-dom-events/)
    - [Mozilla Overview of Events and Handlers](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Overview_of_Events_and_Handlers)
    - [Creating and Triggering Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)
    

## Event System Components
- The event system provides a mechanism for Web API objects (e.g. DOM) to generate messages to be handled (usually) asynchronously so that they don't block the UI thread
    - Events can be caused by interacation or other browser, Web API events
- The JavaScript Event system involves 3 types of components
    1. **Event Target**        
        - The object that *receives* the event
            - Tempting but not totally accurate to call it the *emitter* or *event source*, bc certain events (e.g. DOM events) walk through a tree of elements (ancestors and descendants of the *event source*) to individually target.
    2. **Event**
        - This is the data corresponding to the Event.
        - Includes all the when, what, where information about the event.       
    3. **Handler**
        - The function(s) that are registered for the specific event(s) and related Event Target(s) and are called when it occurs     
- Event Flow
    - **Registration**: The handlers are added as event listeners to a specific object
    - **Triggering**: The event will be fired by the Event Target 
    - **Event Queue**: Async Events (which is most) are enqueued to the Event Queue if they have a registered handler
    - **Handling**: When the JavaScript call stack is empty and the event loop ticks, the next appropriate handler is called with the appropriate Event data passed as a parameter.  
  
## Event Targets
- Most user interaction involves events
- But many events are unrelated to user interaction: 
    - preparing to display page
    - animation
    - media playback
    - script finishes loading
    - window resize
- Common sources of Events
    - `window` object (e.g. resize the browser)
    - `window.screen` object (e.g. change in device orientation)
    - `document` object (e.g. loading, modification, user interaction) => DOM events
    - `XMLHttpRequest`
    - media objects like `audio` and `video`
    - TODO
- `EventTarget`: interface implemented by Event Emitters, which includes
    - `addEventListener()`
    - `removeEventListener()`
    - `dispatchEvent(event)`: the EventTarget that calls this method is used to initialize the `event.target` value, and thereby determine which listeners to invoke.  Calling dispatchEvent(event) avoids the Event Loop (i.e. it is synchronous)
        
## (Un)Registering Event Handlers
- Registering and UnRegistering event listeners is managed by `EventTarget`
    - When the event triggers, the `EventTarget` won't enqueue the event if it has no listeners
- **Registering**: `addEventListener(<event-name>, <callback>, <use-capture>)`
    - `<event-name>`: string
    - `<callback>`: function - do not use an anonymous function if you might want to remove the listener
    - `<use-capture>`: boolean - whether the callback should be fidred in the capture phase (see DOM event phases below)
- **Unregistering**: `removeEventListener(<event-name>, <callback>, <use-capture>)` 
    - best practice for performance if the listener is no longer needed 

## Events
- All events have
    - name (string)
    - data structure to represent the key properties (typically using the `Event` interface)
-  `Event`: interface representing an event in the DOM .[see ref](https://developer.mozilla.org/en-US/docs/Web/API/Event)
    - Event data structure derived from EventPrototype Object, instead of ObjectPrototype Object
    - it has all the common properties for events including... 
    - `type` (string): the name of the event   
    - `target` (DOM node): A reference to the element which originally dispatched the event
    - `currentTarget` (DOM node): the DOM node that the event callback is currently firing on (see DOM event phases below)
    - `bubbles` (boolean): whether the event is bubbling 
    - `preventDefault()`: prevents any browser-based default action from occuring
    - `stopPropagation()`: stops any callbacks from being called on DOM nodes further in the event chain (either during capture or bubbling phases) than the `currentTarget`
    - `stopImmediatePropagation()`: stops all callbacks from being called on the `currentTarget` or anything further in the event chain (either during capture or bubbling phases)
    - `cancellable` (boolean): whether `preventDefault()` can be called.
    - `defaultPrevented` (boolean): whether `preventDefault()` has been called
    - `isTrusted` (boolean): whether the event is dispatched by the `EventTarget` automatically (true) or programmatically (false)
    - `eventPhase` (number): 0 = none, 1 = capture, 2 = target, 3 = bubbling
    - `timestamp` (number): when the event occurred             
    
### Custom Events
- You can emit your own events, with [Custom Event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) Data
- The source still needs to be an `EventTarget`
```(javascript)
    var myEvent = new CustomEvent("myevent", {
        detail: {
            name: "Wilson"
        },
        bubbles: true,
        cancelable: false
    });

    // Listen for 'myevent' on an element
    myElement.addEventListener('myevent', function(event) {
        alert('Hello ' + event.detail.name);
    });

    // Trigger the 'myevent'
    myElement.dispatchEvent(myEvent);```
- `myEvent.isTrusted === false` bc it was not initated by the browser

## Triggering Events
- for predefined events, will happen automatically
- programmatically triggering via `dispatchEvent()`...
    - will by synchronous
    - `isTrusted` will be false
    - this is true for predefined and custom events


## Event Handlers
- All handlers will
    - accepts the corresponding event's data strcuture as an argument
    - registers/subscribes to the event's name with the object that emits the event
- The `bind()` **Gotcha**
    ```(javascript)
    var element = document.getElementById('element');

    var user = {
    firstname: 'Wilson',
    greeting: function(){
    alert('My name is ' + this.firstname);
    }
    };

    // Attach user.greeting as a callback
    element.addEventListener('click', user.greeting);

    // alert => 'My name is undefined'```
    - `this.firstname` will be undefined because `this` will refer to the `EventTarget`, not `user`
        - the cheap fix is to call `user.greeting` inside an anonymous function, but then you can't remove it as an event listener
    - Better solution: `bind()`
        - it generates a new function which will always run in the given context
        ```(javascript)
        // Overwrite the original function with
        // one bound to the context of 'user'
        user.greeting = user.greeting.bind(user);

        // Attach the bound user.greeting as a callback
        button.addEventListener('click', user.greeting);```
            
## DOM Events Phases
- Current Spec: DOM Level 3, published April 2004, is widely implemented 
    - 'Levels' just means 'versions'
- There are 3 phases of each event
    1. **Capture** : Top-down: Event flows from the document root to the `EventTarget`
        - Builds the propagation path to be used in Bubbling, but not super useful generally
    2. **Target** : Event fires on the `EventTarget`
    3. **Bubbling**: Bottom-up: Event flows from `EventTarget` back up to the document root
        - This is useful for click-events, so you don't have to listen at the lowest level.
    ![Event Flow](/resources/images/programming/eventflow.png)
    - **image from W3C**

## Sync / Async Events
- Most events are asynchronous
    - Must be popped off the Event Queue by the Event Loop
- Some events are synchronous
    - DOM Mutation events
    - Any event which is fired programmatically via `dispatchEvent()`
    
## Event-based vs Callback-based Asynchrony 
- While most Web API's are event-based, some are callback-based:
    - SQLite
    - GeoLocation
- Handlers are analogous to Callbacks
- Event-based models
    - Require an `EventTarget` which can...
        - Fill an `Event` or `CustomEvent`
        - Emit the Event, presumably to the Event Queue
    - Pros:
        - Easy to multicast handlers
    - Cons:
        - Harder/awkward to have a custom `EventTarget`
            - Maybe an obvious solution would be create an `Element`
- Callback-based model
    - More portable (i.e. not bound to an `EventTarget`)
    - Pros:
        - Easy to add Promises or async/await
    - Cons:
        - Error detection / handling a little more complicated / verbose
- Error handling approaches
    - Traditional try/catch doesn't work anymore in asynch approaches
    - Event-based models
        - Call `Event.stopImmediatePropagation()` to block other handlers from running
        - Optionally, call `Event.preventDefault()` to cancel a default browser action
        - Call whatever custom error handling logic you want
    - Callback-based models
        - Inject another callback as a parameter to handle errors
        - In a Promise-based approach, you can use the `Promise.catch()`
- Designing custom logic:
    - Unless you're anchored to some `EventTarget`, the callback-based approach is generally simpler 

-------------------------------
**NEXT STEPS**            
- TODO: Notes on Reflow/Repaint in Browsers
