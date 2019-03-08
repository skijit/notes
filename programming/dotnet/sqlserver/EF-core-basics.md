EF Core
=========================

- [primary ref](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/?view=aspnetcore-2.2)
- these notes are relevant to .NET Core 2.2
- EF Core doesn't have all the features of EF 6.X yet.  
  - [Feature comparison](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/intro?view=aspnetcore-2.2)
  - Stuff missing in core...
    - Some inheritance features
    - Transparent many-to-many
    - modelling surface
    - update model from db
    - some stored procedure features
  - There's a bunch of new stuff in core
- [Stored Proc Support info in EF Core 2.2](http://www.entityframeworktutorial.net/efcore/working-with-stored-procedure-in-ef-core.aspx)
  - There are 2 ways to call a sp:
    1. `DbSet<TEntity>.FromSql()`
    2. `DbContext.Database.ExecuteSqlCommand()`
  - Constraints
    - Result must be a flat entity type. 
    - It's all out-of-band changes.  No tracking w/ entity.  `SaveChanges()` is unaware of any of this.
- Supported back-end DBs:
  - Sql Server
  - MySql
  - Postgres
  - Some other relational stuff
- Prereqs 
  - CLI SDK for .NET Core 2.0
  - IDE (VS or VSCode)
  - Runtime Nuget packages:
    - Get an EF Provider package corresponding to the back-end DB type
      - E.G. Microsoft.EntityFrameworkCore.SqlServer
      - This will install the other runtime dependency packages: Microsoft.EntityFrameworkCore and Microsoft.EntityFrameworkCore.Relational
  - Tooling Nuget packages:
    - Not nuget packages, just use the dotnet CLI

- Model Building
  - Build your model classes as POCO's
    - Then you use the fluent API to associate DB mapping properties
    - Alternately, you can specify attributes on the POCO's directly
  - EF has a lot of conventions which allow it to infer the mapping to the DB:
    - one to many relationships: `ICollection<EntityTypeWithMany> MyCollectionOfManys`
    - You'll name the DBSets in the Context, and it will generally treat the corresponding DB tables as the same name
      - [Mapping DBSets to tables in schemas](https://docs.microsoft.com/en-us/ef/core/modeling/relational/tables)
    - Entity properties that are named ID or classnameID are recognized as primary key properties.
    - A property is interpreted as a foreign key when it's name refers to the destination entity followed by ID (or just matches it's column name)
      - Whatever is intuitive from a DB-modelling POV will probably work out OK, since the inferences are pretty smart
    - Most of these conventions can be overriden
  - Enum support is pretty good - see the code in [this](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/intro?view=aspnetcore-2.2#create-the-data-model) section
    - Problem is: this makes direct db access rather useless
- Initializing DB
  - You can use a LocalDB database by referring to it in the connection string
  - You'll create a method in the program main() [example](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/intro?view=aspnetcore-2.2#initialize-db-with-test-data)
    - It takes the context as a parameter
    - Normally, you would get this from ConfigureServices where you build your request pipeline (assuming we're talking about an MVC app), but consider that this is a startup operation, not a per-request operation.  So it works differently.
    - This method will:
      - call `context.Database.EnsureCreated();` to build the DB if it doesn't exist
      - Insert data (context.DbSetName.Add(), SaveChanges()) if data doesn't already exist
- Async Operations
  - Updating an IQueryable doesn't execute async, only the standard operations like `ToListAsync()`, `SingleOrDefaultAsync()`, or `SaveChangesAsync()` are async
  - EF Contexts **ARE NOT THREAD SAFE**: always await the call directly

- [CRUD](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/crud?view=aspnetcore-2.2)
  - Notice the use of `Include()` and `ThenInclude()`
  - `AsNoTracking()` is useful for read-only purposes
```(csharp)
var student = await _context.Students
        .Include(s => s.Enrollments)
            .ThenInclude(e => e.Course)
        .AsNoTracking()
        .SingleOrDefaultAsync(m => m.ID == id);
```
- TryUpdateModel is used to identify the fields you want copied over... kinda interesting:
  - The documentation says

  > As a best practice to prevent overposting, the fields that you want to be updateable by the Edit page are whitelisted in the TryUpdateModel parameters. (The empty string preceding the list of fields in the parameter list is for a prefix to use with the form fields names.)

```(csharp)
var studentToUpdate = await _context.Students.SingleOrDefaultAsync(s => s.ID == id);
if (await TryUpdateModelAsync<Student>(
    studentToUpdate,
    "",
    s => s.FirstMidName, s => s.LastName, s => s.EnrollmentDate))
{
    try
    {
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }
    catch (DbUpdateException /* ex */)
    {
        //Log the error (uncomment ex variable name and write a log.)
        ModelState.AddModelError("", "Unable to save changes. " +
            "Try again, and if the problem persists, " +
            "see your system administrator.");
    }
}
```

- [Migrations](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/migrations?view=aspnetcore-2.2)
  - TODO: Can you use migrations when you've started db-first?
  - Add the following (has to be done manually) to the *.csproj*:

  ```
  <ItemGroup>
    <DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="2.0.0" />
    <DotNetCliToolReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Tools" Version="2.0.0" />
  </ItemGroup>
  ```

  - Create migration: `dotnet ef migrations add InitialCreate`
    - Creates a file called *Migrations\\/<timestamp/>_InitialCreate.cs*
      - The UP method will create the corresponding tables
      - The DOWN method will drop them
    - 'IntialCreate' is just a good thing to call it
    - If the tables already exist, they won't be changed.  However, it's good to start fresh here.
  - When you use migrations, a file called the Snapshot is maintained which records the full DB schema.  
    - Then migrations are calculated by comparing an updated data model with the schema
  - Apply migration: `dotnet ef database update`
    - another table will be created: *__EFMIgrationsHistory* which keeps track of which migrations have been applied. 
  - You can apply any number of formatting and validation attributes (event RegEx) to the model, and this will also propagate into the DB via migrations.
    - include the following:

    ```(csharp)
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    ```

    - `[Required]` attribute makes a column non-nullable
      - Not needed if it can't hold a null value.
    - you can also create calculated properties by using a getter

    ```(csharp)
    [Display(Name = "Full Name")]
    public string FullName
    {
        get
        {
            return LastName + ", " + FirstMidName;
        }
    }
    ```

    - if you have a one-to-zero-or-one relationship, you usually have an Pk that is a Fk, so you'll use the `[Key]` attribute
    - EF doesn't require you to create FK properties if you have Navigation Properties defined, but sometimes it makes update scenarios simpler.
    
    ```(csharp)
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    [Display(Name = "Number")]
    public int CourseID { get; set; }    
    ```

      - By default, PK's are given DB-generated values.  This is the way to override that.

    - Many-to-many relationships still require join tables
      - If they have additional attributes (other than the join mapping), it is called 'with payload'
      - join tables have composite keys, which can only be specified using the fluent API (i.e. no attributes)

    - You can change the SQL type mapping:

    ```(csharp)
    [Column(TypeName="money")]
    public decimal Budget { get; set; }
    ```

    - TODO Migration questions:
      - Do you need to start with model first, or can you backfill that
      - Can you add a data-only migration?
      - How do you handle schema changes which are incompatible with existing data?
  
- Concurrency issues
  - There's a SQL Server data type you can use: *rowversion*, which is automatically updated each time the row is updated.
  - See [this](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/concurrency?view=aspnetcore-2.2#add-a-tracking-property) for an example
  




