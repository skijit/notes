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
        
- two key ways to tame side-effects
    1. Immutable types 
    2. preferring expressions over statements
- immutability
    - big idea: once you initialize a class, the state doesn't change
    - external immutability: client code can't change internal state         
        - emphasis on constructors as the only way to set internal state
        - and use private setters
    - internal immutability: class code change change the internal state once initialized
        - use private readonly vars: values can only be set in constructor or in declaration
        - then use public getters
    - automatic immutability
        - getter only autoproperties in C#6
            - they make the backing properties readonly

            ```(csharp)
            public DateTime Start { get; }
            ```
- expressions
    - favor over statements
        - statements are use to cause an effect
        - expressions are executed for their result
        - I think the point is having less state
    - expressions-bodied members
    
        ```(csharp)
        public override string ToString() => $"Type Name: {GetType().Name.Split('+'[0])}";
        ```

    - converting statements to expressions
        - refactor a using block
        
        ```(csharp)
        public static class Disposable
        {
            public static TResult Using<TDisposable, TResult>(Func<TDisposable> factory, Func<TDisposable, TResult> map)
                where TDisposable : IDisposable
            {
                using (var disposable = factory())
                {
                    return map(disposable);
                    // return default(TResult); 
                    // this is the old value, before we included the map parameter
                    // default is a keyword which produces the default type of TResult 
                    // it is especially useful in generic classes and methods
                    // it TResult is a reference type, the return value will be null
                    // however if TResult is an int, the return value will be 0
                }
            }
        }

        void Main()
        {
            var timeDoc = Disposable
                            .Using(
                                () => new System.Net.WebClient(),
                                client => XDocument.Parse(client.DownloadString("someUrl))
                            );
        }
        ```

- making functions first class objects
    - delegates are like abstract classes for functions
    - in C#, delegates are actually syntactic sugar for a class with an Invoke method which gets called
    - progression of delegation techniques

    ```(csharp)
    // Method 1
    // Classic Delegation: which is somewhat overwrought
    public delegate decimal MathOperation(decimal left, decimal right);
    public static decimal Add(decimal left, decimal right)
    {
        return left + right;
    }
    //polymorphism
    private static MathOperation GetOperation(char oper)  
    {
        switch(oper)
        {
            case '+': return Add;
            //...
        }
    }
    //invocation
    void Main()
    {
        GetOperation('+')(1, 3);
    }
    
    // Method 2 (not shown)
    // using interfaces and polymorphism
    // was used bc the old compiler using delegates was super slow

    // Method 3: Anonymous methods
    // improvement but still cumbersome
    private static MathOperation GetOperation(char oper)  
    {
        switch(oper)
        {
            case '+': return delegate (decimal l, decimal 4) { return l + r};
            //...
        }
    }

    // Method 4: generic delegates and lambda expressions
    // Overloaded generic delegate types: Action and Func for void and non-void methods
    // Remember in Func<> the last type parameter is the return type
    // lamdba expressions streamline the function definition and Action and Func streamline the delegate definition    
    private static Func<decimal, decimal, decimal> GetOperation(char oper)  
    {
        switch(oper)
        {
            case '+': return (l, r) => l + r;
            //...
        }
    }
    void Main()
    {
        GetOperation('+')(1, 3);
    }
    ```
  
- Pipelining
    - the output of one function flows as input to the next
    - similar to unix commandline
    - powerful technique
- Pipelining Techniques:
    - Nested Method Calls
        - noisy
    - Method Chains
        - its an architectural pattern that must be designed for
        - methods need to be designed to return an object we can call additional methods for        
            - void methods are for terminating the chain
        - examples 
            - linq extension methods
                - each return a new IEnumerable object
            - StringBuilder
                - self-referential: returns it's `this` for chaining
                - you can build extension methods with string builder to add conditional operations

```(csharp)
//since chaining requieres a consistent type, this is a nice way to increase utility
public static TResult Map<TSource, TResult>(this TSource _this, Func<TSource, TResult> fn) => fn(_this);

//sometimes we need to execute side effects in a pipeline
//'Tee' gets it's name from the Unix commandline which logs the previous call's results to a log
//Whatever value is passed to it will be returned AND passed to the Action lambda 
public static T Tee<T>(
    this T _this,
    Action<T> act) 
{
    act(_this);
    return _this;
}
```

- 
            


## TODO
- consider other pluralisght functional [courses](https://app.pluralsight.com/library/search?q=funtional%20C%23)
    - [this one](https://app.pluralsight.com/library/courses/csharp-applying-functional-principles/table-of-contents) looks really good