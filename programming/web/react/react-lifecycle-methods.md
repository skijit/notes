LifeCycle Methods in React
=====================

- [src](https://blog.bitsrc.io/react-16-lifecycle-methods-how-and-when-to-use-them-f4ad31fb2282)
- these are listed in order that they're called

## Constructor
- first called
- only valid for class-based components
- remember to call `super()`
- use cases:
  - setting up state
  - creating refs
  - method binding

## getDerivedStateFromProps
- last method which is called before `render()`
- returns a state object
- you don't have access to the `this`
- it is a static method
- use cases:
  - return / update state object based on initial props

## shouldComponentUpdate
- parameters include new props and new state
- returns a boolean which determins whether `render()` is called


## render
- render

## componentDidMount
- called after `render()` first executes
- you perform setup in here that wasn't possible when there was no component in the DOM
- use cases:
  - assign event listeners
  - Dom manipulation
  - AJAX calls

## getSnapshotBeforeUpdate
- called after `render()` completes
- takes parameters for prevProps and preState
- returns an object that is passed as 3rd parameter to `componentDidUpdate()`
- use case:
  - view DOM and pass a special parameter to `componentDidUpdate()`

## componentDidUpdate
- 3 parameters
  1. prevProps
  2. prevState
  3. snapshot (see above method)
- use case:
  - do something after committing changes to the DOM via `render()`

## componentWillUnmount
- called right before component is destroyed
- use case:
  - unsubscribing
  - removing listeners
  - cancel long running requests

## getDerivedStateFromError
- catch error in child component

## componentDidCatch
- catch error in child components
- good for catching and logging errors

