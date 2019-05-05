React Context
=================

- [main src](https://reactjs.org/docs/context.html)

- Context provides a way to share (global) values across components while avoiding 'prop-drilling'
- To use:
  1. **Create** the context element: `const ThemeContext = React.createContext('light');`
  2. **Provide** (declaratively) the context element's provider, wrapping subcomponents: 
    
    ```(jsx)
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
    ```
  
  3. **Consume** in any subcomponents, having avoided prop-drilling

  ```(jsx)
  // inside component...
  static contextType = ThemeContext;
  ```

- Full example:

```(jsx)
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```
- All consumers that are descendants of a provider will re-render whenever the Provider's `value` prop changes.
  - even if you use the lifecycle method `shouldComponentUpdate`, you can't stop it

- Problems with Context:
  - Makes reuse difficult
  - Different methods depending on whether you are using class or function based components
    - **If you are going to function-based component and context, check out the hooks**