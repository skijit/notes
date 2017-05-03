rx.js
===================
- rxjs is the javascript implementation of the [ReactiveX API](http://reactivex.io/) 
    - similar libraries exist for tons of other [languages](http://reactivex.io/languages.html)
- **Sources**:
    - [rxjs - angular2 blog](http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/)
    - [reactiveX](http://reactivex.io/)
    - [intro to reactive programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

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
    
    
- Observables are wrappers for values that emit 3 kinds of events:
    1. Next
    2. Error
    3. Complete
- Observers are listeners to the Observable which have handler functions for each of those three events:
    1. next()
    2. error()
    3. complete()
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
        <input [ngFormControl]="searchBox" 
          placeholder="Search Spotify artist" />

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
    - Has input property `results`, which is an observable.
        - Its value comes from the parent (smart) component.
        - The template subscribes to it via the `async` pipe.  Any updates will be reflected.
    - has a private Control called `searchBox` (another observable), which emits an event for each change 
- Smart Component
    ```(typescript)
    import {Http} from 'angular2/http';  
    import {Component} from 'angular2/core';  
    import {Input, Output, EventEmitter} from 'angular2/core';  
    import 'rxjs/Rx';  
    import {Observable} from 'rxjs/Observable';  
    import {SpotifySearch} from './services/Search';

    @Component({
        selector: 'app-root',
        directives: [SpotifySearch],
        template: `
            <spotify-search 
            (searchEvent)="onSearch($event)" 
            [results]="data">
            </spotify-search>
        `
    })
    export class AppComponent {  
        private data: Observable;
        private dataObserver: Observer;

        constructor(private http: Http) {
            this.data = new Observable(observer => this.dataObserver = observer);
        }

        onSearch(event) {
            this.http.get(
                'https://api.spotify.com/v1/search?q=' + event + '&type=artist'
            ).map((response) => {
                var artists = response.json();
                return artists.artists.items;
            }).subscribe(result => {
                this.dataObserver.next(result);
            }, error => console.log('Could not load artists'));
        }
    }```
    - The dataObserver is the object responsible for generating values that will be emitted through the Observable.
    - We need an explicit reference to push through any data to that Observer (and any subscribers)

## Non-Angular Examples
- observable = stream = subject
- observer = subscriber = listener
- rx gives you the streams, plus the api for modifying/aggregating/etc the streams (based on a functional programming approach).
    - each such call returns a new stream bc streams are **IMMUTABLE**
- Creating an observable and emitting a single value
```(javascript)
    var requestStream = Rx.Observable.just('https://api.github.com/users');```
- Creating an observable manually
```(javascript)
    var myStream = Rx.Observable.create(function (observer) {
        var emittedValues = doSomethingToGenerateValues();
        
        if (thatWorked) {
            observer.onNext(emittedValues);
        } else if (weDone) {
            observer.onCompleted();
        } else {
            observer.onError(someError);
        }
  });
  ```
  - A little surprising that we don't call something like `this.Publish(emittedValues)`
  - But remember that `observer` is not a direct reference to a single subscriber
    - It's injected in by the Observable
    - `onNext` does seem like an appropriate method to be calling on the observer, since it's like an event targeting the observer.
- Transforming a stream to become a MetaStream (ie a stream of streams)
```(javascript)
    var responseMetastream = requestStream
    .map(function(requestUrl) {
        return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
    });
```
    - `map()` is performing the behavior of a `subscribe()` and a typical `Array.map()`
    - Promises (from jQuery or ES6) are Observables that emit one value, so it's easy to convert them into actual streams using `fromPromise()`.
- If you don't want a MetaStream, you can use flatmap:
```(javascript)
    var responseStream = requestStream
    .flatMap(function(requestUrl) {
        return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
    });
```
    - `flatMap()` won't emit branching streams, it just flattens everything onto the input trunk
- A simple response/request stream flow
```(javascript)
    var requestStream = Rx.Observable.just('https://api.github.com/users');

    var responseStream = requestStream
        .flatMap(function(requestUrl) {
            return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
        });

    responseStream.subscribe(function(response) {
        // render `response` to the DOM however you wish
    });
```
- Updating the request stream based on a JavaScript DOM click event, and defining a startup value
```(javascript)
    var refreshButton = document.querySelector('.refresh');
    var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

    var requestStream = refreshClickStream
        .startWith('startup click')
        .map(function() {
            var randomOffset = Math.floor(Math.random()*500);
            return 'https://api.github.com/users?since=' + randomOffset;
        });
```
    - `startWith()` emits an initial value
    - `merge()` can also be used to merge two streams (use in fluent syntax or normal)

## Misc Useful 
- switchmap(): allows you to perform an action with the current value of the Observable, and map it to a new Observable. 
    ```(typescript)
    ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.service.getHero(+params['id']))
            .subscribe((hero: Hero) => this.hero = hero);
        }
    ```
- flatmap(): See code from confoo training...

## Course Notes
- [Pluralsight Course](https://app.pluralsight.com/library/courses/reactive-programming-rxjs-getting-started/table-of-contents)
- [docs](http://reactivex.io/rxjs/)
- All about asynch programming: waiting for events and reacting
- Some npm packages to know:
    - webpack-dev-server is a good alternative to lite-server
    - ts-loader helps webpack work with typescript
    - `node+modules\.bin\typeings install dt~es6-shim --global --save` to load up the ES6 typings file (so ts knows about ES6 classes like Set, Map, etc.)
- Notes about webpack configuration
    - webpack.config.js
        - specify an entry point
        ```(json)
        module.exports {
            entry: "./main",
            output: {filename: "app.js" },
            //loaders process different types of files differntly and give webpack the output to include in the output bundle
            module: {
                loaders: [
                    {
                        test: /.ts$/,
                        loader: "ts-loader"
                    }
                ]
            },
            //resolve tells webpack which files it should look at 
            resolve: {
                extensions: ["", ".ts", ".js"]
            }
        }
        ```
    - npm scripts
        - start: `webpack-dev-server --watch --inline`
        - postinstall: `typings install`
- Choosing Operators:
    - [Operators By Category](http://reactivex.io/documentation/operators.html#categorized)
    - [Decision Tree for Oeprators](http://reactivex.io/documentation/operators.html#tree)

### Basic Observers
- Here's a formal approach to building an Observer on an Observable

```(typescript)
//observer is an interface
import { Observable, Observer } from "rxjs";

//there are lots of methods available on Observable class, like create()
//from() lets you pass in a Subscribable<T>, Promise<T>, or an ArrayLike<T>
let numbers = [1, 5, 10];
let source = Observable.from(numbers);

//to subscribe, you pass in an observer to source.subscribe()
//but here's a more formal way of creating an observer...

class MyObserver implements Observer<number> {
    
    //An Observer needs 3 methods...

    //This is invoked on the Observer by the Observable 
    //when there is a new value available
    next(value) {
        console.log(`value: ${value}`);
    }

    //if an exception is encountered, the Observable will
    //invoke the error() method
    error(e) {
        console.log(`error value: ${e}`);
    }

    //if the Observable sequence completes / is exhausted,
    //then complete() will be called. 
    //This doesn't always happen, some streams last "forever"
    complete() {
        console.log(`complete!`);
    }
}

source.subscribe(new MyObserver);

//OUTPUT will be:
//value: 1
//value: 5
//value: 10
//complete
```

- You can have multiple subscribers to the same observable
- Here's a less formal way of setting up an Observer

```(typescript)
source.subscribe(
    //next()
    value => {
        console.log(`value: ${value}`);
    },
    //error()
    e => {
        console.log(`error value: ${e}`);
    },
    //complete
    () => {
        console.log(`complete!`);
    }
);
```

### Basic Observables

- Using the create() method...

```(typescript)
let numbers = [1, 5, 10];

//create takes an observer as parameter, so we
//can interact with the observer directly.
//What does that mean?
//In the previous examples, we dont have control
//over the exact way in which the Observable
//invokes the methods provided by the Observer
//(next, error, and complete), but in this version
//we do have direct control over when those
//methods are called...

let source = Observable.create(observer => {
    for(let n of numbers) {
        if (n === 5) {
            observer.error("Something went wrong");
        }

        observer.next(n);
    }
    observer.complete();
});

source.subscribe(
    //next()
    value => {
        console.log(`value: ${value}`);
    },
    //error()
    e => {
        console.log(`error value: ${e}`);
    },
    //complete
    () => {
        console.log(`complete!`);
    }
);

//Output
//value: 1
//error value: Something went wrong!
```
- Invoking these steps over time...

```(typescript)
let numbers = [1, 5, 10];

let source = Observable.create(observer => {

    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 2000);
        } else {
            observer.complete();
        }
    }

    produceValue();
});
```

- RXJS Operators
    - Some Transform
    - Some Change timing
    - All composable
- Some Common Operators

```(typescript)
source
    .map(n => n * 2) //still in Observable-land
    .filter(n = n > 4); //still in Observable-land
```

- Tip: In VSCode, press f12 over the "rxjs" in the import statement and then pull in only the operators, classes you need

### Intermediate Observables

- Basic approach: Transforming things into Observable sequences of data
- DOM event -> Stream

```(typescript)
//make DOM mousemove events into a stream, transform to
//only keep the X,Y coordinates where x < 500, and then
//delay each sequence item 300ms.
let source = Observable.fromEvent(document, "mousemove")
                        .map((e : MouseEvent) => {
                            return {
                                x: e.clientX,
                                y: e.clientY
                            }
                        })
                        .filter(value => value.x < 500)
                        .delay(300);
```

- Server Data -> Stream (basic case)

```(typescript)
//button will get clicked, at which point the load method
//will get data and insert into document.
//only stream is the button click

let button = document.getElementById("button");
let output = document.getElementById("output");

let click = Observable.fromEvent(button, "click");

function load(url : string) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        let movies = JSON.parse(xhr.responseText);
        movies.forEach(m => {
            let div = document.createElement("div");
            div.innerText = m.title;
            output.appendChild(div);
        });
    });

    xhr.open("GET", url);
    xhr.send();
}

click.subscribe(
    value => load("movies.json"),
    e => console.log(`error value: ${e}`),
    () => console.log('complete!')
);
```

- Next version: refactoring a bit

```(typescript)

function load(url : string) {
    return Observabe.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            let movies = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
            
        });
    
        xhr.open("GET", url);
        xhr.send();
    
    });
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

//Option 1
//Using map... (returns an observable, but ...)
//The console output will be the OUTER
//observable, (from the button click) instead
//of the observable returned from load().
click.map(e => load("movies.json"))
        .subscribe(o => console.log(o));

//To subscribe to the inner observable
//returned from load(), we use flatmap()!
//But see the gotcha below!
click.flatMap(e => load("movies.json"))
        .subscribe(
            renderMovies,
            e => console.log(`error ${e}`),
            () => console.log("complete")
        );
);
//notice that the complete() is never called
//because that is not called on the outer
//subscription.  (see gotcha below)
```

- **BIG GOTCHA**
    - flatmap() is **not replacing** the outer Observable with the innter observable.
    - It is combining them such that the outer observable's values (from it's next() event) are combined into the outer observable.
    - That is why the inner complete() has no effect!
- Observerables are lazy
    - The code inside the `create()` is not called until someone has subscribed to it!
- Adding retry logic 
    - `retry()` operator
    - `retryWhen()` operator takes an observable (of the parent observables error() stream) and return an observable

```(typescript)
function load(url : string) {
    return Observabe.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                let movies = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }            
        });
   
        xhr.open("GET", url);
        xhr.send();
    }).retryWhen(error => {
        return errors
                .scan((acc, value) => {
                    //acc is the accumlated value, 
                    //value is the value (text) from the
                    //error observable
                    console.log(acc, value);
                    return acc + 1;
                }, 0)
                .takeWhile(acc => acc < 4)
                .delay(1000);
    });
}
```

- Observables and Promises
    - Promises only return a single value, but they're also part of the ECMA spec now
        - This would make using promises with certain event types (user clicks), very difficult 
    - Promises don't have the operator infrastructure
    - Basically Observables are a much more ambitious way of dealing with event (streams)
    - Promises, unlike Observables, are not lazy.  They'll execute independent of whether there are "subscribers" (or thenners?)
        - but see the second example to overcome this problem

```(typescript)
//using fetch (a new function that may be added to the browser specs),
//and the return value is a promise.
//we're going to use the promise api's then() method to do some transformation
function loadWithFetch(url : string) {
    return Observable.fromPromise(fetch(url).then(r => r.json));
}
```

- If you want to use the previous example but have it lazily executed, wrap it in Obserable.defer()

```(typescript)
function loadWithFetch(url : string) {
    return Observable.defer(() => {
        return Observable.fromPromise(fetch(url).then(r => r.json));
    });
}
```

### Error Handling

- Typical try/catch won't work
- If there's no error handler when an error occurs, an exception will be thrown (and perhaps not caught)

```(typescript)
let source = Observable.create(observer => {
    observer.next(1);
    observer.next(2);
    observer.error("Stop!");
    observer.next(2);
});

source.subscribe(
    value => console.log(`value: ${value}`)
);

//output is
//value: 1
//value: 2
//Uncaught Stop!
```

- `complete()` is typically not called if `error()` is called

```(typescript)
let source = Observable.merge(
    Observable.of(1);
    Observable.from([2, 3, 4]);
    Observable.of(5);
);

source.subscribe(
    value => console.log(`value: ${value}`)
    e => console.log(`error ${e}`),
    () => console.log("complete")
)

//output
//value: 1
//value: 2
//value: 3
//value: 4
//value: 5
//complete
```

- Now if there is an error in the middle...

```(typescript)
//so here you can "throw" an error, but it won't
//have the same repercussion as a thrown exception
let source = Observable.merge(
    Observable.of(1);
    Observable.from([2, 3, 4]);
    Observable.throw("Stop");
    Observable.of(5);
);

source.subscribe(
    value => console.log(`value: ${value}`)
    e => console.log(`error ${e}`),
    () => console.log("complete")
)

//output
//value: 1
//value: 2
//value: 3
//value: 4
//error Error: Stop
```
- To be able to complete the last sequence, use `onErrorResumeNext`
    - Basically lets you swallow any errors

```(typescript)
//so here you can "throw" an error, but it won't
//have the same repercussion as a thrown exception
let source = Observable.onErrorResumeNext(
    Observable.of(1);
    Observable.from([2, 3, 4]);
    Observable.throw("Stop");
    Observable.of(5);
);

source.subscribe(
    value => console.log(`value: ${value}`)
    e => console.log(`error ${e}`),
    () => console.log("complete")
)

//output
//value: 1
//value: 2
//value: 3
//value: 4
//value: 5
//complete
```
- Using catch lets you catch an error and branch

```(typescript)
//so here you can "throw" an error, but it won't
//have the same repercussion as a thrown exception
let source = Observable.onErrorResumeNext(
    Observable.of(1);
    Observable.from([2, 3, 4]);
    Observable.throw("Stop");
    Observable.of(5);
).catch(e => {
    console.log(`caught: ${e}`);
    return Observable.of(10);
});

//output
//value: 1
//value: 2
//value: 3
//value: 4
//caught: Error: Stop
//value: 10
```

- To generate an error in an Observable when converting from a Promise, just call the `Promise.reject()`
- Some operators lets you throw a real exception (Error) and it will be mapped to the `error()` event.
    - You just have to play/test with them to verify their behavior
- Unsubscribing
    - Calling unsubscribe will abort your request/stream
    - Just return an anonymous function from your Observable create() lambda

    ```(typescript)
    function load(url : string) {
        return Observabe.create(observer => {
            let xhr = new XMLHttpRequest();

            let onLoad = () => {
                if (xhr.status === 200) {
                    let movies = JSON.parse(xhr.responseText);
                    observer.next(data);
                    observer.complete();
                } else {
                    observer.error(xhr.statusText);
                }    
            }
        
            xhr.addEventListener("load", onLoad);
    
            xhr.open("GET", url);
            xhr.send();

            return () => {
                console.log('cleaning up!');
                xhr.removeEventListener("load", onLoad)
                xhr.abort();
            }
        })
    }

    let subscription = load("movies.json").subscribe(renderMovies, myErrorFunc, myCompleteFunc);
    subscription.unsubscribe(); 
    ```

## TODO
- [Review the rx list of combinator functions](https://github.com/Reactive-Extensions/RxJS/tree/master/doc#getting-started-with-rxjs)
- [Understand the hot/cold observable differences](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md#cold-vs-hot-observables)
- [Review this article about angular and observables](http://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html)


