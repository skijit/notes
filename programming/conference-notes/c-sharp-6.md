#C#6 (and a bit of 7)

- **Auto-Property Initializer**

    ```(C#)
    public class Customer
    {
        public DateTime FirstOrder { get; set; } = DateTime.Today;
        
        // ...    
    }
    ```

- **You can have a read-only property that is set once ONLY by the constructor**

    ```(C#)
    public class Customer
    {
        //constructor
        public Customer(string name)
        {
            Name = name;
        }    
        
        //note property only has get
        public string Name { get; }
    }
    ```
    
- You can combine these last two features for some lean code.
- Notice in the example below that the class definition is merged with the constructor definition.

    ```(C#)
    class Pair<T>(T first, T second)
    {
    public T First { get; } = first;
    public T Second { get; } = second;
    
    //this would be especially good for DTO's and immutable classes
    }
    ```

- **There's a way of just importing static members of a class / namespace**

    ```(C#)
    using static System.Math;
    // ...

    //Normally you would specify Math.Sqrt, but now it's not needed.
    var x = Sqrt(4);

    // ...

    ```
    
    - This might be most useful for things like Console (.WriteLine?)

- **Dictionary Initializer**

    ```(C#)
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

    ```(C#)
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
    - You can do this with properties (this example), indexers, operators, etc.
    
    ```(C#)
    public string FullName() => FirstName + " " + LastName;
    ```
    
- **Null Conditional Operator**

    ```(C#)
    //If Value is null, don't try to eval Name.  Just return null rather than the exception.
    Console.WriteLine(cust.Value?.Name);
    ```
    
- **Default Parameters**
    
    ```(C#)
    public SomeMethod(int val1 = 10)
    {
        // ...    
    } 
    ```
    
- **String Interpolation**

    ```(C#)
    Console.WriteLine($"First Name: {FirstName}, Last Name: {LastName}");
    ```

- **Nameof Expressions**
    - Gives you access to the program element (class name, method name, parameter name, etc.).
    - This might be useful when clarifying the name of an element that has a problem
        - Like when you catch an exception and you want to output the name of the offending element.
        - So you don't depend on some "magic string".

    ```(C#)
    void ThrowArgumentNullExceptionUsingNameOf(string param1)
    {
    throw new ArgumentNullException(nameof(param1));
    }
    ```

- **Quick Review on Async / Await**
    - async keyword is applied to a method
    - this tells the compiler that we want to use aynchronous execution in the method.
        - there's additional overhead in the code which is generated (wraps everything in a state machine), so don't add this unless you plan on using it.
    - this doesn't change the method's signature.
        - this **cannot** be used as the basis of an overload
    - applying async doesn't make the method asynchronous, it just lets the compiler know our intention to possibly use some asynchronous execution.
    - Inside the method marked async, you'll insert an await.
    - the await keyword proceeds a call which whould be executed asynchronously.  
        - when the asychrnonous method returns, the rest of the async'ed calling method will be executed synchronously
        - the await'ed method needs to return a Task
        
    - Example:
    ```(C#)
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








