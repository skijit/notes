GraphQL Summit 
==================

# Caching All The Things

- zillow group presenting
- They use as an API gateway for all their other apps
- their pattern:
  - separate project to define the graphql-data-sources
  - pattern is named data-source pattern / connector
  - Each kind of ddatahas it's own Connector which extends a RestCorrnecotr
  - [more info](https://www.trulia.com/blog/tech/graphql-one-endpoint-to-rule-them-all/)
- 1 request fanning out to 20 requests is "not sustainable"
- They determined that each of those 20 calls doesn't need to be realtime
- 3 levels of server-side caching
  - Request Level: Data Loader
  - TCP: Varnish
  - DNS Cache
- DataLoader
  - handle N+1 problem
  - Resolvers are unaware of each other
  - Handles batch loading
  - Cache memoization based on key for per request
- Caching at the Http Level (across requests)
  - HTTP Cache
  - So, much lower level than something like Redis
  - Cache configs can be overridden by headers
  - Allows cache fallbacks and retries
  - TTL defines how long the object remains in cache
  - They set it all up in kubernetes
- DNS Caching
  - Another goal is to reduce the length of an HTTP request
  - Stages: Dns lookup, tcp connect, send, wait, transfer
  - Used node setting to reuse tcp connections between results
  - CoreDNS Go Server lets you store DNS lookup results

# State Management in GraphQL w Hooks
- Global State
  - Application state
  - All components need this
- Local State
  - Localized to components
- State Mgmt Option
  - Mobx
  - Redux
  - Hooks
  - Apollo Client
- Bad parts about ContextApi
  - Any subscribers will be rerendered
- you can create custom hooks just by returning a couple other hooks
- you can useContext to get and set an inital state for the next hook
- example: https://github.com/shrutikapoor08/graphqlsummit2019

# Fine-Tuning The Apollo-Client Cache
- Client side data graph should be independent of specifically graphQl
- Apollo client 3.0 is about maintaining a coherent reactive client-side graph
- new apoloclient features
  - only one @apollo/client package
  - cache evistionand garbage collection
  - better pagination

# A Treatise on State
- component
  - state
  - view
    - you can provide the view callbacks to change state
    - state can be injected into a view
  - (styles) (if you're using css-in-js)
- state drives view, generally
- 5 types of state
  - Local
    - component state
    - form state
    - UI state
  - Shared
    - App State
    - Data (cache or store)
    - UI State
  - Remote
    - Source of truth is a server, even if you cache or derive other values from it
    - Async
  - Meta
    - State about state, such as 'loading...'
    - Mght have an API to make changes to it
  - Router
- State mutability
  - Redux puts everything in one store of shared state
- Methodology
  - Find out who owns state
  - Manage it there, and distribute it by props and context

# GraphQL and C#
- 2 major libraries
  - DotNet GraphQL
  - Hot Chocolate (less popular, newer)
  - Open Source- no support from MS
  - Community seems pretty small
- Start with a Model
- Then you use C# to define the Schema types (so... appears like no SDL)
- https://codetraveler.io/GraphQLSummit-DotNet

## todo
- add in hand notes

## other things to read
- https://medium.com/airbnb-engineering/how-airbnb-is-moving-10x-faster-at-scale-with-graphql-and-apollo-aa4ec92d69e2
- https://www.youtube.com/watch?time_continue=5&v=P-J9Eg7hJwE




