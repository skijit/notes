Angular2 Zones and Change Detection
=============
- refs:
    - [understanding zones](http://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html)
    - [this](http://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html)
    - [and this](http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)
    - [and include immutable...](http://blog.scottlogic.com/2016/01/05/angular2-with-immutablejs.html)

- **Basic Problem**: You can't (easily) do things like measure performance time for blocks of code when segments of the code runs async.
- Zones are an execution context for asynchronous operations
    - Useful for error handling
    - Useful for profiling
 - Zones perform an operation each time code enters/exits the zone
    - starting/stopping timer
    - updating a stack trace
- When you include zones.js in your project (which is included in angular), it will [monkey-patch](https://davidwalsh.name/monkey-patching) these global async operations:
    - `setInterval()` => `Zone.setInterval()`
    - `addEventListener()` => `Zone.addEventListener()`
    - `removeEventListener` => `Zone.removeEventListener()`
    - `XMLHttpRequest()` => `Zone.XMLHttpRequest()'
- each async operation gets its own zone, forked off the parent zone, which allows it track the async operation and then aggregate the results back up to the top.


## Zones and Change Detection
- Any state change is triggered by a some async action
    - Events
    - Xhr's
    - Timers  
- State changes are the only time you want to run Change Detection
- All async actions are executed inside zones
- **Therefore**: Angular2 uses zones to determine when to run Change Detection
- `NgZone` is a custom Angular zone forked off the global zone that extends the `zone` API to include observables
    - Change detection is peformed for each update of the `onTurnDone` observable
- Change detection is not triggered for all async events- only those which change state.
    - e.g. `mousemove` events typically won't trigger state changes
    - `NgZone` includes `runOutsideAngular()` which executes the task in the parent zone and doesn't emit an `onTurnDone` event
    - To use this feature, you inject NgZone into your component and call `this.zone.runOutsideAngular(yourFuncToRunOutsideAngular)`
    
    
