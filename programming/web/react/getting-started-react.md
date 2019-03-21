React Notes
=================
- [src](https://www.youtube.com/watch?v=Ke90Tje7VS0)
- [pluralsight react path](https://app.pluralsight.com/paths/skills/react)

## Basics

- babel transpiler will convert the jsx to js
- you can import from a path directly:

```(javascript)
import React, { Component } from 'react';
//...
import 'bootstrap/dist/css/bootstrap';
//...
```

- for an explanation of why we need to put Component in curly braces, but not react, see [here](https://stackoverflow.com/questions/41337709/what-is-use-of-curly-braces-in-es6-import-statement)
  - short version: it's about how the component is exported.  `React` is a default export and `Component` is a named export.
- for an explanation of why the css can be imported like this, check out [this](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822)

- create-react-app is a simple CLI for generating React projects
  - covers webpack, etc.
- put components in a 'components' folder
  - individual javascript files are extension jsx
    - you get better code completion functionality by calling it jsx
  - component name should be camelCased (e.g. `counterComponent`)
- vscode extension: simple-react-snippets has some nice shortcuts which generate common react code
- you have to import React bc once transpiled, there will be a call to `React.createElement()`
- components need a container element
  - but if you use `React.Fragment` as the container div, it will be compiled away.
- remember to use `return ();`
  - paren
  - semicolon
- vscode:
  - extensions
    - prettier: and enable formatting on save
    - react-snippets
  - ctrl-d: selects copies of the same text and puts you in multicursor mode so you can edit multiple places at once
- state is a reserved property
  - remember you extend from Component
  - anything you need in your component
- any javascript can be executed in the jsx when you enclose in curly braces: `<span>{this.state.counter}</span>`
  - your component can also have functions
- use object destructuring to streamline code.  

```(javascript)
state = {
  count: 0;
}

formatCount() {
  const {count} = this.state;
  return count===0 ? "Zero" : count;
}
```

- setting html attributes with js is ok too
  - class and style attributes a little different
  - class => `className`
  - inline styles:
  
  ```(javascript)
  styles= {
    fontSize: 10,  //HAS TO BE CAMELCASED
    fontWeight: 'bold'
  };

  // will apply the appropriate units (e.g. px) on compile
  render() {
    return (
      <div styles={this.styles} className="your-css-classes-here">blah</div>
    );

  // alternately, you can use this inline style with double {{}}
  render() {
    return (
      <div styles={{ fontSize: 10}} className="your-css-classes-here">blah</div>
    );
  }
  ```

- adding more dynamism to the class
```(javascript)
    
  render() {
    // we are 'polluting' the render(), which some people don't like
    // better to create a separate method here
    let classes = "class1 class2";
    classes += boolExpr ? " class3a" : " class3b";

    return (
      <div className={classes}>blah</div>
    );

  // alternately, you can use this inline style with double {{}}
  render() {
    return (
      <div styles={{ fontSize: 10}} className="your-css-classes-here">blah</div>
    );
  }
  ```

- rendering lists
```(javascript)
class Counter extends Component {
  state = {
    count: 0,
    tags: ['tag1', 'tag2', 'tag3']
  };

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm">Increment</button>
        <ul>
          { this.state.tags.map(tag => <li key={tag}>{ tag }</li>) }
        </ul>
      </div>
    );
  }
}
```
  - note that with jsx, even in arrow functions, html never has to be marked as a string
  - react needs to be able to uniquely identify each child (item) in an array or iterator with a unique key.  
    - so we use this `key` attribute on each.
    - it's local to the list

- conditional rendering (since there's ngIf)

```(javascript)
class Counter extends Component {
  state = {
    count: 0,
    tags: ['tag1', 'tag2', 'tag3']
  };

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;
    
    return (
      <ul>
        { this.state.tags.map(tag => <li key={tag}>{ tag }</li>) }
      </ul>
    );
  }

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm">Increment</button>
        { this.renderTags() }
      </div>
    );
  }
}
```

  - another conditional method:
  ```(javascript)
  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm">Increment</button>
        {this.state.tags.length && "Please create a new tag!" }
        { this.renderTags() }
      </div>
    );
  }
  ```

- events
  - use standard dom events like `onClick`, `onDoubleClick`, `onKeyDown`, `onKeyPress`, 
    - needs camelCasing
  
```(javascript)
<button onClick={this.handleIncrement} className="btn btn-secondary btn-sm">Increment</button>
```

  - note you don't add the `()` to the end

- event handler binding
  - you can use the `bind()` in a ctor to bind an event handler's this to the class'es scope
  - a better method is to use arrow functions

  ```(javascript)
  handleIncrement = () => {
    //this is defined as desired
  };

  render() {
    return (
      <div>
        // ...
        <button onClick={this.handleIncrement} className="btn btn-secondary btn-sm">Increment</button>
        // ...
      </div>
    );
  }  
  ```

- updating state

```(javascript)
class Counter extends Component {
  // defined in parent Component
  state = {
    count: 0
  };

  handleIncrement = () => {
    // defined in parent Component
    // this is how update state
    // properties of this object will be merged with the state, or overwrite the state
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    return (
      <div>
        // ...
        button onClick={this.handleIncrement} className="btn btn-secondary btn-sm">Increment</button>
        // ...
      </div>
    );
  }
}
```

- Passing event arguments

```(javascript)
class Counter extends Component {  
  state = {
    count: 0
  };

  handleIncrement = () => {    
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    return (
      <div>
        // ...
        button 
          onClick={ () => this.handleIncrement({ id: this.state.someProp })} 
          className="btn btn-secondary btn-sm">Increment</button>
        // ...
      </div>
    );
  }
}
```

## Composing Components

- an app consists of a tree of components, which and you pass data down through `props` and you pass content down through `children`

```(jsx)
// index.js
// misc imports

ReactDOM.render(<Counters />, document.getElementById("root"));
registerServiceWorker();
```

```(jsx)
// counters.jsx
// misc imports

class Counters extends Component {
  state = {
    counters: [
      {id: 1, value: 0},
      {id: 2, value: 0},
      {id: 3, value: 0},
      {id: 4, value: 0},
    ]
  };
  render() {
    return (
      <div>
        {this.state.counters.map(counter => (
          <Counter key={counter.id} value={counter.value} selected>
            <h4>this is some content: {counter.id}</h4>
          </Counter>
        ))}
      </div>
    );
  }
}
```

```(jsx)
// counter.jsx
// misc imports

class Counter extends Component {
  state = {
    count: this.props.value
  }

  render() {
    console.log(this.props);

    // outputs all the attributes you set on the component
    // will not include the key attribute - that's special
    // each will look like this:
    // { value: 4, selected: true, children: {...} }

    // children is a react element of type="h4"

    // more html 
    // this renders out the inner html content
    {this.props.children}
  }
}
```

- debugging react apps
  - chrome / ff extension: **react developer tools**
  - shows the component tree in the left pane
  - you can see the state & props on the right pane
  - `$r` refers to selected component
  - `$r.render()` good for debugging
  - compare to normal usage of `$0` for selecting elements in the DOM

- props vs state
  - **props**: data we give to component
    - read-only!
  - **state**: local, internal, private data
    - sometimes you don't have a state
  - if you need to modify data passed in a prop, move it into state and change it there

- more events
  - **rule**: the component that owns a piece of the state should be the one modifying it.
    - sometimes you have to raise events from a child-component (driven by parent's state) for the parent to handle it.
  - name the custom events you raise as `onDelete`, etc.
  - the parent component will pass the child component a reference to its handler via props.
  - we won't update the state directly:
    - create a copy of the property in the state you want to update
    - modify that copy
    - reassign that copy to the corresponding property in state and call `setState()`
  - passing objects to child component through props is ok (see example below)
```(jsx)
//parent component
class Counter extends Component {
  state = {
    counters: [
      // ...
    ]
  };

  handleDelete = (counterId) => {
    console.log('event handler called')
    const counters = this.state.counters.filter(c => c.id !== counterId);
    setState({ counters });
  };

  render() {
    return (
      <div>
        {this.state.counters.map(ctr => (
          <Counter key={ctr.id} counter={ctr} onDelete={this.handleDelete}>
        ))}
      </div>
    );
  }
}
```

```(jsx)
//child component
// ...
<button onClick={ () => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">
/// ...
```

- Design ideas
  - Single Source of Truth
    - Possible Bug: You're passing a value into a subcomponent via props and you event assign the subcomponent's state based on this props... but only **ONE TIME**!
    - **Controlled component**: has no local state, relies only props and raises events
  - Elevating State to the parent

- Stateless Functional Components
  - you can do this if:
    - if you get all your data through props
    - you only have a render()
    - you don't need lifecycle hooks
  - you don't need a class

```(jsx)
const NavBar = props => {
  return (
    // whatever would have gone in your render() method
    // references to this.props can change to just props
  );
}

export default NavBar;
```

  - good for simple, stateless components

- object destructuring 
  - with stateless functional components:

  ```(jsx)
  const NavBar = { totalCounter, someOtherProp} => {
    return (
      // whatever would have gone in your render() method
      // refer to totalCounter and someOtherProp directly
    );
  }

  export default NavBar;
  ```

  - with normal components

  ```(jsx)
  class Counter extends Component {
    // ...
  
    render() {
      const { onRest, coutners, onDelete, onIncrement} = this.props;

      return (
        // refer to the props without this.props prefix
      );
    }
  }
  ```

- common lifecycle hooks (in order)
  - Stage: Mount
    - component is created and inserted into the DOM
    - these hooks let you interact at the various stages of lifecycle (in order)
    - `constructor`
      - call `super();` first
      - you can initialize properties or set state to props(if you pass props as parameter, incl super())
      - you can't call this.setState()    
    - `render`
      - note that render() is called recursively, down to children
      - render() only outputs to Virtual DOM
        - and it has it's old copy of the Virtual DOM
        - then react figures out what has changed and only updates the corresponding pieces of real DOM
    - `componentDidMount`
      - after component is rendered into DOM
      - good place to make ajax calls from server
  - Stage: Update
    - when the state or props of a component get changed
    - `render`
    - `componentDidUpdate`
      - the state or props have changed, you might want to make an ajax call
      - `componentDidUpdate(oldProps, oldState) { ... }`
        - you get the old props and state if you want to compare to current
  - Stage: Unmount
    - when the component is removed from the DOM
    - `componentWillUnmount`
      - use this to remove timers and listeners before the component is removed to prevent memory leaks

- Question:
  - can you pass in a template to a component as a child?