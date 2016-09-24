Error Handling
====================
- Some notes on JavaScript exception handling best practices
- Sources
    - [this](http://www.javascriptkit.com/javatutors/trycatch2.shtml)
    - [and this](https://www.nczonline.net/blog/2009/03/10/the-art-of-throwing-javascript-errors-part-2/)    
 
## Basics Stuff  
- Semantics of try-catch are pretty similar to that of C# 
    - Unwinds the stack in the same way
    - **BUT** no exception type in JavaScript.  
        - You can throw an Exception or any object, string, etc.
        - You won't have multiple catch blocks
        - Selective catching leans on `instanceof`
- **Syntax**:
    ```(javascript)
    try {
        // code    
    } catch (exception) {
        
    } finally {
        
    }```
- **throwing**:
    ```(javascript)
    throw new Error("some message!");```
    - The exception can be a string, number, boolean, or object:
    ```(javascript)
    throw "Too big";    // throw a text
    throw 500;          // throw a number```
    - Why to use the `Error` constuctor?
        - populates a `stack` property with the stack trace
- **Selectively Catching**:
    - Creating an exception type
    ```(javascript)
    function InputError(message) {
        this.message = message;
        this.stack = (new Error()).stack;
    }
    InputError.prototype = Object.create(Error.prototype);
    InputError.prototype.name = "InputError";```
    
    - Throwing the custom exception type
    ```(javascript)
    throw new InputError("Invalid direction: " + result);```
    - Selective Catching
    ```(javascript)
    try {
        // code    
    } catch (e) {
        if (e instanceof InputError)
            console.log("Not a valid direction. Try again.");
        else
        throw e;
    }```
- **Uncaught Exceptions**
    - Reported to the console
    - Terminate that line of execution
    - alternately, you can assign a handler to `window.onerror` event:
    ```(javascript)
    window.onerror = function(msg, url, line, col, error) {
    // Note that col & error are new to the HTML 5 spec and may not be 
    // supported in every browser.  It worked for me in Chrome.
    var extra = !col ? '' : '\ncolumn: ' + col;
    extra += !error ? '' : '\nerror: ' + error;

    // You can view the information in an alert to see things working like this:
    alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

    // TODO: Report this error via ajax so you can keep track
    //       of what pages have JS issues

    var suppressErrorAlert = true;
    // If you return true, then error alerts (like in older versions of 
    // Internet Explorer) will be suppressed.
    return suppressErrorAlert;
    };```
- **Assertions**:
    - Create AssertionFailed Exception
    ```(javascript)
    function AssertionFailed(message) {
        this.message = message;
    }
    AssertionFailed.prototype = Object.create(Error.prototype);```
    - Define the assert() method  
    ```(javascript)    
    function assert(test, message) {
        if (!test)
        throw new AssertionFailed(message);
    }```
    - Using the assert
    ```(javascript)
    function lastElement(array) {
        assert(array.length > 0, "empty array in lastElement");
        return array[array.length - 1];
    }```
- **GOOD IDEA**: You can use Exceptions **without** throwing them
    - new up the `Error` but send it as the return value
    - do an `instanceof Error` test against the return value and handle accordingly
-  **Try-Catch Performance**:
    - Avoid Try-Catch in performance-critical functions and loops
    - Marginal overhead is almost negligible unless an Exception is actually thrown.
   