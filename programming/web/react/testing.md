React Testing
================

## Basic Testing Stack
- Enzyme
  - UI Simulation
  - Interact with your React Components output
  - Shines in unit testing react components, harder with integration tests
- Sinon 
  - Stub & Mocking
- Babel-rewire
  - Dependency Isolation
- Jest:
  - Unit testing 
  - Capture snapshots of React components for certain time with props and state changes
  - Mock clickable events
  - Not specific to react
  - Duplicates the API on Jasmine (also is newer)
  - Runs on node
- Mocha
  - Test Runner
  - Runs on Node

## Test Types
- Unit tests: within a component
- Integration tests: interactions between multiple components (eventing, state changes, etc.)
- End-to-end testing: TODO
  
## Enzyme

## Jest


## General
- [Shallow Rendering](https://reactjs.org/docs/shallow-renderer.html) lets you render a component "one level deep" and assert facts about it
  - It doesn't involve child components
- TODO: Difference between `shallow()` and `mount()`

```(jsx)
describe("when testing with Enzyme", () => {
  it("renders a h1", () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.find("h1").length).toBe(1);
  });

  // ...
});
```

```(jsx)
describe('when the wrong answer has been selected', () => {
  let wrapper;

  beforeAll(( => {
    wrapper = mount(
      <AuthorQuiz {...Object.assign({}, state, {highlight: 'wrong'})} onAnswerSelected={() => {}}/>
    );
  }))

  it('should have a red backgroudn color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("red");
    });
});
```