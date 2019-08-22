Misc React
================================

## Change Detection

- Update Cycle
  - `setState()`  will mark the component as dirty and call `render()` (recursively) which will output Virtual DOM and trigger a change detection cycle.
    - render() updates the virtual dom (faster than dom)
  - then react compares real and virtual dom to figure out necessary changes
  - DOM only gets updated for changes between Virtual Dom and actual Dom
  - there's a lifecycle hook called `shouldComponentUpdate()` which defaults to true, meaning that for any changes to state, `render()` should be invoked.
    - there might be cases where you don't want it to be true - presumably as an optimization.
  - [info](https://stackoverflow.com/questions/24718709/reactjs-does-render-get-called-any-time-setstate-is-called)
  
- [Shadow Dom vs Virtual Dom](https://vuejsfeed.com/blog/learn-the-differences-between-shadow-dom-and-virtual-dom)  
    - Virtual DOM is used by React and Vue.js
    - Virtual DOM is **Any** representation of the DOM, whereas Shadow DOM is the same DOM object model, available in the document but not in the main DOM tree
    - Virtual DOM is used to minimize changes to the DOM (which is expensive)
      - Usually changes will be batched, so that it's not 1 DOM update per change
    - Shadow Dom is about encapulation: custom (or not) elements with their corresponding styles
    - Shadow Dom is implemented by a browser (it's a spec), Virtual Dom is implmented by a javascript library/framework
      - Shadow Dom developed as a simple way for browser developers to use the same html constructs to implement new html elements, but without giving us an API to alter those "implementation details" [src](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)

- more change detection info:
  - see [here](https://medium.com/@gethylgeorge/how-virtual-dom-and-diffing-works-in-react-6fc805f9f84e)  
  - also see [here](https://reactjs.org/docs/reconciliation.html)
  1. `this.setState()` marks the component as dirty
  2. call `render()` recursively to update the virtual DOM
  3. use diff algorithm to reconcile virtual and actual DOM, updating only what is needed
  - Just bc a `render()` is called, doesn't mean the virtual DOM has changed and thus the DOM needs to be updated
  - Comparison is done between two versions of the virtual Dom - never the real DOM
  - Complexity is O(n) due to some heuristics
    - if the "type" of a node changes, then it (and the whole subtree) have changed
    - if the `key` attribute changes, then it's different

## Accessing DOM Nodes directly

- using `this.refs`: see `ReactDOM.findDOMNode(this.refs.input1)` and `<input ref="input1"></input>`

```(jsx)
import React from "react"
import ReactDOM from "react-dom"

export default class Calculator extends React.Component{
	constructor(props) {
		super(props);
		this.state = {output: ""};
	}

	render(){
		let IntegerA,IntegerB,IntegerC;
		
		return(
			<div className="container">						
				<h2>using React</h2>
				<div>Input 1: 
					<input type="text" placeholder="Input 1" ref="input1"></input>
				</div>
				<div>Input 2 :
					<input type="text" placeholder="Input 2" ref="input2"></input>
				</div>
				<div>
					<button id="add" onClick={ () => {
						IntegerA = parseInt(ReactDOM.findDOMNode(this.refs.input1).value)
						IntegerB = parseInt(ReactDOM.findDOMNode(this.refs.input2).value)
						IntegerC = IntegerA+IntegerB
						this.setState({output:IntegerC})
					  }
					}>Add</button>
					
					<button id="subtract" onClick={ () => {
              IntegerA = parseInt(ReactDOM.findDOMNode(this.refs.input1).value)
              IntegerB = parseInt(ReactDOM.findDOMNode(this.refs.input2).value)
              IntegerC = IntegerA-IntegerB
              this.setState({output:IntegerC})
					  }
					}>Subtract</button>
				</div>
				<div>
					<hr/>
					<h2>Output: {this.state.output}</h2>
				</div>
      </div>
    );
  }
}
```

## Thunk
- react has a slot built in for applying middleware for each `dispatch()` call
- it typicall gets set up when you configure your store:

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

- traditional role for action creators: 
  - `dispatch(myActionCreator())` 
  - generates an action object, which the reducer(s) can switch on.
- action creator functions are good for two reasons:
  - convenient if you ever have to call the same action in 2 different places 
  - enables middleware like thunk
    - the problem this solves is...
- reducer functions need to be pure
  - you can't perform side effects, api calls, etc.
  - so one strategy is to modify your action creators' responsibilities to:
    1. perform side effects
    2. dispatch actions themselves (if necessary)
- react-thunk is middleware that recieves all actions which are passed to `dispatch()`
- react-thunk will test whether that action is a function.  
  - if so it will:
    1. execute the function
    2. pass the return value to the reducers
  - if not, it will:
    1. just pass the object to the reducers like normal
- when an action creator returns a function (thunk), it has standard parameters which are passed to it 
  - probably these are set up via specific store-configuration function
  - usually includes (but not limited to): 
    1. dispatch
    2. getState
- So in this scenario, our action creators are really evolving into 2 separate concerns:
  - perform side effects
    - often these are async / promises, creating a separate execution branch, which is why they'll generate further dispatch calls (and increasing complexity)
      - **Question**:  can we improve this situation by using async action creators?
      - **TODO**
  - generate dispatchable objects (i.e. non-functions)  
- a big use case here is for action creators which perform async side-effects, and thus will return promises.
  - **TODO**: how does thunk handle action creators which return promises?
  - probably ignores them?


## Error Boundaries
- Problem: JavaScript errors used to corrupt React's internal state and cause weird errors on next `render()`
- Error boundaries are React components that:
  1. catch JavaScript errors anywhere in their child component tree
  2. log those errors
  3. Display a fallback UI instead of the component tree that crashed
- **The Catch**: Error boundaries don't catch issues for:
  - Event Handlers (see below)
  - Async Code
  - SSR
  - Errors in the boundary
- Class Components can be error boundaries if they implement these lifecycle methods:
  - `getDerivedStateFromError()`: Sets state value so that on render the error UI is shown
  - `componentDidCatch()`: Logs your error

  ```(jsx)
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      logErrorToMyService(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children; 
    }
  }
  ```

- You can't have an error boundary based on a functional component
- Error boundaries apply to declarative elements, but for imperative Error's (ie in code), we still have `try/catch`
  - Error boundaries deal with errors that cause `render()` or other react methods to fail, but our component event callbacks run before `render()` so the Error boundaries don't apply
  - Just use `try/catch` for handlers and other methods