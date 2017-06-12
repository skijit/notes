Microservices
=============================
- [Pluralsight course](https://app.pluralsight.com/library/courses/microservices-architecture/table-of-contents)

## Overview
- Services provide (often reusable) functionality to a client of some kind
    - Typically delivered over the network
- Benefits of SOA  
    - Good at scaling by increasing number of instances
- In a SOA you keep a standard interfaces or contracts
    - You might upgrade the service but you keep the interface
    - services should be stateless / dumb
    - allows for backwards compatibility
- Microservices is an iteration / evolution / upgrade of SOA
    - People have learned the best practices
    - Teach you how to size a service properly
    - Traditional SOA resulted in monolithic svcs inefficient for scaling and handling change
- Microservices are small, with a single focus
    - An API with related functionality
- Lightweight communication
    - client to svc
    - svc to svc
    - technology agnostic (e.g. http)
- Each microservice...
    - has its own data storage
    - can be updated/changed without affecting the others
- You need to have centralized tooling for management
- Typically have an API Gateway to route requests to appropriate svc(s)
- Monolithic Application
    - As you add stuff to your application, it keeps growing
    - Large codebase takes longer to develop
    - Harder to test
    - Greater risk of regression
    - More coupling
        - Failure affects the whole system
    - One advantage: easier to set up a dev, test environment (esp when on 1 machine)
- Uses Business Domain Driven design
    - Service architecture should match the organizational/business-function structure
- Use Automated Test tools to simulate/test the integration between different services
- Cloud Affinity
- Throughput benefits thru availability of async communication
- Simple svcs and client tech 
- Allows finer grainer security approach (per service)


### Misc benefits
- Limited scope for each microservice
    - Once you have your architecture in place, you don't need so many senior developers bc each particular codebase isn't so complicated
    - dev time is shorter
    - Easier to test
- Easier to adopt (take advantage of) new technologies
- key benefits
    - shorter development times
    - deployment is reliable
    - decoupled (even the client)
    - using proper technology

## Design principles
- 5 key principles

1. High Cohesion
    - has a single focus
    - only changes for 1 reason
    - consistent with OOP SOLID principle
    - encapsulation
2. Autonomous
    - Doesn't change bc something else changes: all is loose coupling
3. Business Domain Centric
    - Svcs based on DDD's Bounded Context:
        - Take all the function that is related to a specific business function or domain
    - Identify boundaries or seams
        - Hard part is handling overlapping functionality
4. Resilience
    - If one service goes down, then there's a graceful degradation of the system as a whole
    - multiple instances of services
        - register on startup
        - deregister on failure
5. Observable
    - You need a central monitoring tool to understand system health
        - Status
        - Logs
        - Errors
        - Usage statistics
6. Automation
    - Automated testing
    - Environment Setup
        - Containers
    - Deployment
    - CI


- TODO: Continue at module 2
