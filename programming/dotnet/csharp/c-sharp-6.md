C# 6 (and a bit of 7)
==============

- Primary reference [here](https://msdn.microsoft.com/en-us/magazine/dn802602.aspx)

- **Auto-Property Initializer**

    ```(csharp)
    public class Customer
    {
        public DateTime FirstOrder { get; set; } = DateTime.Today;
        
        // ...    
    }
    ```

- **You can have a getter-only auto-property that is set once ONLY by the constructor**

    ```(csharp)
    public class Customer
    {
        //constructor
        public Customer(string name)
        {
            Name = name;
        }    
        
        //note property only has get
        public string Name { get; }
    }```
    
- In this next example, we're combining both the previous two features with what are called *Primary Constructors*.  
    - See [here](http://odetocode.com/blogs/scott/archive/2014/08/14/c-6-0-features-part-ii-primary-constructors.aspx)
    - Bascially, it involves adding the standard, required constructor parameters to the first line in the class definition.  
    - You can reference those properties elsewhere in the class definition.
    - Other contructors will call the Primary Constructor with ```this()```
    - Note that the syntax highlighting needs to be updated for this scenario.
    ```(csharp)
    public class Pair<T>(T first, T second)
    {
        public T First { get; } = first;
        public T Second { get; } = second;
        
        // this would be especially good for DTO's and immutable classes
    }
    ```

- **There's a way of just importing static members of a class / namespace**

    ```(csharp)
    using static System.Math;
    // ...

    //Normally you would specify Math.Sqrt, but now it's not needed.
    var x = Sqrt(4);

    // ...

    ```
    
    - This might be most useful for things like Console (.WriteLine?)

- **Dictionary Initializer**

    ```(csharp)
    var customers = new Dictionary<int, Customer>()
    {
        [1] = new Customer("Joe"),
        [2] = new Customer("Fred")    
    }

    ```
    
    - Any type (depending on what you specified as the key) can go inside the square brackets

- **Enclose await statements in try/catch block.**  
    - Catch block can contain an await as well.

- **Conditional Exception Catching**

    ```(csharp)
    try
    {
        // ...
    }
    catch (NullReferenceException ex) when (cust.Value.Name != "Fred")
    {
        // ...
    }
    catch (Exception ex)
    {
        
    }
    ```
    
- **Expression Body**
    - You can use lambda syntax (aka expression syntax) with get-only properties (this example), methods, indexers, operators, etc.

    ```(csharp)
    public string FullName() => FirstName + " " + LastName;
    ```
    
- **Null Conditional Operator**

    ```(csharp)
    //If Value is null, don't try to eval Name.  Just return null rather than the exception.
    Console.WriteLine(cust.Value?.Name);
    ```
    
- **Default Parameters**
    
    ```(csharp)
    public SomeMethod(int val1 = 10)
    {
        // ...    
    } 
    ```
    
- **String Interpolation**

    ```(csharp)
    Console.WriteLine($"First Name: {FirstName}, Last Name: {LastName}");
    ```

- **Nameof Expressions**
    - Gives you access to the program element (class name, method name, parameter name, etc.).
    - This might be useful when clarifying the name of an element that has a problem
        - Like when you catch an exception and you want to output the name of the offending element (such as the property name).
        - So you don't depend on some "magic string", like "Prop1", because maybe you've changed the name of the offending property
    - Also useful when getting an enum's ToString() value.
    - Basically it's a reflection-shortcut.

    ```(csharp)
    void ThrowArgumentNullExceptionUsingNameOf(string param1)
    {
    throw new ArgumentNullException(nameof(param1));
    }
    ```

- **Quick Review on Async / Await**
    - `async` keyword is applied to a method
    - this tells the compiler that we want to use aynchronous execution in the method.
        - there's additional overhead in the code which is generated (wraps everything in a state machine), so don't add this unless you plan on using it.
    - async != parallel
        - Although they both use Tasks (which are analogous to Promises), async methods are still single-threaded.
        - Async methods just have a different (i.e. async) control-flow such that async code will not block code until it is awaited. 
        - `async` methods are ideal for i/o-bound operations involving waiting for a response
        - new threads are good for CPU-bound activities with no waiting... they just need to process.
    - adding `async` doesn't change the method's signature.
        - this **cannot** be used as the basis of an overload
    - applying `async` doesn't make the method asynchronous, it just lets the compiler know our intention to possibly use some asynchronous execution.
    - Inside the method marked `async`, you'll insert an `await`.
    - the `await` keyword proceeds a call which whould be executed asynchronously.  
        - when the asychrnonous method returns, the rest of the async'ed calling method will be executed synchronously
        - the await'ed method needs to return a Task
    - Every method in an async call stack...
        - Should return a `Task<>` even if it is a concrete value with no apparent wrapping in a task (to support the underlying state machine that drives async/await)
        - Does NOT need to be called with async!
            - Async is only necessary for your method to be await-able.
            - IE only necessary for synchronization points
            - Adding await will often unwrap the Task<> to just the result.
    - `await` is like the trigger to begin asynchronous processing:
        - If you put an `await` on the same line as an async call (see [this so post](https://stackoverflow.com/questions/21267307/practical-usage-of-await-on-the-same-line-as-the-async-call)), it would appear the `await` is making the async call de facto synchronous (and therefore bad- bc you have the overhead of async with no performance benefits)
        - but actually, this is the trigger to yield control to the calling process.
        - `await` triggers two different things:
            1. within the current method, it means `waitForReal`: this means that no further statements in this scope can be executed until the value is resolved.
            2. to the parent (calling) method, it means `doYourOtherStuffNow`: it signals to parent to continue processing, at least until the parent executes it's own `await` on the called method's returned `Task`.
    - Ultimately, async tasks will be composed of individually sync methods and operations. 
        - So if you need to call a sync task, that's no big deal.  Blocking happens.  That's normal programming.
        - It becomes more difficult the other way around: when you have sync calling async.
            - It works fine, but to fully realize the benefits, it's best if your entire (or as much as possible) call chain is factored for async - thereby minimizing blocking. 

        
        
    - Example:
    ```(csharp)
    public async DoWork()
    {
        //start by executing synchronously
        // ...
        
        //go into asynch execution here
        await LongOperation();
        
        //back to sync execution
        // ...
    }
    
    private Task LongOperation()
    {
            return Task.Factory.StartNew(() =>
            {
                // INSERT THE CODE HERE
            });
    }
    ```

    - References:
        - [Good async-await reference](https://stephenhaunts.com/2014/10/10/simple-async-await-example-for-asynchronous-programming/)
        - https://stackoverflow.com/questions/41953102/using-async-await-or-task-in-web-api-controller-net-core

**TODO: review the following url https://msdn.microsoft.com/en-us/magazine/dn879355.aspx**






