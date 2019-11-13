GraphQL Intro
=============

## Summary
- "one endpoint for everything"
- basically middleware for aggregating, combining, caching service results
- strongly typed
- extremely convenient for the client
- adds lot of overhead for the back end
- facebook (which developed) was a good use-case because they've got a huge API service and they want to make consumption as simple as possible for their (public) users.
- content negotiation is a key idea
- key use cases:
  - New API design
  - Existing API orchestration / gateway
  - API layer of abstraction 
- Benefits
  - avoid multiple roundtrip to fetch hierarchical or related data
  - performance increase - no need to wait for new endpoint to be stood up
  - can be used to ask for data from different endpoints
- Language Independence and the Spec
  - TODO

## Core Concepts
- data operations
  - queries
  - mutations
- schema definition: what the data looks like
- resolvers: function that that respond to queries

## Tooling
- GraphiQL: it's a GraphQL API Explorer
  - https://www.graphqlhub.com
- GraphQL Playground (included in a lot of distributions)
- Postman 

## Queries
- question format specifies what the response wshuld look like
  - you can specify the object graph and it's deeply nested structure
- example schema:
  - User(id, name, age, address, orders)'
  - Oder(id, created, items)
  - OrderItem(id, product, query, price)
  - Product(id, name)
- example query:

```
Users {
  name, orders {
    created,
    items {
      quantity,
      price,
      product {
        name
      }
    }
  }
}
```

- returned data looks just like this query
- so another problem it's solving is that the query language is intuitive
- query with parameter: `Users(email:'chris@dfkj.com')`

## Schema
- define a schema
  - first step to creating a graphql server
  - hard way is to use graphql lib (node library)
  - there are easier ways
- for complicated graph hierarchies, you just use a different class
- the schema defines the type (can be custom type), also defines the resolver library
- same with collections
- **basically**, I think this sits on top of your own data access methodlogy

- new buildSchema lib makes it all very easy
  - uses graphql schema definition language

## Mutations
- CRUD
- define metadata and then the resolver
  - the resolver will be a reference to function that calls the API
- Mutations can return data and the client can pick out which fields have receive (just like w queries)

## Consumtions
- from a browser, just use the fetch api
  - you don't need a fancy http client
- apollo si the main client
  - they supply the server and the client
  - also has iOS and Android clients
- relay is another 

## Server
- to create a server
  - define a schema
  - create resolvers
  - insantiate and lauch the server

## Syntax Details

- Common Syntax:  `<optional>`  `[required]`
```(gql)
/<query/|mutation/|subscription/> /<OperationName/<(/$parm1Name: parm1Type = parm1DefaultVal, ...)/>/> {
  <queryAlias:> [query]<(parm1Name: parm1Val)> {
    <fields>
  }    
}
```

  - When you have a query operation with only 1 top-level query, you can omit this top-line 

- Root-level tokens are the names of queries.  Stuff below that are the fields you choose to return.

```(gql)
{
  hero {
    name
    friends {
      name
    }
  }
}
```

- The return values will have the same shape as the query

```(json)
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

- Queries AND Fields can have arguments

```(gql)
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

- When you have multiple fields with the same name, use an alias to separate them in the return results

```(gql)
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

- Return results look like this:

```(json)
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

- Fragments let you define reusable projections

```(gql)
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

- You can use variables inside fragments

```(gql)
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

- Variables
  - Must be prefixed with a `$`
  - Must be scalars, enums, or input object types

-  Directives
  - Built-in methods
  - There are currently 2 directives in the GraphQL spec:
    - `@include(if: Boolean)`
    - `@skip(if: Boolean)`
  - You pass in a variable as the `if` parameter and it will optionally skip or include the corresponding fields

  ```(graphql)
  query Hero($episode: Episode, $withFriends: Boolean!) {
    hero(episode: $episode) {
      name
      friends @include(if: $withFriends) {
        name
      }
    }
  }
  ```

- Mutations will return data just like queries.  Their syntax is basically the same, except the operation type keyword.

