TypeScript Workshop
===============
Notes from a workshop at Dev Intersections, Spring 2016, with Dan Wahlin and John Papa

- Some useful links:
    - [Slides](tinyurl.com/ES6-TS-Workshop)  *(google drive)*
    - [ES6 Samples](github.com/DanWahlin/ES6Samples)  *(github)*
    - [TypeScript Demos](github.com/DanWahlin/TypeScriptDemos)  *(github)*
    - [Pluralsight course on TypeScript](www.pluralsight.com/courses/typescript)

## Background

- Current version of JS: ES5
- Relationship of ES versions and Typescript:
    - ES6 / ES2015 are supersets of ES5
    - ES7 / ES2016 are supersets of ES6 / ES2015
    - Typesecript is a superset of ES7 / 2016
- Reasons to use Typescript:
    - Better Tooling / Compile-Time checking
        - Intellisense / Param hints / go to definition / ...
    - Future-features of JS
    - Debugging experience is good
        - In Chrome, you can debug directly on the TS code (remember to generate the source map)!
    - Less confusing use of **this** in many circumstances

## About Transpiling

- "Transpiling is the new Jquery"
    - IE the way to accommodate different browser implmentation-levels
    - Now that JS is on a yearly cadence, this is going to be even more so
- Note: MS is moving towards more support of nodejs: not so much for web apps, but for tooling support!
- Here's a sample TypeScript compiler configuration file, tsconfig.json:
    ```(json)
    {
            "compilerOptions": {
                "target": "es5", //this is the target to Transpile to
                "module": "system",
                "moduleResolution": "node",
                "sourceMap": true, //if you want to debug
                "emitDecoratorMetadata": true,  //use experimental features from ES6/7 (still transpiled to ES5 though!)
                "experimentalDecorators": true, //use experimental features from ES6/7 (still transpiled to ES5 though!)
                "removeCommments": false,
                "noImplicitAny": false, //turns on "implicit any" which means some things can be an "any" type.  setting to true is quite strict.
                "suppressImplicitAnyIndexErrors": true
                //If you set "allowjs":true, then you don't even have to rename your files to .ts, and the transpiler will work on them.
            }
    }```

## ES6 Features
- [Browser support URL](kangax.github.io/compat-table/es6)
- Babel, which is something totally different, transpiles ES6+ to ES5

### Classes

```(javascript)
class Auto {
    constructor(engine) {       //constructor
        this._engine = engine;
    }
    
    //getters!
    get engine() {
        return this._engine;
    }
    
    //setters
    set engine(val) {
        this._engine = val;
    }
    
    //method
    start() {    //LOOK!  doesn't require the "function"
        //...
    }
}```
    

### Module Import/Export
- Exporting from foobar.js
    ```(javascript)
    export var foo = 'foo';
    export var bar = 'bar';```
- Importing to another file
    ```(javascript)
    import { foo, bar } from 'foobar';  //note: doesn't require the .js at the end
    console.log(foo);
    
    //import everything and put in a namespace 'foobar'
    import * as foobar from 'foobar';
    console.log(foobar.foo);```
- Unlike ES5, symbols are no longer visible outside of their given compilation unit (i.e. file), UNLESS you export them.

### Maps:
- These are dictionaries (key/values), where keys must be unique
    ```(javascript)
    var map = new Map();
    map.set("finance", "Process bills");
    map.get("finance");
    console.log('size is ' + map.size);
    if (map.has("finance")) { .. }
    map.delete("finance");
    map.clear()```

### Sets:
- Stores a collection of items, where items must be unique
    ```(javascript)
    var set = new Set();
    set.add("finance");
    set.add({name: 'GIT', desc: 'Mapping'});
    console.log('size is ' + set.size);
    if (set.has("finance")) { .. }
    set.delete("finance");
    set.clear()```

### Arrow Functions
- Lambda syntax for anonymous functions
    - ```var myLogger = function(msg) { return console.log(msg); }```
    - is equivalent to...
    - ```var myLogger = msg => console.log(msg);```
