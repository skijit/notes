- [docs](https://www.learnrxjs.io/)
  - also has nice links to stackblitz examples
- [marble diagrams](https://rxmarbles.com/)
- [runnable examples from a pluralsight course](https://bitbucket.org/skijit/rxjs-examples/src/master/)
  - [said pluralsight course](https://app.pluralsight.com/library/courses/rxjs-operators-by-example-playbook/recommended-courses)
- rxjs6 introduced pipes

- Analogy:
  - An Observable is like a stream
  - Leaves are dropped into it, these are like the discrete values emitted by an observable
  - An Observer is something that takes action on an observable
  - Subscribe links an Observer to an observable
    - Sometimes when you subscribe, you're initiating the stream
    - Other times, the stream may already exist and you're just tapping into the progression of values
- A subscription sets up 3 functions to respond to the stream:
  - Value function: for each value
  - Error function
  - Complete Function: when stream is complete
- Type of Observables
  - Cold: Start when they get their first subscriber
    - Each subscriber gets their value from the beginning
    - "On Demand"
    - examples
      - File read
      - http request
      - db query
  - Hot: 
    - Only the value since the moment they subscribe
    - "In Progress"
    - examples
      - mouse
      - keyboard
      - system events
  - Important:
    - But you need subscribers for the stream to flow (i.e. through pipe())
    - It's like 'completing the circuit'
- Operators connect input and output
  - With the exception of tap(), they're all pure functions

- One of my big hangups might be in code like this:

```(javascript)
const source = Observable.create(observer => {
    observer.next('A');
    setTimeout(() => observer.next('B'), 100); // emitted at 100 ms
    setTimeout(() => observer.next('C'), 300); // emitted 200 ms later
    setTimeout(() => observer.complete(), 600); // emitted 300 ms later
});
```

  - **THIS 'observer' parameter SHOULD BE CALLED SOMETHING LIKE 'generator' or 'publisher'**

- Ways to create an observable:
  - `of`
  - `interval`
  - `timer`

- Other Generators:
  - `throwError`: doesn't generate an observable

- Pipe()
  - has operators, chained
  - 
- Subscribe
  - terminal
  - takes 3 methods: val, error, complete

## Buffering
- Use case: Take output from source observable and emit them in batches based on conditions
- Includes Buffer Operators and Window Operators
  - Buffers: emit an *array* of values
  - Windowing: emit an *observable* of values
- `buffer`: accumulates values piped into it, and dumps when it gets a signal sent to it (as an observable).  That signal can be any value: a number, an event, etc.
- `bufferCount`: accumulates values, we specify buffer size and it outputs when its full
  - optional second parameter lets you create a parallel buffer every X values (lets you have overlapping windows)
- `bufferTime`: just like bufferCount, but based on time instead of a buffer size
- `bufferToggle`: lets you specify when buffer is open or closed
  - again, based on other observables emitting their own values, but these could be based on time or events
- `bufferWhen`: accumulates values, but you pass in function which wil generate the observable (possibly using some conditional logic) 

## Error (Exception) Handling
- use cases: 
  1. Bury: Catch or handle errors
  2. Rethrow: Generate errors based on other errors
- remember these are operators, but the subscribe() has it's own error callback
- some of these operators catch errors, some of them generate errors
- `catchError`:
  - Pass-throuh on normal conditions
  - Catches an error, and will either:
    1. Fwd on the error
    2. Emit a new observable
  - Will catch if an exception is thrown straight-up or if you call a `throwError()`
- `throwIfEmpty`
  - throws an error if the observable sends the completion message without having emitted anything.
- `onErrorResumeNext`
  - you pass in another observable, which you switch to emitting if an error occurs in the primary one
  - BUT: it also switches over to the other observable if the original one completes
  - buries the exception
- `retry`
  - good for http calls - TODO: example code
  - only active when an exception is thrown
  - will get the observable to attempt to re-emit the same sequence (from beginning)
    - basically, it resubscribes
  - if after x retries, it just propagates the exception
- `retryWhen`
  - if an error occurs, it evaluates a passed in function to determine whether to resubscribe or not
- `timeout`
  - you specify an amount of time (or a date!), and if no new value has arrived, an error will occur
- `timeoutWith`
  - if the timeout occurs, instead of sending an error, switch over to a different observable

## Filtering Items
- use case: filtering
- `skipX` operators are very similar to the `takeX` operators
- `skip`
  - you provide the number of initial values to ignore, and they're dropped
- `skipLast`: ignore the last n emitted values
  - only works if the stream sends a complete message
  - otherwise is a passthrough
- `skipUntil`: ignore until a second observable emits
- `skipWhile`: you pass in a predicate and when it becomes false, you start lettin everything pass
  - only turns on the value the first time
- `take`, `takeLast`, `takeUntil`, `takeWhile`: analogous to corresponding skip operators
- `distinct`: helps you avoid emitting duplicate values
  - you can provide a function as a parameter
  - that function will return a *comparator* value 
  - `distinct(someObj => someObj.name)`
- `distinctUntilChanged`: emits only if the current value is not the same as the previous value
- `distinctUntilKeyChanged`: same as `distinctUntilChanged` but for objects
  - you have to specify a string referring to the property that acts as a key
  - `distinctUntilKeyChanged('myProp')`
- `filter`: emits when the predicate is true
  - applies to each value
- `sample`: emit *latest* when a signalled by another observable
  - for example, this could be based on a timer observable signal
- `audit`: similar to sample, but instead of taking an observable as a signalling parameter, it takes a function
  - this signaling function takes in the source observable's value and calculates based on that and returns it's own observable
  - when that calculated observable emits, the main stream is signalled and the latest value emits
- `throttle`: similar to audit, but emit the *next* when signalled

## Filtering to only 1
- use case: you want to filter down the values to only emitting 1 value (and then maybe unsubscribe or not)!
- `first`: emit first and then unsubscribes!
  - note there is no observable completion... it just unsubscribes.
  - also takes an optional predicate parameter
- `last`: emit the last, but note that this requires observable to complete
  - you can also pass in a predicate value here
- `min`
  - requires observable completion
  - you can pass in a predicate comparator
- `max`
- `elementAt`: emit value at an index (0-based)
- `find`: emit first where predicate is true, then unsubscribe
- `findIndex`: emits the **index** of first where predicate is true
- `single`: 
  - requires observable completion before emitting anything
  - emits 1 of 3 things:
    - first value matching the predicate
    - undefined: if no values cause the predicate to be true
    - error: if it sees more than one value which passes the predicate
      - so it's not unsubscribing like `first`

## Grouping Observables
- use case: you want to merge a couple different observables into a single stream
- `combineAll`: takes an observable of observables and emits the latest from each of those whenever a new value appears
  - emit whenever a new value arrives in one slot only if all slots are filled

```(javascript)
console.log('# latest values from all sources');
const source1 = of(1, 2, 3);
const source2 = interval(2000).pipe(take(3));
const source3 = of(4, 5, 6).pipe(delay(5000));
const source4 = of('a', 'b', 'c');

of(source1, source2, source3, source4)
    .pipe(combineAll())
    .subscribe(([val1, val2, val3, val4]) => {
        console.log(val1 + ' - ' + val2 + ' - ' + val3 + ' - ' + val4);
    });
// Output:
// 3 - 1 - 4 - c
// 3 - 1 - 5 - c
// 3 - 1 - 6 - c
// 3 - 2 - 6 - c
```

- `concatAll`: emit all the values from the first observable until it completes, meanwhile buffering values received from other observables, and when that first observable completes, start emitting values (buffered perhaps) from the second observable, until it completes, and then move to the next source observable. 
  - serially walk through each observables values until they complete
- `exhaust`: like a locking rule
  - the first source observable has access to the output stream: any other observables emitting until this first one completes will be dropped entirely.
  - any observables which begin emitting after the first source observable completes then get access to the output stream.
- `mergeAll`: emit all values from each observable
  - 'flatten'
  - you can specify the 'concurrency' in a parameter
    - if you specify it as 1, then it has the same behavior as concatAll
    - if you leave it blank, it matches however many inner observables you've subscribed to
- `withLatestFrom`: emit the latest from each internal source observable when signaled by another observable

## Grouping Values
- Use case: TODO
- `groupBy`: you pass in a group-key and as soon as it sees a new key value in the input stream, it emits a new GroupedObservable. 
  - GroupedObservable is the same as an Observable, but with a key value.
  - so you're fanning out into separate observables
you pass in a predicate and it forks the stream into two streams:
  - one with values which make the predicate true
  - one with values which make the predicate false
  - often used with `reduce()` to calculate subtotals