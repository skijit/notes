LifeCycle Methods and Hooks in React
=====================

- [src on lifecycle methods](https://blog.bitsrc.io/react-16-lifecycle-methods-how-and-when-to-use-them-f4ad31fb2282)
- these are listed in order that they're called

## Lifecycle Methods

### Constructor
- first called
- only valid for class-based components
- remember to call `super()`
- use cases:
  - setting up state
  - creating refs
  - method binding

### getDerivedStateFromProps
- last method which is called before `render()`
- returns a state object
- you don't have access to the `this`
- it is a static method
- use cases:
  - return / update state object based on initial props

### shouldComponentUpdate
- parameters include new props and new state
- returns a boolean which determins whether `render()` is called

### render
- render

### componentDidMount
- called after `render()` first executes
- you perform setup in here that wasn't possible when there was no component in the DOM
- use cases:
  - assign event listeners
  - Dom manipulation
  - AJAX calls

### getSnapshotBeforeUpdate
- called after `render()` completes
- takes parameters for prevProps and preState
- returns an object that is passed as 3rd parameter to `componentDidUpdate()`
- use case:
  - view DOM and pass a special parameter to `componentDidUpdate()`

### componentDidUpdate
- 3 parameters
  1. prevProps
  2. prevState
  3. snapshot (see above method)
- use case:
  - do something after committing changes to the DOM via `render()`

### componentWillUnmount
- called right before component is destroyed
- use case:
  - unsubscribing
  - removing listeners
  - cancel long running requests

### getDerivedStateFromError
- catch error in child component

### componentDidCatch
- catch error in child components
- good for catching and logging errors

## Hooks
- Main Use cases are to provide more feature parity for functional components vs class-based components:
  - hook side-effects are alternatives to lifecycle methods (which are only available in class methods)
  - state hooks provide a local state
- Redux offers a hook-based set of API's as an alternative to the existing `connect()` HOC
  - For more info, see [here](https://react-redux.js.org/next/api/hooks)
- introduced in React 16.8
- If you look at the component hierarchy in react dev tools, you'll find a "wrapper hell" of components surrounded by layers of providers, consumers, hocs, and render props.  
  - This reflects the underlying problem that react needs a better primitve for sharing **stateful logic**
  - Hooks lets you share stateful logic and extract them from a component, making them easier to test.
- TODO: There are lots of documents on how to refactor existing applications to use hooks 
- Extended use cases (TODO):
  - explore use-cases both with and without redux
  - There seem to be a lot of people using hooks + Context to implement the redux pattern

- State hook example:

```(jsx)
// simple state hook
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"

  // useState is a hook!
  const [count, setCount] = useState(0);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- Side effect hook example:

```(jsx)
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- React will run your "effect" function after flushing changes to the DOM (including first render)
- Effects are declared inside the component so they have access to it's props and state.
- If the effect function returns a function, that will be run like ComponentDidUnmount (so it's good for unsubscribing, etc.)
- You can use more than a single effect function in a component
  - So you don't have to group all your side-effects rather arbitrarily by calling them in a single lifecycle method
- Hooks rules:
  - Call only at top level
    - not in loops, conditions, or nested functions
  - Only call hooks from react function components
- Custom hooks let you reuse stateful logic
  - State itself is not shared, but the logic is state-based and very portable
  - **state-based logic** is like the logic-based wrapper around the state. (but remember the state is independent - there is nothing persisted in there)
    - use cases
      - external API
      - form handling
      - animation
      - timers
    - in this example, you have two components using a custom hook which provides state-based logic.

    ```(jsx)
    import React, { useState, useEffect } from 'react';

    function useFriendStatus(friendID) {
      const [isOnline, setIsOnline] = useState(null);

      function handleStatusChange(status) {
        setIsOnline(status.isOnline);
      }

      useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
      });

      return isOnline;
    }

    function FriendStatus(props) {
      const isOnline = useFriendStatus(props.friend.id);

      if (isOnline === null) {
        return 'Loading...';
      }
      return isOnline ? 'Online' : 'Offline';
    }

    function FriendListItem(props) {
      const isOnline = useFriendStatus(props.friend.id);

      return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
          {props.friend.name}
        </li>
      );
    }
    ```

  - custom hook names always begin with *use*

- `useContext` lets you subscribe to the React context without introducing nesting

```(jsx)
function Example() {
  const locale = useContext(Localeontext);
  const theme = useContext(ThemeContext);
}
```

  - context api is a little wacky with functional components, so this is totally the way to go

- `useReducer` lets you manage state with a reducer.








