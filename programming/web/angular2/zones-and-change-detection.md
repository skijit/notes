Angular2 Zones and Change Detection
=============
- refs:
    - [understanding zones](http://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html)
    - [this](http://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html)
    - [and this](http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)
    - [and include immutable...](http://blog.scottlogic.com/2016/01/05/angular2-with-immutablejs.html)

## Zones
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
    - `XMLHttpRequest()` => `Zone.XMLHttpRequest()`
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
    
## Change Detection
- Change detection includes:
    - Determining whether changes have occurred
    - Propagating changes to the DOM
- In angular, each component has its own change detector
- Default behavior for angular is any that any async action will trigger change detection
- Change detection triggers occur top-down for **all components**
    - Top-down means no cycles
- Change detection is super-fast in Angular because, at runtime, each component gets a custom-built (component-specific) optimized change detector classes

### Optimizations
- Based on usage of **Immutables** and **Observables**
- **Immutables**
    - Other than primitives, all objects are mutable by default in JavaScript
    - `changeDetection: ChangeDetectionStrategy.OnPush`: set in the component decorator, specifies that change detection only occur if an input property (ie `@Input`) has changed (ie change = reference change)
    - For each component Input property, use an Immutable library
    - This will let you skip entire subtrees in the Component-Change Detection-Tree
- **Observables**
    - **Problem**: If you're using the `ChangeDetectionStrategy.OnPush` method with input properties that are observables, the events it emits will not trigger change detection since the Observable's reference hasn't changed.
    - **Solution**: You add code to your subscriber function
        - Inject the `ChangeDetectorRef` via Dependency Injection
            ```(typescript)
            constructor(private cd: ChangeDetectorRef) {}```
        - use the `markForCheck()` to tell the change detector that the current component needs to have change detection run on it.
            ```(typescript)
            ngOnInit() {
                this.addItemStream.subscribe(() => {
                this.counter++; // application state changed
                this.cd.markForCheck(); // marks path
                });
            }```
        
### Other Best Practices

- Angular Component Classes don't have a has-a relationship
    - the has-a relationship is managed by the template
    - Inheritance for component classes: you get the class code, but nothing in the component's decorator (template, selector, etc.)
- services & observables: address communication problems
- immutables address performance problems relating to change detection (and rendering) 
    - allocation vs rendering: rendering is more expensive
- Smart vs Dumb Components
    - Dumb component: keep logic out, so you can set change detection to onPush and all it does is render when it gets new references to it's input properties
    - Subscriptions to svcs will happen in the smart component
    - Dumb components should just have inputs and outputs
    - have lots of dumb components
- onpush strategy gotcha: 
    - dom event inside it will also cause re-rendering, doesn't just require reference change to an input property
- NgOnInit vs Constructor
    - 

