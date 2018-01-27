Linq in C# 
======================
- todo:
  - cover: expression trees
  - dynamic linq (predicate builder)
  - Iqueryable
  - delegates, funcs
  - EF, AsExpandable()

## Delegates
- Encapsulate a method
- Like a function pointer in C++ but:
  - object oriented
    - delegates are types which can be instantiated, like a class
    - although it is NOT new'ed up
  - type-safe
  - secure

```(csharp)
public delegate void Del(string message);

// Create a method for a delegate.
public static void DelegateMethod(string message)
{
    System.Console.WriteLine(message);
}

// Instantiate the delegate.
Del handler = DelegateMethod;

// Call the delegate.
handler("Hello World");

// pass delegate as a parameter
public void MethodWithCallback(int param1, int param2, Del callback)
{
    callback("The number is: " + (param1 + param2).ToString());
}

```

- Delegates can also be multicast:

```(csharp)
MethodClass obj = new MethodClass();
Del d1 = obj.Method1;
Del d2 = obj.Method2;
Del d3 = DelegateMethod;

//Both types of assignment are valid.
Del allMethodsDelegate = d1 + d2;
allMethodsDelegate += d3;

//invocation...
allMethodsDelegate("whatever parameter")
```


### Func and Action
- Func<T, R> is just a generic delegate defined as:

```(csharp)
public delegate TResult Func<in T, out TResult>(T arg);
```

- Action<T1> is a generic delegate that returns void:

```(csharp)
public delegate void Action<in T1>(T1 arg);
```

- What's up with the `in` and `out` keywords?  See the next section...


### Aside on Covariance / Contravariance
- Variance is a topic involving how the type-system handles language constructs which reference types... such as:
  - Arrays
  - Interfaces
  - Delegates
  - Generics:
    - interfaces
    - delegates
    - classes
- You can enable covariance and contravariance in these different constructs, although in some, it is already predefined.  
- Two types of variance:
  - Covariance:
    - When a return type is more derived (further down the inheritance tree)    
  - Contravariance:
    - This is the weirder one
    - When a parameter is less derived (higher up in the inheritance tree)
    - It's strange because this seems to subvert OOP principles, but remember that these rules are enforced statically (design time), rather than runtime.
- Delegates:
  - Covariance and contravariance is supported in all delegates.
  - The language makes implicit conversions whenever
- Generic Delegates:
  - You have control over covariance and contravariance using the `in` and `out` keywords.
  - `out` enables covariance
  - `in` enables contravariance
  


