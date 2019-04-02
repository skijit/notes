React Fundamentals
================================

- notes from [a pluralsight course](https://app.pluralsight.com/library/courses/react-fundamentals-update/table-of-contents)

## Component Info
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

  - a typescript-based method looks like

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


## jsx
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


## Events
- Types
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

## Forms
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

## React Router
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


## DOM Refs
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


## State
- key ideas:
  - UI should derive entirely from an app state
  - The state should be centralized
  - State mutations should be carefully controlled
- Model-View-intent Architecture
  - Elm, cyclejs, and well-designed react applications follow this pattern
  - Example below is based on stopwatch app
  - Model
    - Single object that completely describes the UI State

    ```(javascript)
    const model = { 
      running: false,
      time: 0
     };     
    ```

  - View
    - Function that transforms the model into the UI

    ```(jsx)
    const view = (model) => {      
      const  minutes = Math.floor(model.time/60);
      const seconds = model.time - (minutes*60);
      let handler = (event) => {
        model = update(model, m.running ? 'STOP' : 'START');
      };

      return (
        <div>
          {minutes}:{seconds}
          <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
        </div>;
      );
    }

    const render = () => {
      ReactDOM.render(view(model), document.getElementById('root'));
    };
    ```

  - Intents
    - The UI produced by the View function produces "Intents"
    - These are things the user wants to do
    - Intents update the Model, which then passes through the View function

    ```(javascript)
    let intents = {
      TICK: 'TICK',
      START: 'START',
      STOP: 'STOP',
      RESET: 'RESET'
    };

    const update = (model, intent) => {
      const updates = {
        'START: (model) => Object.assign(model, {running: true}),
        'STOP: (model) => Object.assign(model, {running: false}),
        'TICK': (model) => Object.assign(model, {time: model.time + (model.running ? 1 : 0)});
      };

      return updates[intent](model);
    }

    setInterval(() => {
      model = update(model, 'TICK');
      render();
    }, 1000);
    ```

- State Container
  - 2 jobs:
    - Holds the model
    - Control updates to that model
  - Methods
    - `getState()`
    - `dispatch()` - mutate state, applies an intent
    - `subscribe()` - registers callback after state mutations
  
  ```(jsx)
  const model = { 
    running: false,
    time: 0
  };

  const view = (m) => {      
    const  minutes = Math.floor(m.time/60);
    const seconds = model.time - (m*60);
    let handler = (event) => {
      container.dispatch(m.running ? 'STOP' : 'START');
    };

    return (
      <div>
        {minutes}:{seconds}
        <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
      </div>;
    );
  }

  let container = createStore(update);
  
  const createStore = (reducer) => {
     let internalState;
     let handers = [];

     return {
       dispatch: (intent) => {
         internalState = reducer(internalState, intent);
         handlers.forEach(h => { h(); });
       },
       subscribe: (handler) => {
         handlers.push(handler);
       },
       getState: () => internalState
     }
  };

  const render = () => {
    ReactDOM.render(view(container.getState()), document.getElementById('root'));
  };
  container.subscribe(render);

  let intents = {
    TICK: 'TICK',
    START: 'START',
    STOP: 'STOP',
    RESET: 'RESET'
  };

  const update = (model, intent) => {
    const updates = {
      'START: (model) => Object.assign(model, {running: true}),
      'STOP: (model) => Object.assign(model, {running: false}),
      'TICK': (model) => Object.assign(model, {time: model.time + (model.running ? 1 : 0)});
    };

    return updates[intent](model);
  }

  setInterval(() => {
    container.dispatch('TICK');
    render();
  }, 1000);
  ```

- Redux
  - Recall
    - You can implment the MVI architecture without a state container
    - State container will centralize and manage mutations
    - If you want to build your own state container, it's not a big deal (see above)
    - Or you could use a common state container library (like redux)
  - Reasons to use a state container library (like redux)
    - standardization across apps
    - likely it has more features / is more robust
  - Redux
    - Is popular state container library
    - Works on small and large cases
  - Redux uses
    - Reducers (state mutation functions)
    - Actions (same as Intents)
  - basic API
    - `createStore(reducer, initialState)`
    - `getState()`
    - `dispatch()`
    - `subscribe()`
  - Stopwatch example (from above) using Redux
    - createStore() replaced
    - Actions are objects not strings, with a `type` property
    - change refs to intents to actions

  ```(jsx)
  const model = { 
    running: false,
    time: 0
  };

  const view = (m) => {      
    const  minutes = Math.floor(m.time/60);
    const seconds = m.time - (minutes*60);
    let handler = (event) => {
      container.dispatch(m.running ? {type: 'STOP'} : {type: 'START'});
    };

    return (
      <div>
        {minutes}:{seconds}
        <button onClick={handler}>{m.running ? 'STOP' : 'START'}</button>
      </div>;
    );
  }

  let container = Redux.createStore(update);
  
  const render = () => {
    ReactDOM.render(view(container.getState()), document.getElementById('root'));
  };
  container.subscribe(render);

  let actions = {
    TICK: 'TICK',
    START: 'START',
    STOP: 'STOP',
    RESET: 'RESET'
  };

  //notice how this is used instead of a switch
  const update = (model, action) => {
    const updates = {
      'START: (model) => Object.assign(model, {running: true}),
      'STOP: (model) => Object.assign(model, {running: false}),
      'TICK': (model) => Object.assign(model, {time: model.time + (model.running ? 1 : 0)});
    };

    return updates[action.type](model);
  }

  setInterval(() => {
    container.dispatch({type:'TICK'});
    render();
  }, 1000);
  ```

- React-Redux
  - An extra module that helps with integration between react and redux
  - adds some useful features which are quite nice in a complicated application
    - helps connect components to the application state
  - cast of characters
    - Provider: React compoent provided by react-redux.  It lets all it's children components have access to the redux store.
    - connect(): function provided by react-redux.  Enhances the component-store connection.
      - `mapStateToProps`: 
        - parameter to connect()
        - a function from redux store for identifying the slice of store a component should get.
      - `mapDispatchToProps`
        - another parameter to connect()
        - controls how components can dispatch actions to the store
        - a way of mapping component events to redux store actions
      
  - stopwatch example revisited
      
    ```(jsx)
    const model = { 
      running: false,
      time: 0
    };

    function mapStateToProps(state) {
      return state;  // no transformation necessary
    }

    function mapDispatchToProps(dispatch) {
      return {
        onStart: () => { dispatch({type: 'START'}); }
        onStop: () => { dispatch({type: 'STOP'}); }
      };
    }

    //connect() takes these two arguments and returns a third function which accpets the 
    //view function as a parameter (i.e. it wraps it)
    //replaced the injected state with 'props' which includes state properties as well as events
    const Stopwatch = ReactRedux.connect(mapStateToprops, mapDispatchToProps) ( 
      (props) => {      
        const  minutes = Math.floor(props.time/60);
        const seconds = props.time - (minutes*60);
        
        return (
          <div>
            {minutes}:{seconds}
            <button onClick={props.running ? props.onStop : props.onStart}>{props.running ? 'STOP' :'START'}</button>
          </div>;
        );
      }
    );

    let container = Redux.createStore(update);
    
    //React-Redux will handle the re-rendering of components for us
    ReactDOM.render(
        <ReactRedux.Provider store={container}>
          <Stopwatch />
        </ReactRedux.Provider>
      ),
      document.getElementById('root')
    );
    
    container.subscribe(render);

    let actions = {
      TICK: 'TICK',
      START: 'START',
      STOP: 'STOP',
      RESET: 'RESET'
    };

    //this is the reducer function
    //change: react redux will only re-render if the state has changed
    //so we need to make state immutable (i.e. return a new object)
    const update = (model, action) => {
      const updates = {
        'START: (model) => Object.assign({}, model, {running: true}),
        'STOP: (model) => Object.assign({}, model, {running: false}),
        'TICK': (model) => Object.assign({}, model, {time: model.time + (model.running ? 1 : 0)});
      };

      return updates[action.type](model);
    }

    setInterval(() => {
      container.dispatch({type:'TICK'});
      render();
    }, 1000);`
    ```

  - consider the provider:
    - it's nice to be able to provide the state container at any level in some tree, but that also tightly couples them to your application
    - this is probably a good place to think about smart/dumb components (for reusability)

  - Good redux develop tool
    - see redux dev tools!
    - chrome and firefox extensions







      













