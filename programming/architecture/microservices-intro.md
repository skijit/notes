MicroServices
===================

Martin Fowler Talk on Goto Conference
[Link](https://www.youtube.com/watch?v=wgdBVIX9ifA)

## What are Microservices?
- Contrast to a *Monolithic* Architecture
	- **Monolithic Architecture**: A bunch of functionality all hosted in a single process
	- In a microserves arch, all those functional components are hosted in separate processes
		- Analagous to the Unix Command line, and how they're piped together
- Factoring into separate processes has benefits in upgradability and scalability
	- **Scaling**: you can duplicate them in whatever combination you like, whereas in a monolith, you need to duplicate the whole monolith, which may not be desirable.
	- **Upgradability**: Components can be independently upgraded / replaced

- Common Characteristics for Microservices (in lieu of a rigorous definition)
	- Componentization via Services
		- Components could be packaged in any number of things: objects, libraries, functions, services
		- Services are a good way to package components due to independent upgradeability.
		- **Example**: Suppose you have a monolithic application whose components are delivered via libraries, and then you want to upgrade a library, but it only works with a new version of Java, but the monolith uses the older version of a Java.
	- Organizing around business capabilities
		- Rather than creating teams based on technologies (e.g. UI, Business Logic, DBA's, etc.), you organize teams based on the business capability.  
			- So each team would have a UI, Business Logic, etc. person
	- Smart Endpoints and Dump Pipes
		- Contrast to ESB
			- ESB approach has sophisticated middleware that routes messages, triggers/executes business rules
			- Microservices say the intelligence should go into the endpoints and that the task of routing is not the appropriate locus of complexity, bc a simple routing/messaging infrastructure is all that is needed (i.e. the big problem is not about messaging/communication/routing).
	- Decentralized Data Management
		- In the relational world, everything is centralized inside a single (or small collection of) database(s)
		- In microservices, you have isolated data stores which can only communicate via their API's (microservices).
		- Benefits:
			- Individual services can use the data stores that make sense for them.  They don't need to reconcile (shoehorn) all of their practices into some unified (rigid, awkward) data store.
	- Infrastructure Automation
		- A lot of these architectures rely on CI methods, monitoring, etc.
	- Design for Failure
		- You have design your system under the assumption that individual components will fail in a distributed system, and so you find ways to minimize the impact.
		
## How are Microservices different from SOA?
- The first question is **what is SOA**?
	- Some people think Microservices is *exactly* the same as SOA 
	- The problem is that SOA means lots of different things to different people.
		- If SOA means ESB, then there's definitely a difference between the two.
- So Microservices are like a useful, more-specific subset of the SOA universe.

## When should we use them?
- Monoliths vs Microservices
	- Monoliths
		- simple
		- **more** consistency
		- **easier** to refactor the boundaries/responsibilities of various modules
	- Microservices
		- require distributed infrastructure
		- often async
		- partial deployment / independent upgradability
		- more availability (if you do it right)
		- **less** consistency
		- **harder** to refactor the boundaries/responsibilities of various modules
		- strong/rigid enforcement of modularity
		- multiple platforms
		- partner with cloud deployments very nicely

## Technical Prerequisites
- Basic monitoring
- Strong Dev Ops
- Partners nicely with cloud

## Notable Deployments of Microservices
- Amazon
- Netflix
	- They have a component called 'Chaos Monkey' that randomly kills nodes in their network and monitors the results.

## Other thoughts
- One big problem is dependency management.  
	- How many clients reference a particular component (or service) is an important thing to know.
	- Microservices might provide a benefit here... but it might also run afoul of the *Dumb Pipe* principle.
- Still need to understand better how Data Replication / Data warehouse is different from SOA
	- Intuitively, SOA should abstract from data and answer business questions whereas data warehouse replicates/cleans/centralizes data from source systems.
		- Data warehouse could be the *foundation* for SOA.
