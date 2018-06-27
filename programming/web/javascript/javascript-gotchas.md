JavaScript Gotchas and Misc Notes
=============

## JavaScript Scope Stuff

### When to use var / let vs nothing
- if it's a new variable...
    - then you should default to using var or let
    - this will block access to any same-named variables in a higher scope
- if you don't declare it with a var...
    - the interpreter will keep moving up higher scopes until it finds it.  
    - if it never finds it, it will attach it as a property of the global (presumably ```window```) object...
    ```(javascript)
    (function() { funTown = 'is my town'; })()```
        - now if you run ```window.funTown```, it will return 'is my town'.

### let vs var
- ```let``` declared variables are not visible before the are declared in their block, wherease ```var``` declared
- ```var``` declared variables are visible in their entire *enclosing function*
    - sometimes called 'hoisting' or fwd referencing


    ```(javascript)
    function f1() {
        //me1 is *not* visible out here

        for( let me1 = 0; me1 < 25; me1++ ) {
            //me1 is only visible in here (and in the for() parentheses)
        };

        //me1 is *not* visible out here
    };

    function f2() {
        //me2 *is* visible out here

        for( var me2 = 0; me2 < 5; me2++ ) {
            //me2 is visible to the whole function
        };

        //me2 *is* visible out here
    };
    ```

### let vs const
- const are also block scoped
- primitives:
    - const can only get its value from initialization
- objects:
    - you can change the value, but not the reference

## Useful Array Methods
- `push()`
- `pop()`
- `splice()`

## This
- *this* is the *function context*
- meaning depends on how the function is called:
    - `doFunction()`
        - this => window
    - `myObj.myMethod()`
        - this => `myObj`
    - `new callAsCtor()`
        - this => a new empty object
        - the ctor will, by default, return *this*
        - one of the primary reasons to use *new* is to avoid attaching things to the window object
    - `myFunc.apply(myNewContext, [myparm1, myparm2])`
        - this => `myNewContext`
    - `myFunc.call(myNewContext, myparm1, myparm2)`
        - this => `myNewContext`

### Fat Arrow and Lexical Scoping of this
- Fat arrow functions use lexical scoping which looks at code blocks in determining this, rather than how the function is called.

```(javascript)
let myObj = function() {
    this.nums = [0,1,2,3,5,6,7,8,9,10];
    this.fives = [];
        
    //variation 1 using 'self' convention
    this.popFivesVar1 =  function() {
        var self = this;
        self.fives = []
        this.nums.forEach(function(v) {
            //this will refer to window bc the anon function will be called 'bare'

            if (v % 5 === 0) {
                self.fives.push(v);
            }
        });
    };

    //variation 2 using bind()
    this.popFivesVar2 = function() {
        this.fives = [];
        this.nums.forEach(function (v) {
            //this will refer to myObj bc the anon function passed in has been called w bind()
            
            if (v % 5 === 0)
                this.fives.push(v);
        }.bind(this));
    };
        
    //fat arrow uses the lexical this    
    this.popFivesVar3 = function() {
        this.fives = [];
        this.nums.forEach(v => {
            //this will refer to myObj bc the fat arrow uses lexical this

            if (v % 5 === 0) 
                this.fives.push(v);
        })

    }
        
};

let m = new myObj();
m.popFivesVar1();
console.log(m.fives)
m.popFivesVar2();
console.log(m.fives)
m.popFivesVar3();
console.log(m.fives)
```

- Bind() will create a new function based on it's original, setting the function context as specified.

```(javascript)
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

## for..of vs for..in
- for..of:
    - new in ES7
    - Uses the iterable convention to iterate over an object (presumably a collection of some kind)
- for..in:
    - Lets you loop of the enumerable property names of an object
    - Will include properties inherited via the prototype chain.  
        - To filter them out, use hasOwnProperty()
    
    ```(javascript)
    let triangle = {a:1, b:2, c:3};

    function ColoredTriangle() {
        this.color = "red";
    }

    ColoredTriangle.prototype = triangle;

    let obj = new ColoredTriangle();

    for (let prop in obj) {
        if( obj.hasOwnProperty( prop ) ) {
            console.log("obj." + prop + " = " + obj[prop]);
        } 
    }

    // Output:
    // "obj.color = red"
    ```
                
## "use strict"
- See [John Resig's post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
- Also [this](http://www.2ality.com/2011/10/strict-mode-hatred.html) post is useful
- new in ECMA Script 5
- enables "strict" mode
- It can be applied globally or at a function scope
- Strict mode helps out in a couple ways:
    - It catches some common coding bloopers, throwing exceptions.
    - It prevents, or throws errors, when relatively "unsafe" actions are taken (such as gaining access to the global object).
    - It disables features that are confusing or poorly thought out.

## Pass by reference behavior

- Primitives are passed by value
- Objects are similar to pass by reference, but actuall different.
    - They are: pass by copy of reference
    - Good explanation [here](https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference)

## Undefined vs Null
- `undefined` means a variable has been declared but not assigned a value.
    - `undefined` is itself a type
- `null` is what you assign to a variable when you want to show it has no value.
    - `null` is an object

```(javascript)
var TestVar;
alert(TestVar); //shows undefined
alert(typeof TestVar); //shows undefined

