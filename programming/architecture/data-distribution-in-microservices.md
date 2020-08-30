- [Distribute your microservice data w Events, CQRS, and event sourcing](https://www.youtube.com/watch?v=HdvWfr2KwA0&t=8s)
- [The hardest part of Microservices: Your Data](https://www.youtube.com/watch?v=MrV0DqTqpFU)
- [Eventual Consistency](https://en.wikipedia.org/wiki/Eventual_consistency#Strong_eventual_consistency)
- when it comes to distributed systems, "code is easy, state is hard"
- antipattern
  - synchronous data retreival (i.e. one microservice to another) on a remote endpoint
  - problems:
    - latency
    - availability
    - performance
  - common solution:
    - cache or polling
      - downside: brings it's own set of complexities
      - upside: gives you full buy in to eventual consistency
- event sourcing
  - example of banking model
    - you model the transactions (credits, debits, etc.), not the resulting state
- CQS- command query separation
  - a modelling concern that says you should have a totally different interface (ie java or c#) between commands vs queries
    - by separating these interfaces out, the implementations can be totally separate (incl possibly different services, technologies, etc)
  - "asking a question should not change the answer"
- CQRS - Command Query Responsibility (Resource) Segregation
  - takes CQS a step further by separating read vs write data stores
  - various degrees of separation are possible
    - write to table, read from materialized view in same DB
    - have componetely different data stores/instances (n/w separated)
- Combining CQRS and Event Sourcing
  - Back to banking example:
    - Write to transacations model
    - Read model is based on the resulting account info
- Origins of CQRS
  - Performance reasons
- But there are more contemporary benefits of CQRS:
  - Distribution
    - Orthodox microservice architecture states that each service owns it datastore
    - For different read-oriented microservices, you can have their local data updated through events emitted by the write data store
    - options for this cross-service eventing system? (see below)
  - Availability
  - Integration
  - Analytics
- Event Systems
  - `Synchronous Event Retrieval` (e.g. Http+Rest/gRPC/etc)
    - pull model
    - Retrieve all of the events that have happened since a certain timestamp
    - pair this with a cronjob / polling interval
    - so the write store service needs to provide endpoints for events and the underlying entities
    - analysis: simple (brokerless), not common but it works
  - `Asynchronous Event Propagation` (e.g. kafka)
    - push model (w event broker)
    - analysis: no polling/less latency
- Progression towards this model
  1. Start w Event Sourcing
    - You could retroactively generate the events for existing db's
    - Debezium helps with this (reads transaction log and propagates to log)

  2. Distribute the events
    - Create rest endpoints for your events OR
    - Publish the events on Message Broker 

  3. Consume your events and update your local CQRS data store

  4. Use the local data in your local CQRS data store

- 
