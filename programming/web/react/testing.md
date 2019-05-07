React Testing
================

## Work Notes
- main test runner is mocha
- babelrc adds the rewire plugin
- npm script: `"test": "cross-env BABEL_ENV=mocha && node --max_old_space_size=4096 ./node_modules/mocha/bin/_mocha ./test"`
- mocha defines:
  - `describe`
  - `beforeEach()`
  - `afterEach()`
  - `it`
- node types:
  - `assert`
- chai defines:
  - `expect`
- sinon
  - `sinon.spy()`
- enzyme
  - `shallow`
  - `mount`
- jsdom
  - JSDOM is a JavaScript based headless browser that can be used to create a realistic testing environment.
  - Since enzyme's mount API requires a DOM, JSDOM is required in order to use mount if you are not already in a browser environment (ie, a Node environment).


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
  - Very similar to the Mocha API
  - Runs on node
- Mocha
  - Test Runner
  - Runs on Node
- Chai
  - assertion library

## Test Types
- Unit tests: within a component
- Integration tests: interactions between multiple components (eventing, state changes, etc.)
- End-to-end testing: TODO

## Mocha 
- TODO: continue here

## Node Assert

## Sinon

## Chai

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