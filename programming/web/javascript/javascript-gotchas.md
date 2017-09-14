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
    
---------------------------
**TODO**  
- [this](http://stackoverflow.com/questions/2485423/is-using-var-to-declare-variables-optional) javascript scoping page
- more about closures and this ambiguities
- "use strict"

