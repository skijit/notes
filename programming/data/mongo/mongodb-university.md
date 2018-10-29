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
    - db.movieDetails.find({year: 2013}).limit(1).pretty()
    - db.movieDetails.find({year: 2013, rated: "PG-13"}).limit(1).pretty()
    - db.movieDetails.find({year: 2013, rated: "PG-13", "awards.wins": { $gt: 0}}).limit(5).pretty()
    - db.movieDetails.find({year: 2013, rated: "PG-13", "awards.wins": 0}, { title: 1}).limit(20).pretty()
- question 2.5:
    - db.movieDetails.find({"countries.1" : "Sweden"}).count()
- `db.movieDetails.find({"actors.0": "Jeff Bridges"]}).count()`
## Other stuff
- importing from raw json: `mongoimport --drop -d students -c grades grades.json`
- mongoimport and mongoexport are for json!  mongorestore is for bson.
    - for mongorestore, just put it above the 'dump' directory and type `mongorestore` - no cmdline parms needed
- my pwd: t**1

 

    



    


