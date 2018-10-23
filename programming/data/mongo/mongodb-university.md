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
    
