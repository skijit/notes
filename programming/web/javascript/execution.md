Javascript Execution
==============
- Sources:
    - [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
    - [Event Loop presentation](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
    - [This blog](http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/)
    - [this page](http://javascript.info/tutorial/events-and-timing-depth)
    - [this blog](https://danmartensen.svbtle.com/events-concurrency-and-javascript)
    - [this crazy thing](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
    
## Execution Architecture
![JavaScript Execution Architecture Image](/resources/images/programming/javascript-event-loop.svg)
- *image from mozilla*
- The JavaScript Language, as specified by ECMA-262, is includes:
    - Stack: Call stack which stores frames, manages scopes, Program-Counter, etc. 
    - Heap: Area for dynamic memory allocation, objects, instructions, etc.
- Most of the components involved in JavaScript execution are EXTERNAL to the Language.
- The JavaScript host (i.e. the browser, V8 engine) provides a runtime environment which makes it useful.
- These environment / runtime components include:
    - Web API's
        - *Native* API's provided by the host: either the browser or in node, a bunch of C-based systems API's 
        - They do things that JavaScript can't do (e.g. async stuff, etc.)
            - Not all calls to WebAPI's are async, but ALL async (except web workers) is provided by Web API's
            - DOM mutation events are synchronous
        - They execute outside the JavaScript call stack and your JS code has limited visibility into their behavior.
            - Naturally, Web API code not subject to the JavaScript garbage collection 
        - Examples:
            - DOM
            - XMLHttpRequest
            - setTimeout
    - Callback Queues
        - Bridges the native, typically async, Web API actions with the JavaScript call stack
        - Typically code which leverages these Web APIs follows an event/callback-based model such that if the action is *blocking* (i.e. entails some waiting, possible bottleneck) like network or disk I/O, the action will execute on a separate thread in the Web API (separate from the JavaScript stack), and upon completion add a callback function to one of many callback queues.
        - The callback function is a JavaScript function, and will ultimately be executed on the JavaScript stack
        - The Web API gets the callback function from the calling code (i.e. JavaScript) and it passes any return values to the callback via it's arguments. 
            - Note the other way to have callbacks access dynamic values is via closure.  (TODO)
        - Different queues depending on the nature of the Web API / action:
            - Dom
            - Network
            - Timer
            - UI Render
    - Event Loop
        - Loop that runs as long as the JavaScript call stack is empty
        - While running, each iteration is called a `tick`
        - Will find the oldest callback queue item in each tick, remove it, and push it onto the call stack.
    - Typical scripting runtime components
        - Interpreter
        - Garbage collector
        - etc.
    - UI Thread
        - This is the thread that JavaScript runs on, and which recieves UI events
![JavaScript Execution Architecture Image](/resources/images/programming/javascript-execution-diagram.png)
- *image from [svbtle.com](svbtle.com)*

## Execution Terminology
- JavaScript is typically referred to as:
    - Single-Threaded
    - Non-blocking
    - Asynchronous
    - Concurrent
- **Single-Threaded**: 
    - The JavaScript parts run on a single thread (i.e. the UI thread).  
    - The *newish* Web Worker API is an exception- it will let you create separate JavaScript threads
    - **Here's the catch**: There are a lot of *parts* (see the Web API in the Execution Architecture section) of a JavaScript application that run on a separate thread, but they're exectured **outside** the scope of JavaScript.
- **Non-Blocking**:
    - refers informally to code that is slow (and how this is handled)
    - the problem is that if javascript is single-threaded and running in the browser then blocking (ie slow, synchronous) actions will freeze the UI (for more details see below)
- **Asynchronous**:
    - Refers to Asynchronous Callbacks
        - IE no guarantee that execution order of callbacks will match invocation of their calling function
    - This is the solution to the possibility of blocking in a single-threaded environment.
    - how do the async callbacks ever make it to the stack?
        - the async behavior is managed by the WebApi (or something external to Javascript runtime)
        - when it completes, it places the callback on the task queue (aka event queue)
        - when the event loop (which is always running) sees that the call stack is empty, it will remove items from the event queue and place them on the call stack 
    - javascript is referred to as 'non-blocking' bc most of the would-be blocking operatiosn like I/O are handled by events (whose handlers are async) and callbacks (which are async)
- **Concurrent**:
    - While the main program flow is single-threaded and therefore **NOT** concurrent, a very large portion of the most useful functionality (Web API's) is executed concurrently and external to JavaScript. 

## Misc Details
- **Why you don't execute slow code on the UI Thread**
    - JavaScript code is running on a single thread **And**...
    - The browser wants to refresh at 60Hz **But**...
    - It can't re-render if there is JavaScript code still executing on the call-stack (e.g. since this might entail a UI change) **So**...
    - When a change is made that should trigger a redraw, a message is placed on the browsers render queue, which operates at a higher priority than other queues, and the redraw is executed when the call stack is empty.
    - **Thus**: if you have slow, long-running code blocking up the main thread, your UI can't update!
- WEb workers get their own event loop
- Promise callbacks are async even if they've resolved, but rather than a normal task added to the task queue, they're added as *microtasks* which execute as soon as the current frames complete. [See here](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- DOM Events
    - DOM events are async
    - The events' are placed on the Event Queue if they have a registered callback (aka attached listener)
    - Examples of events 
        - Script finished loading
        - most interactions
            - key/mouse changes        
        - window resize
- Custom Events are processed immediately when triggered from JavaScript by dispatchEvent/fireEvent.
