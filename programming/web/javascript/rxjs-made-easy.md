RXJS Made Easy
========================

- Talk by Ward Bell at DevIntersection conference 12/2018
- https://github.com/wardbell/rxjs-in-ng-workshop
- [updated rxjs documentation](https://rxjs-dev.firebaseapp.com/guide/)
- TODO: Clarify/Review fundamental actors Observable, Subscriber, Subject based on this [documentation](https://rxjs-dev.firebaseapp.com/guide/overview)

## Intro
- problem that rxjs solves:
  - observables: communicating about change around an application
- sources of changing
  - sign-in / sign out
  - cache updated
  - animation finished
  - timer finished
  - button clicked
  - key pushed
  - mouse moved
- RxJs Observables have a domain-specific language for managing change
  - like LINQ
  - Or it's pub / sub gone crazee
- Angular API's which use (internally or return observables) rxjs:
  - HttpClient
  - EventEmitter
  - Async Pipe
  - Forms
  - Router

## Core Concepts
- Observable
- Subscribe
- Subject
- Operators

### Observable
- **OBJECT** that wraps a producer
- 3 "channels"
  - next 
  - error (teriminal state)
    - unsubscribes all subscribers too
  - complete (terminal state)
    - unsubscribes all subscribers too
  
  ```(javascript)
  //connects to a producer
  observable = new Observable(this.producer);

  //BIG GOTCHA: nothing happens until you subscribe
  //its ok if there are no args
  this.observable.subscribe(); 

  //3 functional parameters all corresponding to the 3 'channels'
  this.observable.subscribe(next, error, complete) 

  //you can also pass a subscriber object, which could be passed around
  subscriber = {
    next: () => {},
    error: () => {},
    complete: () => {}
  };
  this.observable.subscribe(subscriber); 

  //obserable creators
  array$ = of([1,2,3,4,5]); //this will give subscibers the whole array
  numbers$ = of(1,2,3,4,5);//not you get 5 values 
  numbers2$ = from([1,2,3,4,5]);//you get 5 values
  array$ = from(Promise.resolve([1,2,3,4,5]));  //very common, useful

  //other creators
  //fromEvent() (Dom event), timer(), many many more
  ```

### Observer
- **FUNCTION** that you pass to the Observable ctor
- this function is it's own producer of values  
- also same 3 channel methods
    
  ```(javascript)
  observable = new Observable(obs => {
    obs.next('blah');
    //...
  });
  ```

### Sanity Check: Observer vs Observable
- In the end, you want to subscribe to an Observerable
- There are two ways to create an Observable:
  - Wrapping it with observable creator functions like `of` and `from`
  - Injecting an Observer function to the Observable

## Chaining observables vs rxjs
  - each then you lose a tick bc it's async
    - this is not so with observables.
      - they're synchronous. 

## Subjects
- simplifies the Observable scenarios we've seen
- is an observer, so it has a next, error, complete channel
- it's also an observable, so you can subscribe and use operators
- its fundamentally multi-casted
  - you can do that with observables, but each subscribe() requires a new call
- subject types
  - Subject<T>
    - notifier
    - doesn't care about the past
    - new susbscribers wait for the next value
  - ReplaySubject<T>(bufferSize)
    - no initial value
    - remembers everything from the beginning of time, or as many values as the buffer size
    - new subscribers will get all the buffered values
    - ReplaySubect(1) is interesting/useful
  - BehaviorSubject<T>(intialValue)
    - Has initial value
    - fixed buffer size one item
    - subscribers will get a value as soon as they're subscribed
      - it's like a ReplaySubject with a buffer of 1 that you next'ed before anyone was looking
- subjects are useful for event bus'es
- keep in mind that the subject object should generally be private, bc otherwise, anybody could call next() on it.

## Operators
- input is an observable, output is a different observable
  - you could manipulate on the subscribe end (but that's the consumer side)
- there are tons of operators, but you only need a few
- when you don't know what to do, you can always just subscribe and change the value there
- most useful
  - map
  - tap
  - catchError
  - filter
  - concatMap
  - first: basically a snapshot
  - take
  - mergeMap
  - switchMap
  - shareReplay
  - finalize 
- You can easily write your own Operator
  
```(javascript)
//custom operator example
export const myCustomerObserverOperator = () => ({
  next(val:any) { /* code to do stuff */},
  error() { /* code to do stuff */},
  complete() { /* code to do stuff */ }
});
export const log = (o: Observable<any>) => o.pipe(tap(myCustomerObserverOperator)))
//now you can use this function called log() with pipe()
```

## Misc
- see subSink for easy unsubscribe - little snippet from Ward Bell
