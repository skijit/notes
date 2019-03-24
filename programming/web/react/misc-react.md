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

- they're using
  - redux

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

- simple functional component:

```(jsx)
function Hello(props) {
  return <h1> Hello at {props.now} </h1>;
}

ReactDOM.render(<Hello now={new Date().toISOString()} />, document.getElementById('root'));
```

- user defined elements use capital letters, html elements use lowercase letters
- state is local, mutable data
- `setState()` calls are batched
- prop validation
  - given the function component, Sum, you assign an object literal `propTypes` with associated PropTypes values.

  ```(jsx)
  import PropTypes from 'prop-types';

  function Sum(props) {
    return <h1>{props.a} + {props.b} = { props.a + props.b}</h1>;
  }

  Sum.propTypes = {
    a: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
  };

  ReactDOM.render(<Sum a={"a"}, b={2} />, document.getElementById('root'));
  ```

  - you can validate types, required, prop is an instance of a class, or a custom validation
  - if invalid, throws a runtime error
  - not a static type check
  - use `npm install prop-types`

  - a typescript-based method looks like:

   ```(jsx)
  interface SumProps {
    a: number;
    b: number;
  }

  function Sum(props) {
    return <h1>{props.a} + {props.b} = { props.a + props.b}</h1>;
  }

  ReactDOM.render(<Sum a={"a"}, b={2} />, document.getElementById('root'));
  ```

- Testing
  - React isn't a super high-value testing target since we want to test application logic primarily, and that should not go in a react component (which focuses on UI)
  - It can be useful to test react components
  - there are some properties of react components that make them amenable to testing
  - function components are easiest bc they map directly from props to jsx (ie. pure functions)
    - you can render() these components with given props and make assertions about the results
    - you can simulate events and make assertions about what happens
  - create-react-app sets you up with jest
  - test files should be named 'componentName.test.js'
  - note these tests allow you to use jsx in them
  - code coverage: refers to the amount of your code (functions, branches, etc.) that are exercised by your test suite.

  ```(jsx)
  // tests use the it()
  // assertions are with expect()
  // `npm test`, you can add tests interactively and stuff will save each time
  import React from "react";
  import ReactDOM from "react-dom";
  import Enzyme, { shallow } from "enzyme";
  import Adapter from "enzyme-adapter-react-16";

  // you would import your component you want to test here

  function Hello(props) {
    return <h1>Hello at {props.now}</h1>
  }

  describe("when setting up testing", () => {
    let result;
    beforeAll(() => {
      result = Hello({now: moment.toISOString()});
    });

    it("return a value", () => {
      expect(result).not.toBeNull();
    });

    it("is a h1", () => {
      expect(result.type).toBe("h1");
    });

    it("has children", () => {
      expect(result.props.children).toBeTruthy();
    });

    it("should fail", () => {
      expect(1 + 1).toBe(3);
    });
  });

  describe("When testing with ReactDOM", () => {
    it("renders without crashing", () => {
      const div = document.createElement("div");
      ReactDOM.render(<Hello now={moment.toISOString()} />, div);
    });    
  });

  // using enzyme now - shallow is used to create a shallow rendering of a react component
  Enzyme.configure({ adapter: new Adapter() });
  
  describe("when testing with Enzyme", () => {
    it("renders a h1", () => {
      const wrapper = shallow(<Hello now={moment.toISOString()} />);
      expect(wrapper.find("h1").length).toBe(1);
    });

    it("contains the string at someTimestamp", () => {
      const wrapper = shallow(<Hello now={moment.toISOString()} />);
      expect(wrapper.contains(<h1>Hello at someTimestamp</h1>)).toBe(true);
    });
  });
  ```

- Enzyme
  - More sophisticated component testing
  - Testing by AirBnB
  - `npm install --save-dev enzyme enzyme-adapter-react-16`


- about jsx
  - babel will convert jsx elements into javascript function calls
  - typescript compiler will do the same!
  - jsx...

  ```(jsx)
  <h1>
    <Sum a={3} b={4}>
  </h1>
  ```

  - gets converted to this javascript...

  ```(javascript)
  React.createElement(
    'h1',
    null,
    React.createElement(
      Sum,
      {a:3, b:4},
      null
    )
  );
  ```

- attributes can use the spread operator:
  - you can use this to convert a state to props.

```(jsx)
const props = { a: 4, b: 2};
const element = <Sum {...props} />;
```

- you can specify the properties you want on a function component, and those props can be functions!

```(jsx)
function Clicker({ handleClick }) {
  return <button onCick={(e)=>{handleClick('A');}}>A</button>;  
}
const el = <Clicker handleClick={(p) => {log(p);}} />;
```

- lodash is a useful library for including in your react apps
  - has nice chaining functionality
  - good utility functions like:
    - `_.get`
    - `_.flatten`
    - `_.clone`
    - `_.groupby`
- underscore has some nice stuff too
  - e.g. shuffle and sample
  - `import {shuffle, sample} from "underscore"`
  - 
- renaming attribues in jsx
  - html -> jsx
  - `class` -> `className`
  - `for` -> `htmlFor`
- escaping html content
  - by default, everything is escaped (preventing XSS)
  - you have to use the `dangerouslySetInnerHTML` attribute:

  ```(jsx)
  <div dangerouslySetInnerHTML={{__html:"<p>foo</p>"}}>
  ```

- Child Expressions with `props.children`

```(jsx)
function ConditionalDisplay(props) {
  return (<div>
            {props.isVisible ? props.children : null}
         </div>
  );
}
<ConditionalDisplay isVisible={state.showSum}>
  <h1>A <span>Sum<span></h1>
  <Sum a={4} b={2} />
</ConditionalDisplay>
```

- only rendering collections of a component, react will require you to specify the `key` attribute
- Events
  - DOM Events
  - Component Events
