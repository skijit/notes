Backends for Front-ends
=====================

- [src](https://samnewman.io/patterns/architectural/bff/)
- BFF is basically a facade pattern for connecting a service-oriented architecture to any number of clients

## Basics

- Problems of a Single API serving multiple clients
  - Different API requirements for Mobile vs Desktop Clients
  - Bottlenecks delivery when all clients are coupled to a single backend
  - A distinct team will be responsible for the backend, and they'll have to balance the priorities of the various client teams.
- BFF: Backend for Front-end
  - Each application is factored into:
    1. Client
    2. Server-side component (BFF)
      - BFF is tightly coupled to the client
      - BFF is not a general-purpose BE API
      - BFF is maintained by the same team as the client
- BFF granularity options
  - E.G. 1 BFF for mobile vs Multiple BFF for each Mobile Platform (e.g. iOS, Android, etc.)
    - Remember that you want the same team on the client as the 
    - "One experience, one BFF"
  - Have BFF's follow team structure/organization
- BFF's as service aggregator / orchestrator
  - The BFF is an entry-point which should call any number of downstream services (which are themselves more generic)
- Tradeoffs with code duplication
  - Within a BFF, obviously, minimize any duplication
  - Across BFF's there is a higher risk of duplication
    - 2 ways to address:
      - Shared Library
        - Esp good for cross-cutting tech requirements, like authorization
      - New Shared Service
        - Esp good if oriented around business process

- Questions:
  - How to reduce marginal cost for each BFF?
  - How to fit caching in?
  
