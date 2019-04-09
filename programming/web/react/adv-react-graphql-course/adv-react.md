Advanced React Course
=================

## General 
- [Preferred tools by the instructor](https://wesbos.com/uses/)
- VS Code settings (in settings.json) to change the top-bar color (which is good for multiple work spaces):

```(json)
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#FF2C70",
    "titleBar.inactiveBackground": "#FF2C70CC"
  }
}
```

- stack
  - FrontEnd
    - View
      - react
      - next.js
        - server rendering of react app
      - styled components
      - react-apollo: interfacing with the apollo client
    - Data/State
      - Apollo Client
  - Backend
    - Prisma
      - Interface layer to common CRUD DB operations
    - GraphQL Yoga
      - Express GraphQL Server
      - JWT Auth and permissions
      - We'll put our resolvers, etc. here

## Next.JS
- react framework
  - does webpack compiling and code-splitting under the hood
- `get initial props`
  - this is a react lifecycle method
  - lets you wait for the initial resolution of the data before the page is sent to the browser
  - somehow next.js, even though it's a client-side tech, handles this (??)
- simplifies routing
- next.js makes it so you don't have to import some common react components
- next.js also sets it up so your major pages go in a `Pages` directory.  E.g.

```(jsx)
//sell.js
const Sell = () => <p>Hey!</p>;
export default Sell;
```

- you can also use it's routing / navigation tools (enables pushstate (client-side routing))

```(jsx)
//sell.js
import Link from 'next/Link'

const Sell = () => (
  <p>
    <Link href="some-other-page-component">
      <a>Some other page component</a>
    </Link>
  </p>;
export default Sell;
```

- Under the hood, next.js provides a root component, `App`
  - If you want to override this, you can write a custom App component like so

  ```(jsx)
  // _app.js
  import App, { Container } from 'next/app';

  class MyApp extends App {
    render() {
      const { Component } = this.props;

      return (
        <Container>
          <p>Hey, I'm on every page</p>
          <Component />
        </Container>
      )
    }
  }

  export default MyApp;
  ```

- he advises using a meta component for meta tags, title components, favicon ref, charset, etc.
- one reason for preferring so many stateless functional components is that the lifecycle methods will be handled in the higher order components


## CSS and Styled Components
- Styled Components is a library (CSS is JS)
- Write css styles in your javascript
- Big benefit: isolation
  - localized styles (no global style to pollute into something else)
  - there are lots of other ways to approach this problem (incl. BEM)
- grab the vscode styled components extension
  - will give you the css highlighting inside the js files

- see how it works with a tag template literal...

```(javascript)
// ... other imports
import styled from 'styled-components'

// don't worry - we can put these in separate files
// (and it's reusable)
const MyButton = styled.button`
  background: red;
  /* you can embed more js here... props is injected from delarative use */
  font-size: ${ props => (props.huge ? '100px' : '50px')};
  span {
    font-color: blue;
  }
  // usually not necessary, but you can use classes
  span.wutevs {
    font-color: grey;
  }  
`;

// one option for inner content
const SumnElse = styled.span`
  font-color: yellow;
`;

class Page extends Component {
  render() {
    return (
      <MyButton huge>
        Click Me
        <SumnElse>something else</SumnElse>
        <span>here's some blue font</span>
        <span className="wutevs">some grey font</span>
      </MyButton>
    );
  }
}
```

- Organizational approaches
  - putting style in the same file as component
    - ok if not reusable
  - putting in a separate file
    - prefereable if reuseable
      - one organizational approach
        - featureName
          - index.js
          - styles.js
          - __test__.js
      - another organization approach
        - components
          - styles
            - whateverIsBeingStyled.js
          - componentName.js
- Flexible Theming: you wrap the root with a Context-driven Provider component

```(javascript)
import styled, { ThemeProvider, injectGlobal } from 'styled-components`;

// your themes are a JS Object - not a css templated string
const theme = {
  red: '#FF0000',
  black: `#393939',
  maxWidth: '1000px'
  // ... other props
}

const MyOtherComponent = styled.div`
  max-width: ${props => props.theme.maxWidth}
  /* ...various css */
`

// declare this anywhere
injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: /* ... */
    format("woff2");
    /* ... */
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *.after {
    box-sizing: inherit;
  }
  body {
    padding: 0px;
  }
`;

// this would be your root component
class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MyOtherComponent />
      </ThemeProvider>
    );
  }

}

```

- media queries do work inside the css templates
- global styling are useful for:
  - padding
  - background colors
  - typography

- Best Practice in react:
  - import packages, then import local components

- Progress Bar solution
  - The next.js Router has hooks when a route is selected:
    - onRouteChangeStart
    - onRouteChangeComplete
    - onRouteChangeError
  - n-progress library
    - will stick a progress bar in the top of your page
      - you just need to add a css link in the `<head>`
    - it will respond to different events (called by the hooks above)

- One problem:
  - When using styled components, it's dependent on js execution to apply styles
  - so there's a flicker on load where it switches from unstyled version to styled
  - solved by two different things:
    - `get initial props` : more on that later
    - `Custom Document`
      - rendered server side
      - applies css
      - next.js docs have a good example of this in action

## Server-side GraphQL
- GraphQL is a spec for a server (so it can be implemented in any language)
- Compare to REST API's where you have to relearn each API to understand how it works
  - GraphQL:
    - One endpoint
    - You tell it what you want and the results look like your query    
- Focus on strongly-typed schemas
- Predefined queries (like an API)
- At the very least, GraphQL is a proxy or facade in front of existing data sources

### Prisma
- short version:
  - we give it our schema
  - it generates CRUD GraphQL queries (w/ implementations) (this is called the Prisma schema - prisma.graphql)
  - doesn't handle auth / additional logic
- open source library that sits on top of a new or existing db
  - it's like a GQL-ORM
- when you init prisma (and select various options), it will create a 
  1. `prisma.yml` config file 
    - yml files can refer to environmental variables: `${env:MY_VAR}`
    - we added a post-deploy hook to return the updated `prisma.graphql`
      - this file has all the auto-genearted queries (CRUD) based on the schema config file we generated (below)
  2. `datamodel.graphql` schema config file
    - by default will jut have one type: `User`
    - you can add any types to this
    - prisma has a variety of directives (e.g. `@relation`) which you can use to decorate your types w additional info
- to deploy with env variables: `prisma deploy --env-file yourenvfile.env`

### GraphQL Yoga
- we want additional logic
  - auth / perms
  - credit cards
  - sending email
  - etc.
- `prisma-bindings` make it possible to call prisma CRUD API via javascript
- remember the difference between:
  - `const createServer = require('createServer');`
  - `const createServer = require('./createServer');`
- on a mutation, you still specify the return values you want

```(graphql)
mutation myMutationName {
  createDog(name: "Spot") {
    name  
  }
}
```

- To add data:
  - Edit your data model
  - Deploy that to Prisma
  - Edit the Schema to GraphQL for Yoga
  - Write a resolver for the given Mutation or Query

- in GraphQL, make ID properties have a `@unique` directive
- some versions of GraphQL (e.g. Prisma) let you do an import based on other graphql schema files, but this isn't in the spec, so it actually occurs in the comments

## Client Side GraphQL
- HERE

## Todo
- css display grid
- express

