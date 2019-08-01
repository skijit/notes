Misc React and TypeScript
===================

- sources
  - [Best Practices for Using TypeScript with React](https://www.freecodecamp.org/news/effective-use-of-typescript-with-react-3a1389b6072a/)
  - [Miscrosoft TypeScript React Conversion Guide](https://github.com/microsoft/TypeScript-React-Conversion-Guide)
  - [lyft/react-javascript-to-typescript-transform](https://github.com/lyft/react-javascript-to-typescript-transform)
  - [react-typescript-cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)
  - [use typescript to develop react applications](https://egghead.io/courses/use-typescript-to-develop-react-applications)
  - [Ultimate React Component Patterns with Typescript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
  - [TypeScript Intersection and Union Types](https://codepunk.io/typescript-intersection-and-union-types/)
  - [Advanced TypeScript Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
  - [Typescript conditional types](https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/)
  - todo: hooks and state context

## TypeScript Advanced Types
- **Intersection** (&): Combines all the fields of multiple types

```(typescript)
interface TypeA { prop1: string; prop2: boolean };
interface TypeB { prop3: string; prop4: boolean};
Type JoinedType = TypeA & TypeB;
```

  - Although it's called an intersection, it doesn't feel like it.  For something more intuitively resembling an intersection (but totally different semantics), see `Pick`

- **Union** (|): Can be one of a set of alternative types.

```(typescript)
Type MyNullableValue = string|null;
```

- **Type Assertion** (as): When TypeScript compiler isn't able to infer the type of a type and you assert it is a particular type (e.g. service call results):
  - original operator was `<TypeName>` but this is incompatible with jsx, so now we use the `as` operator

```(typescript)
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

- **Type Narrowing with Type Predicates**: If you have a function which tests the actual type passed into it (i.e. when the parameter accepts multiple types), you can set the function's return type to a *Type Predicate* which then informs all downstream code that it is that particular type.

```(typescript)
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
```

- **Type Narrowing with In**: inline way to infer the type

```(typescript)
function move(pet: Fish | Bird) {
    // test if property 'swim' exists in pet
    if ("swim" in pet) {
        return pet.swim();
    }
    return pet.fly();
}
```

- **TSC can infer from typeof operator (primitives) or instanceof operators (ctor function)**

```(typescript)
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        // if you get here, TSC can infer that padding is a number
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        // if you get here, TSC can infer that padding is a string
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

- **Nullables**
  - In typescript, `null` and `undefined` are both **types** with corresponding values
  - **BUT**... you can assign null or undefined (values) to any other type
  - The `--strictNullChecks` flag fixes this by only letting assign null or undefined values to types which explicitly allow this (i.e. `Type Blah = Foo | null;`) 
    - Using `--strictNullChecks`, when you define optional parameters to a function of type `T` or an optional property of type `T`, this implies an actual type of `T | undefined`

- **Type Asserting something is not null or undefined** (postfix !)
  
```(typescript)
// ...
blah!.SomeFunc();  //you've just asserted that blah is some non-null, non-undefined type, (presumably having SomeFunc defined)
// ...
```

- Type Aliases
  - `Type` is just an alias for another type.
    - They can refer to built-in or user-defined types, including interfaces and other types.
    - Unlike interfaces, errors involving type aliases will only refer to the non-alised name
    - Classes can implement an interface
    - Interfaces can extend multiple other interfaces
    - Type aliases can only recently be extended
    - Type aliases are good when you have union types
    - Interfaces and Type Aliases are very similar, but you should probably choose Interfaces by default if there's any chance that another type might want to extend it at some point in the future.
    
- **Const vs Readonly**
  - Const is for variables, readonly for properties

- **'Singleton Types'**
  - Usually refer to enum or literal types
  - Don't use enum types
  - literal types are like `type theWordBoo = 'boo';`

- **Discriminated Unions**
  - Consider as an alternative to a classical inheritance hierarchy
  - Ingredients:
    - You define a common property amongst a bunch of types
    - define a union type of all those types
    - Have a type guad on the common property

```(typescript)
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

- Exhuastiveness checking with `--strickNullChecks`

```(typescript)
// make sure --strickNullChecks are on

type Shape = Square | Rectangle | Circle | Triangle;  //Triangle is new
// result = Static type error: returns number | undefined (bc Triangle case is not covered)
function area(s: Shape): number { 
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        // no triangle case, OH NO!
    }
}
```

- **Exhaustiveness Check with never**
  - `never` is a type which can be applied in dead code only
    - examples:
      - a function which is an infinite loop has a never return value
      - a function which only throws an `error` can have a never return value
    - you can use this to our advantage to guarantee that certain code is never reached, like in an exhaustiveness check.  So this gives us static guarantee of exhaustiveness.
  
```(typescript)
type Shape = Square | Rectangle | Circle | Triangle;  //Triangle is new

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // error here if there are missing cases
    }
}
```

- **Index types**
  - You can define custom types include a dynamically assigned list of property names AND their corresponding vavlues in an object.
  
  ```(typescript)
  //let's rewrite this in a type-safe way
  function pluck(o, propertyNames) {
      return propertyNames.map(n => o[n]);
  }

  //returns [2, 'foo']
  pluck({ me: 1, you: 2, him: 'foo'}, ['you', 'him']);
  ```

  ```(typescript)
  function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map(n => o[n]);
  }

  interface Car {
      manufacturer: string;
      model: string;
      year: number;
  }
  let taxi: Car = {
      manufacturer: 'Toyota',
      model: 'Camry',
      year: 2014
  };

  // Manufacturer and model are both of type string,
  // so we can pluck them both into a typed string array
  let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);

  // If we try to pluck model and year, we get an
  // array of a union type: (string | number)[]
  let modelYear = pluck(taxi, ['model', 'year'])
  ```

  - `keyof T` just refers to any of the property names of `T`
    - We usually use the `extends` here - not sure if it's necessary

- **Mapped Types**
  - Transform each property in an old type into a new type in the same way:
    - Make every property nullable
    - Make every property partial
  - These are in the standard TS library

    ```(typescript)
    type Readonly<T> = {
      readonly [P in keyof T]: T[P];
    }
    type Partial<T> = {
        [P in keyof T]?: T[P];
    }
    type Nullable<T> = { 
      [P in keyof T]: T[P] | null 
    }
    type Pick<T, K extends keyof T> = {
      [P in K]: T[P];
    }
    type Record<K extends keyof any, T> = {
        [P in K]: T;
    }
    ```

- **Pick**
  - If you look at the definition of Pick, the important thing is that it takes two template parameter types
  - So basically, you can use this for a legit property intersection (since our current intersection `&` is closer to a union)
  - [Pick example](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk)
    - but note that you could also use a non-inline type as the second parameter too

- **Record**
  - keep the properties of the first type parameter, but the corresponding values will be of the second type parameter

  ```(typescript)
  interface PageInfo {
    title: string;
  }

  type Page = 'home' | 'about' | 'contact';

  const x: Record<Page, PageInfo> = {
      about: { title: 'about' },
      contact: { title: 'contact' },
      home: { title: 'home' },
  };
  ```

- **Index-based Type Tips**
  - Mixing indexer with other properties doesn't work

  ```(typescript)
  // **Do not** use the following!
  // This is an error!
  type PartialWithNewMember<T> = {
    [P in keyof T]?: T[P];
    newMember: boolean;
  }
  ```

  - Dont mix number and string type indexes in the same type bc there's ambiguities with how `1` and `"1"` are dealt with, etc.

  ```(typescript)
  type DontBeLikeMe = {
    [myVals: string] = string;
    [myOtherVals: number] = string;
  }
  ```

- **Conditional Types**
  
  ```(typescript)
  function process<T extends string | null>(
    text: T
  ): T extends string ? string : null {
    return text && text.replace(/f/g, "p");
  }
  ```

  - `A extends B` means *A is assignable to B*
    - A doesn't literally have to extend B to be assignable to it, but B needs to be a property superset
  
    ```(typescript)
    class A {}
    class B {}

    const b: B = new A() // ✔ all good
    const a: A = new B() // ✔ all good

    new A() instanceof B // => false bc at runtime, it's differnt

    interface Shape {
      color: string
    }

    class Circle {
      color: string
      radius: number
    }

    // ✔ All good! Circles have a color
    const shape: Shape = new Circle()
    // ✘ Type error! Not all shapes have a radius!
    const circle: Circle = shape
    ```

  - `infer` keyword is used on the right side of conditional types.  Basically, it will substitute in whatever works.

  ```(typescript)
  type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
  type T10 = Foo<{ a: string, b: string }>;  // string
  type T11 = Foo<{ a: string, b: number }>;  // string | number
  ```

- **Declare**
  - used for *ambient* declarations
  - basically, you've got some variable in scope (perhaps a global or from some other module), defined in some other file, but which isn't covered by a type(script) definition file.
  - 

- **Function overloads**:
  - Just write a couple different signatures to clarify the impact on output

  ```(typescript)
  function reverse(string: string): string;
  function reverse<T>(array: T[]): T[];
  function reverse<T>(
    stringOrArray: string | T[]
  ): string | T[] {
    return typeof stringOrArray === "string"
      ? stringOrArray
          .split("")
          .reverse()
          .join("")
      : stringOrArray.slice().reverse();
  }
  ```

### Utility Types
- [src](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- Mapped Type Support
  - `Partial<T>`: makes all properties optional
  - `Required<T>`: makes all properties required (non-optional)
  - `Readonly<T>`: makes all properties readonly
  - `Record<K, T>`: makes all property's values of K conform to type T
- Type Subsetting by Selection
  - `Pick<T, K>`: pick the properties `K` from type `T`
    - `type PersonName = Pick<Person, 'firstName' | 'lastName'>;`
  - `Omit<T, K>`: remove the properites `K` from type `T`
    - `type PersonName = Omit<Person, 'age' | 'profession' | 'gender'>`
- Type Subsetting by Assignability
  - `Extract<T, U>`: Keep only the types in `T` which are assignable to `U`
    - `type T0 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"`
  - `Exclude<T, U>`: Exclude all types in `T` which are assignable to `U`
    - `type T1 = Exclude<"a" | "b" | "c", "a" | "b">;  // "c"`
- 
  - `NonNullable<T>`: Remove `null` and `undefined` as types from `T`
  - `ReturnType<T>`: Return type of the function `T`
  - `InstanceType<T>`: The type corresponding to the ctor of `T`
  

### Some Useful Patterns
- TypeSmoosher: Take objects of two types and combine them into a single typed object.

```(typescript)
function extend<First, Second>(first: First, second: Second): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            (result as First)[prop] = first[prop];
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}
```