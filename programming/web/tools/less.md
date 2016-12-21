Less
==================

## Language Features
- **Variables**
    - Constants which can only be defined once
    ```(less)
    @nice-blue: #5B83AD;
    @light-blue: @nice-blue + #111;

    #header {
    color: @light-blue;
    }```
    - Compiles to
    ```(css)
    #header {
    color: #6c94be;
    }
    ```
- **Mixins**
    - In the simple (non-parametric) case, mixins are just definitions of a class which can then be referenced elsewhere.
    ```(less)
    .bordered {
        border-top: dotted 1px black;
        border-bottom: solid 2px black;
    }
    .post a {
        color: red;
        .bordered;
    }```
- **Parametric Mixins**
    - Basic example with default values
    ```(less)
    .border-radius(@radius: 5px) {
        -webkit-border-radius: @radius;
        -moz-border-radius: @radius;
        border-radius: @radius;
    }```
    - With multiple parameters
        - Semicolon delimeted
        - You can pass a comma separated list as a parameter
    - Overloads are acceptable
    - You can invoke the mixins with named parameters, if you want.
    ```(less)
    .class1 {
     .mixin(@margin: 20px; @color: #33acfe);
    }```
- **Return Value Usage with Mixins**
    ```(less)
    .average(@x, @y) {
        @average: ((@x + @y) / 2);
    }

    div {
        .average(16px, 50px); // "call" the mixin
        padding: @average;    // use its "return" value
    }```
    - Produces...
    ```(less)
    div {
        padding: 33px;
    }```    
- **Pattern Matching**
    - You can declare an argument to a mixin as a standard string.  If the parameter passed in matches, that version of the mixin will run.
    - The ```@_``` argument matches anything.
    ```(less)
    .mixin(dark; @color) {
        color: darken(@color, 10%);
    }
    .mixin(light; @color) {
        color: lighten(@color, 10%);
    }
    .mixin(@_; @color) {
        display: block;
    }
    @switch: light;

    .class {
        .mixin(@switch; #888);
    }```
    - Will result in:
    ```(css)
    .class {
        color: #a2a2a2;  //results from lightening #888 at 10%.
        display: block;
    }
    ```
- **Nested Rules**
    ```(less)
    #header {
        color: black;
        .navigation {
            font-size: 12px;
        }
        .logo {
            width: 300px;
        }
    }```
- **Mixin Guards**
    - Alternative to if/else logic
    ```(less)
    .mixin (@a) when (lightness(@a) >= 50%) {
        background-color: black;
    }```
    - Comparison operators include: >, >=, =, =<, <
    - Truthiness:
    ```(less)
    .truth (@a) when (@a = true) { ... }
    ```
    - Logical operators: ```and```
        - Or operator implemented by a comma:
        ```(less)
        .mixin (@a) when (@a > 10), (@a < -10) { ... }
        ```
        - Not operator:
        ```(less)
        .mixin (@b) when not (@b > 0) { ... }
        ```
    - Useful type checking functions you can use in mixins:
        - iscolor
        - isnumber
        - isstring
        - iskeyword
        - isurl
        - ispixel
        - ispercentage
        - isem
        - isunit
- **CSS Guards**
    - Guards can be applied to css selectors as well:
    ```(less)
    button when (@my-option = true) {
        color: white;
    }```
- **Loops**
    - Use recursion
    ```(less)
    .generate-columns(4);

    .generate-columns(@n, @i: 1) when (@i =< @n) {
        .column-@{i} {
            width: (@i * 100% / @n);
        }
        .generate-columns(@n, (@i + 1));
    }```
    - generates...
    ```(css)
    .column-1 {
        width: 25%;
    }
    .column-2 {
        width: 50%;
    }
    .column-3 {
        width: 75%;
    }
    .column-4 {
        width: 100%;
    }```
- **Parent Selectors**
    ```(less)
    a {
        color: blue;
        &:hover {
            color: green;
        }
    }
    ```
    - results in 
    ```(css)
    a {
    color: blue;
    }

    a:hover {
    color: green;
    }    
    ```
    - And...
    ```(less)
    .button {
        &-ok {
            background-image: url("ok.png");
        }
        &-cancel {
            background-image: url("cancel.png");
        }
    }
    ```
    - results in 
    ```(css)
    .button-ok {
        background-image: url("ok.png");
    }
    .button-cancel {
        background-image: url("cancel.png");
    }
    ```
- **Math Operations**
    - Supports these math operators: +, -, *, /
    - Addition and subtraction will convert to equal units before computing
    - Colors are split into their red, green, blue and alpha dimensions
- **Escaping**
    - Content enclosed ~"like this " will be unchanged
- **Built-in Functions**
    - Things like percentage(), saturate(), lighten(), etc.
    - See reference for more info
- **Namespace and Accessors**
    - You can create a namespace by enclosing it all under a #
    ```(less)
    #bundle {
        .button {
            display: block;
            //...
        }
    }```
    - You can reference the rules by including the namespace as such:
    ```(less)
    #header a {
        color: orange;
        #bundle > .button;
    }```
    - You **cannot** reference variables from a namespace
    - uses lexical scoping: searches parent scopes
- **Importing**
    - Works as expected...
    ```(less)
    @import "library"; // library.less
    @import "typo.css";
    ```
