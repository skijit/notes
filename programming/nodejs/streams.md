Streams
==========
- [src](https://www.youtube.com/watch?v=QgEuZ52OZtU)

- Problem: Imagine you have to read a large (multi-GB) file for each HTTP request and then send it back to the client.
    - You could cache it, but this would also eat up a huge amount of memory, which might be a problem.
    - **Stream Solution**: Load and Send at the same time.
        - Load 100 bytes, send 100 bytes, etc.
        - Instead of *readFile* you can use *createReadStream*
- You can pipe one stream (input stream) into another (output stream)
    - You can chain pipes!
- Two types of steams:
    - Readable streams 
    - writeable streams
- Writeable Streams
```(javascript)
var writableStream = getWriteableStream();

//you can write either a string or a buffer (i.e. binary data)
writeableStream.write(new Buffer('Hello World', 'utf8'));

//this is where you close the stream
writeableStream.end();
```
- Readable Streams
```(javascript)
var readableStream = getReadableStream();

//this is told way to create a readable stream
readableStream.setEncoding('utf8');
readableStream.on('data', function(data) {
    //the data is a buffer
});
readableStream.end('end', function() {
    // ...
});
```
- pipe() manages connecting the readable and writeable streams.
    - It hides quite a few complexities
        - Avoids internal buffer overruns if the streams aren't operatable at the same rate.
        - pausing and resuming
- [another src](https://www.youtube.com/watch?v=yOSNQZm3Trw)
- Streams is an API
- You can implment Writeable or Readable methods
- Readable Stream:
```(javascript)
var fs = require('fs');

var bears = fs.createReadStream('bears.txt');

bears.on('data', function(data) {
    console.log(data.toString());  //for testing 
});

//alternately, we coudl just pipe() it to stdout
bears.pipe(process.stdout);
```
- Writeable Stream:
```(javascript)
var fs = require('fs');

var bears = fs.createReadTream('bears.txt');
var actualBears = fs.createWriteStream('actualBears.txt');

bears.pipe(actualBears);
```
- Transform stream: both reads and writes (and may transform or filter)
```(javascript)
var fs = require('fs');

var Transform = require('stream').Transform;
var inherits = require('util').inherits;

var bears = fs.createReadStream('bears.txt');
var actualBears = fs.createWriteStream('actualBears.txt');

function ActualBears() {
    Transform.call(this);
}
inherits(ActualBears, Transform);
```
