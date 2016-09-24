rx.js
===================
- rxjs is the javascript implementation of the [ReactiveX API](http://reactivex.io/) 
    - similar libraries exist for tons of other [languages](http://reactivex.io/languages.html)
- **Sources**:
    - [rxjs - angular2 blog](http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/)
    - [reactiveX](http://reactivex.io/)

## Streams
- Essential rx mantra is **'Everything is a Stream'**
- rx is analogous to the observer pattern
    - publisher = observable
    - subscriber = observer
- *Stream* = observable
- Stream doesn't need to be a sequence / signal
    - It can just be a value which is periodically updated
- Stream Examples
    - An Autocomplete Search Field
        - Subscribe to changes, debounce input, and submit searches
    - A Data Service
        - Subscribe to methods, which return observables
- Benefits
    - **Communication Bus**: RX simplifies the overhead associated with propagating data changes through a sequence of hierarchical structures (like ng components).  Instead of setting up communication channels for components with their immediate ancestor/descendant, you can have them subscribe to observables returned by some services.  This combination is similar to an ESB.
     