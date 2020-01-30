Misc React and TypeScript
===================

- sources  
  - [react-typescript-cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)  
  - [Ultimate React Component Patterns with Typescript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
  - [TypeScript Intersection and Union Types](https://codepunk.io/typescript-intersection-and-union-types/)
  - [Advanced TypeScript Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
  - [Typescript conditional types](https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/)
  - [Typescript and Hooks](https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c)

## Best Practices for Typescript and React
- See the [React Type Definition](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)

### Function Components

- React Function Components are defined as such:

```(typescript)
// The top-level object type is a JavaScript Function
// Not a class or object literal, which seem more common
// But this is React - it's pretty function-oriented
interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}

type PropsWithChildren<P> = P & { children?: ReactNode };
```

- So even though you can define a functional component like so, you won't get the benefit of any of it's other properties.

```(typescript)
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

- A reminder of dealing with function interfaces of this type:

```(typescript)
interface SearchFunc {
    (source: string, subString: string): boolean,
    someOtherProp?: string
};
let mySearch: SearchFunc = (source: string, subString: string): boolean => {
    let result = source.search(subString);
    return result > -1;
}
mySearch.someOtherProp = "boogey";
mySearch.notPartOfMyProp = false;  //type ERROR
```

- Another way to assign the other properties (e.g. default parameters) in a functional interface is with a [HOC](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935).
  - BUT: in the case of defaultProps, just use default parameters in TypeScript.  That's easy and preferable.

- We can also define a plain ol function as a functional component, but then we don't get those additional properties.

- Btw, the second parameter to function, `context` is part of the **old Context API**, so just ignore it.  It'll be removed in react 17.*
  - Same with the `contextTypes` property in `FunctionComponent`

```(typescript)
type AppProps = { message: string }; /* could also use interface */
const App = ({ message }: AppProps) : ReactElement => <div>{message}</div>;
```

### Component Children and Render Prop API
- For portability, we want to support **both** two methods for injecting one react-node into another:
  1. render prop 
  2. children api
  - Although our components will implment both patterns, the logic will be exlusive (see below)
- To start, we define a prop pattern which adds two additional (optional) params:

```(typecript)
type Props = Partial<{
  children: RenderCallback
  render: RenderCallback
}>
type RenderCallback = (args: ToggleableComponentProps) => JSX.Element
type ToggleableComponentProps = { 
  show: State['show']
  toggle: Toggleable['toggle'] 
}
```

- Then the component definition looks like so (notice the exclusive logic):

```(tsx)
export class Toggleable extends Component<Props, State> {
  // ...
  render() {
    const { children, render } = this.props
    const renderProps = { show: this.state.show, toggle: this.toggle }
    if (render) {
      return render(renderProps)  //renderProps are the parameters we inject into the child function, but which live in the parent
    }
    return isFunction(children) ? children(renderProps) : null
  }
  // ...
}
```

- Now we have two options for calling:

```(tsx)
<Toggleable>
  {({ show, toggle }) => (
    <>
      <div onClick={toggle}>
        <h1>Some title</h1>
      </div>
      { show ? <p>some content</p> : null}
    </>
  )}
</Toggleable>

<Toggleable render={({ show, toggle }) => (
    <>
      <div onClick={toggle}>
        <h1>Some title</h1>
      </div>
      { show ? <p>some content</p> : null}
    </>
  )
} />
```

### Component Injection
- Another pattern for passing one component to another is like what you see with React Router (a `component` property):

```(jsx)
<Route path="/foo" component={MyView} />
```

- This is useful if you want to completely change the component being injected, rather than just have some conditional logic
  - When you do this, make sure you implement it as a generic component so you can retain type safety
- Google for details for this pattern - not really worth repeating herre - it's rather low frequency

- For additional component patterns, like: HOC, Controlled Components, Generic Components, etc.  [See this](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)

### Other stuff
- If you dont have the PropType exported, you can programmatically retrieve it:

```(typescript)
import { Button } from "library"; // but doesn't export ButtonProps! oh no!
type ButtonProps = React.ComponentProps<typeof Button>; // no problem! grab your own!
```


## Hooks

- Some sources...
  - [Continue here](https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c)
  - [then here](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)

- Hooks let you share logic, state, access context, and lifecycle events
- React team imagines that they might replace class components entirely
- Previous methods were Higher Order Components and Render Props
- We no longer call Function Components 'Stateless' since they might have state via hooks
- Hooks can only be used in Function Components
- Lets you separate logic out of your components even easier - good for testing / development
- Don't ever put a hook call inside conditional logic.  If you need to, you can put the conditional logic inside the hook instead.

- **useState**
  - use case: local state in a function component - can be passed down to subcomponents via props
  - when state is updated, the function will re-render, but state is retained locally

  ```(typescript)
  import * as React from 'react';

  interface IUser {
    username: string;
    email:  string;
    password: string;
  }

  const ComplexState = ({ initialUserData }) => {
    const [user, setUser] = React.useState<IUser | null>(initialUserData);
    
    if (!user) {
      // do something else when our user is null
    }

    return (
      <form>
        <input value={user.username} onChange={e => setUser({...user, username: e.target.value})} />
        <input value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
        <input value={user.password} onChange={e => setUser({...user, password: e.target.value})} />
      </form>  
    );
  }
  ```

  - Interesting bits:
    - Compare to a class-based approach:
      - A class-based approach might involve a private value or property and some setter
      - Here we get the value and a set method : so pretty similar
    - Parameter to setState (e.g. `setUser()`):
      - Normally: just one parameter - the new state
      - However: if your function depends on the old state value, pass in a callback to compute: `setCount(prevCount => prevCount + 1)`
    - Merging state objects:
      - This works: `setState(prevState => ({ ...prevState, ...updatedValues }))`
      - If you get in this situation, it's probably better just to `useReducer`
    - Initialize as such with typescript:
    
    ```(typescript)
    const [user, setUser] = React.useState<IUser | null>(null);
    ```

- **useEffect**
  - typically you want to perform side effects after the rendering is done.  
  - in class-based components, you do this with lifecycle methods, but in function components, you do it with `useEffect`
  - after a component renders, your side effect callbacks get executed!

  ```(typescript)
  function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  
  // The first argument, `effect`
  // If it returns a function, this is a cleanup function that will be called on componentWillUnmount
  type EffectCallback = () => (void | (() => void | undefined));

  // The second argument, `deps?`
  // if === null||undefined, effect callback is called on componentDidMount, componentDidUpdate, componentWillUnmount
  // if === [], effect callback is called on componentDidMount
  // if === [...someValues], effect callback is called when one of the values changes
  
  type DependencyList = ReadonlyArray<any>;
  ```

  - Component mounting: whenever the clock is rendered to the DOM for the first time
  - ![react-lifecycle](/resources/images/programming/react-lifecycle.jpg)

  - Other `useEffect` tips:
    - **do not** return anything other than a function or undefined

- **useContext**
  - Context was an experimental API that, due only recently became an official part of React
    - The fact that is was experimental probably explains the prominence of global state solutions (e.g. redux) since without either you have proliferation of prop-drilling.
  - Class components were the first to be able to consume these, but the `useContext` hook brings the same functionality to function components.
  - You can use context to deliver:
    - state
    - logic (functions)
    - any combination of the 2
  - When the context value updates, the component is re-rendered
  - If there's any part of React that has Dependency Injection: its Context
  - Any Context usage has 4 different parts:
    1. Context Creation
    2. Context Provider (i.e. Publishes a value)
      - Can be hierarchical versions of the same data, or they can be provided as singleton
    3. Context Subscriber 
      - for function components: its connected to `useContext()`
      - for class components: its connected to a static member
    4. State Persistence
      - None of the built-in Context functionality covers persistence, so you'll need something like:
        - `useState`
        - `useReducer`
  - Context Creation:
    - `createContext<T>(init: T)` will create a Context object defined as:

    ```(typescript)
    interface Context<T> {
      Provider: Provider<T>;
      Consumer: Consumer<T>;
      displayName?: string;
    }
    ```

    - the optional argument is the default value, which should be overwritten by the provider
      - if you don't overwrite it by the provider, you have static data which you might as well keep as a constant

  - Context Publisher
    - Typical method is in Jsx, as such:

    ```(jsx)
    <CurrentRoute.Provider value={{path: '/welcome'}}>
    ```

      - Instead of this pure JSX approach, you could use a HOC to wrap any number of components    
      - By making the HOC contain some logic about what types of values to inject, you could have a sort of polymorphic DI-approach
      - See the other example where a custom component returns a Theme Provider... that's rather nice.

  - Context Subscriber

    ```(jsx)
    let currentRoute = useContext(CurrentRoute)
    ```

  - Simple Example:

    ```(typescript)
    import React from 'react'

    export const CurrentRoute = React.createContext({ path: '/welcome' })
    export const CurrentUser = React.createContext(undefined)
    export const IsStatic = React.createContext(false)

    //you can also initialize the Context in jsx:
    //<CurrentRoute.Provider value={{path: '/welcome'}}>
    //then the consumer will use the most recent value
    ```

    - consume context in component

    ```(typescript)
    import React, { useContext } from 'react'
    import * as ctx from '.sharedCtx'

    export default function App() {
      let currentRoute = useContext(CurrentRoute)
      let currentUser = useContext(CurrentUser)
      let isStatic = useContext(IsStatic)

      return (
        !isStatic &&
        currentRoute.path === '/welcome' &&
        (currentUser
          ? `Welcome back, ${currentUser.name}!`
          : 'Welcome!'
        )
      )
    }
    ```

  - **Question**: How do you change the value in the context?
    - **Answer**: [src](https://stackoverflow.com/questions/54738681/how-to-change-context-value-while-using-react-hook-of-usecontext)
    - TL/DR: The values should be backed by a stateful (`useState` or `useReducer`) hook and you publish the value and the corresponding setter

    ```(typescript)
    const { createContext, useContext, useState } = React;

    const ThemeContext = createContext(null);

    function Content() {
      const { style, visible, toggleStyle, toggleVisible } = useContext(
        ThemeContext
      );

      return (
        <div>
          <p>
            The theme is <em>{style}</em> and state of visibility is
            <em> {visible.toString()}</em>
          </p>
          <button onClick={toggleStyle}>Change Theme</button>
          <button onClick={toggleVisible}>Change Visibility</button>
        </div>
      );
    }

    function App() {
      const [style, setStyle] = useState("light");
      const [visible, setVisible] = useState(true);

      function toggleStyle() {
        setStyle(style => (style === "light" ? "dark" : "light"));
      }
      function toggleVisible() {
        setVisible(visible => !visible);
      }

      return (
        <ThemeContext.Provider
          value={{ style, visible, toggleStyle, toggleVisible }}
        >
          <Content />
        </ThemeContext.Provider>
      );
    }

    ReactDOM.render(<App />, document.getElementById("root"));
    ```

  - Best Practices:
    - You'll want to have a persistence (useState or useReducer) or custom hook behind the context implementation
    - If you use a custom hook, then you can use that to wrap a persistence and side-effect hook into the same API
    - The other approach is to wrap the Subsciber into a custom hook (example below)    
    - Good good candidates for global state:
      - Errors
      - In progress async calls
      - Todo - add more

  - Another example ([src](https://kentcdodds.com/blog/application-state-management-with-react)) with wrapping everything in a custom hook:

  ```(jsx)
  // src/count/count-context.js
  import React from 'react'
  const CountContext = React.createContext()
  function useCount() {
    const context = React.useContext(CountContext)
    if (!context) {
      throw new Error(`useCount must be used within a CountProvider`)
    }
    return context
  }
  function CountProvider(props) {
    const [count, setCount] = React.useState(0)
    const value = React.useMemo(() => [count, setCount], [count])
    return <CountContext.Provider value={value} {...props} />
  }
  export {CountProvider, useCount}
  // src/count/page.js
  import React from 'react'
  import {CountProvider, useCount} from './count-context'
  function Counter() {
    const [count, setCount] = useCount()
    const increment = () => setCount(c => c + 1)
    return <button onClick={increment}>{count}</button>
  }
  function CountDisplay() {
    const [count] = useCount()
    return <div>The current counter count is {count}</div>
  }
  function CountPage() {
    return (
      <div>
        <CountProvider>
          <CountDisplay />
          <Counter />
        </CountProvider>
      </div>
    )
  }
  ```

  - Recall/Compare Redux Problems:
    - Redux has you pass down global state (or slices thereof) and corresponding actions from a container component down to sub-components.  This causes problems:
    - **Implicit Prop-drilling**:
      - You also expand the surface of dependencies available to a sub-component without necessarily tight control over the typing (TMI for components can lead to conflicts/collisions)
    - **Increased Re-rendering**
      - You end up passing a bunch of data and actions into sub-components that aren't necessary which means you have to re-render whenever some (possibly unrelated) props change  
    - **Artificially Lifting state increases complexity**
      - If you don't strictly control the interactions between components' actions and data (e.g. a limited interface), then you create a tangled web of dependencies 
      - There's no restrictions on adding these dependencies since everything is global and visible in redux (in some implmentations)
      - Makes it harder to know where to put functionality, which results in less DRY, more inconsistent code
      - Basically, it scales poorly


  - Reminder of how to use async:
    - Pass an async method into useEffect()
    - After awaiting, use the persistence hooks setter
    - Remember that the effect only gets called **after a re-render** (or maybe even only at mount depending on how you set it up)

    ```(jsx)
    function Reddit() {
      // Initialize state to hold the posts
      const [posts, setPosts] = useState([]);

      // Use an async function so that we can await the fetch
      useEffect(async () => {
        // Call fetch as usual
        const res = await fetch(
          "https://www.reddit.com/r/reactjs.json"
        );

        // Pull out the data as usual
        const json = await res.json();

        // Save the posts into state
        // (look at the Network tab to see why the path is like this)
        setPosts(json.data.children.map(c => c.data));
      }); // <-- we didn't pass a value. what do you think will happen?

      // Render as usual
      return (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      );
    }
    ```
    
  - **Persistence hook options**: useState vs useReducer
    - [per kentcdodds](https://kentcdodds.com/blog/should-i-usestate-or-usereducer):
      - useState is good for prototyping as you're trying to figure out how your app works.  Once you know, reducer is probably a better solution.
      - if you have async, useReducer helps insure you're not working with stale values.
      

- **useCallback**
  - Allows you to memo'ize (cache) a function definition
  - Sometimes when you have functions defined within a function component, they'll be redefined as part of the render cycle 
    - That's lame
  - Difference between useCallback and useMemo is basically that useMemo will cache the return values
  - **Important**:  Don't declare and consume the memo/async in the same component.
    - see [this](https://kentcdodds.com/blog/usememo-and-usecallback) blogpost
    - TL/DR: the benefit of useMemo/useAsync is to cache a value/function to avoid triggering unnecessary re-renders in a **child component** which receives them (as props).  
  - Don't use side-effect hooks in callbacks or memos
  - see [this blog](https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/) for more context, but here's a quick example:

  ```(jsx)
  //BEFORE
  const App = () => {
    const [delta, setDelta] = useState(1);
    const [c, setC] = useState(0);

    // Oh no! This gets redefined each re-render!
    const incrementDelta = () => setDelta(delta => delta + 1);
    const increment = () => setC(c => c + delta);
    
    return (<div>
      <div> Delta is {delta} </div>
      <div> Counter is {c} </div>
      <br/>
      <div>
        <Button onClick={incrementDelta}>Increment Delta</Button>
        <Button onClick={increment}>Increment Counter</Button>
      </div>
      <br/>
      <div> Newly Created Functions: {functions.size - 2} </div>
    </div>)
  }

  //AFTER
  const App = () => {
    const [delta, setDelta] = useState(1);
    const [c, setC] = useState(0);

    // Sets dependency on increment to delta
    const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
    const increment = useCallback(() => setC(c => c + delta), [delta]);
    
    return (<div>
      <div> Delta is {delta} </div>
      <div> Counter is {c} </div>
      <br/>
      <div>
        <Button onClick={incrementDelta}>Increment Delta</Button>
        <Button onClick={increment}>Increment Counter</Button>
      </div>
      <br/>
      <div> Newly Created Functions: {functions.size - 2} </div>
    </div>)
  }
  ```

- **useMemo**
  - Same signature as `useCallback`
  - Stores the results based on the dependency list, so it's best to use for an expensive calculation

  
- **useRef**
  
  ```(typescript)
  function TextInputWithFocusButton() {
    // The type of our ref is an input element
    const inputEl = useRef<HTMLInputElement>(null);
    const onButtonClick = () => {
      // `current` points to the mounted text input element
      inputEl.current.focus();
    };

    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }
  ```

- **Custom Hooks**
  - Alternative to HOC's and Render Props
  
  - Hook definition:
    - Encapsulates state with useState
    - Encapsulates stateful logic, and returns a single value
    - Scoping:
      - Statically imported into consumer 
      - Every time you use a custom hook, all state and effects inside it are fully isolated
        - It's actually isolated for each call (which is why you can have multiple useState() calls inside a component, for instance)
    
    ```(typescript)
    import React, { useState, useEffect } from 'react';

    type Hook = (friendID: number) => boolean

    interface IStatus {
      id: number;
      isOnline: boolean;
    }

    const useFriendStatus: Hook = (friendID) => {
      // The type of the value and function are inferred
      const [isOnline, setIsOnline] = useState<boolean | null>(null);

      function handleStatusChange(status: IStatus) {
        setIsOnline(status.isOnline);
      }

      useEffect(() => {
        // assume a legit subscription: callback is called whenever Friend Status changes
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
      });

      return isOnline;
    }
    ```

  - Hook usage:

    ```(typescript)
    import * as React from 'react';
    import useFriendStatus from './useFriendStatus';

    interface IUser {
      id: number;
      username: string;
    }

    const FriendsListItem ({ user }) => {
      // We know this value is a boolean since we defined our hook
      const isOnline = userFriendStatus(user.id);
      return (
        <li>
          <span style={{ backgroundColor: isOnline ? 'green' : 'red }} />
          <span>
            {user.username}
          </span>
        <li>
      );
    };
    ```

    - tip:
      - if your custom hook returns an array of values, return those in a top-level object (otherwise destructuring might go amiss)

  - **useReducer**
    - tips:
      - use discriminated unions for action types
      - define the return type of action reducers or ts will infer it

## JavaScript to TypeScript Conversion
- 2 high level steps:
  1. Adding Tsc to build process
    - In webpack, switch `babel-loader` to one of the typescript loaders (`awesome-typescript-loader` or `ts-loader`)
      - You could also keep babel, and just run the typescript loader first
    - add `source-map-loader` to webpack too
    - add the various react type files

  2. Converting JS to TS
    - Have React Components inherit from appropriate classes
    - Normally you import like this in typescript

      ```(typescript)
      import * as React from "react";
      import * as ReactDOM from "react-dom";
      ```

      - But in jsx, you would import like this

      ```(typescript)
      import React from "react";
      import ReactDOM from "react-dom";    
      ```

      - You can keep on doing this if you check: `--allowSyntheticDefaultImports`

- Functional components can be written as a plain ol function
        

- The [Lyt React Converter](https://github.com/lyft/react-javascript-to-typescript-transform) will
  - Convert PropTypes to a property type passed into Components
  - Provide state typing based on initial and setState
  - Pull out big interfaces into designated files
  - Convert functional components with proptypes

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

  - **Important**: this kind of flexible typing is possible with classes and interfaces, but not object literals
    - You can derive a type from an object literal, but as soon as you specify an object literal on the right side, it needs to be exact!

  ```(typescript)
  const initialState = { clicksCount: 0 };
  type FooLiteral = typeof initialState;
  const foo1: FooLiteral = {clicksCount:1, otherProp: false};  
  //gives you an error only on property otherProp bc 
  //'object literal may only specify known properties'

  interface iFoo { clicksCount: number }
  const foo2: iFoo = { clicksCount: 0, otherProp: false};
  //gives you an error only on property otherProp bc 
  //'object literal may only specify known properties'

  class Foo { constructor(public clicksCount: number) {} }
  class FooPlus { constructor(public clicksCount: number, public otherProp: boolean) {} }
  const foo3 : Foo = new FooPlus(0, false);
  //totally fine!

  const foo4: iFoo = new FooPlus(0, false);
  //totally fine!

  const foo5: FooLiteral = new FooPlus(0, false);
  //totally fine!
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

- TypeScript Declaration Merging
  - When you need to extend a type which is defined elsewhere (typically a library)
  - *Declaration Merging* describes how the TS compiler will merge (usually take a union) declarations (including type alias and interfaces) 
  - [Practical example of extending a library definition](https://stackoverflow.com/questions/53568981/typescript-declaration-merging-library-types)
  - [Detailed explanation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
