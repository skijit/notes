A Miscellaneous Collection of Tips For C#
=====

## Structs
- Can have:
    - public & private members
    - constructors (though not a default constructor)
    - implement interfaces (though when you handle instances polymorphically, they'll get boxed)
- Best to make them immutable (members should be ```private readonly```) so that when following value-type copy semantics you don't get inconsistencies

## Structs vs Classes
- Structs don't have the allocation/GC overhead of classes
- If you box a struct (such as when using it to implement an interface) frequently, their heap benefits are negated
- If the struct size is large, then passing by value and deep copies can become a problem.
