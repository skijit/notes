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
- When you create your POCOs, make sure to new up any Collection properties in the class'es Constructor
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
            - This is not required.  EF will work without it, but it might have less information about the relationship (i.e. mark it as 1:0+ instead of 1:1)
    - You can use the ```[Required]``` data annotation / attribute on a DbSet's property to mark it as required (although this isn't necessary if you use the better tip above)
        - You can also use EF Fluent API to add all the data annotations to your Poco classes from within the Context (that way your Poco's aren't dependent on any EF stuff)
- There are two different approaches to building a DB code-first:
    - Design/Deploy Time: 
        - Migrations
    - Run Time:
        - Good for running unit tests 
- Migrations
    - To enable, run ```enable-migrations``` in package manager console
        - This will create a 'Migrations' folder and define a class ```Configuration``` and that will be specific to the context
        - There's a ```Seed``` method that will help you autopopulate data if it doesn't already exist
    - Workflow:
        1. Change Model
        2. Create a Migration File
            - In PMC, run ```add-migration someNameOfMigration```
            - There are other parameters available....
            - It will generate the C# Api code to make changes (which will ultimately compile down to T-SQL)
        3. Apply Migration to DB
            - In PMC, run ```update-database -script```
            - With the *script* parameter, it will generate a script instead of working directly against a DB
            - Alternately, you can use ```update-database -verbose``` and it will output
            - There's typically a *_MigrationHistory* table that shows which have been run 

## Creating a Code Model from an Existing DB
- Create a new class library project
- Add a new Item -> ADO.NET Entity Data Model
    - Choose 'Code First From Database'
    - Select the tables and views you want imported
    - If you want Stored Procs in your model, you have to deal with those manually
- The resulting Pocos and configurations will be a little wordy because it's overriding the default values in a typical Code-First approach.
    - The config class will have code using the Fluent API
    - The Poco's will have data annotations
- Data Annotations can handle *some* attributes, but to handle *all* of them, you need to use the configuration class / fluent API

## Using EF to Interact with Your Data
- The projects that do the querying will need to include the EF dll (via NuGet pkg).  
- Inserting
```(csharp)
    var myType = new SomeType
    {
        //initialize values    
    }
    using (var ctx=new myCtx())
    {
        ctx.Database.Log = Console.WriteLine;
        ctx.MyDbSet.Add(myType);
        ctx.SaveChanges();    
    }```
- DB Initializing
    - CodeFirst provides DB initialization strategy classes which determine when and how to init/rebuild the database when running.
    - When to rebuild options: Every run, only when model changes, only when the DB doesn't exist
    - How to reseed: you can have your own seeding code execute based on a class that inherits from one of the system-provided DB initializer classes.
    - By default, the initializer will run the first time you use the context, but you can also call them explicitly to have them executed at a more convenient time, e.g. app startup.
    - To suppress data initialization, you can call this in your Main (or startup logic):
    ```(csharp)
    Database.SetInitializer(new NullDatabaseInitializer<myCtx>())```
    - The initialization logic most useful for standing up tests.  In production scenarios, you're more likely to suppress (as above).
- ```SaveChanges()``` will only send one command at a time to the DB, 
    - But there are projects on GitHub to allow Bulk Changes to be sent to the DB.
    - If anything in SaveChanges fails, everything in the transaction will get rolled back (UoW pattern!)
    - There are more sophisticated transactional things you can do with EF
- Execution Methods:
    - First(), FirstOrDefault(), ToList()
    - **Performance Warning**: If you enumerate an IQueryable<T> in a ```foreach```, it will keep the connection open for the duration of the loop.
- Paging:
    - Use Skip(x) and Take(x)
- Tracking Changes
    - This is managed by the context.
    - But if for some reason (this *would* be a code smell) you made a change to some entity which was returned by a different instance of the context, there are ways to still track the changes.
        - But they're naieve methods- they won't just update the properties you've changed.
        ```(csharp)
        using (var ctx = new myCtx())
        {
            ctx.myDbSet.Attach(myEntityFromAnotherCtx);
            ctx.Entry(myEntityFromAnotherCtx).State = State.Modified.
            ctx.SaveChanges();
        }```
- ```DbSet.Find(myKey)``` is a quick way to get a value by Id
    - Uses the cache: it will first look inside the in-memory cache before hitting the DB
    - If > 1 entities are returned, it will fail.
- ```DbSet.SqlQuery("some sql...")```
    - SQL query can be something like ```exec myStoredProc```
    - Note that since it's defined on a DbSet, the return value needs to match the corresponding Poco definition
- Deleting Objects
    - Use the ```ctx.myDbSet.Remove(myEntity)```
    - It may require two DB round trips to delete as you need to 1) get the entity, 2) remove the entity
    - For this you could 
        1. Use the ```State``` property, like above.
        2. Use the following [method](http://stackoverflow.com/questions/2471433/how-to-delete-an-object-by-id-with-entity-framework), but note that it will throw an exception if there are no corresponding records to delete.
        ```(csharp)
        Customer customer = new Customer () { Id = id };
        context.Customers.Attach(customer);
        context.Customers.DeleteObject(customer);
        context.SaveChanges();```   
- Retrieving Graphs of Data
    - Eager Loading
        - Use ```DbSet.Include()```
        - The Sql will have a flattened version of all the data, but it ultimately be deserialized into the appropriate object graph.
    - Explicit Loading:
        - Use Load(): ```ctx.Entry(myEntity).Collection(n=> n.MyParts).Load()```
        - Loads the data at runtime
    - Lazy Loading:
        - Loads the data on-demand, as soon as you reference the collection.
        - If you want to lazy load a property, mark it as ```virtual```
        - The model will implement an overriden version with more tracking logic to support lazy loading
        - Warning: This approach involves more trips to the database, which could be exacerbated by enumeration use scenario.
    - Projection Queries:
        - Projecting, using ```Select()``` to return whatever data structure you want
        - Typically returns an anonymous type

## Real World Patterns and Practices
- Create an ```IModificationHistory``` that has DateCreated, DateModified, and IsDirty
    - Each Poco will implement this interface
    - In the Configure class to ignore the IsDirty method
        - Override the ```OnModelCreating()``` method to tell EF to ignore this property
    - In the Context, you can override ```SaveChanges()``` such that the DateChanged, DateCreated are automatically set and persisted.
Next WPF App Video
    
    
- Note the role of convention in how classes apply to  tables
            
