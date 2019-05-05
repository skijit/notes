React - Redux Notes
=========================

## 4 Ways to Create React Component 

### createClass
- original way, used less frequently these days

```(javascript)
var HelloWorld = React.createClass({
  render: function (0 {
    return (
      <h1>Hello World</h1>
    );
  })
});
```

### Function
- These are very popular
- Benefits:
  - Easier to understand
  - Avoid 'this'
  - Less Transpiled code
  - Less noise
  - Better performance
  
```(javascript)
function HelloWorld(props) {
  return (
    <h1>Hello World</h1>
  );
}
```

### ES Class
- Best times to use class-based components are if you need:
  - Pre v16.8:
    - State
    - Refs
    - Lifecycle methods
  - As of 16.8:
    - New feature Hooks lets you use
      - state 
      - lifecycle methods
      - refs
    - componentDidError
    - getSnapshotBeforeUpdate

```(javascript)
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hello WOrld</h1>
    );
  }
}
```

### Arrow Function

```(javascript)
const HelloWorld = (props) => <h1>Hello World</h1>
```

## Container vs Presentation
- Container:
  - Little to no markup
  - Pass data and actions down to child components
  - Stateful - usually created with Redux'es `connect()`
  - Know about Redux (subscribe, dispatch)
- Presentation
  - All markup: dumb
  - Receive data and actions via props
  - No dependency to Redux
  - No State
- Alternate names
  - Container
    - Smart
    - Stateful
    - Controller View
  - Presentation
    - Dumb
    - Stateless
    - View
- Rule of thumb
  - If a component is only props as a pass-thru, you should refactor to a smart component using redux

## Router Basics

- typical location: `src/components/<feature_name>`
- declarative links in react-router-dom:
  - `<Link>` component lets you link to another (custom) component: `<Link to="/">Home</Link>`
  - `<NavLink>` gives you a little more control: `<NavLink to="/" activeClassName="active">Home</NavLink>`
- if you only have 1 component in a file, you might as well `export default <YourComponent>`
- when you bootstrap react, wrap your root element in `<BrowserRouter> <App /> </BrowserRouter>`
- `<Switch>` component on react-router lets you match one and only one route, allowing you to set a default PageNotFound:

```(js)
function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        { /* default not found */}
        <Route component={PageNotFound}>
      </Switch>
    </div>
  );
}
```

## Redux Intro
- Imagine you have a tree of components making up your react app
  - At arbitrary levels/branches, you have unrelated components that need the same data.
  - How do you do it?
- 3 possible solutions:
  - React (plain)
    - Lift State: Move the state all the way to the common ancestor
    - Problematic bc you have an arbitrary number of pass-thru components required to achieve this  (aka 'Prop Drilling')
  - React Context
    - Top level component declars a context 'Provider'
    - Any subcomponents can import the user context
    - Provides data and exposes functions too
  - React with Redux
    - Centralized Store
    - Any component can connect to the store
    - But they can't modify it directly - they have to dispatch set actions
    - When the store is modified, any consuming components will get an updated version and re-render
- Redux is good when:
  - Complex data flows
  - Inter-component communication
  - Many actions
  - If you use the same data in many place, esp when the components aren't in parent-child relationship
- 3 Principles of Redux
  - One Immutable Store
  - Actions trigger changes
  - Reducers update state
    - Accepts the current state, an action, and returns a new state
- Flux and Redux comparison
  - Both have unidirectional data flow: Data down, actions up
  - Flux has a bunch of stores
  - Only Redux uses reducers, containers (smart components), immutable store
- Actions need a `type` property, plus whatever payload
- Action Creator:
  
  ```(javascript)
  rateCourse(rating) {
    return { type: RATE_COURSE, rating }
  }
  ```

    - Your payload can have anything in it which can serialize (no functions or promises)

- Store

  ```(javascript)
  // do this in the application entry point
  let store = createStore(reducer);
  ```

  - Store API:
    - `store.dispatch(action)`
    - `store.subscribe(listener)`
    - `store.getState()`
    - `replacedReducer(nextReducer)`: for hot-reloading

- Immutability
  - Why this is important:
    - performance!  render just needs to do a reference comparison to determine if a change has occurred
  - How to prevent against state mutations:
    - redux-immutable-state-invariant library: displays error if you mutate state (but only run in development)
    - use immutable libraries (like immer - see below)
  - Types which are not inherently immutable: 
    - Objects
    - Arrays
    - Functions
  - Object.assign()
    - `Object.assign(target, ...sources)`
    - `Object.assign({}, state, {role: 'admin'});`
      - Create new object, then clone state into it, then overwrite the role property  
      - Make sure you include the empty object as your first argument!      
  - Spread operator
    - `const newState = { ...state, role: 'admin'}`
    - l-r precedence, so this has similar effect as Object.assign() above    
  - For Array's **don't use these**:
    - push, pop, reverse
  - For Array's **these are good**
    - map, filter, reduce, concat, spread
  - Deep vs Shallow cloning
    - Object.assign and Spread operator are shallow cloning
    - Deep cloning is only needed for the objects which have changed
    - Deep cloning is expensive (will cause unnecessary renders), so don't just do it for fun.
  - library `immer` is popular for letting you use immutables in a mutable way

    ```(javascript)
    import produce from "immer"

    const user = {
      name: "Cory",
      address: {
        state: "CA"
      }
    };

    const userCopy = produce(user, draftState => {
      draftState.address.state = "NY"
    })

    //user.address.state = "CA"
    //userCopy.address.state = "NY"
    ```

