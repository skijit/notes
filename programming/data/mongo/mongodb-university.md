M101N: MongoDB for .NET Developers
==================

- [link](https://university.mongodb.com/dashboard)

## Class 1
- Since we're not joining data across multiple db tables, sharding is much easier
    - in contrast, in a rdbms, you need to scale up with more expensive hardware
    - scaling out (as supported by mongodb), lets you put more instances on cheaper/commodity hardware
- applications can be agnostic of however the dbs are sharded
- there's a point that joins aren't missed because you have modelling capabilties plus the ability to transact changes to individual documents 
    - does he mean subdocs?
- json: supports string, number, boolean, array, object, any level of nesting
- mongo stores data as bson: binary json
- mongodrivers send and received data as bson and also map bson to the native types (e.g. POCO's)
- bson
    - extends json to include: dates, floats, integers, binary data (e.g. images)
- crud
    - in mongo shell, you can type `help` to see a list of cmds
    - `db` holds a ref to the db we're currently using
        - use a db by using `use <dbname>`
    - `_id` field is always required - doesn't have to be specified in the insert, but it will be created
    - when you insert, you'll get a confirmation document which has the inserted _id
    - filter with find: `db.movies.find({year: 1981}).pretty()`
    - `find()` in the shell actually returns a cursor object, so you can do this:
        - `var c = db.movies.find({year: 1981}).pretty()`
        - `c.hasNext()`
        - `c.next()`
- example modelling a blog
    - to embed or not: that is the question
    - embed if they're access together
    - otherwise reference
    - a single document cant be more than 16MB
    
## Class 2 : CRUD

- Create
    - you can manually specify the _id value, if you want
    - insertOne({})
    - insertMany([])
        - contents of array parameter are documents: {...}, {...}, ...
        - if there are errors here, you have options (spec'ed in 2nd parameter):
            - ordered inserts: 
                - by default, insertMany is ordered insert
                - as soon as it encounters and error, it will stop processing
            - unordered inserts:
                - insertMany([], { "ordered": false})
                - keep trying if you encounter an error
    - you can also create records with the update methods
        - aka upserts
        - occurs when no records are matching the selectors/filters
- all collections have a unique pk index on _id
    - secondary indexes are possible
    - must be unique to the collection
    - 12 byte hex strings
- Read
    - equality search: `db.movieDetails.find({rated: "PG-13"}).count()`
    - first parameter to find is called the *query document*
    - as we add new items to the query document, they're implicitly 'anded':
        - `db.movieDetails.find({rated: "PG-13", year: 2009 }).count()`
    - note that you're typically inserting JSON, but searching with regular javascript objects!
    - matching against embedded documents:
        - `db.movieDetails.find({"tomato.meter": 100}).count()`
        - using 'dot notation'
        - note that's gone back to json (quotes around properties)!  dot notation requires quotes!
    - equality matches on arrays:
        - on the entire array:
            - `db.movieDetails.find({"writers": ["Ethan Coen", "Joel Coen"]}).count()`
                - requires the array to have same entries in same order!                
        - based on any element
            - `db.movieDetails.find({"actors": "Jeff Bridges"]}).count()`
                - actors is an array, and so it will return any documents where any element matches this value
        - based on a specific element
            - `db.movieDetails.find({"actors.0": "Jeff Bridges"]}).count()`
                - the first element of the array has to match this value
    - cursors
        - find() returns a cursor which you need to iterate through
        - in the shell, this usually specifies a batch size of 20 records at a time
        - in a programmatic interface, the batch size will not exceed the maximum bson document size (per the BSON spec)
        - to iterate in the shell, type `it`
        - another way to walk through the results:
            - `var c = db.movieDetails.find({rated: "PG" });`
            - `var doc = function() { return c.hasNext() ? c.next() : null; }`
            - call `doc()` (repeatedly)
            - call `c.obsLeftInBatch()`
    - projections
        - the second argument to the find command
        - `_id` is by default included
        - `db.movieDetails.find({rated: "PG" }, { title: 1}).pretty()`;  //include title
        - `db.movieDetails.find({rated: "PG" }, { title: 1, _id: 0 }).pretty()`;  //include title, exclude _id
        - `db.movieDetails.find({rated: "PG" }, { writers: 0, actors: 0 }).pretty()`;  //exclude writers and actors
- Comparison Operators
    - $eq, $ne, $gt, $lte, ...
    - `db.movieDetails.find({lengthInMin: {$gt: 90 } });` //all movies longer than 90 min
    - `db.movieDetails.find({lengthInMin: {$gt: 90, $lte: 120 } });` //all movies longer than 90 min and less than 120 min
    - `db.movieDetails.find({ "tomato.meter": { $gte: 95}, lengthInMin: {$gt: 90 } }, { title: 1, lengthInMin: 1, _id: 0});` //all movies longer than 90 min with a good rating
    - $ne will also match documents that don't have that field either
    - $in : `db.movieDetails.find({rated: {$in: ["G", "PG"] } }).pretty();`
    - $nin : not in!
- Element Operators
    - $exists : match a document for where a field either exists or not
        - `db.movieDetails.find({ "tomato.meter": { $exists: true}`});`
        - you can also set $exists to false to query non-existence
    - $type : match a document where the field has a specified type
        - `db.movieDetails.find({ "_id": { $type: "string"}`});`
- Logical Operators
    - $or, $and, $not, $nor
    - `db.movieDetails.find({ $or: [{ "tomato.meter": { $gte: 95}}, { "metacritic": { $gt: 88}} ]}).pretty();`
    - $or takes an array
    - even though filter properties are implicitly anded together, sometimes you need multiple criteria on the same field (e.g the same field should not be null and it should exist)
- Regex Operators
    - For matching strings
    - `db.movieDetails.find({"awards.text": { $regex: /^Won.*/}})` //text is a field inside awards that has some text
- Array Operators
    - $all
        - `db.movieDetails.find({ genres: { $all: ["Comedy", "Crime", "Drama"]}}).pretty()` //only return if all of these elements match
    - $elemMatch
        - imagine the following field in collection movieDetails: boxOffice: [ { "country":"USA", "revenue":41.3}, { "country":"Canada", "revenue":20.1}]
        - `db.movieDetails.find({boxOffice: { $elemMatch {country: "USA", revenue" { $lt: 10}}}})` //get movies where it grossed more than 10 mil in the USA
            - this wouldn't work: `db.movieDetails.find({ boxOffice: {country: "USA", revenue" { $lt: 10}}})` because it doesn't need to apply the condition to a  single element
    - $size
        - `db.movieDetails.find({ countries: { $size: 1}}).pretty()` //only return documents where the county array is of size 1
- Updating Documents
    - 3 updates commands:
        - UpdateOne
        - UpdateMany
        - ReplaceOne
    - You can update a field which doesn't exist on a document
    - `db.movieDetails.updateOne({title: 'The Martian'}, { $set: { poster: "someurl"}})`
        - first parameter is the document filter/selector.  _id is often used.
        - updateOne will only update the first match
        - $set is the 'update operator', see below for more
        - adds the field if it doesn't exist
    - Update Operators (these are just some...)
        - $set - complete replacement
        - $unset - remove the fields specified
        - $min - update the field if it is less than a value
        - $inc
        - $mul
        - $rename
        - $currentDate - sets a field value to the current Date
    - `db.movieDetails.updateOne({title: 'The Martian'}, { $inc: { "tomato.reviews": 3, "tomato.userReviews": 25}})`
        - increment these fields by 3 and 25
    - Updating Array fields
        - $addToSet - add if they don't already exist in array
        - $pop
        - $pullAll
        - $pull
        - $pushAll
        - $push
        - `db.movieDetails.updateOne({title: 'The Martian'}, { $push: { reviews: { rating: 4.5, date: ISODate("datestring"), text: "my review of this movie"}}})`
            - this created the reviews property and we pushed this record into it
        - `db.movieDetails.updateOne({title: 'The Martian'}, { $push: { reviews:  { $each: [{a-review-doc}, {another-review-doc}, ...]}}})`
            - we use the $each here because we want to add each doc to the array, rather than a single element to the array which happens to itself be an array
        - other modifiers for $push:
            - $position: where you're going to put it in the array
            - $slice: how many records to keep
    - UpdateMany
        - Same as updateOne, but you can update more than one document
        - `db.movieDetails.updateMany({rated: null}, { $unset: {rated: ""}})`
            - Update a collection, set null values to missing that field for all
    - Upserts
        - If no document is found matching the filter, we insert:
            - it's the third parameter document
            - `db.movieDetails.updateOne({"imdb.id": detail.imdb.id}, {$set: detail}, {upsert: true})`
                - detail is a document in the same code
    - ReplaceOne
        - replaces the complete document rather than changing individual fields
- .NET Driver
    - pass a `MongoClientSettings` or a connection string to a `MongoClient` ctor
    - dont worry about closing connections or using blocks
    - dynamic or BsonDocument are both ok
    - todo: read more about C# dynamic
    ```(csharp)
    //various ways to use this dynamic-like type
    var doc = new BsonDocument {
        {"name", "Jones"}
    };

    doc.Add("age", 30);

    doc["profession"] = "developer";

    var nestedArray = new BsonArray();
    nestedArray.Add(new BsonDocument("color", "red"));
    doc.Add("array", nestedArray);

    //other stuff: doc.TryGetElement(), doc.Contains()
    ```

    - Using attributes to change mapped-pocos:
    - 3 ways to control mapping
        - Attributes: BsonElement("name") - changes the field property name to "name" in lowercase
        - Mapping: Alternately, you can use `BsonClassMap.RegisterClass( cm => cm.Automap();  cm.MapMember...)`
            - run this first
        - Conventions: You can also create a `ConventionPack` and register that.
    
        
    ```(csharp)
    //enumerating through data

    //sends batches
    using(var cursor = await collec.find(new BsonDocument()).ToCursorAsync())
    {
        while (await cursor.MoveNextAsync())
        {
            foreach(var doc in cursor.Current)
            {
                //...
            }
        }
    }

    //enumerate in memory
    var listToEnumerate = await collec.find(new BsonDocument()).ToListAsync();

    //another method
    await collec.find(new BsonDocument()).ForEachAsync(doc => Console.WriteLine(doc));

    ```

    ```(csharp)
    //simple filtering

    var filter = new BsonDocument("Name", "Jones");
    var listToEnumerate = await collec.find(filter).ToListAsync();

    var otherListToEnumerate = await collec.find("{ Name: 'Smith'}").ToListAsync();

    var newFilter = new BsonDocument("Age", new BsonDocument("$lt", 30));
    var list3 = await collec.find(newFilter).ToListAsync();
    //could also use $and, and all the filtering operators

    //another approach is the strongly-typed filter builders
    //alot of times, you can insert your filters as lambdas directly into the find
    ```

    - Limit(n) is like Take(n)
        - use Sort() alongside to avoid arbitrary results
    - Skip() 
    - Sort() 
        - `var list3 = await collec.find(newFilter).Sort("{Age: 1}").ToListAsync();`
        - `var list3 = await collec.find(newFilter).Sort(new BsonDocument("Age", 1)).ToListAsync();`
        - `var list3 = await collec.find(newFilter).Sort(Builder<BsonDocument>.Sort.Ascending("Age").Descending("Name")).ToListAsync();`
        - When you're strongly typed: `var list3 = await collec.find(newFilter).Sort(Builder<Person>.Sort.Ascending(x => x.Age).ToListAsync();`
        - You can use SortBy too - even easier: `var list3 = await collec.find(newFilter).SortBy(x => x.Age).ThenByDescending(x => x.Name).ToListAsync();`
    - The order you apply these Skip, Sort, Limits doesn't matter

    - Projections
        - `var list = await collec.find(new BsonDocument()).Project("{ Name: 1, _id: 0}").ToListAsync();`
        - `var list = await collec.find(new BsonDocument()).Project(Builders<BsonDocument>.Projection.Include("Name").Exclude("_id")).ToListAsync();`
        - projections are usually going to BsonDocuments not the original class, because everything would be null
        - strongly typed: `var list = await collec.find(new BsonDocument()).Project(x => x.Name).ToListAsync();`
        - Anonymous types: `var list = await collec.find(new BsonDocument()).Project(x => new { x.Name, CalcAge=x.Age+20}).ToListAsync();`
            - this isn't supported by the server, so it will happen client-side
    
    - Updating
        - ReplaceOneAsync() will replace the whole document
            - Parameter 1: filter (you can BsonDocument, string, or the filter Builder class)
            - Parameter 2: new document
            - Parameter 3 (optional): options (class UpdateOptions)
            - ex: `var result = await col.ReplaceOneAsync(new BsonDocument("_id", 5), new BsonDocument("_id", 5).Add("x", 30));`
                - will set it the new document's x property to 30
                - **IMPORTANT**: you can't change the _id when you're replacing
            - ex with upsert option:  `var result = await col.ReplaceOneAsync(new BsonDocument("_id", 5), new BsonDocument("_id", 5).Add("x", 30), new UpdateOptions { IsUpsert = true});`
        - UpdateOneAsync() will replace a piece of the document
            - ex (native syntax): `var result = await col.UpdateOneAsync(Builders<BsonDocument>.Filter.Eq("x",5), new BsonDocument("$inc", new BsonDocument("x", 10));`
                - increment the X value (where = 5), by 10
            - ex (builder syntax): `var result = await col.UpdateOneAsync(Builders<BsonDocument>.Filter.Eq("x",5), Builder<BsonDocument>.Update.Inc("x", 10));`
    
    - Deleting
        - DeleteOneAsync()
        - DeleteManyAsync()

    - Find And Modify : Atomic Operations
        - FindOneAndUpdate()
            - You can specify options parameter which allow:
                - Upsert
                - Projection
                - ReturnDocument.After (whether you get the DB object after the update - I think this is default)
                - Sort (which may be critical to your filter (1st parameter))
        - FindOneAndReplace()
        - FindOneAndDelete()

    - Bulk Write
        - Stuff like InsertManyAsync is implicitly using a Bulk Write
        - Good for multiple, quick operations
        
        ```(csharp)
        //these get executed on the server at the same time
        var result = col.BulkWriteAsync(new WriteModel<BsonDocument>[]
            {
                new DeleteOneModel<BsonDocument>("{x:5}"),
                new DeleteOneModel<BsonDocument>("{x:7}"),
                new UpdateManyModel<BsonDocument>("{x: {$lt: 7}}", "{$inc: {x:1}}")
            },
            new BulkWriteOptions { IsOrdered = false }
        );
        ```
- HW question notes:
- manipulating stuff in the mongo shell (question2):
    - `db.grades.find().sort({student_id:1}).sort({score:1}).limit(10).pretty() `           
    - `db.grades.find().sort({student_id:1, score:1}, { }).limit(10).pretty()  `
    - `var allResults = db.grades.find({type:"homework"}).sort({student_id:1, score:1}).toArray()`
    - `let curId = -1`
    - `let filteredResults = allResults.filter(x => { let keep = curId != x.student_id; curId = x.student_id; return keep})`
    - `let filteredProjection = filteredResults.map(x => x._id)`
    - `db.grades.deleteMany({ _id : { $in: filteredProjection }  })`
- question 2.4
    - `db.movieDetails.find({year: 2013}).limit(1).pretty()`
    - `db.movieDetails.find({year: 2013, rated: "PG-13"}).limit(1).pretty()`
    - `db.movieDetails.find({year: 2013, rated: "PG-13", "awards.wins": { $gt: 0}}).limit(5).pretty()`
    - `db.movieDetails.find({year: 2013, rated: "PG-13", "awards.wins": 0}, { title: 1}).limit(20).pretty()`
- question 2.5:
    - `db.movieDetails.find({"countries.1" : "Sweden"}).count()`
- `db.movieDetails.find({"actors.0": "Jeff Bridges"]}).count()`

## Week 3 : Schema Design
- Application driven schema instead of the fixed third normal form (3nf)
- Supports 'rich documents'
    - contain arrays, sub docs, etc.
    - so instead of joins, you embed
    - and if you have to join, do it in the application
- No constraints
- No transactions
- No fixed schema
- Goals of normalization
    - Consistency on update (single location)
        - We'll be careful to avoid creating the specific embedding situations that cause this
    - Minimize redesign when extending
        - Mongo gives you flexibility here
    - Avoid bias on access patterns
        - Mongo subverts this bc otherwise you're equally bad to everything
- Atomic operations
    - When you work on a single doc, that work will be completed before anyone sees those changes
    - somewhat analogous to transactions which dont exist in mongodb
        - transactions are often necessary since you're accessing multiple records / tables at the same time, so it's not so necessary
    - Methods for living without transactions
        - Operate on a single document
        - Software locking (app level)
        - Tolerate some inconsistency
- 1:1 Relations
    - Example: employee and resume
    - Approaches: Link or embed
    - Considerations
        - Frequency of access:
            - Maybe you always pull employee info, but barely ever the resume info
            - If there's a mismatch there, and say one set (resume) is bigger, you might want to link
        - Growth of items
            - If one is growing all the time but the other isn't
        - Size of items
            - Remember 16MB is max size
        - Atomicity of data
            - If you need consistency, embed them
- 1:Many Relations
    - Example: City and person
    - Linking is good here
    - Remember you can put anything in the _id
    - Variation: One to a few
        - Example: Blog post and comments
        - embedding is ok
- Many to Many Relations
    - Example: Books and Authors
    - Distinction: is it Many to Many or Few to Few?
    - Few to Few
        - 2 collections, linked
        - Authors collection will have an array of Book Ids
        - You could also have it bidirectional if you want it (depends on access patterns)
    - Many to Many
        - Not addressed... I guess this is a case where even in large volume situations, Mongo isn't great
- Multikey Indexes
    - Recall a Student/Teacher Schema
    - Students: { _id, name, teachers: []}
    - Teachers: { _id, name}
    - Create a multikey index: `db.students.ensureIndex({teachers:1})`
    - Now do a query using this index: `db.students.find({'teachers': {$all: [0,1]}})`
        - The returned students should have both 0 and 1 in their teachers array
        - To see how the index was employed: `db.students.find({'teachers': {$all: [0,1]}}).explain()`
            - This is the same query suffixed with `explain()` method
            - The result will show us that isMultiKey: true and which cursor it was
- Benefits of Embedding
    - Performance
        - Improved Read performance (contiguous disk location)
        - One round trip to the DB
- Trees
    - Single collection
    - Each record has
        - Reference to immediate parent id
        - Array with the sequence of ancestors
- When to denormalize
    - 1 to 1 : Embed
    - 1 to Many : Embed from the many to the 1
    - Many to Many : Link

- HW 3.1
    - `mongoimport --drop -d school -c students students.json`
    - `db.students.find().limit(1).pretty()`
    - `{ _id, name, scores: [{type, score}]}`
    - create an object where each user's id is a property and the value is the lowest homework score.
        - `let lowScores = {}`
        - `let _students = db.students.find().toArray()`
        - `_students.forEach((x) => { let _min = Math.min(...(x.scores.filter(a => a.type == 'homework').map(b => b.score))); lowScores[`${x._id}`] = _min; })`
        - `printjson(lowScores)`
    - Iterate throught students and remove corresponding element array:
        - `Object.keys(lowScores).forEach(x => db.students.update({ _id: parseInt(x) }, {$pull: { scores: { score: lowScores[x] }}}, {multi: true}))`

## Week 4 : Performance
- 3 primary ways to impact performance:
    1. Indexes
    2. Sharding
    3. Using Pluggable Storage Engines
        - Software which determines physical storage on disk
- Pluggable Storage Engine
    - new in 3.0
    - sits between mongodb software and the data on disk
    - has control of memory (ie what is cached, etc.)
    - pluggable such that you can use more than one storage engine
    - MMap
        - default
    - WiredTiger
        - new in 2014
    - storage engine doesn't
        - affect communication between clusters
        - api presented to programmer
- MMapV1 Storage Engine
    - original storage engine
    - based on mmap syscall (see man page)
        - copies file into memory
    - Storage method
        - mongodb creates a large file on disk to store documents (e.g. 100 GB)
        - this file will be copied to memory (although lots of it will be virtual memory)
    - collection-level locking
    - in-place updates
        - will try to update a document without making a new copy of it
        - to achieve this goal, it uses power-of-2 sized allocations (e.g. a 3 Byte document will be allocated 4 Bytes, 23 Bytes -> 32 Byte allocation, etc.)
- Wired Tiger
    - not turned on by default
    - document-level concurrency
        - compare to mmap collection-level concurrency
        - lock free
        - optimistic updates: you can update the same document, and if there's a collision, it will unwind and reapply (but usually this doesn't happen)
    - compression
        - of data and index
        - unlike mmap, it controls what data sits in memory
            - data in memory is expanded
        - since there's lots of redundancy (possibly) - compression can be useful
    - no in-place updates
    - to use: `mongod -dbPath <someNewFolder> -storageEngine wiredTiger`
        - you have to give it a different dbPath bc it can't open files from mmapv1
- Indexes
    - you can index on single fields or composite/multiple fields
    - when you have a composite index, the order of the fields is important in determining whether the index can be used
        - given an index on: (field1, field2, field3)
        - a query which only uses field1 is ok, but if you're querying on field2 or (field2,field3), the index won't be used bc the btree structure doesn't help you there
        - a query on field1, field3 would be somewhat useful
    - cost of indexes
        - will slow down writes, but reads will be much faster!
    - one strategy for a big bulk insert is to do it with no indexes and then create the index
    - explain method:
        - e.g. `db.students.explain().find({studentId:5})`
        - it will tell you what indexes you might use 
            - see "winningPlan"
                - "COLLSCAN" means a full collection scan
    - creating an index:
        - e.g. `db.students.createIndex({student_id:1})`
        - composite example: `db.students.createIndex({student_id:1, class_id:-1})`
            - the -1 means descending
        - takes a little while
    - discovering indexes
        - `db.students.getIndexes()`
        - there's always an index on _id
        - to delete: `db.students.dropIndex({student_id:1, class_id:-1})` 
            - so you use the same signature as when you created it
- Multikey Indexes
    - ie Indexes on Arrays!
    - given a doc format:
    ```{
        name: 'Andrew',
        tags: ['photography', 'hiking', 'golf'],
        color: 'red'
    }```
    
        - index on `tags`, would create an index entries for "photography", "hiking", and "golf"
        - compound index on `tags, color` would create index points for "photography, red", "hiking, red", and "golf, red"
        - restrictions: you can't have a compound index where > 1 field is an array
            - but this is enforced on the document, not collection, level
- Nested Multikey Indexes
    - `db.students.createIndex({'scores.score':1})`
        - where scores is an array which has a property score in it
    - then you can do something like: `db.students.find({'scores.score': {'$gte': 99}})`
- Unique Indexes
    - you can enforce that a particular value or value combination is unique
    - `db.stuff.createIndex({thing:1}, {unique: true})`
- Sparse Indexes
    - indexes that can be used when the index key is missing from some documents
    - if a field is missing from documents, it is treated as null.  
        - if you include a uniqueness constraint on the index, then you could have a failure due to multiple nulls (i.e. duplicate values)
    - you specify the 'sparse' option which tells the db to have the index exclude any records where the field is missing/null
    - `db.employees.createIndex({cell:1}, {unique:true, sparse:true})`
    - Warning: but note that if you sort on a sparse index, the index won't be used
    - advantages of sparse index:
        - index is smaller
        - flexibility
- Creating index : foreground or background
    - foreground:
        - default
        - blocks all writers and readers on the collection
        - decently fast
    - background
        - slower
        - don't block readers and writers
        - good for production system
            - an alternative is to use to create on an alternate cluster
    - `db.employees.createIndex({cell:1}, {unique:true, background:true})`
    - running in the background will still block your shell instance, but it won't block other accesses
- Explain
    - doesn't fully execute the query, just shows the plan
    - you can't do an explain on an `insert()`
    - explain() returns an `explainable`
    - you can call `db.blah.explain().help()` to get a list of supported, explainable operations
    - you can also call explain on a cursor
    - explain() is more than just a query planner, showing you what indexes have been hit
        - **execution stats**: results of using the indexes
            - `explain("executionStats")`
            - shows the number of docs returned, execution time, 
        - **all plans execution**:
            - `explain("allPlansExecution")`
            - runs the query optimizer, which periodically runs to figure out which index to use
        - these options just give you progressively more info
- Covered Query
    - a query which can be satisfied entirely from the index
        - these are super efficient!
    - even if you hit an index (keys examined), if your projection includes any values outside the index (e.g. _id), then the document has to be accessed, and it is not a covered query.
        - if you project only by exclusion, then since schema is variable per doc, the doc has to be consulted and the query is not covered.
- How is an index choosed?
    - mongodb looks at the shape / profile of each query
    - looks at candidate indexes
    - create a query plan for each candidate index
    - winning query plan is stored in a cache to be applied to similar queries or until it is refreshed
    - how a query plan is removed from cache:
        - lots of intervening writes
        - rebuilding indexes
        - dropping index
        - restarting the mongodb process
- Index Size
    - Working set: portion in memory that our data that clients are frequently accessing
        - esp includes indexes
        - going to disk is expensive
        - so indexes should fit in memory
    - To get size of index:
        - `db.students.stats()`
        - `db.students.totalIndexSize()`
    - wired tiger allows *prefix compression* which shrinks the size of the index
- Index Cardinality
    - How many index points relative to document count
        - Regular Index -> 1:1
        - Sparse Index -> 1:<=document-count
        - Multikey -> 1:* (depends on number of values in array.  could be more than number of docs in collection, even)
- Geospatial Indexes
    - Find things based on location
    - 2D Scenario
        - document needs to have cartesian coordinates in an array of values.  eg `location: [x, y]`
        - create an index, telling mongo that the data is '2d' (a reserved type): `createIndex({"location": "2d"})`
        - then you need an operator to find documents with locations near to you:
            - eg using the $near operator: `find({location: { $near: [your_x, your_y] }}).limit(20)`
            - db will return them in order of increasing distance
    - Spherical Scenario
        - lat/lng
        - use index type: '2dsphere'
        - it's easy to find lat/lng from google maps
        - mongo actually takes longitude, latitude
        - locations are specified using geojson
            - there are lots of types of geometries, but points are probably the most useful
            - looks like:

            ```(json)
            {
                "_id": ObjectId("dlskfj"),
                "name": "Apple Store",
                "city": "Palo Alto",
                "location": {   //this is geojson
                    "type": "Point",
                    "coordinates": [
                        -122.90812, //long
                        37.4434 //lat
                    ]
                },
                "type": "retail"
            }
            ```

        - `db.places.createIndex({'location':'2dsphere'})`
        
        ```(javascript)
        db.places.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [-122.123, 37.42] //my location
                     }, 
                    $maxDistance: 2000 //meters
                }                
            }
        }).pretty()
        ```
- Full Text Search Index
    - You can do a $regex search on normal text fields and it doesn't require a full text index
        - If there is an index on the field, the $regex search will use it if...
            - it's a prefix search (starts with ^)
            - it's case sensitive
    - If you want to avoid the $regex search, you can specify a full text index which will perform search-engine like matching (terms are or-joined)        
    - A full text index can be defined on a single or multiple (compound index) fields
        - if you want a super compound index, this will add each string field to the index: `db.collection.createIndex( { "$**": "text" } )`
    - each full text search will have a resulting score, and the rules can be somewhat influenced by how you set up the index
        - if you have a compound text index, you can weight fields differently
    - creating a text index: `db.sentences.createIndex({"myField":'text'})`
    - to search against the text index: `db.sentences.find({$text: {$search: "dog"}})`
        - `db.sentences.find({$text: {$search: "dog otherword blah blah"}})`
        - full text search is not case sensitive
        - you can also sort the results in terms of the search score:`
            - `db.sentences.find({$text: {$search: "dog otherword blah blah"}}, {score:{$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}})`
- Efficiency of Index Use
    - Goal: Efficient Read/Write operations
    - With `hint()` you can specify the signature of an index and make the query use that index
    - Best practice: when you're designing compound indexes, specify the fields you do equality searches on **before** fields that have range searches bc they're more selective
    - If you're using a sort on a field, you may want to add it to the index
    - With explain, `totalKeysExamined` refers to how many index keys were examined
    - In a nutshell, order your indexes like so:
        1. Equality fields
        2. Sort fields
        3. Range fields
- Logging and Profiling 
    - mongod automatically logs (outputs) slow queries (>100ms)
    - Profiler will write slow queries to system.profile
        - Level 0: off
        - Level 1: log slow queries
        - Level 2: log all queries  (good for debugging)
    - set profile on: `mongod --dbPath <somePath> --profile 1 --slowms 2`
        - you can also set it in the shell: `db.getProfilingStatus()`
            - to set the status from the shell: `db.setProfileLevel(1,4)` (status level: 1, only look at stuff longer than 4 ms)
        - time > slowms means it will be logged
        - `db.system.profile.find().pretty()`
            - you can search on these different profiled fields:
                - namespace (ns)
                - timestamp (ts)
                - duration (millis)
- MongoTop
    - high level view of where mongo is spending its time
    - shows you what collections are getting hit hardest, by reads, writes, and total
    - `mongotop 3` : sets sampling interval to 3sec
- MongoStat
    - like the iostat
    - sampling interval is 1 sec standard
    - gives crud-oriented stats
- Sharding
    - split up a large collection across multiple servers
    - mongos is the router which talks to the various mongod's
    - each shard is usually a couple clusters (replica set)       
    - choose a shard key (e.g. student_id)
        - mongos will send it to the right instance
    - inserts must include the entire shard key
    - update, removes, finds have to broadcast to each shard if the shard key isn't included
        - so including the shard_key will make it faster
    - choosing a shard key is a particular thing
    - mongos usually runs on the same machine as the application
     





## Other stuff
- importing from raw json: `mongoimport --drop -d students -c grades grades.json`
- mongoimport and mongoexport are for json!  mongorestore is for bson.
    - for mongorestore, just put it above the 'dump' directory and type `mongorestore` - no cmdline parms needed
- to run a script in the shell, just type: mongo < myfile.js
    - be sure to include a `use` statement at the top so it knows which db to use
- my pwd: t**1

 

    



    


