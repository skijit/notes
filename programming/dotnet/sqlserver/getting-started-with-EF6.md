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

