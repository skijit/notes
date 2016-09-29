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
    
    
- Observables emit events
- They do not contain reference to their corresponding observers
- Events are emitted over an event bus - decoupling observables from observers
- Rxjs gives you
    - the Observable framework
    - Custom data structures to deal with aynch streams of data


## Angular2 Examples
- [Source](http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/)
- Use Observables & AsyncPipe to set up a flow of data between components
- In this example, there will be:
    1. DumbComponent
        - Emits UI events to Smart Component
    2. SmartComponent
        - Connects to DataService
        - Gives directions to DumbComponent
- Dumb Component
    ```(typescript)
        import {Control, FORM_DIRECTIVES} from 'angular2/common';  
        import {Component, Output, Input, EventEmitter} from 'angular2/core';  
        import 'rxjs/Rx';

        @Component({
        selector: 'spotify-search',
        directives: [FORM_DIRECTIVES],
        template: `
            <h1>Spotify Search</h1>
            <input [ngFormControl]="searchBox" placeholder="Search Spotify artist" />

            <div *ngFor="#artists of results | async">
                {{ artists.name }} -- Popularity {{ artists.popularity }}
            </div>
        `
        })
        export class SpotifySearch {

            @Input() results: Observable<any>;
            @Output() searchEvent: EventEmitter = new EventEmitter();

            private searchBox:Control = new Control();

            constructor() {
                this.searchBox
                    .valueChanges
                    .debounceTime(200)
                    .subscribe((event) => this.searchEvent.emit(event));
            }
        }```
    - Has input property `results`, which is an observable
    - has a private Control called `searchBox` which is bound to the , 

     