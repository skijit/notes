Notes from book "Mastering React Test-Driven Development"
============================

## Using the books repo
- Forked repo [here](https://github.com/skijit/Mastering-React-Test-Driven-Development)
- `git branch -a` produces:

  ```
  main
  remotes/origin/HEAD -> origin/main
  remotes/origin/appointments
  remotes/origin/book-helpers
  remotes/origin/main
  remotes/origin/master
  remotes/origin/spec-logo
  ```
- 2 main branches correspond to 2 diff apps
  * [Appointments](https://github.com/PacktPublishing/Mastering-React-Test-Driven-Development/tree/appointments/appointments), a hair salon booking system
  * [Spec Logo](https://github.com/PacktPublishing/Mastering-React-Test-Driven-Development/tree/spec-logo/spec-logo]), an online Logo environment for building Logo scripts
- Each major section of the book has a corresponding tag:
  - `git tag` produces

  ```
  accepting-text-input
  add-redux
  adding-radio-buttons
  adding-spies
  animated-line-component
  animation
  appointment-first-name
  ...
  ```

- You'll want to checkout the tag: `git checkout tags/starting-point` and then branch from there: `git checkout -b tskj/starting-point`

## Misc Background
- Babel
  - Presets are a set of plugins
  - Each plugin enables an ECMA script feature
  - `env` preset brings in every possible plugin
- Jest
  - `describe('Blah Component', () => {...})` function defines a *test suite*
  - Best practice to name the test suite the same as the component being tested
  - Best to put tests in a separate dir as actual code (e.g. src and test are siblings)

  ```(javascript)
  it('renders the customer first name', () => {
    expect(document.body.textContent).toMatch('Ashley');
  })
  ```
    
    - `toMatch()` is a matcher function - there are tons of these in Jest
    - `it()` = the unit test
  - **Jest environment** = the DOM implementation that is used
    - jsdom
    - node
  - Unit tests should be independent of one another: no shared states
  - You can use `jest --watchAll` to watch for any changes to your (test) files and then re-execute tests  
  
  ```(javascript)
  describe('AppointmentDayView', () => {
    let container;
    beforeEach(() => {
      container = document.createElement('div');
    })
    cons render = component => ReactDOM.render(component, container);

    it('renders a div with the right id', () => {
      render(<AppointmentsDayView appointments={[]} />);
      expect(container.querySelector('div#appointmentsDayView).not.toBeNull());
    })
  })
  ```

- You always need to include `import React from 'react';` bc when the jsx is transpiled to vanilla js, it will be calling React methods


