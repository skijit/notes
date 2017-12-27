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


## This

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
    // "obj.color = red"```
        
        
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

### Equality operators
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

### Apply, Call, Bind
- Recall in javascript, all functions are objects
- Apply, Call, and Bind are 3 methods which are available to all function objects
- **Bind**
    - Bind is used primarily to set the `this` value in a function
    - Depending on how the function is called, the `this` value in the function might not be what you expect it.  That unexpectedness can cause problems.
    - 


---------------------------
**TODO**  
- [this](http://stackoverflow.com/questions/2485423/is-using-var-to-declare-variables-optional) javascript scoping page
- more about closures and this ambiguities


