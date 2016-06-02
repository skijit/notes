CSS Pre-Processors Are Awesome
============
Notes from a talk at DevConnections Spring 2016, "CSS Pre-Processors Are Awesome"

- Challenges
    - Inherent weaknesses off CSS
    - Browser incompatibility
        - E.G. Mobile browsers
        - browser prefix hacks
            - browser makers have agreed to stop shipping new features under the prefix method
            - now they're just using a flags method (ie cmdline args, settings, etc)
            
- CSS3
    - Extensions for CSS2.1: Adds extra functionality that have existing code-based polyfill/hacks

- **Problem**: what if you want to change all of these to 4px?
```(css)
h1 {
    -webkit-box-shadow: 3px 3px 3px #333;
    -moz-box-shadow: 3px 3px 3px #333;
    box-shadow: 3px 3px 3px #333;    
}
```

- Objectives
    - Abstract away from browser differences
    - Support global variables
    - Be DRY
    - Simplify complicated style hierarchies
    - Other general improvements to maintainability
    
- Methodology:
    1. Write Preprocess syntax
    2. Compile to plain old CSS
        - Server Side On-Demand: Better for Debugging/Test environment
        - Server Side AOT / Precompile: Best for Production
        - Client-Side: Not used very often, so best for Debugging, but since it requires javascript and print-views don't execute javascript, you can have problems with this.
        
- Technologies
    - Sass
        - Came from Ruby
        - SCSS is a descendant of Sass
    - Less
        - Born of the javascript community
    - All the concepts map between both approaches
    
- All CSS is LESS/SASS
    - Similar to all javascript is typescript
    - This design is called a nested metalanguage

- Things it doesn't do:
    - Does not add support to browsers
    - Does not Detect css support in browsers
    - Does not add runtime overhead
    - Does not prevent you from writing bad CSS

- Some "playground" sites:
    - [lesscssismore.com](http://lesscssismore.com/)
    - [sassmeister.com](http://www.sassmeister.com/)

## Language Contructs

- Variables
    - can be defined once
    - they are block-scoped
        - so you can redefine in a nested block and the scope will be limited accordingly
    - best practice is to define variables at top of file, or in a different file    

    - (this is a less example...)
     ```(less)
        @nice-blue: #5B83AD;
        @light-blue: @nice-blue + #111;
        #header { color: @light-blue; }
     ```

    - (this is a sass example...)
     
     ```(sass)
        $nice-blue: #5B83AD;
        $light-blue: $nice-blue + #111;
        #header { color: $light-blue; }
     ```

- Operations
    - Math operations can be applied
        - e.g. for setting gradients
        - \+ , /, ...
    - Remember though that these are **not runtime calculated**

- Mix-ins
    - Define a reusable collection of rules that can be used anywhere in the stylesheet
    - So in many cases, you might only need to get the mix-ins, set the standard variables and apply those classes.
    - Bootstrap's CSS is essentially a variety of LESS mixins
    
    - (less...)
    
    ```(less)
    .border-radius(@radius) {
            -moz-border-radius: @radius;
            -o-border-radius: @radius;
            border-radius: @radius;            
    }
    
    #header { .border-radius(4px); }
    ```
    
    - here's one that doesn't take arguments...
    
    ```(less)
    .shadow {
        
    }
    
    #h1 {
        // ... 
        .shadow; 
    }
    ```
    
    - here's one that takes a couple arguments, with defaults...
    
    ```(less)
    .shadow(@values: 3px 3px 3px 3px) {
        // ...
    }
    
    #h1 {
        // ... 
        .shadow(4px 4px 5px 5px); 
    }
    ```

    - multiple parameters are ok- they don't have to be all bundled into one, like previous example:
    
    ```(less)
    .shadow(@x: 3px, @y: 3px) {
        // ...
    }
    
    ```    
    
    - **There are bunch of useful mix-in libraries!**
        - You could have a library of thousands of mix-ins, but if you don't use reference/consume them, then they won't be output into a huge css file.
        - Nested refs: You could have mix-ins using mix-ins!   (not circular refs, obv)

- Pattern Matches & Guards
    - conditional logic here is possible
    - remember it is not runtime
    
- Nested Rules in a hierarchy of selectors
    - Gives you some css namespacing
    - Simplifies readability
    
    ```(less)
        #header {
            
            color: black;
            
            // ...
            
            .logo {
                       
            }
        }
    ```

- There's lots more syntactical sugar... check the docs

