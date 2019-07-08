React App Setup Notes
============

- Find some examples of using create react app with:
  - Next
  - Typescript  
  - Express
  - and to a lesser extent: Apollo Client
- What should I do about styles?
- Also need to use hooks!
  - look into apollo hooks
- no absolute reason to host on the same machine: cloud deployment might be ok

## Apollo and TypeScript
- https://www.apollographql.com/docs/react/recipes/static-typing/
- https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide
- initial conclusion: create your react app with express and typescript first, then add in apollo
- apollo hooks:
  - https://medium.com/the-guild/graphql-code-generator-introducing-hooks-support-for-react-apollo-2cdc8a7b526d

## Create React App, TypeScript, Express
- Create React App support for Typescript:
  - https://medium.com/byteconf/getting-started-with-typescript-in-create-react-app-2306b713088f
- When is Create React App not good?
  - seems like a reasonable place to start
  - you can always eject the config and extend it
- Deployment
  - build output will include builds dir including...
    - bundles with hashnames 
    - static assets 
    - a servable index.html
  - update your express paths to serve the main page when client-side routes are selected
  - if your app is not the root-level, you can specify `homepage` option in the package.json
 - you do need to include poly fills for IE11 support:
  - see https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md
- create-react-app is the CLI for initial creation, and it creates a react-scripts module
  - you can update to new versions of react-scripts by bumping the version number in package.json or reading the migration instructions on react-scripts
- has support for loading graphql files directly
- you can change the index file in public directly, as you like
- most static files will get bundled with webpack, you you can put stuff in the  public folder and then refernece it like this:

```(html)
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
```

- code splitting lets you break into chunks
- you can apply environment variables into your bundles
  - prefixed with REACT_APP
  - access by `process.env.REACT_APP_MYENV`

## Tailwind.css
- https://tailwindcss.com/

## Getting Started Guide

### Plan
- Create React App
  - Checkpoint 1
    - Use typescript
    - Serve via Express (simple)  
    - Add a couple client side routes / placeholder components
    - Build Process
    - Authentication integration (no api connection)
    - Deployment to Server
  
  - Checkpoint 2
    - Add material UI

  - Checkpoint 3
    - GraphQL authentication
    - Apollo Client
    - Mutations and authorization middleware

  - Checkpoint 4
    - CSV transformer

### Execution
- Create React App with Typescript:
  - `npx create-react-app admin-client --typescript`
- Serve Via Webpack: `yarn start`
  - doesn't (re)write the served output to `build` folder
- Build: `yarn build`
  - outputs to contents suitable for hosting in `build` folder
- Add a sibling TypeScript-Express server
  - follow this [tutorial](https://developer.okta.com/blog/2018/11/15/node-express-typescript#hello-world)
- Connect client and server build processes
  - Serve static files in Express:

  ```(typescript)
  // src/index.ts
  import express from "express";
  import path from "path";
  const app = express();
  const port = 8080; // default port to listen

  app.use(express.static(path.join(__dirname, "public")));
  
  app.get("/hello", (req, res) => {
    res.send("Hello world!");
  });

  // start the Express server
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
  });

  ```
  
  - Copy static files from client to server static files root
    - add to package.json: `"postbuild": "mkdirp ../admin-server/dist/public & rimraf ../admin-server/dist/public/* & cp -r build/* ../admin-server/dist/public/",`

- Debug Express in VSCode: add the following `.vscode/launch.json`

```(json)
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}\\dist\\index.js",
      "outFiles": ["${workspaceFolder}/**/*.js"]
    }
  ]
}
```

  - you can set breakpoints successfully now since the tsconfig is outputting sourcemaps
  
- Debug React in VSCode
  - instructions [here](https://facebook.github.io/create-react-app/docs/setting-up-your-editor#visual-studio-code)
  - Short version:
    - install chrome debugging extension for vscode
    - get the standard launch.json
    - `yarn start` the app
    - then launch chrome debug process      

- Add a templated page (and tooling) to Express:
  - Follow [these](https://developer.okta.com/blog/2018/11/15/node-express-typescript#build-a-better-user-interface-with-materialize-and-ejs) instructions
  - [Info on ejs](https://ionicabizau.github.io/ejs-playground/)
  - key commands:
    - `yarn build & yarn start`
    - `yarn dev`

- Add an API route to Express:  
  - [good source](https://codebrains.io/setting-up-express-with-typescript/)
  
- Add some client side routes in React
  - `yarn add react-router-dom`
  - `yarn add --dev @types/react-router-dom`
  - Replace `src/App.ts` with...

  ```(typescript)
  import React from "react";
  import {
    BrowserRouter as Router,
    Route,
    Link,
    RouteComponentProps
  } from "react-router-dom";
  import logo from "./logo.svg";
  import "./App.css";

  type RParams = { topicId: string };

  const BasicExample: React.FC = () => {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    );
  };

  const Home: React.FC = () => {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  };

  const About: React.FC = () => {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  };

  const Topics = ({ match }: RouteComponentProps) => {
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route
          exact
          path={match.path}
          render={() => <h3>Please select a topic.</h3>}
        />
      </div>
    );
  };

  const Topic = ({ match }: RouteComponentProps<RParams>) => {
    return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
    );
  };

  const App: React.FC = () => {
    return (
      <div className="App">
        <header className="App-header">
          <BasicExample />
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  };
  ```



  export default App;

- Add basic authentication via Google
  - TODO

  
- Deployment to Server
  - TODO





  
  

