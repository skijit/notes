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


## TODO
- review some of the pluralsight courses on the subject