- Dom events in react receive a SyntheticEvent object

```(jsx)
function Events(props) {
  const clickHandler = (synthEvent) => {
    console.log(synthEvent);
  };

  return (
    <button onClick={clickHandler}>
      Make an Event
    </button>
  );
}
```

- dont forget `preventDefault()` or `stopPropagation()` in event handling

- some more test excerpts:

```(jsx)
it("should have a background color", () => {
  expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("red");
});

// overriding the default highlight value to be wrong
// not sure about the difference between mount and shallow
describe('when the wrong answer has been selected', () => {
  let wrapper;

  beforeAll(( => {
    wrapper = mount(
      <AuthorQuiz {...Object.assign({}, state, {highlight: 'wrong'})} onAnswerSelected={() => {}}/>
    );

    it('should have a red backgroudn color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("red");
    });
  }))
});

describe('when the first answer is selected', () => {
  let wrapper;
  const handleAnswerSelected = jest.fn(); //this is a mock function
  beforeAll(() => {
    wrapper = mount(
      <AuthorQuiz {...state, } onAnswerSelected={handleAnswerSelected}/>
    );

  wrapper.find('.answer').first().simulate('click');
  });

  it("onAnswerSelected should be called", () => {
    expect(handleAnswerSelected).toHaveBeenCalled();
  });

  it("selected the shining", () => {
    expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
  });
```

- Forms
  - React supports form elements which are similar to those found in HTML
    - Text input: `<input type="text" value="your value" />`
    - Text Area: `<textarea value="your value here" />`
      - differs slightly from the normal html version
    - Select: `<select value="the selected option"> <option value="saturday"> saturday </option> </select>`
      - slightly different from the normal html version (no 'selected' attribute on the option)
  - React's fundamental idea is that the html is model-driven (i.e. by the state, attributes, etc.)
    - Forms present a problem b/c users need to input data, but the value of the form elements are based on state.
    - React solves this problem in 3 steps:
      1. Add Local State to the form component
      2. Bind the form elements to the component sate
      3. Use onChange handler to update state
    
    ```(jsx)
    class Identity extends React.Component {
      constructor() {
        super();
        this.state = {
          firstName: "",
          lastName: ""
        };
      }
      
      onFieldChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
      }

      render() {
        return (
          <form>
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.onFieldChange} />

            <input type="text" name="lastName" value={this.state.lastName} onChange={this.onFieldChange} />

          </form>
        );
      }
    }
    ```
  
  - There are a variety of form libraries out there for react which help increase productivity
    - one decent option: react-json-schema-form
      - good starting point for form rendering and validation
      - you specify the entire form with 
        1. json schema: describes model
        2. ui schema: describes the various widgets/elements to use
        3. formData: initial data

  - Form validation
    - easy way to to do it is with a form library such as above OR you could implement on your own
    - other decisions:
      - validate on change, submission, blur, etc.
      - display errors inline or summarized

  - Forms are the odd-man out in the React world
    - Even though we try to avoid local state, it's unavoidable for forms
    - Direct DOM access is sometimes required
- React Router
  - uses HTML5 pushState
  - supports routing rules and parameters
  - supports navigation (i.e. updating the url value and triggering a view change)

  ```(jsx)
  <Route exact path="/" component={Welcome} />

  <Route exact path="/about" component={About} />

  <Route path="/single/:id" component={Single} />

  // if 'exact' is not specified, the default behavior is "begins-with"
  ```

  ```(jsx)
  // route parameter comes over in a 'match' param
  // match has a params object which contain any
  // route parameters therein
  function Single({match}) {
    return <div>{match.params.id}</div>
  }
  ```

  - more realistic routing example

  ```(jsx)
  import { BrowserRouter, Route } from "react-router-dom"

  // ...

  ReactDOM.render(
    <BrowserRouter>
      { /* Routes need to be enclosed in BrowserRouter */}
      <section id="navigation">
        <Route path="/" component={Menu} />
        { /* This is going to match everything... we could just put in Menu */}
      </section>
      <section id="detail">
        <Route exact path="/" component={Welcome} />
        <Route path="/list" component={List} />
        <Route path="/single/:id" component={Single} />
      </section>
    </BrowserRouter>,
    document.getElementById('app')
  );
  ```

  - To navigate, use Link

  ```(jsx)
  <Link to={path}> Text that you want displayed </Link>
  ```

  - instead of pointing at a component, a Route can also take an attribute `render`
  -  `npm i "react-router-dom"`
  - any routed component will receive as a `match` parameter which specified route information.

- Refs
  - A way of accessing DOM elements that are wrapped by React elements so that you can imperatively modify them.
  - They're a tool of last resort - they break React's approach.
  - There are a variety of API's for this, but you should use `React.createRef()`
  - typically create refs in the ctor
  - cast of characters:
    - createRef: initialize the field which holds the ref
    - ref: jsx property to associate current element with the field

  ```(jsx)
  class MyComp extends React.Component {
    constructor() {
      super();
      this.myDiv = React.createRef();
    }

    render() {
      return <div ref={this.myDiv}>
        {"Set in render: Any Html here is Escaped!"}
      </div>
    }
    
    componentDidMount() {
      this.myDiv.current.innerHTML += "<br/> Set on the wrapped DOM element. Not Escaped!";
    }
  }
  ```

  - To programmatically navigate with the client side router: `withRouter()`
    - we pull out the history parameters and use that API to change the route (w / `push()`)

  ```(jsx)
  const AuthorWrapper = withRouter(({history}) => {
    <AddAuthorForm onAddAuthor={(author) => {
      authors.push(author);
      history.push('/'); //NAVIGATE TO ROOT!
    }} />
  });
  ```

- Next: State








      













