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

  
## Other
- fragments: reusable, parameterized queries
  - slims things down
- there is a nuget package for creating a dotnet-based graphql server

