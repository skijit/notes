#Applying S.O.L.I.D. Principles for C#

- The principles are...
    1. **S**: (SRP) Single Responsibility
    2. **O**: (OCP) Open/Closed
    3. **L**: (LSP) Liskov Substitution
    4. **I**: (I) Interface Segregation
    5. **D**: (DIP) Dependency Inversion
        - this is NOT dependency INJECTION
        
- Single Responsibility
    - **More accurately**: Only one requirement which, when changed, will cause the class to change

- Open / Closed
    - You can't add Open / Closed Principle on top of software that doesn't implement SRP
    - **Open For Extension** && **Closed For Modification**
    - Once a class is Done, it's DONE.  Don't change it.
    - Extending it means to derive a class from the original class.
    - If you follow the Open/Closed principle, then you should NOT have to refactor your tests all the time.
    - Meyer vs Polymorphic
        - Meyer: Open / Closed Orthodoxy using inheritance as the method of extension
        - Polymorphic: Rather than using inheritance as the method of extension, but we could inherit from an abstract base class or implementing an interface.
        - Meyer approach means we need to determine how many methods we should make _virtual_

- Liskov Substitution Principle
    - A subclass should behave in such a way that it will not cause problems when used instead of the super class.
    - "Rules"
        - Contravariance of method arguments in subclass
            - Your subclasses overriden methods can make signature changes, but they should always be able to accept the parameters required by the super class.
        - Covariance of return types in the subclass
            - The return type of the overriden methods can return any objects which are descendants of the type returned by the corresponding method in the super class.
        - GREAT NEWS ABOUT C#: It makes breaking these first two rules almost impossible.
        - Don't introduce new exception types which would break/not be caught by the super class
        - Preconditions cannot be strengthened in a subtype:
        - Postconditions cannot be weakened in a subtype
        - History constraint: Anything which is immutable in the base class needs to be immutable in the subclass.
        - **TODO** review Contravariance and Covariance

- Interface Segregation Principle
    - Classes should not have to depend on interfaces they don't use
    - Interfaces should be very lean

- Dependency Inversion Principle
    - NOT DEPENDENCY INJECTION - that's different
        - But you can use Dependency Injection to achieve Dependency Inversion
    - Basically just says that everything should depend only on abstractions
    - Methods to achience Dependency Injection
        - Patterns like DI and Factory
    -   - IOC containers
    