- Reducers
  - Must be pure functions
  - don't ever do this:
    - mutate arguments
    - perform side effects (api calls, routing transitions)

  ```(javascript)
  function myReducer(state = {}, action) {
    switch(action.type) {
      case "INCREMENT_COUNTER":
        return {...state, counter: state.counter +1 };
      default:
        return state;
    }  
  }
  ```

  - **Important**: typically have 1 store with multiple reducers
    - but all reducers are called on each dispatch
    - that is why if they don't match an action, the return the untouched state
    - each reducer only handles it's slice of state - that's all they're passed in
  - **Important**: each action can also be handled by multiple reducers
    - That allows you to keep the reducers small

## Connecting React to Redux
- `react-redux` library is what you use to connect redux to react
- 2 key components
  - Provider
    - Attaches app to the store (notice it's using Context API)

    ```(jsx)
    <Provider store={this.props.store}>
      <App />
    </Provider>
    ```

  - Connect
    - Creates container components

    ```(javascript)
    function mapStateToProps(state, ownProps) {
      return { authors: state.authors };
    }

    function mapDispatchToProps(dispatch) {
      return {
        actions: bindActionCreators(actions, dispatch);   //see notes below
      }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
    ```

    - every time the component is updated mapStateToProps() is called, so it's a good idea to Memoize this function (since it's a pure function)
      - Reselect libary is good for memoizing
      - esp if you're doing expensive operations here, like filtering, etc.
    - 4 options for how to handle dispatch actions mapping
      1. do nothing.  `dispatch` will be in your props
      2. manually wrap actions in dispatch calls

      ```(javascript)
      function mapDispatchToProps(dispatch) {
        return {
          loadCourses: () => {
            dispatch(loadCourses());
          },
          createCourse: (course) => {
            dispatch(createCourse(course));
          },
          // etc.
        }
      }
      ```

      3. bindActionCreators()
        - automatically do what you see above. 
        - you just have to pass in your action creator functions
      4. declare mapDispatchToProps as an object

      ```(javascript)
      mapDispatchToProps = {
        loadCourses
      }
      ```

        - quite concise
    
## Redux Flow
- 8 steps to **initially** set up redux
  1. Create Action
  2. Create reducer
  3. Create root reducer
  4. Configure store
  5. Instantiate store
  6. Connect component
  7. Pass props via connect
  8. Dispatch action
- Adding additional features is much easier

```(jsx)
import React from "react";
import { connect } from "react-redux";

class CoursesPage extends React.Component {
  
  // ctor is ok but not needed.  you could
  // also just instantiate state (w/o) the
  // this ref and it works the same.
  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: ""
      }
    }
  }

  handleChange = (event) => {
    const course = {...this.state.course, title: event.target.value};
    this.setState({course});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
  }

  render() {
    return (
      { /* for accessibility and usablilty, better to handle onSubmit rather than onSave in button */ }
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input type="text" onChange={this.handleChange} value={this.state.course.title} />
        <input type="submit" value="Save" />
          { this.props.courses.map(course => (
            <div key={course.title}>{course.title}</div>
          ))}
      </form>
    )
  }
}

mapStateToProps(state, ownProps) {
  return {
    courses: state.courses  //only show the state your component needs to minimize re-render
  };
}

const mapDispatchToProps = {
  actions: bindActionCreators(courseActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
```

- some people like to put redux stuff under a folder called `redux`
  - redux
    - actions
      - individual Actions files - have action creators
      - example action creator

        ```(javascript)
        import * as types from "./actionTypes";

        export function createCourse(course) {
          return { type: types.CREATE_COURSE, course };
        }
        ```

      - actionTypes.js

        ```(javascript)
        export const CREATE_COURSE = "CREATE_COURSE";
        ```
      
    - reducers
      - individual reducer files

      ```(javascript)
      import * as types from "./../actionTypes";

      export default function courseReducer(state = [], action) {
        switch(action.type) {
          case types.CREATE_COURSE:
            return [...state, {...action.course}];
          default:
            return state;
        }
      }
      ```

      - create the route reducer

      ```(javascript)
      import {combineReducers} from 'redux';
      import courses from './courseReducer';
      //...
      
      const rootReducer = combineReducers({
        courses
      });
      ```

- creating your redux store
  - in redux folder, add a file 'configureStore.js'

  ```(javascript)
  import { createStore, applyMiddleware, compose } from 'redux';
  import routeReducer from './reducers';
  import reduxImmutableStateInvariant from "redux-immutable-state-invariant";  //warn us if we accidentally mutate state

  export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //add support for Redux dev tools

    return createStore(rootReducer, 
      initialState, 
      composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()));
  }
  ```

- updating the entry point

  ```(javascript)
  //..other imports...
  import configureStore from './redux/configureStore';
  import {Provider as ReduxProvider } from 'react-redux';

  const store = configureStore();

  render(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  )
  ```

## Async in Redux
- `run-p` is another node library for of starting parallel scripts
- they're using the `fetch` api for the http client
  - you can specify different verbs
  - it is promise-based
- 4 libraries for handling Async in Redux:
  - (these are all executed as middleware, to minimize coupling, improve testability)
  - redux-thunk
    - popular, dev by Abramov
    - Return functions from action creators
  - redux-promise
    - uses promises for async
  - redux-observable
    - use RxJS observables
  - redux-saga
    - uses ES6 generators
    - complicated
- Thunk: a function that wraps an expression to delay it's evaluation

```(javascript)
export function deleteAuthor(authorId) {
  return (dispatch, getState) => {
    
    //deleteAuthor is an action creator
    return AuthorApi.deleteAuthor(authorId)
      .then(() => {
        dispatch(deletedAuthor(authorId));
      })
      .catch(handleError);
  };
}
```

- Redux thunk injects dispatch so we don't have to worry about it.



  




  
  













