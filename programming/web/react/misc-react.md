Misc React
================================


- Start with react as a DOM-manipulation engine (http://nicholasjohnson.com/blog/react-for-angular-developers/)
- Explain `render()` output and virtual DOM
  - Compare with Angular, Shadow DOM, etc
- `render`
https://medium.com/@amcdnl/react-for-the-angular-developer-pt-2-965f967a8876
- state tree vs rxjs
- Higher order components (HOC)
- react has no AOT
- state
  - redux
  - context api : like declarative services
- Error Boundaries which are “React components that can catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI.
- content projection


```(jsx)
let model = { clicks: 5};

function render() {
  ReactDOM.render(<App
                    clicks={model.clicks}
                    onClick={() => model.clicks += 1; render(); }>, document.getElementById("root"))                    
}
render();
```

- AOT isn't necessary since you can do server-side rendering
- render() updates the virtual dom (faster than dom)
- then react compares real and virtual dom to figure out necessary changes
- `setState()`  will mark the component as dirty and call `render()` (recursively) which will output Virtual DOM and trigger a change detection cycle.
  - DOM only gets updated for changes between Virtual Dom and actual Dom
  - there's a lifecycle hook called `shouldComponentUpdate()` which defaults to true, meaning that for any changes to state, `render()` should be invoked.
    - there might be cases where you don't want it to be true - presumably as an optimization.
  - [info](https://stackoverflow.com/questions/24718709/reactjs-does-render-get-called-any-time-setstate-is-called)
  - 

- [Shadow Dom vs Virtual Dom](https://vuejsfeed.com/blog/learn-the-differences-between-shadow-dom-and-virtual-dom)  
    - Virtual DOM is used by React and Vue.js
    - Virtual DOM is **Any** representation of the DOM, whereas Shadow DOM is the same DOM object model, available in the document but not in the main DOM tree
    - Virtual DOM is used to minimize changes to the DOM (which is expensive)
      - Usually changes will be batched, so that it's not 1 DOM update per change
    - Shadow Dom is about encapulation: custom (or not) elements with their corresponding styles
    - Shadow Dom is implemented by a browser (it's a spec), Virtual Dom is implmented by a javascript library/framework
      - Shadow Dom developed as a simple way for browser developers to use the same html constructs to implement new html elements, but without giving us an API to alter those "implementation details" [src](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)

- change detection info- see [here](https://medium.com/@gethylgeorge/how-virtual-dom-and-diffing-works-in-react-6fc805f9f84e)  
  - also see [here](https://reactjs.org/docs/reconciliation.html)
  1. `this.setState()` marks the component as dirty
  2. call `render()` recursively to update the virtual DOM
  3. use diff algorithm to reconcile virtual and actual DOM, updating only what is needed
  - Just bc a `render()` is called, doesn't mean the virtual DOM has changed and thus the DOM needs to be updated
  - Comparison is done between two versions of the virtual Dom - never the real DOM
  - Complexity is O(n) due to some heuristics
    - if the "type" of a node changes, then it (and the whole subtree) have changed
    - if the `key` attribute changes, then it's different

- example of accessing DOM Nodes
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

## Questions
- Routing and passing handlers into a component
- Use smart and dumb components with redux and routing

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

- tradional role for action creators: 
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


