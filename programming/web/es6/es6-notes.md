Promises in ES7 / TypeScript 1.7+ / Etc.
==============
- Easy way to test out all of this functionality is to create a js [codepen](https://codepen.io) and in the gear-icon, select the *babel* js preprocessor
    - Tip: to rerun your code use: Ctrl-Shift-5


## Arrow Functions
- It's a shorthand for anonymous functions
- Instead of:
```(javascript)
    [1, 2, 3].map(function (num) { return num * 2 })
    // <- [2, 4, 6]```

- We can use this:
```(javascript)
    [1, 2, 3].map(num => num * 2)
    // <- [2, 4, 6]```

- With more arguments, we can have this:
```(javascript)
    [1, 2, 3, 4].map((num, index) => num * 2 + index)
    // <- [2, 5, 8, 11]```

- With multiple lines, you use bracket notation and specify a return value:
```(javascript)
    [1, 2, 3, 4].map(num => {
    var multiplier = 2 + num
    return num * multiplier
    })
    // <- [3, 8, 15, 24]```

- In a single line fat-arrow function (i.e. not enclosed in a block / bracket notation), the expression that forms the function body is the same as the return value.
```(javascript)
    [1, 2, 3].map(num => num * 2)
    // Is Equivalent To...
    [1, 2, 3].map(function(num) { return num * 2; })```

- If you have to return an object literal, enclose it in parentheses:
```(javascript)
    [1, 2, 3].map(n => ({ number: n, something: 'else' }))
    /* <- [
    { number: 1, something: 'else' },
    { number: 2, something: 'else' },
    { number: 3, something: 'else' }]
    */```

- TODO: Clarify how fat arrow function's definition of *this* is improved relative to other anonymous functions
- [Source](https://ponyfoo.com/articles/es6-arrow-functions-in-depth)


## Object Literal Features
- Shorthand for when the property value matches the name:
    ```(javascript)
    module.exports = {
    getItem: getItem,
    setItem: setItem,
    clear: clear
    }```
    
    - Becomes....
    ```(javascript)
    module.exports = { getItem, setItem, clear }```
    
- **Computed Property Names**: You can set a property name dynamically (with an expression):
    ```(javascript)
    var foo = 'bar'
    var baz = { [foo+2]: 'ponyfoo' }
    console.log(baz)
    // <- { bar2: 'ponyfoo' }```
    
- [Source](https://ponyfoo.com/articles/es6-object-literal-features-in-depth)


## Spread Operator 
- '...' : Gives you a way to expand an expression in various contexts.
- The expression should be an iterable object.
- Example: **function calls**
```(javascript)
    function myFunction(v, w, x, y, z) { }
    var args = [0, 1];
    myFunction(-1, ...args, 2, ...[3]);```
    
- Example: **array literals**
```(javascript)
    var parts = ['shoulders', 'knees'];
    var lyrics = ['head', ...parts, 'and', 'toes']; 
    // ["head", "shoulders", "knees", "and", "toes"]```
    
- Example:  **destructuring**
```(javascript)
    let [a, b, ...rest] = [1, 2, 3, 4, 5]
    console.log(a); // 1
    console.log(b); // 2
    console.log(rest); // [3, 4, 5]```
    
- Do not confuse with rest paramter 


### Rest Parameter
- If you recall, there's a pseudo-array object available to functions called ```arguments```.
    - This captures all arguments passed to a function, beyond those that are named parameters
- Rest parameters are a similar idea except that they are an actual array.
- Rest is not a keyword: you can name your rest parameter anything.
- Example:
```(javascript)
    function myFirst(first, ...allElse) {
    console.log(first);
    console.log('---');
    console.log(allElse);
    }
    myFirst('foo', 'me', 'do', 'cow');
    //foo
    //---
    //["me", "do", "cow"]```


## Iterators
- [Source](https://ponyfoo.com/articles/es6-iterators-in-depth)
- When your object follows the **iterable convention**, you can iterate (enumerate) it with the following methods:
    1. A ```for..of``` loop
    ```(javascript)
    for (let cur of myCollection) { console.log(cur); } ```
    
    2. The spread operator
    3. Cast to an array with Array.from()
- Some objects which are inherently iterable:
    1. Arrays
    2. generators
    3. DOM node collections from .querySelectorAll
    ```(javascript)
    elementList = document.querySelectorAll(selectors);  
    //where selectors is any CSS3 selectors separated by commas```
    
- 2 ways to cast an iterator into an array:
    1. Use Array.From()
    ```(javascript)
    let myArray = Array.From(myIterable);```
    
    2. Use the Spread Operator
    ```(javascript)
    let myArray = [...foo];```
     
- **Iterable**: has a \[Symbol.iterator\] value (which is a function)
- **Iterator**: has a ```next()``` method
- How to follow the iterable convention:
    - Example code:
    ```(javascript)
    var foo = {
        [Symbol.iterator]: () => ({
            items: ['p', 'o', 'n', 'y', 'f', 'o', 'o'],
            next: function next () {
            return {
                done: this.items.length === 0,
                value: this.items.shift()
            }
            }
        })
    }```
        
    - You assign a function to a Computed Property called ```Symbol.iterator```
        - The js interpreter will be responsible for evaluating this to the proper property name
        - Typically that property name is ```@@iterator``` but we would never have to know this
    - You define a ```next()``` method which returns an object with 2 properties:
        1. ```done```: true if at end of sequence, else false
        2. ```value```: the next object in the sequence
- The big win with iterables:
    - Same benefits as an enumerator: your client code doesn't have to know how to traverse the object
    - Lots of new language features and libraries leverage this stuff 
        - TODO: expand on the new language features that utilize iterables


## Generators and Yield

### Nutshell
- Generators and Yield work together to provide:
    - A separate (bidirectional) channel of communication between caller and callee that is NOT based on the conventional parameter/return value. 
        - That's mostly yield's contribution.  
    - A framework to partition/segment a function into groups of contiguous code, and allow the caller of that function to iterate over the collection of partitions/segments, executing and exchanging data with each one.

### Examples
1. Trivial Example
    ```(javascript)
    function* myFirstGenerator() {
    console.log('Hi!'); // (A)
    }

    var gen = myFirstGenerator(); // Save a reference to the generator object
    gen.next(); // This executes line (A)```

- function has to be defined with an asterisk (e.g. function*)
- Executing the *generator function* results in the creation of a *generator object*, not the invocation of the containing code.
- The *generator object* can be used to execute the *generator function's* code by treating it like an iterable (i.e. calling next())

2. Yield statements are the dividing line for each generator's partitions/segments.
    ```(javascript)
    function* doSomething() {
        console.log('1');
        yield; // Line (A)
        console.log('2');
    }

    var gen1 = doSomething();

    gen1.next(); // Prints 1 then pauses at line (A)
    gen1.next(); // resumes execution at line (A), then prints 2```

3. Yield statements are also a bidirectional channel between caller and callee as the partition/segments are iterated/executed.
    - With one yield statement:
    
    ```(javascript)
    function* doSomething() {
        var v = yield; // Pause execution, wait for the next() invocation.
        console.log(v);
    }

    var gen1 = doSomething();

    // This makes the generator pause at the yield
    gen1.next();

    // This resumes execution and replaces the 'yield' placeholder
    // with the argument being passed - 'Hola'
    gen1.next('Hola');```

    - With multiple yield statements:
    ```(javascript)
    function* printTwoThings() {
        var val = yield;
        console.log(val);

        val = yield;
        console.log(val);
    }

    var gen = printTwoThings();

    gen.next(); // Start the function execution
    gen.next('hello'); // First yield
    gen.next('world'); // Second yield```
    
    - Bidirectional Communication
    ```(javascript)
    function* doSomething() {
        // This sends 'hello' to the caller and pauses execution
        // of this function until next() is invoked
        yield 'hello';

        // This sends 'world' to the caller and pauses execution
        // of this function until next() is invoked
        // Notice the two-way communication happening at this point
        var lastInput = yield 'world';

        console.log(lastInput);
    }

    var gen2 = doSomething();
    // This prints out the value returned at the first yield and pauses
    console.log(gen2.next().value); // Prints 'hello'

    // This resumes execution after the first yield until the next
    // yield is encountered
    console.log(gen2.next().value); // Prints 'world'

    // This resumes execution after the second yield but there is 
    // nothing more to execute
    gen2.next('The end.');```
    
    - Note that you never pass in parameters to the first next() because there is no yield to pull those values in.
        - (bc the first yield is only reached at the END of the first next() - not the beginning)
    
4.  Use yield as a generator function, yield\*, to yield other iterables (including generators)
    - Yielding an array
    ```(javascript)
    function* doSomething() {
        yield* ['hello', 'world'];
    }

    var gen = doSomething();

    console.log(gen.next().value); // Prints 'hello'
    console.log(gen.next().value); // Prints 'world'```
    
    - Yielding another generator
    ```(javascript)
    function* generatorFoo() {
        yield 1;
        yield 2;
    }

    function* generatorBar() {
        // First Create the generator object by invoking the function
        // then yield it.
        yield* generatorFoo();
        yield 'I am bar!'
    }

    var genObj2 = generatorBar();
    // Iterate on the generator object directly that in itself yields
    // the values of another generator
    console.log(genObj2.next().value); // Prints 1
    console.log(genObj2.next().value); // Prints 2
    console.log(genObj2.next().value); // Prints I am bar!```

5. Since a generator is an iterable, you can use other methods to iterate over it.
    - For..in : 
    ```(javascript)
    function* generator () {
        yield 'p'
        console.log('o')
        yield 'n'
        console.log('y')
        yield 'f'
        console.log('o')
        yield 'o'
        console.log('!')
    }
    var foo = generator()
    for (let pony of foo) {
        console.log(pony)
        // <- 'p'
        // <- 'o'
        // <- 'n'
        // <- 'y'
        // <- 'f'
        // <- 'o'
        // <- 'o'
        // <- '!'
    }
    ```
    
    - Spread (...) :
    ```(javascript)
    function* generator () {
        yield 'p'
        console.log('o')
        yield 'n'
        console.log('y')
        yield 'f'
        console.log('o')
        yield 'o'
        console.log('!')
    }
    var foo = generator()
    console.log([...foo])
    // <- 'o'
    // <- 'y'
    // <- 'o'
    // <- '!'
    // <- ['p', 'n', 'f', 'o']
    ```
    
    - Or you could use Array.from()
    
    
### Generalizations
- A generator object is built using the corresponding generator function.
- The generator object is an **iterable** AND **iterator**
    - It iterates over itself
    - It has it's own next() function which is the same as it's \[Symbol.iterator\] (aka @@iterator) property
- State / Context is maintained in generators across suspension / resumption
- The 4 events that suspend execution in a generator:
    1. A yield expression
    2. a return statement (which sets done: true)
    3. a throw statement which halts generator execution entirely
    4. reaching the end of the generator function (i.e. no return statement) (which sets done: true)
- Yield can only be used inside the scope of the generator.
- [Source](http://javascript.tutorialhorizon.com/2015/08/19/getting-started-with-es6-generator-functions/), [Source](http://javascript.tutorialhorizon.com/2015/09/16/generators-and-yield-in-es6/), [Source](https://ponyfoo.com/articles/es6-generators-in-depth)
- TODO: read end of [this](https://ponyfoo.com/articles/es6-generators-in-depth)
- TODO: read about [generator applications](http://www.2ality.com/2015/03/es6-generators.html)

## Promises

### Background
- In javascript, the typical way to handle asynchonous actions is via a callback model.  
    - Other approaches include:
        - the new asyc/await
        - js event model
- Promises is a convention / API to simplify the callback approach
    - It allows you to build (chain) a linear sequence of both sync AND async actions.
    - At each stage in a chain, data can be exchanged and branching operations (e.g. error handling, control flow) are possible.
    - This **improves the readability** problems associated with the typical (deeply-nested) callback approaches ('callback hell', 'christmas tree')
- Other Benefits of Promises:
    - Same client API for async and sync operations
    - You can 'multicast' handlers to the completion of some action
    - It provides mechanisms to handle dependencies between sequences or concurrent actions (e.g. only after n asynch actions complete, execute this other action)  
- There are various implmentations of Promises.
    - jQuery had it's own implementation
    - ES6 provides it's own ```Promise``` class (spec aka Promise/A+)
    - These notes only discuss Promise/A+
stitch together sequences (with branches) of sync and async actions using the callback model

### Basic Design
- Promise = a proxy (or wrapper) for a *value*
    - could be a literal value
    - could be a value that is returned by a function
    - function could be sync or async
    - in a nutshell: that *value* could exist or be yet to be determined (bc it's waiting on an async execution to finish)
- Promise States:
    - pending : the *value* doesn't exist yet
    - fulfilled : (final state) the *value* exists and was determined without error
    - rejected : (final state) an error was encountered while trying to determining the *value*
    - resolved : same as fulfilled 
    - settled : any final state- either fulfilled or rejected
- A Promise whose *value* is a literal value or can be eval'ed by executing sync code will be settled as soon as it is instantiated.
- Conversely, a Promise object whose *value* requires the completion of some async code will have a state of pending, until the return value is provided, at which point it becomes settled.
- Promise Chaining
    - A Promise object exposes methods (```then``` and ```catch```) which take functions (aka handlers) as parameters:
        - ```then(onFulfillment(value), onRejection(value))``` and ```catch(onRejection(value))```
        - These handlers execute when the the Promise they're attached to is settled.
    - The return value of ```then``` and ```catch``` are new Promises, whose *value* is the returned value of the handler(s).
        - Could be void if the handler only executes a ```console.log(whatever)```
        - Could be an object returned by the handler
        - Could be another Promise object wrapping
    - Since ```then``` and ```catch``` are all returning Promises (wrapping different values), you can chain them into a sequence.  ```(javascript)
    doTask  .then((rv) => { ... }, (errVal) => { ... })
            .then((rv) => { ... }, (errVal) => { ... })
            .catch((errVal) => { ... };```
- In the previous example any of the handler bodies could involve sync or async actions.
- The reason that sync and async actions can be chained seamlessly like this is because Promise wraps a *value* that could be known (in which case the Promise settles quickly) or yet-to-be-determined (in which case the Promise will be initially *pending* ). 

### Detailed Design
- Things that return Promises:
    - Promise constructor
        - ```new Promise((resolve, reject) => { ... })```
        - The only parameter passed to the constructor is a function. (called the 'executor')
        - It has a body and 2 parameters:  
            - Function body ({ ... }):
                - This is where you put the code that will either sync or async determine a final value.
            - Function parameters:                        
                - ```resolve``` 
                    - a function injected by Promise.  
                    - Call this in the function body to mark the current Promise as resolved.
                    - The fundamental *value* (presumably determined by the execution of the function body) that the Promise is a proxy to is passed as a parameter: ```resolve(value)```
                    - This value is then shared with subsequent ```then()```'s
                - ```reject``` 
                    - same idea, 
                    - it's a function injected by the Promise
                    - invoked in the function body to settle the Promise as rejected.
                    - You can pass a value to reject like ```reject(err.mesg)```
    - then()
        - ```then(function(value) { ... }, function(value) { ... })
        - 1st parm: fulfilled
            - type: function  or null
            - param: value associated with the promise (from calling resolve(value))
            - executed whenever it's associated Promise is fulfilled
            - return value is a new Promise whose corresponding *value* is whatever the handler returns:
                - could be a literal, void, value determined by executing a sync or async action
        - 2nd parm: rejected
            - type: function or null
            - param: an error message
            - executed whenever it's associate Promise is rejected
            - return value is a new Promise - same scenario as with parm 1
    - catch()
        - ```catch(function(data) = { ... })
        - 1 parameter: rejected
            - type: function
            - param: err mesg associated with the promise when being rejected (from calling rejected(value))
            - executed whenever the associated promise is rejected
            - return value is a new Promise whose corresponding (value* is whatever the handler returns (as with ```then()```)
    - Promise.resolve(*value)
        - Shortcut for the constructor where you want to immediately resolve the returned Promise.
        - *value* can be a literal value or another Promise
    - Promise.reject(reason)
        - Shortcut for the constructor where you want to immediately reject the returned Promise
- Ways to settle a promise
    - In the constructor:
        - resolve(value)
        - reject(value)
    - In a ```then``` or ```catch``` handler:
        - return a value -> will mark as fulfilled
        - throw an error -> will mark as rejected (triggering any attached ```catch()``` handlers
        - **Note**: this means that Promises are by default settled as fulfilled **unless** you explicitly throw an error.
- Avoiding Race Conditions 
    - Even if a Promise is settled when a then/catch handler is attached, they will be immediately executed.
    - This is to prevent a race condition between the execution of the Promise's task and the attaching of handlers.
- Chains of asynch:
    - when a .then(resolve, reject) returns a new Promise, it is based on the return value, of the called handler:
        - if a non-promise value, the promise is immediately resolved with the value
        - if the value is a promise, then the returned value is that new Promise (presumably, unsettled)
- You can resolve a promise with another promise.
    - Here p2 is only totally resolved once p1 is settled, but since p1 is a rejection, only the error handler will be called. (not the .then())
    ```(javascript)
    var p = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000)
    })
    var p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p), 1000)
    })
    p2.then(result => console.log(result))
    p2.catch(error => console.log(error))
    // <- Error: fail``` 

- Promise.All(iterable_of_promises)
    - basically for aggregating a bunch of promises together and having .then()/.catch() available when all are completed
    - use this when you want to have a .then() chained to a series of actions which all need to occur first
    - note that if any of them fails, then the resulting promise will be rejected
    - returns an array of all the return values

- Promise.Race(iterable_of_promises)
    - Similar to Promise.All, but the returned promise is resolved when the first promise resolves

- [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Source](https://ponyfoo.com/articles/es6-promises-in-depth)

**TODO**: More Promise Code examples