var TestVar = null;
alert(TestVar); //shows null
alert(typeof TestVar); //shows object

null === undefined // false
null == undefined // true
null === null // true

null = 'value' // ReferenceError
undefined = 'value' // 'value'
```

## Equality operators
- The `===` operator behaves identically to the `==` operator, except that no type conversion is done.
    - The types must be the same to be considered equal.
- The `==` uses type coersion to evaluate. 
- Type coersion rules are a little weird.

```(javascript)
'' == '0'           // false
0 == ''             // true
0 == '0'            // true

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```

- For reference types (objects), the `==` and `===` are pretty much the same as they inspect the references (presumably a pointer to somewhere in memory- and thus they're the same types).
    - Only exception to the rule of comparing the underlying references is if the type of the object is a string, it will do string equality rather than compare the pointers.

```(javascript)
var a = [1,2,3];
var b = [1,2,3];

var c = { x: 1, y: 2 };
var d = { x: 1, y: 2 };

var e = "text";
var f = "te" + "xt";

a == b            // false
a === b           // false

c == d            // false
c === d           // false

e == f            // true
e === f           // true
```

- **Best Practice**: always use the `===` and `!==` operators

## Prototype Inheritance
- [interesting ref](https://steve-yegge.blogspot.com/2008/10/universal-design-pattern.html)
- [basic notes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- each object has a private property referring to it's prototype object
- getters and setters for prototypes:
    - `Object.getPrototypeOf(myObj)`
    - `Object.setPrototypeOf(myObj)`
    - the old way involved referring to each object's `__proto__` property.
- `y instanceof Array`: returns true if Array appears in y's prototype chain
- if an object was created with a constructor, the prototype of an object constructed by it will refer to the 
- to add a function to make it available to all instances of a type, you can add it to the prototype function as such:

```(javascript)
function Person(_name) {
    this.name = _name;
}
Person.prototpe.sayHello = function() { return `Hi, my name is ${name}`; }
```

- to inherit, reference a the parent ctor in the child ctor, using `call`:
```(javascript)
function Player(_name, _position) {
    Person.call(this, _name);
    this.position = _position;
}
```

    - however, to have access to the prototype's full set of properties and methods, you need to:

    ```(javascript)
    Player.prototype = Object.create(Person);
    ```

- when you have an object inheriting from another, they inherit the fields/methods, but not the actual state values.
    - those become local.

## Closures
- When you have a function defined in another function, then parent scope is retained by the inner function, as defacto private state.

```(javascript)
let obj = function() {
    let i = 0; //this becomes defacto private

    return {
        //this syntax is ECMA Script 6
        setI(k) {
            i = k;
        },
        getI() {
            return i;
        }
    };
}

let x = obj();
x.setI(2);
console.log(x.getI());
```

- Another use case is for function factories:

```(javascript)
function dwightJob(title) {
    return function(prefix) {
        return prefix + ' ' + title;
    };
}

var sales = dwightJob('Salesman');
var manager = dwightJob('Manager');

alert(sales('Top'));  // Top Salesman
alert(manager('Assistant to the Regional')); // Assistant to the Regional Manager
alert(manager('Regional')); // Regional Manager
```

- Another user case is 'modules'.  

```(javascript)
var Calculator = function () {
    //various innter state fields

    function _add(x, y) {
        return x + y;
    }

    function _subtract (x, y) {
        return x - y;
    }

     return {
        init: init,
        add: _add,
        subtract: _subtract
    };
}

Calculator.init();
```

## Prototype-Based Inheritance
- `prototype` is a property of `function` and when you assign properties/functions to a function's prototype AND call it as a constructor, then the newly created object will have those properties.

```(javascript)
function Ninja() {}

Ninja.prototype.swingSword = function() { return true; }

var n2 = new Ninja();

//n2 has swingSword() defined on it
```

- when looking up properties, it will follow the prototype chain
- you can add a property/method to the constructor function prototype after creation and it will still work

```(javascript)
function Ninja() {}

var n2 = new Ninja();

Ninja.prototype.swingSword = function() { return true; }

//n2 has swingSword() defined on it
```

- **So**, object is associated with it's prototype based on the ctor function that is used
    - object instance (1) -> `constructor` property (2) -> constructor function's `prototype` property (3) -> prototype object (4)
    - object instance (1) -> `__proto__` property (2) -> prototype object (**4**)
    - the first route is not so useful when an object instance was not created by a ctor

- `typeof` returns string, usually of object
- `instanceof` compares an object and a ctor:
    - `ninja instanceof Ninja` returns a boolean
    - so this works with inheritance up the prototype chain

- inheritance: `subClassCtor.prototype = new superClass()`
- each object instance has a `__proto__` property which refers to the Object referred to by it's ctor's prototype property
- you only inherit the members in the object class'es prototype
- a lot of times, you'll see a ctor function only have the data members, and the methods will be declared on the the ctor prototype
-