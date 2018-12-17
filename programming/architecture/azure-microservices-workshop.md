Azure and MicroServices Workshop
========================

- hands on labs are online.  [See here](https://github.com/michelebusta/MicroserviceWorkshops) and check the README to get started.
- [updated materials are here](bit.ly/2E7DfXn)
- things that apply to work
  - separating backends and eventual consistency
  - cqrs
- feasibility test aka "preflighting"
- depends on business buy-in / requires a *transformation*
- are the benefits of a microservices architecture dependent on scale?
  - of functionality?
  - of data?
  - of implementors?
- local implementations of docker, should probably just go ahead and use kubernetes


## Microservices At a Glance
- discrete
- atomic
- independently deployable services
- deliver a **well-defined and bounded domain capability**
- guiding design principles involve some intepretation
- common characteristics
  - might have more than 1 endpoint
  - but it needs to own it's backend
  - within the service, strong coupling (ie "high cohesion") is ok
  - align it with the business domain
  - doesn't require a particular technology
  - improved system resilience
  - isolation & autonomy
  - fundamentally about business benefits
- this isn't a technology update but a **business transformation**
- when you start from the beginning, then you get the benefits of maintenance
- relies on... 
  - dev ops
  - container mgmt
  - these require a big investment

## Microservices Evolution
- we're already running distributed application
- evolution
  - single executable
  - dll
  - out of process
  - over machine boundary
  - message passing / msmq / etc
  - Soa / SOAP
  - Soa / Rest (due to iphone... google this...)
- redesign
  - monolith
  - client service
  - 3 tier apps
  - distributed components but they have the same db
  - SOA: separates out the data 
- Original SOA at the enterprise was separate stacks for ERP, CRM, CMS
- This led to services sharing a single database for convenience (bc a lot of the data is related)
  - this hits home
  - one solution was data services (like OData)
- leads to microservices and concept of **eventual consistency**
  - back to services with single responsibilities
  - but we accept the idea of eventually consistent views
    - we're still talking about millisecond timeline
  - helped by messaging backbones - guaranteed delivery  
  - your reporting client will call a reporting service which will call a reporting aggregation backend which connects to other services
    - see this slide

### Principles
- SOA was more technical boundaries, didn't think so much about business domain perspective as primary
  - think about **atomic business capabilities**
- requires business to provide test cases they depend on
- Bounded Context
  - essentially breaking into smaller well-defined pieces
  - you have to identify domains and interaction points
- Shared Nothing Architecture
  - other than your messaging backbone, container infrastructure, security nodes/process (identity mgmt)
  - atomic microservices: easier to regression test
- parallel, Non-blocking development

## Design
- not worth doing unless we have business support
- don't think of domains as abstract "customer info" ... this was the old way of SOA
  - identify the (concrete) business domain
  - DDD is good for this stuff
  - use cases should be key drivers
- how to group things (other than use cases)
  - scale
  - deployed together
- see things in terms of "aggregates" [one ref](https://martinfowler.com/bliki/DDD_Aggregate.html)
- think in terms of services and aggregates
  - services can have more than aggregate
- Eventual Consistency means db replication / syncing
  - you think in terms of SLA (latency) from the beginning
  - it doesn't go through the service layer
- Services should fit in your head
- (endpoint, rest, container) != ms, functional area == ms, distributed system == ms
- cross domain transactions are basically impossible
  - this has been proven time and time again in cs
  - good solution: eventual consistency with messaging 
    - message becomes the source of truth
- aggregating queries across domains
  - bad performance
  - solution: cqrs mutiple data stores, muiple projections for a purpose
    - message: writes
- design will always be iterative

## Containers
- Docker containers
  - Linux
  - Windows
- HyperV containers
  - Additional isolation for Windows VMs
- Docker engine is required to run a docker image
- linux container vs docker
  - linux is process centric, docker is app-centric (bc you package apps and dependencies)
  - docker has build automation
  - dokers has versioning
  - docker can run linux and windows

### Docker Fundamentals
- lots of technologies for orchestration (kubernetes, swarm, etc.)
- kubernetes api is supported by the other orchestration technologies
- kestrel could be used cross platform!
- iis can run on windows server core base
  - todo: compare w kestrel
- components:
  - docker daemon
    - `Docker -d`
  - docker-cli
  - docker file: instructions for building the image
    - might include steps to compile code
  - images
    - snapshots of a container
    - immutable
    - images have layers
      - base layer: os image (eg ubuntu, alpine, windows server core, etc.)
    - container registry is required to distribute docker images
      - typically, you want to use Azure for this
      - although, you don't have to
    - compose
      - compatible w kubernetes
      - define environment variables
      - describe a deployment
      - the unit of deployment
    - swarm mode
      - local, native clustering 
      - use it for testing how things are going to look when you deploy to your actual cluster technology (e.g. kubernetes)
      - note: docker swarm is a cluster and is now called 'docker community'
        - its different from docker swarm mode
  - steps:
    - DockerFile + Web Ap Source
    - `docker build -t web .`
    - then you have an image
    - then you can run the image
  - you can create intermeidate layers with docker
  - look into compressed images too
  - your code can be built by the docker
- mount volumes for logging or use a logging service
  - in azure that's typically app-insights
- docker compose is what we start with before getting into orchestration
- local orchestration
  - docker compose
  - docker stack to local swarm
  - docker stack to kubernetes
  - local kubernetes <- not a good idea
- TIP: monorepos for in-process dependencies, have a different repo for microservices

## Notes on Strategy for Work
- docker into deployment
  - for interoperation with other stuff (e.g. python)
  - for eventual step up to microservices
    - at that point: legit orchestration / clustering
  - move existing/legacy apps to containers (lift and shift)
    - this never needs to go to the orchestration
  - where do we need isolation?
  - can we do producer/consumer tracking while we're at it?
- CI/CD strategy
  - gated check-ins
  - need tests
- Documenting producers and consumers
  - when we compose, maybe we have some std way of handling this?
- Dev experience vs Test/Prod experience


