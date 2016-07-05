Getting Started With EF6
===============
Notes from a pluralsight [course](https://app.pluralsight.com/library/courses/entity-framework-6-getting-started) with Julie Lerman

## Introduction
- One advantage of EF to other ORM's is the variety of ways you can map your model classes to your data schema
- Current version is EF6.  EF7 is in the pipeline, but that will be a revolutionary/breaking change.
- Basic Process:
    - User Domain Classes get wrapped by the DbContext API, which specify how the classes map to the underlying data model in the DB
    - Then you write Linq to Entities queries against your domain classes, and the EF Linq provider knows how to translate these into SQL
- Mapping to Views: OK
- Running stored procedures: OK
- EF can track changes that are made to the data and then you can commit all of these changes via ```SaveChanges()```
- The Runtime In-memory Model:
    - There are two approaches to designing a Model:
        1. Visual Designer (EDMX)
        2. Code-based
    - Whichever method you choose shouldn't make a difference insofar as they both are used as input to an approach-specific API which generates a Run-Time In-Memory model.
    - All of your EF operations will be executed against this model 
- Model Creation Options
    - "Database-First" Methods:
        - Point the design surface at an existing database
        - It will produce a corresponding EDMX
        -  You can also use the design surface to import and update your model based on changes in your data
    - "Code First" Methods:
        - It will create your Database, Schema, Update Mappings (ie Migrations)
        - There are default conventions for how your Classes map to DB structures, but they can also be overidden.
    - Hybrid: Code First to Existing Database: 
        - Stubs out your Entity classes (POCO's) and collections
        - See [this screencast](https://channel9.msdn.com/Blogs/EF/Code-First-to-Existing-Database-EF6-1-Onwards-)
- DbContext will wrap your Domain Objects and then EF will be able to use that
- POCO's really just refers to the fact that the Domain classes don't have dependencies on EF
- EF7
    - Rewritten from ground up, removing old/stale dependencies/bugs.
        - Not backwards compatible with earlier EF
        - Difficult to fix SQL generation bugs as this will break existing code 
    - EF6 development/fixes will continue, but most innovation will go here
    - Will have 3rd party designers out there
    - Will work on Core CLR
    - To help working on smaller devices, the API will be broken into smaller pieces
    - Will run on client devices
    - Will support non-relational DBs
    
## Code-First Walkthrough
- Create a class library project to hold the POCOS
- Then create a second class library project to hold the EF / data model
    - Install nuget package for EF
    - Create a Context class, which inherities from ```DbContext```
    - The derived Context class will:
        - Have your ```DbSet<T>``` objects, where T is a POCO class.  Your queries will target these DbSets.
            - Note: YOu can have entities in your Model that aren't in a DbSet, but are reachable through relationships in a DbSet.
    - The base DbContext functionality includes:
        - Provide query tracking and execution
        - Track changes
        - Execute updates
        - Map classes to the DB schema
- At runtime, EF will use your Context and Model Poco's to create the runtime in-memory model
    - There's a power tool for EF where you can visualize the in-memory model at design time, to validate it works as you expect.
- Relationship Definition Tips
    - If you have a FK relationship, the parent class should have a reference to both:
        1. The corresponding type (e.g. MyThing) 
        2. An int property referencing it's Id (e.g. int myThingId)
    - You can use the ```[Required]``` data annotation / attribute on a DbSet's property to mark it as required (although this isn't necessary if you use the better tip above)
        - You can also use EF Fluent API to add all the data annotations to your Poco classes from within the Context (that way your Poco's aren't dependent on any EF stuff)


