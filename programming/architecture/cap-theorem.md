CAP Theorem
=====================

- In Practical terms:
  - Discusses (theoretical) tradeoffs in reliability (between consistency and availability) for a suffering a partition (i.e. severed connection between nodes in a distributed system)
- CAP
  - Consistency
  - Availability
  - Partition Tolerance
- Consistency:
  - Each node in the distributed system has the same data
- Availability
  - The distributed system is online and available to users
- If there's a network partition, you have a choice:
  - To maintain consistency, you must become unavailable
  - To maintain availability, you might becomee inconsistent
- Remember: this is theoretical
  - There are lots of degrees of availability and degrees of consistency
  - Partial Availability
    - Certain operations are allowed
  - Eventual Consistency
  - Burden of proof should be on favoring availability bc consistent designs are MUCH easier to support
- A DB system which embraces both Consistency and Availability at the cost of partition tolerance would be a single (non-sharded) instance of a DB (i.e. lives on one system)
  - Typically, a relational system
- DB's which support Consistency-Partition Tolerance (CP)
  - MongoDb
  - Couchbase
  - Redis
  - memCached
- Db's which support Availability-Partition Tolerance (AP)
  - Cassandra
  - CouchDb
  - Dynamo

