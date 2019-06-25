Intro to Apollo
=================

- [src](https://www.apollographql.com/docs/tutorial/introduction)

## Background

- Apollo GraphQL is an implementation of GraphQL
- Should be used as an intermediate layer between services and applications.
- Components
  - **open source components**
    - **apollo server**: define schema and resolvers
    - **apollo client**: manages data and state in client
      - queries are defined as react-style (declarative) components
      - manages client-server consistency, caching, etc.
      - capable of replacing a lot of redux code
    - **ios and android clients**
    - **apollo cli**: provides access to cloud services
  - **cloud services**
    - **schema registry**: system-of-record for schemas
    - **client registry**: consumer traceability
    - **operation registry**: pre-approved operations against the registry
    - **trace warehouse**: diagnostics
  - **commercial extensions**
    - **apollo gateway**: stitches multiple schemas together, transparent to client
    - **workflows**
      - **schema change validation**: eval compatibility of schema changes to existing operations
      - **safelisting**: security for clients and their operations
- Developer tools:
  - GraphQL Playground: IDE generate docs for your schema and query execution
  - Apollo DevTools: Chrome extension 
    - Track your client cache
    - Track active queries
    - View Mutations
- State Management
  - You use Apollo client cache as a single source of truth for global state in your application
  - Appears to be a replacement to redux
- Apollo Engine
  - Tracking and diagnostics
- GraphQL Benefits
  - Batched service calls, avoid parallel/roundtripping
  - Project results with schema-specific query language (and graphQL syntax)

## Tutorial
- Apollo has VSCode extensions

### Summary
- GraphQL SDL (Schema Definition Language) specifies:
  - Operations
  - Types
- Data sources implment data access
  - You inherit from an Apollo class and write your own methods
  - You can return the data in any format (this will be the problem of the resolvers)
  - The benefit of inheriting from an Apollo class are the additional services (caching, etc.) you get as a result
- Resolvers connect the SDL's Operations and Types to the data sources
  - specifies how to call data source method(s)
  - specifies how to map returned data to types specified in the SDL
- From a design point of view
  - Schema determines the types and operations
  - Client decides which operations and projections
  - Data source decides how we bring data back from the sources (e.g. Rest endpoints, SQL, etc.)
  - Resolvers decide how we make use of the data source methods to satistfy the schema
  

### Backend 
- **Schema Setup**
  - Apollo server can connect to REST API's and DB's and lets you build an integrated (graph) API over these sources
  - Schema will define:
    - Data types and relationships
    - Data accessibility (r/w auths)
    - Schema gets written in a [tagged template](https://stackoverflow.com/questions/50180381/what-is-this-new-syntax-gqlstring)

    ```(javascript)
    const typeDefs = gql`
      # defining the queries
      type Query {
        # launches query returns a non-nullable(!) collection of Launch types
        launches: [Launch]!
        # launch query is passed an id and returns single launch object
        launch(id: ID!): Launch
        # Queries for the current user
        me: User
      }

      # defining mutations (operations)
      type Mutation {
        # if false, booking trips failed -- check errors
        bookTrips(launchIds: [ID]!): TripUpdateResponse!

        # if false, cancellation failed -- check errors
        cancelTrip(launchId: ID!): TripUpdateResponse!

        login(email: String): String # login token
      }

      # definition of Launch type
      type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
      }

      type Rocket {
        id: ID!
        name: String
        type: String
      }

      type User {
        id: ID!
        email: String!
        trips: [Launch]!
      }

      # notice the field takes an argument
      type Mission {
        name: String
        missionPatch(size: PatchSize): String
      }

      enum PatchSize {
        SMALL
        LARGE
      }

      type TripUpdateResponse {
        success: Boolean!
        message: String
        # best practice is to return data you're updating so the client cache updates automatically
        launches: [Launch]
      }  
    `
    ```

    - `gql` is the name of a function and by prefixing the template literal with this name, the template string will automatically get passed to the function for processing.
      - in this case `gql` is implemented elsewhere 

    - SDL is GraphQL's schema definition language - similar looking to typescript
    - [SDL Cheatsheet](https://devhints.io/graphql#schema)
    - SDL lets you define **Type** and **Interface**
  - When you run the backend server, you'll get the GraphQL Playground IDE
    - the right-hand side lets you introspect your schema
- **Data sources**
  - An **Apollo data source** is a class that encapsulates all of the data fetching logic, as well as caching and deduplication, for a particular service.
  - You create a data source by extending from a class:
    - REST Connections: `RESTDataSource` from `apollo-datasource-rest`
    - DB Connections: `DataSource` from `apollo-datasource`
  - It would be nice to have a data source API that is completely decoupled from apollo, **BUT** by extending the class in this way we get those extra services like caching, deduplication, etc.
  - You can name your data sources (classes) anything you want
  - Your data sources classes will implement:
    - data access methods (named howerver you want)
    - corresponding, separate methods to map the return values to schema-prescribed data structures
  - Then when you build the backend server, you'll specify an object with your datasources (remember naming is not schema-prescribed)

  ```(javascript)
  const server = new ApolloServer({
    typeDefs,
    dataSources: () => ({
      launchAPI: new LaunchAPI(),
      userAPI: new UserAPI({ store }),
    })
  });
  ```

- **Resolvers**
  - Resolvers will map our data sources (and their return values) to our schema
  - They return either:
    - The data specified in the query
    - Promises for the data specified in the query
  - Resolver function structure: `fieldName: (parent, args, context, info) => data`
    - **parent**: rv from parent resolver
    - **args**: args passed to the field
    - **context**: object shared by all resolvers involved in a GQL operation 
      - has state like authentication/authorization info 
    - **info**: execution info (advanced)

  - Given this server definition...

  ```(javascript)
  // ...other requires...
  const resolvers = require('./resolvers');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      launchAPI: new LaunchAPI(),
      userAPI: new UserAPI({ store }),
    })
  });
  ```

  - we use resolvers to connect the schema operations to the datasource operations

  ```(javascript)
  // ./resolvers.js
  module.exports = {
    Query: {
      launches: async (_, __, { dataSources }) =>
        dataSources.launchAPI.getAllLaunches(),
      launch: (_, { id }, { dataSources }) =>
        dataSources.launchAPI.getLaunchById({ launchId: id }),
      me: async (_, __, { dataSources }) =>
        dataSources.userAPI.findOrCreateUser(),
    },
  };
  ```

  - note how we've destructured the context argument to only pull out the dataSources property.
  - note how the Query property refers to the schema-prescribed Queries
  - some gql queries:

  ```
  query GetLaunches {
    launches {
      id
      mission {
        name
      }
    }
  }

  query GetLaunchById {
    launch(id: 60) {
      id
      rocket {
        id
        type
      }
    }
  }

  // here you can use replacements and Gql Playground has a section where you can declare them
  query GetLaunchById($id: ID!) {
    launch(id: $id) {
      id
      rocket {
        id
        type
      }
    }
  }

  // { "id": 60 }
  ```

    - note the query specifies the projection
    - you start with the kind of operation (e.g. `query`)
    - the second field is a name for the query, which you assign (i.e. `GetLaunchById`)
      - giving them these kinds of names makes them discoverable in the Apollo tooling

  - Another type of (multiline) comment in SDL is `"""`
  - Pagination can be handled with:
    - cursors **preferred**
      - cursor is a constant pointer used to keep track of where in the data set the next items should be fetched from
    - numbered pages
    - For queries that we want paged, they will return a new wrapper type like this (which has an embedded payload and pagination info)

    ```
    type LaunchConnection { 
      cursor: String!
      hasMore: Boolean!
      launches: [Launch]!
    }
    ```

    - then you can refactor your resolver as such:

    ```(javascript)
    const { paginateResults } = require('./utils');

    module.exports = {
      Query: {
        launches: async (_, { pageSize = 20, after }, { dataSources }) => {
          const allLaunches = await dataSources.launchAPI.getAllLaunches();
          // we want these in reverse chronological order
          allLaunches.reverse();

          const launches = paginateResults({
            after,
            pageSize,
            results: allLaunches,
          });

          return {
            launches,
            cursor: launches.length ? launches[launches.length - 1].cursor : null,
            // if the cursor of the end of the paginated results is the same as the
            // last item in _all_ results, then there are no more results after this
            hasMore: launches.length
              ? launches[launches.length - 1].cursor !==
                allLaunches[allLaunches.length - 1].cursor
              : false,
          };
        }
      }
    };
    ```

  - We can write resolvers on types too
    - Remember, queries are like functions that return types
    - A query resolver has to specify how to call the datasource and reformat the return value to match the schema
    - When the field names match between a schema type and a return type, then GraphQL can do the type resolution for us
    - If they don't match, then you'll want to write a resolver on a type:

    ```(javascript)
    Mission: {
      // make sure the default size is 'large' in case user doesn't specify
      missionPatch: (mission, { size } = { size: 'LARGE' }) => {
        return size === 'SMALL'
          ? mission.missionPatchSmall
          : mission.missionPatchLarge;
      },
    },
    ```
      
      - here we have a type resolver.  
      - the input (from the datasource looks like this):

      ```(javascript)
      launchReducer(launch) {
        return {
          id: launch.flight_number || 0,
          cursor: `${launch.launch_date_unix}`,
          site: launch.launch_site && launch.launch_site.site_name,
          mission: {
            name: launch.mission_name,
            missionPatchSmall: launch.links.mission_patch_small,
            missionPatchLarge: launch.links.mission_patch,
          },
          rocket: {
            id: launch.rocket.rocket_id,
            name: launch.rocket.rocket_name,
            type: launch.rocket.rocket_type,
          },
        };
      }
      ```
    
      - and we want to format it according to the schema

      ```(graphql)
      type Mission {
        name: String
        missionPatch(size: PatchSize): String
      }

      enum PatchSize {
        SMALL
        LARGE
      }
      ```
  
    - When you write a type resolver, any properties which have the same name/type between input/output will be resolved/mapped automatically
      - so some types resolvers will just map the tricky stuff
  
  - Authentication
    - Validating the Auth token
      - Authorization usually involves specifying a context function when you new up the ApolloServer
      - You'll destructure the input into just the request object and then grab an auth token from the header 'authorization' (if it exists)
        - When you use the GraphQL playground, you can specify HTTP headers in the bottom left pane
      - if it's legit, you find the corresponding user data attributes and return it.
      - this data will now be available to all subsequent resolvers in the context argument (3rd argument)
    - Providing Auth token
      - There's a mutation called Login that will geneate the token
      - It accepts an input string (email), creates a corresponding user object, then Base64 encodes the email address.

- **Deploying a Schema to Apollo Engine**
  - This is only on the paid plan
  - The benefits include:
    - Diagnostic / Usage measurments
    - Validate existing operations against new Schema
  - You put your service name, id, and key in an `.env` file and run it locally
  - Then you run (in another window): `npx apollo service:push --endpoint=http://localhost:4000`
  - Then you can access your schema information from the Engine site.

### Front-End Development
- add your `.env` file which points at the service
- add the `apollo.config.js` which configures the CLI and VSCode extension
- Client instantiation with a vanilla js query

```(javascript)
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
})
const client = new ApolloClient({
  cache,
  link
});
client
  .query({
    query: gql`
      query GetLaunch {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `
  })
  .then(result => console.log(result));
```

- The return value also includes other properties like `loading` and `networkStatus` for tracking purposes
- Connecting Apollo client to react:

```(jsx)
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, document.getElementById('root'));
```
  - ApolloProvider is analogous to the Context API
    - Wraps your React App
    - puts the Client in the context, available throughout the application

- **Query Component**
  - component that fetches a GraphQL query and exposes the result 
  - uses the **render prop** pattern where you inject a rendering function into the parent component
  - [src1](https://itnext.io/react-patterns-lambda-components-and-render-props-c4dce3903a52)
  - [src2](https://reactjs.org/docs/render-props.html)
  - naieve implementation (using function based component)
  
  ```(jsx)
  <DataProvider>
    {(data) => data.map(item => <li key={item.id}>{item.value}</li>)}
  </DataProvider>

  function DataProvider({ children }) {
    const data = /* fetch data somehow: state, derive from props, … */
    return children(data)
  }
  ```

  - it's called 'render props' bc it got started when people would inject directly into render:

  ```(jsx)
  <DataProvider render={data => (
    <h1>Hello {data.target}</h1>
  )}/>
  ```

  - but you can use any property (not just render), and with `children`, you don't even need to declare it, as it'll be given to the parent component as `props.children`
  - the render prop function exposes `({error, loading, data, fetchMore})` arguments, available for destructuring, and the values of which are injected by the Query component
    - `fetchMore` is a pagination helper, which itself will take 2 parameters:
      - a parameter for the gql query 
      - an `updateQuery` function which will tell Apollo how to update the list of launches in the cache.
        - (we take the previous query result and combine it with the new query result from fetchMore)

```(jsx)
export default function Launches() {
  return (
    <Query query={GET_LAUNCHES}>
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <Loading />;
        if (error) return <p>ERROR</p>;

        return (
          <Fragment>
            <Header />
            
            {data.launches &&
              data.launches.launches &&
              data.launches.launches.map(launch => (
                <LaunchTile
                  key={launch.id}
                  launch={launch}
                />
              ))}
              
            {data.launches &&
              data.launches.hasMore && (
                <Button
                  onClick={() =>
                    fetchMore({
                      variables: {
                        after: data.launches.cursor,
                      },
                      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                          ...fetchMoreResult,
                          launches: {
                            ...fetchMoreResult.launches,
                            launches: [
                              ...prev.launches.launches,
                              ...fetchMoreResult.launches.launches,
                            ],
                          },
                        };
                      },
                    })
                  }
                >
                  Load More
                </Button>
              )
            }
          </Fragment>
        );
      }}
    </Query>
  );
};
```

- example of reusable gql query fragments:

```(javascript)
export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;
```

  - note there are no forward references here (hosting) so the fragment has to be defined first! 
  

- You can also control a query component's fetch policy
  - whether it should prefer cache over network
  - default is `cache-first`
  - other option is `network-only` - maybe there are others too

  ```(jsx)
  <Query query={GET_MY_TRIPS} fetchPolicy="network-only">
  ```

### Mutations
- Just like the `Query` component, there's also a `Mutation` component
  - provides a function to execute a GraphQL mutation
  - tracks the loading, completion, and error state of that mutation

```(jsx)  
import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import { LoginForm, Loading } from '../components';

const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
  `;

export default function Login() {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={({ login }) => {
            localStorage.setItem('token', login);
            client.writeData({ data: { isLoggedIn: true } });
          }}
        >
          {(login, { loading, error }) => {
            // this loading state will probably never show, but it's helpful to
            // have for testing
            if (loading) return <Loading />;
            if (error) return <p>An error occurred</p>;

            return <LoginForm login={login} />;
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  );
}
```

- and in the loginform component, it looks like this:

```(javascript)
// ...
onSubmit = event => {
  event.preventDefault();
  this.props.login({ variables: { email: this.state.email } });
};
// ...
```

- Notes on this code:
  - `Mutation` component refers to `LOGIN_USER` but then passes a render prop argument `login` which will get passed a la `<LoginForm login={login} />`
    - So `Mutation` will be assigning a function to that `login` argument, which is why it will get called in `<LoginForm>` like this: `this.props.login()`
  - The `onCompleted` handler expects to get the return value of the mutation, which it will destructure into the single field `login` and then persist to local storage.
    - `client.writeData()` writes **local** data to the cache (so I guess it is caching server and client)
    - The `ApolloConsumer` is necessary to get access to the `client` (destructured), which provides that cache helper function

- Example passing more configuration into the Client

### Managing Local State
- Apollo Client lets us store local data inside the Apollo **cache** and query it alongside our remote data with GraphQL.
  - Short version for how this works is that you define another schema and resolvers for this local data
- Examples of local state: network status, form state, etc.
- By using the apollo cache instead of augmenting with another state containers (e.g. Redux), you can have a single source of truth
- your schema will look like this...

```(javascript)
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [Launch]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;
```

  - The `extend` is for VSCode tooling so it can handle combining the schemas
  - This is interesting: you can augment existing types with local-only fields- see `isInCart` example
    - you can have *computed fields*
- Queries execute as soon as the component mounts
- Example local query (notice the only difference is the @client directive)

```(jsx)
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({ data }) => (data.isLoggedIn ? <Pages /> : <Login />)}
    </Query>
  </ApolloProvider>,
  document.getElementById('root'),
);
```

- Here's a query that uses a client-only field

```(javascript)
export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;
```

- You need to specify a resolver (just like on the backend)

```(javascript)
export const resolvers = {
  Launch: {
    isInCart: (launch, _, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      return cartItems.includes(launch.id);
    },
  }
};
```

  - Note that the resolver API is the same on the client as it is on the server
  - So the parameter order is the same:
    - **parent**: rv from parent resolver
    - **args**: args passed to the field
    - **context**: object shared by all resolvers involved in a GQL operation 
      - in this case it has the client cache added to it
    - **info**: execution info (advanced)  

- Two ways to Update Local Data**
  1. Direct Cache Writes
    - Use when you're updating simple fields, e.g. boolean vals, etc.
    - Pretty simple: `client.writeData({ data: { isLoggedIn: false } });`
      - `client` was provided by `<ApolloConsumer>`
  2. Client Resolvers (example below)

```(javascript)
import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';

const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

export default function ActionButton({ isBooked, id, isInCart }) {
  return (
    <Mutation
      mutation={isBooked ? CANCEL_TRIP : TOGGLE_CART}
      variables={{ launchId: id }}
      refetchQueries={[
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: id },
        },
      ]}
    >
      {(mutate, { loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>An error occurred</p>;

        return (
          <div>
            <Button
              onClick={mutate}
              isBooked={isBooked}
              data-testid={'action-button'}
            >
              {isBooked
                ? 'Cancel This Trip'
                : isInCart
                  ? 'Remove from Cart'
                  : 'Add to Cart'}
            </Button>
          </div>
        );
      }}
    </Mutation>
  );
}
```
  

## Other Questions / todos
- Styled components are interesting...
- what is `injectStyles()` all about?
- safe navigation workaround - really needed
- how to handle stale data in apollo
- is there a way to call multiple schema queries at once



  