```(gql)
// query
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}

// variables
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

- Note that in this example, we're passing a complicated input object (the data we're creating) and then asking for similar fields back

- You can execute multiple mutation operations in a single request
  - Query fields are executed in parallel while mutations are executed serially

- Handling Union Types
  - When you have a return type that could be a union (one of multiple types) type from an operation, you can specify a `...` called an *inline fragment* to dynamically apply the appropriate fields to the return type

  ```(gql)
  query HeroForEpisode($ep: Episode!) {
    hero(episode: $ep) {
      name
      ... on Droid {
        primaryFunction
      }
      ... on Human {
        height
      }
    }
  }
  ```

    - Named fragments can also be used in this way

- Meta Fields
  - You can use the built-in `type_name` keyword to have the schema type returned in the corresponding results

  ```(gql)
  {
    search(text: "an") {
      __typename
      ... on Human {
        name
      }
      ... on Droid {
        name
      }
      ... on Starship {
        name
      }
    }
  }
  ```

  - where the results would look like this:

  ```(json)
  {
    "data": {
      "search": [
        {
          "__typename": "Human",
          "name": "Han Solo"
        },
        {
          "__typename": "Human",
          "name": "Leia Organa"
        },
        {
          "__typename": "Starship",
          "name": "TIE Advanced x1"
        }
      ]
    }
  }
  ```

## Resolvers
- Receive 4 parameters:
  1. **obj**: the parent object of the current field
  2. **args**:  the arguments provided to the field in the GQL query
  3. **context**: general information, passed to every resolver
  4. **info**: metadata on the field, schema, parameters.  
- Resolvers can return promises - it will be up to the GQL runtime to wait for them to resolve before passing it onwards
  - This is also true if you have a list of promises
- Although resolvers are at the field level, many GQL runtimes (libraries) will do this for you automatically if there's a correspondence between the passed in value

## Introspection
- To enable tooling and other types of reflection-like behavior, GraphQL supports a variety of *introspection* operations (i.e. built-in queries to let you inquire about the schema and operations exposed)
  
## Misc Best Practices
- By batching mutiple queries into a single request, GQL provides better NW performance
  - Though JSON is the transport format, you can gzip the responses to good success
  - Make sure clients send the header: `Accept-Encoding: gzip`
- Versioning
  - Avoid hard versioning of your API's like a REST API
  - Since GraphQL only returns the types explicitly requested, breaking changes are avoided
- Nullability
  - Every field is nullable by default.  This is smart bc:
    - Authorization could be field specific
    - Particular actions could fail
- Pagination
  - Various options in how you specify page sizes of lists:
    - Explicit paging
    - Cursor
    - *Connections* Pattern: TODO
  - Another design decision is whether this paging is implemented on the back-end API side or in the GQL layer
    - Tradeoffs exist - depends on how you're joining
    - Ideally, paging on the backend (but this is not always possible depending on the API implemented)
- Server-Side Batching and Data Loaders  
  - In general, the fulfillment of a graphql query can result in redundant calls to the data provider (downstream API or data store)
    - The resolvers have no idea about:
      1. How many times they might be called in the fulfillment of a query
      2. What other resolvers might get called
  - If you imagine the execution plan (series of resolvers that get called) in a graphql query as a tree, the naieve approach might be Depth-first execution
  - One example of this is the so-called `n + 1` problem which is a well-documented issue in the world of ORM's:
    - [Good explanation](https://stackoverflow.com/questions/97197/what-is-the-n1-selects-problem-in-orm-object-relational-mapping)
    - To get data on `n` objects you naively execute `n + 1` queries - whereas a much more optimal route could involve only 1 query.
  - The data-loader pattern is more like a breadth-first strategy insofar as:
    - It will collect all the ID's requested by a given resolver before actually issuing the back-end query.
      - It's even better if the downstream system can handle lists of ID's as input parameters, rather than handling one at a time
    - It will support a per-request (ie extremely short-term) cache, hydrated by the results of the back-end queries, and organized by ID's which service resolver's queries
  - The data-loader's provide a layer of abstraction used by the resolvers in the fulfillment of their query:
    - The resolvers are super-local/dumb whereas the data-loader is more of a global object
    - The life-time of the resolvers are short-lived, whereas the data-loader is a bit longer (the fulfillment of the GraphQl request) 
  - The trick with data loaders is timing
    - If each resolver delegates its back-end calls to the data-loader, then we need to be able to defer:
      - The back-end calls until all similar resolvers are called
      - The ultimate resolution of data to the resolvers
    - This is a graphql-library / language - specific pattern
      - With node: it uses `process.tick` [this is a good explanation, apparently](https://www.youtube.com/watch?v=OQTnXNCDywA&feature=youtu.be&t=1323)
  - **Problems**: The data loader pattern seems to rely on:
    1. The back-end data provider supporting batched inputs (i.e. lists of IDS)
    2. Being able to identify the objects you need in advance (i.e. by ID), which is not always ideal (e.g. search scenarios)
- Mutations
  - Bc queries (can) return a graph, any mutations are *partial*
  - The best practices for designing mutations include ([src1](https://medium.com/@__xuorig__/graphql-mutation-design-anemic-mutations-dd107ba70496), [src2](https://blog.apollographql.com/designing-graphql-mutations-e09de826ed97)):
    - Naming for CRUD operations: `nounOperation`, (e.g. `userUpdate`)
    - Input parameter:
      - Have only one
      - Name it input      
      - It should be specific to the operation
      - Fields should be non-nullable
    - Maximize specificity:
      - Consider the antipattern *Aenemic Domain Models* in DDD (i.e. model only has data, but no behaviors)
        - Results in a confusing API surface for the client
      - Also the UI developer can write specific mutations, which can be implemented by the back-end developer
      - Results in a more limited-scope mutation rather than a more easily exploited general mutation
    - Use Nesting as much as possible (helps with versioning)
        
- Architecture
  - Business Logic should go in a dedicated layer - separate from GQL
  - From docs: **Prefer building a GraphQL schema that describes how clients use the data, rather than mirroring the legacy database schema.**
    - Express the **what** not the **how**



## Other
- fragments: reusable, parameterized queries
  - slims things down
- there is a nuget package for creating a dotnet-based graphql server



