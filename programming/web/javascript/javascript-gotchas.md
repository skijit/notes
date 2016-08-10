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

**TODO**  [this](http://stackoverflow.com/questions/2485423/is-using-var-to-declare-variables-optional) javascript scoping page
**TODO**  more about closures and this ambiguities
**TODO**  new Error() vs throw Exception

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
        
    
