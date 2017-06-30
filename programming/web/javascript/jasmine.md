Testing with Jasmine
=========================

- jasmine is a testing framework for javascript, python, and ruby
- it also figures heavily into Angular2, as CLI projects use it as the testing api
  - although it uses the karma test runner 
- [good jasmine (2.6) doc](https://jasmine.github.io/2.6/introduction)


## Terminology

- suite
    - represented by `describe()`
        - has 2 parameters: 
            - string: name or title of suite
              - usually formulated like 'when so and so and so and so'
              - and then the spec will be like (it) 'should blah blah blah'
            - function: implements the test    
- spec
    - represented by `it()`
- expectations
    - represented by `expect()` - basically an assert
    - usage: `expect(<value>).<matcherFunction>`
- matcher
    - function takes the expected value and compares it to the actual value (one of its parameters)

## Matchers

- `toBe()`: compares with '==='
    - `expect(true).toBe(true);`
- `not()` can be chained with things like `toBe()`
    - ` expect(false).not.toBe(true);`
- `toEqual()` is for simple literals and variables
    - `let a = 12; expect(a).toEqual(12); `
- `toMatch()`: regular expressions
- `toBeDefined()`: compares against the value 'undefined'
- `toBeNull()`: checks if null
- `toBeTruthy()`
- `toBeFalsy()`
- `toContain()` looks for matching items in an array, or substring
    - ```var a = ["foo", "bar", "baz"];  expect(a).toContain("bar");```
- `toBeGreaterThan()`
- `toBeLessThan()`
- `toThrow()` tests if a function throws an exception and `toThrowError()` tests for a specfic thrown exception (e.g. TypeError)

```(typescript)
 it("The 'toThrow' matcher is for testing if a function throws an exception", function() {
    var foo = function() {
      return 1 + 2;
    };
    var bar = function() {
      return a + 1;
    };
    var baz = function() {
      throw 'what';
    };

    expect(foo).not.toThrow();
    expect(bar).toThrow();
    expect(baz).toThrow('what');
  });

  it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
    var foo = function() {
      throw new TypeError("foo bar baz");
    };

    expect(foo).toThrowError("foo bar baz");
    expect(foo).toThrowError(/bar/);
    expect(foo).toThrowError(TypeError);
    expect(foo).toThrowError(TypeError, "foo bar baz");
  });
});
```

- you can also write [custom matchers](https://jasmine.github.io/2.6/custom_matcher.html), if you want.

## Suite Config

- Before each individual spec (`it()`) in a suite you can use the `beforeEach(():void)` function
    - also available are:
        - `afterEach()`
        - `beforeAll()`
        - `afterAll()`
- Sharing state with `this` between each `beforeEach()` / `it()` / `afterEach()` combination
    - But there is no shared state (via `this`) between each successive `it()` call
- suites can be nested and share state

```(javascript)
describe("A spec", function() {
  var foo;

  beforeEach(function() {
    foo = 0;
    foo += 1;
  });

  afterEach(function() {
    foo = 0;
  });

  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(1);
  });

  it("can have more than one expectation", function() {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });

  describe("nested inside a second describe", function() {
    var bar;

    beforeEach(function() {
      bar = 1;
    });

    it("can reference both scopes as needed", function() {
      expect(foo).toEqual(bar);
    });
  });
});
```

- if you change your `describes()` to `xdescribes()`, they will not be run

## Manual Result Assignment

- Failing
  - if you call `fail()` in your test it will automatically fail.
    - You can pass a string message as a parameter
- Pending
    - specs marked *pending* do not run, but their names show up in the test results as pending
    - ways to mark a spec as pending:
        - call the `pending()` function anywhere inside it
        - change the `it()` to `xit()`
        - if the `it()` doesn't have a function body

## Utility Functions
- `jasmine.any(typeof blah)` - like an *instanceof* matcher, returns boolean

  ```(javascript)
  expect({}).toEqual(jasmine.any(Object));
  expect(12).toEqual(jasmine.any(Number));
  ```

  - also very useful in combination with `toHaveBeenCalledWith()`

  ```(javascript)
    describe("when used with a spy", function() {
      it("is useful for comparing arguments", function() {
        var foo = jasmine.createSpy('foo');
        foo(12, function() {
          return true;
        });

        expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
      });
    });
  ```

- `jasmine.anything(value)` - returns true if the value is not null or undefined
- `jasmine.objectContaining()` - compares the kv pairs in an object you explicitly list

```(javascript)
let foo = {
  a: 1,
  b: 2,
  bar: "baz"
};

expect(foo).toEqual(jasmine.objectContaining({
  bar: "baz"
}));
expect(foo).not.toEqual(jasmine.objectContaining({
  c: 37
}));


var callback = jasmine.createSpy('callback');

callback({
  bar: "baz"
});

expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
  bar: "baz"
}));
```

- `jasmine.arrayContaining()`: compares only the items you explicitly list

```(javascript)
let foo = [1, 2, 3, 4];

expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
```

- `jasmine.stringMatching()`: 

```(javascript)
expect({foo: 'foobarbaz'}).toEqual({foo: jasmine.stringMatching('bar')});
```

- custom equality matcher function

```(javascript)
var tester = {
  asymmetricMatch: function(actual) {
    var secondValue = actual.split(',')[1];
    return secondValue === 'bar';
  }
};

it("dives in deep", function() {
  expect("foo,bar,baz,quux").toEqual(tester);
});
```

## Spies

- Lets you monitor inputs and outputs of called functions
- Allows you to stub / hijack / override function behavior and optionally, return to normal behavior too
- 3 ways to create a spy
  1. Refer (hijack/monitor) to an existing function
  2. Create a bare spy for a single function
  3. Create a new object with a bunch of spy functions in it.

### Spy based on Function

- Spy Setup Example - `spyOn()`

```(typescript)
describe("A spy", function() {
  var foo, bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  //specs here
}
```

### Bare Spy

- This is good for mocking a function: pure stubbing
- With a bare spy, there is no implementation (to hijack / override)

```(javascript)
describe("A spy, when created manually", function() {
  var whatAmI;

  beforeEach(function() {
    whatAmI = jasmine.createSpy('whatAmI');

    whatAmI("I", "am", "a", "spy");
  });

  it("is named, which helps in error reporting", function() {
    expect(whatAmI.and.identity()).toEqual('whatAmI');
  });

  it("tracks that the spy was called", function() {
    expect(whatAmI).toHaveBeenCalled();
  });

  it("tracks its number of calls", function() {
    expect(whatAmI.calls.count()).toEqual(1);
  });

});
```

### Creating a Spy Object

- Good option for mocking an entire object with spies
- use the `createSpyObj()` which creates a spy in the object for each string passed to it

```(javascript)
describe("Multiple spies, when created manually", function() {
  var tape;

  beforeEach(function() {
    tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

    tape.play();
    tape.pause();
    tape.rewind(0);
  });

  it("creates spies for each requested function", function() {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();
  });

  it("tracks that the spies were called", function() {
    expect(tape.play).toHaveBeenCalled();
    expect(tape.pause).toHaveBeenCalled();
    expect(tape.rewind).toHaveBeenCalled();
    expect(tape.stop).not.toHaveBeenCalled();
  });

  it("tracks all the arguments of its calls", function() {
    expect(tape.rewind).toHaveBeenCalledWith(0);
  });
});
```

### Spy Setup Functions

- `spyOn(obj: any, functionName : string)`
- `.and.callThrough()`: tracks that the spied function was called, and actually lets it execute
  - default behavior is no call-through
- `.and.returnValue(value)`: makes all cals to the function return this specific value
- `.and.returnValue(first_rv, second_rv, ...)`: returns the successive values for each call
- `.and.callFake(function)`: calls a different function

```(javascript)
spyOn(foo, "getBar").and.callFake((arguments, can, be, received) => { return 1001; });
```

- `.and.throwError(errVal)`: all calls to the spied-on function will throw this error
- `.and.stub()`: you can cancel the callThrough() behavior


### Spy Matchers

- `toHaveBeenCalled()`: tells you that a function has been called
- `toHaveBeenCalledTimestimes()`: passes if the spy was called the specified number of times
- `toHaveBeenCalledWith(params)`: returns true if the spied functino was called with these values


### Other Spy Tracking Properties

- every call to a spy is tracked and exposed via the `calls` property
- `calls.any()` returns true if the spy has ben called at least once
- `calls.count()` returns the number of times the spy has been called
- `calls.argsFor(index)` returns the args passed to call number index

```(javascript)
foo.setBar(123);
foo.setBar(456, "baz");

expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
```

- `calls.allArgs()` returns an array of each set of args passed for each call

```(javascript)
foo.setBar(123);
foo.setBar(456, "baz");

expect(foo.setBar.calls.allArgs()).toEqual([[123],[456, "baz"]]);
```

- `calls.mostRecent()` returns the calling context (the *this*) for the most recent call.

```(javascript)
foo.setBar(123);
foo.setBar(456, "baz");

expect(foo.setBar.calls.mostRecent()).toEqual(jasmine.objectContaining({object: foo, args: [456, "baz"], returnValue: undefined}));
```

- `calls.first()` is like mostRecent() but for the first call to the spy
- `calls.reset()` clears all trackign for a spy

## Async

- If your spec has some async work to do, you can pass in a *done* parameter to your `beforeEach()` and your `it()`
- Call `done()` when you async work completes
- By default, jasmine waits 5 seconds before timing out with a fail
  - You can change the global timeout interval, or you can pass in the timeout interval as a second parameter to `beforeEach()` or `it()`
- You can also manually fail the spec by calling `done.fail()`

```(javascript)
describe("Asynchronous specs", function() {
  var value;

  beforeEach(function(done) {
    setTimeout(function() {
      value = 0;
      done();
    }, 1);
  });

  it("should support async execution of test preparation and expectations", function(done) {
    value++;
    expect(value).toBeGreaterThan(0);
    done();
  });

  describe("long asynchronous specs", function() {
    beforeEach(function(done) {
      done();
    }, 1000);

    it("takes a long time", function(done) {
      setTimeout(function() {
        done();
      }, 9000);
    }, 10000);

    afterEach(function(done) {
      done();
    }, 1000);
  });

  describe("A spec using done.fail", function() {
    var foo = function(x, callBack1, callBack2) {
      if (x) {
        setTimeout(callBack1, 0);
      } else {
        setTimeout(callBack2, 0);
      }
    };

    it("should not call the second callBack", function(done) {
      foo(true,
        done,
        function() {
          done.fail("Second callback has been called");
        }
      );
    });
  });
});
```