## Lambda Expressions
- lambda Expressions are anonymous functions that can be assigned to...
  - delegates

  ```(csharp)
  //using generic delegate
  Func<int, int> myDelegate = x => x * x;  
  int j = myDelegate(5); //j = 25   
  
  //using normal delegate
  delegate int del(int i);  
  del myDelegate = x => x * x;  
  int j = myDelegate(5); //j = 25  
  ```

  - expression tree
    - a tree-like data structure where each node is an expression, e.g.
      - method call
      - binary operation
    - [see here for more](#expression-trees) 

  ```(csharp)
  //using generic delegate
  Expression<Func<int, int>> = x => x * x;

  //using normal delegate
  Expression<del> myET = x => x * x;  
  ```


## Expression Trees
- [src](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/expression-trees/index)
- [another src](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/expression-trees/how-to-use-expression-trees-to-build-dynamic-queries)
- 2 ways to create Expression Trees:
  - Via Lambda Expressions:

  ```(csharp)
  Expression<Func<int, bool>> lambda = num => num < 5;  
  ```

  - Explicitly, using The Expression API
    - Expression class contains static factory methods that create expression tree nodes of specific types.

  ```(csharp)
  // Add the following using directive to your code file:  
  // using System.Linq.Expressions;  

  // Manually build the expression tree for   
  // the lambda expression num => num < 5.  
  ParameterExpression numParam = Expression.Parameter(typeof(int), "num");  
  ConstantExpression five = Expression.Constant(5, typeof(int));  
  BinaryExpression numLessThanFive = Expression.LessThan(numParam, five);  
  Expression<Func<int, bool>> lambda1 =  
      Expression.Lambda<Func<int, bool>>(  
          numLessThanFive,  
          new ParameterExpression[] { numParam });
    ```

- Example parsing expression tree

```(csharp)
// Create an expression tree.  
Expression<Func<int, bool>> exprTree = num => num < 5;  

// Decompose the expression tree.  
ParameterExpression param = (ParameterExpression)exprTree.Parameters[0];  
BinaryExpression operation = (BinaryExpression)exprTree.Body;  
ParameterExpression left = (ParameterExpression)operation.Left;  
ConstantExpression right = (ConstantExpression)operation.Right;  

Console.WriteLine("Decomposed expression: {0} => {1} {2} {3}",  
                  param.Name, left.Name, operation.NodeType, right.Value);  

// This code produces the following output:  

// Decomposed expression: num => num LessThan 5
```

- The `Compile()` method lets you convert your expression tree into an executable.

## IQueryable
- [good src](https://www.developerhandbook.com/entity-framework/in-the-spotlight-demystifying-iqueryable-entity-framework-6/)
- IQueryable and IEnumerable are both deferred
- IQueryable uses expression trees and the provider to build the most efficient underlying code
  - So the provider needs to support IQueryable.
- IEnumerable will not make any effort to collapse individual method calls.
- When to use AsQueryable() in EF contexts?
  - DbSets implment both IQueryable and IEnumerable.
  - IQueryable and IEnumerable both have a lot of the same methods.
  - IQueryable will always be favored against a DbSet b/c it is listed first
    - So AsQueryable() doesn't need to be called in most EF scenarios
  - A good time to use AsQueryable() is when you have have some in-memory sequence which you want to use to query against a remote source

    ```(csharp)
    var studentList = Students.Select(s => s.Id).AsQueryAble().Select(i => remoteDBProvider.GetInfo(i));
    ```
  
## Predicate Builder Library
- [src](http://www.albahari.com/nutshell/predicatebuilder.aspx)
- AsExpandable() is required for use with EF provider and is included in [LinqKit](http://www.albahari.com/nutshell/linqkit.aspx)
- Chaining or's:

```(csharp)
IQueryable<Product> SearchProducts (params string[] keywords)
{
  var predicate = PredicateBuilder.False<Product>();

  foreach (string keyword in keywords)
  {
    string temp = keyword;
    predicate = predicate.Or (p => p.Description.Contains (temp));
  }
  return dataContext.Products.AsExpandable().Where (predicate);
}
```

- note that this:

```(csharp)
var predicate = PredicateBuilder.True <Product> ();
```

- is just a shortcut for this:

```(csharp)
Expression<Func<Product, bool>> predicate = c => true;
```

- A more detailed example:

```(csharp)
public partial class Product
{
  public static Expression<Func<Product, bool>> ContainsInDescription (
                                                params string[] keywords)
  {
    var predicate = PredicateBuilder.False<Product>();
    foreach (string keyword in keywords)
    {
      string temp = keyword;
      predicate = predicate.Or (p => p.Description.Contains (temp));
    }
    return predicate;
  }
}

var newKids  = Product.ContainsInDescription ("BlackBerry", "iPhone");
var classics = Product.ContainsInDescription ("Nokia", "Ericsson").And(Product.IsSelling());
var query = Data.Products.AsExpandable().Where (newKids.Or (classics)).Select(x => x);  
```

- A nested example:

```(csharp)
//Build this dynamically:
//p => p.Price > 100 &&
//     p.Price < 1000 &&
//     (p.Description.Contains ("foo") || p.Description.Contains ("far"))

var inner = PredicateBuilder.False<Product>();
inner = inner.Or (p => p.Description.Contains ("foo"));
inner = inner.Or (p => p.Description.Contains ("far"));

var outer = PredicateBuilder.True<Product>();
outer = outer.And (p => p.Price > 100);
outer = outer.And (p => p.Price < 1000);
outer = outer.And (inner);
```



