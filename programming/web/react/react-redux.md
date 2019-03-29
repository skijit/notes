React - Redux Notes
=========================

## 4 Ways to Craete React Component 

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
  - Know about Redux
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






