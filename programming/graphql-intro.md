GraphQL Intro
=============

- "one endpoint for everything"
  - this could be really great for an out of control set of services
  - but you still need to set up your normal services
  - i think thats a big point:
    - companies have exploding number of endpoints
    - this is just a way to centralize all of them
- content negotiation is a key idea
- summary
  - basically middleware for aggregating, combining, caching service results
  - convenient for the client
  - adds lot of overhead for the back end
  - facebook (which developed) was a good use-case because they've got a huge API service and they want to make consumption as simple as possible for their (public) users.
  - for internal applications, I don't see a huge benefit.

## Purpose
- avoid multiple roundtrip to fetch hierarchical or related data
- performance increase - no need to wait for new endpoint to be stood up
- can be used to ask for data from different endpoints

## Core Concepts
- queries: questions
- schema: what the data looks like
- resolvers: function that that respond to queries
- mutations: change data

## Queries
- to experiment, check out GraphiQL: it's a GraphQL API Explorer
- https://www.graphqlhub.com
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


## Other
- fragments: reusable, parameterized queries
  - slims things down
- there is a nuget package for creating a dotnet-based graphql server