- Some syntactical [rules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
    - If the body is not enclosed in { }, then only a single statement is permitted and this is assumed to be the return value.
    - A function with no params requires parens: ```() => { statements }```
    - Parens are optional if there's only one parameter ```singleParam => { statements }```
    - rest and default params are supported
    - See link above for destructuring and returning object literals and other advanced stuff.
    
### Template Strings
- Can do multi-line
- Enclose in single back-tick
    ```(javascript)
    return `
        ${this._make}, ...
        `;
    ```

### Destructuring
- like in matlab
- these are really useful with import statements
    ```(javascript)
    var {total2, tax2} = { total: 9.99, tax: 0.50};
    
    //you can ignore specific members
    var [red2, , green2] = ['red', 'yellow', 'green'];```

### Default Parameters

```(javascript)
function setDetails(make = 'None', model = 'None') { ... }```

### ...Rest parameters
- Rest Parameters (ie 'Rest of')
- rest is *not* a reserved word
    ```(javascript)
    function setDetails(make = 'No Make', ...accessories) {
        //accessories is an array you can walk through
    }```

## Typescript Features

- A lot of times with Typescript, you might be actually just leveraging ES6 features, but TypeScript also has a lot of functionality offer on it's own- namely it's Type System
- This Type System is actually not so much a runtime thing, but a design-time thing to help you catch bugs in development.

### Background
- typescript compiler:
    - tsc (the type script compiler) can run in the browser or at build time
    - make sure you get the official type script compiler from microsoft
    - particularly when you're on npm, you might get the wrong if you search for 'tsc': don't do it!
        - it has to be called 'typescript' not a package called 'tsc'    
    - can be automated via Gulp/Grunt
- [Homepage](http://www.typescriptlang.org/) (with a playground)
- [definitelytyped.org](definitelytyped.org) has type definitions for various libraries

### TypeScript Types
- These are the primitive types, and reserved words in TypeScript:
    - number
    - boolean
    - string
    - array
    - any
    - void
- These can be used for varible declarations, parameters, return types, etc.
- Some examples of the type system...
    ```(typescript)
    var age: number = 5;
    var pets: string[] = ['fido', 'lassie'];
    
    //use of default parameter
    function showName(n: string = 'Dan') {
        console.log(n);
    }

    //shows the return type
    var add = function(x: number, y: number) : number {
        return x + y;
    }
    
    //use w/ arrow functions
    var add = (x: number, y: number): number => x + y;
    
    ```

### Union Types
- Use this, for example, you're not sure if want to pass in a string or an array...
    ```(typescript)
    function showName(n: string | string[]) {
        if (typeof ...) {
            //...
        }
    }```
- Also can minimize the number of function overloads you have to create.

### Enums
- Example: ```enum Gender { Female, Male }```
- **TIP**: A lot of times, you will just use a const, e.g. ```const enum Gender { Femail, Male}```, and this will result in more sleek javascript...
- An interesting use of enums is with bit flags: very expressive.  See [this](https://basarat.gitbooks.io/typescript/content/docs/enums.html)

### Optional Parameters
- you just add a trailing question mark, but the optionals have to come after the required params
    ```(typescript)
    var b = function(id?: string) {
    //...
    }```

### Default parameters
- Supported just as with ES6
- Be sure to put them after all required parameters

### Rest parameters
- Supported just as with ES6
- Example...
    ```(typescript)
    function buildAddress(city: string, ...restOfAddress: string[]) {
        //...    
    }```
    
### Lambdas and Using **this**
- **this** can often change depending on the context of the caller
- See [this](https://basarat.gitbooks.io/typescript/content/docs/arrow-functions.html) ref
- Not sure if this is a feature of Typescript or ES6, though...
- you don't have to do self = this, then reference 'self' inside a nested function.

### Const system
- This part is kinda troublesome... be careful
- const is semi mutable: you can't change the outer reference, but you can change stuff on the inside.
    ```(typescript)
    const y = {
        name: 'dan';
    }
    y.name = 'tom';  //this is ok
    y = 1;  //this is not ok!```

### Class Example:
- Notice in particular the use of accessibility modifiers / autoproperties in the constructor parameters 
    ```(typescript)
    class Person {

        private id: number = 2;  //initializes this value

        constructor(public age: number, public firstName: string, public lastName: string) {
            //SHORTHAND TIP: adding the modifiers (public, private) on to the params assign to the corresponding properties automatically! 
        }

        age: number;
        firstName: string;
        lastName: string;
        
        fullName() {
            return `${this.firstname} ${this.lastName}`;
        }
        
    }
    var person = new Person(66, "Tom", "Johnson");
    var fullName = person.fullName();
    ```

### Inheritance
```(typescript)
class Customer extends Person {
    constructor(public shopperNumber: number) {
        super(2, '', '');  //NOTE: YOU HAVE TO CALL THE BASE CLASS'ES CONSTRUCTOR WITH 'super'
    }
}

var person2 = new Customer(6)```

### Interfaces
- Example...
    ```(typescript)
    interface IAccountInfo {
        routingNumber: string;
        bankNumber: string;
    }

    class BankingAccount {
        get accountInfo() : IAccountInfo {
            return {
            routingNumber: Constants.ROUTING_NUMBER;
            bankNumber: Constants.BANK_NUMBER;   
            }
        }
    }
    var acct = new BankingAccount();
    var info: IAccountInfo = acct.accountInfo();```

- Another good use case is to use an Interface for those big, confusing settings objects which have any number of properties... now you can define an interface for them.
- interfaces generate no javascript, but they're great for the tooling.
- the type definition files in definitinlytyped are usually just interfaces
- interfaces can extend other interfaces... using the 'extends' keyword
- to install typings from npm you use the command **typings**, i.e ```typings install xyz```
    - [here's](https://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html) how the compiler will try to automatically do it
    - [here's](https://www.npmjs.com/package/typings) how to run from CLI / npm

### Generics
- helps you get away from using "any" types
    ```(typescript)
    //in a class...
    class List<T> {
        _items: T[] = [];
        
        add(item: T) {
            this._items.push(item);
        }
    
        getItems(): T[] {
            return this._items;
        }
    }
    
    //in a function...
    function processData<T>(data: T) {
        ...
    }

    processData<number>(50);
    
    //generic constraints ok also
    class List<T extends IAccount> {
        //...
    }
    ```
- you can use generics on functions and interfaces too!

### Namespaces
- This is different from module loading
- This is a typescript-only thing
- Basically, this is just a way to avoid putting things in the global scope
- old school way was this...
    ```(javascript)
    var myNS = myNS || {};
    myNS.object = ...```
- new way looks like this...
    ```(typescript)
    namespace {
        //...
    }```
- the compiled code creates an IIFE
- DO NOT USE HIERARCHICAL NAMESPACES IF THEY'RE SEPARATED BY .'s (like C# -- the generated code is crazy)
- if you need to access something inside a namespace, you need to export them.
- so, it's a pretty limited set of functionality but if you're not ready for module loading, then namespaces is a good way to get started.

### Module Loading
- Module Technology Background
    - Two original approaches
        -AMD
            - asynch / non-blocking
            - require.js
        Common.js
            - preferred by node
            - easier to read
            - rigorous standard has morphed into 'however node does things'... **unclear?!**
    - However, both **died** and were replaced with ES6 module system...
        - syntactically similar to common.js
        - most browsers, if not all, do not support ES6 modules directly (see [here](kangax.github.io/compat-table/es6) ), so you need a transpiler to use them
    - Angular2 uses system.js which works on all module formats
        - Looks like system.js works on IE11, BUT since it doesn't fully support ES6, you need to include the following polyfill: es6-shim.js
- Things Namespaces don't solve but modules do:
    - loading order
    - dependencies
- name of the file becomes the name of the module
- when you factor out your code into lots of different file... it would just become so much more complicated to figure out the order of loading.
- Typescript 1.5+ supports the ES6 module syntax:
    - Import code:
        ```(typescript)
        import * as Math from "my/math";
        import { add, subtract } from "my/math";```
    - Export code (from my/math.ts)
        ```(typescript)
        export function add (x, y) { return x + y}```
- Time saving trick: You can put a bunch of module files in a folder, and there's a syntax to load all from that folder.  
    - This is called a 'Barrel'.
    - You have to create an index.ts (just a convention) in the folder and put in:
    ```(typescript)
    export * from './accountList'
    export * from './checkingAccount'
    //...```
    - And then when you use them, just do this:
    ```(typescript)
    import { AccountList, CheckingAccount, SavingsAccount } from './accounts/index'```
