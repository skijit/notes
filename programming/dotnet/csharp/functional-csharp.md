Functional CSharp
=======================

- from Dev intersections conference Dec 2018
- [alternate src](https://www.ustream.tv/recorded/114916291)

- functional approaches remove need for complicated testing mocks
- C# is good at creating functional "islands"
  - best practice in functional code is to use pure functions which then interact with the world (side effects) through some wrapper
  - testing
    - unit testing within pure units
    - functional automated tests between impure units
  
- Problem with Action<> : not polymorphic with Func<>
  - just return a Void instead
- Good idea
  - pass in a functional parameter which gets called in a catch
    - `Func<Exception, X> catchOp`

## Functional Programming with C#
- [pluralsight course](https://app.pluralsight.com/player?course=functional-programming-csharp&author=dave-fancher&name=functional-programming-csharp-m1&clip=0&mode=live)
- benefits of functional programming:
    - easier to parallelize
    - according to many, it's more:
        - predicatable - decreases complexity
        - reliable
        - maintainable
    - encourages clean code
    - 
- functional design paradigm
    - decompose behavior into series of inputs/outputs rather than how the affect state
    - OO focuses on state management
- 3 core ideas in functional programming
    1. Minimizing side-effects
        - side effect is not necessarily an undesireable result, just a (secondary) state manipulation
        - some amount of side-effects are necessary for systems which maintain a state (i.e. almost anything)
        - side effects create problems bc although it can be useful to couple behaviors within the same code block
            - it makes it harder to reason about the function
            - harder to test bc it implies increased dependencies
        - C# is *impure* as a functional language bc it doesn't prevent us from manipulating state within our functions, we can get the same benefits by enforcing immutablililty within types (which C# can do).
    2. Expression-based
        - essentially means computing something inline vs through declarative code, the latter of which requires more lines, variables, the former of which is more self-contained.
            - consider how linq operators never change a value but return a new sequence
        - Everything produces a direct result
            - e.g.: compare an if/else block assigning to a value to a variable, vs the ternary conditional operator assigning a value directly to a variable
        - Expressions are naturally composeable, and in place of an extra variable (e.g. passing into a function)
            - e.g. `funcA(funcB(funcC(A)));`
    3. Treat functions as Data
        - Higher order functions
            - Functions which accept other functions
            - Functions which return functions
        
- continue at module 2


## TODO
- consider other pluralisght functional [courses](https://app.pluralsight.com/library/search?q=funtional%20C%23)
    - [this one](https://app.pluralsight.com/library/courses/csharp-applying-functional-principles/table-of-contents) looks really good