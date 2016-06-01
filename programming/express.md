#Express

- Most popular web framework for node.
- Notes from [this](https://www.youtube.com/watch?v=xDCKcNBFsuI) webcast
    - Go to the directory you want to start a project in.
    - Type ```npm init```
        - This will walk you through creating a basic package.json which will enumerate:
            - Entry point
            - Dependencies
            - Lots of other stuff
        - When you want to add dependencies, you can invoke ```npm install <pkg> --save```
        - At the top level of the package.json add ```"private": true```
            - This will prevent lots of errors **NOT SURE WHY THOUGH**
        - Install express by executing ```npm install express --save ```
        - Install handlebars by executing ```npm install handlebars --save ```
        - Install express-handlebars by executing ```npm install -express-handlebars --save```
            - for more info about this, go [here](https://www.npmjs.com/package/express-handlebars)
            - package desc: A Handlebars view engine for Express which doesn't suck
        - Now test running the following code in the entry point (typically index.js) :
        ```(javascript)
        var express = require('express');
        var app = express();
        app.set('port', process.env.PORT || 3000);
        
        app.get('/', function(req, res) {
            res.send('Express Works!');
        });
        
        app.listen(app.get('port'), function() {
            console.log('Express started press Ctrl-C to terminate');
        });
        
        ```
        - Now to run, execute ```node expresstut.js``` assuming that is the name of your entry-point.
    - Then we create the following directory structure:
        - public
            - img
        - views
            - layouts
            - partials
    - Now lets update the entry point file...
        ```(javascript)
        var express = require('express');
        var app = express();
        
        app.disable('x-powered-by');  //this blocks a header containing the type of server that is running (ie node)
        
        //define main.handlebars as the default layout.
        var handlebars = require('express-handlebars').create({defaultLayout:'main'});
        
        app.engine('handlebars', handlebars.engine);
        app.set('view engine', 'handlebars');
        
        //TODO: More Imports
        
        app.set('port', process.env.PORT || 3000);
        
        //configuring middleware... THIS IS ORDER SENSITIVE... next() means continue processing
        //static files and setting the root
        app.use(express.static(__dirname + '/public'));
        
        //outputting request information to the console
        app.use(function(req, res, next) {
            console.log("looking for ULR: " + req.url);
        });
        
        //if the url doesn't exist
        app.get('/junk', function(req, res, next) {
            console.log('Tried to access /junk');
            throw new Error('no junk');
        });
        
        //here's where we catch the exception
        app.use(function(err, req, res, next) {
            console.log('Error : ' + err.message);
            next();  //means continue processing pipeline
        });
        
        //now we'll set up some routes  (paths are NOT case sensitive)
        //request: http request
        app.get('/', function(req, res) {
            res.render('home');  //this points to the home.handlebars view, which also uses the default layout, 'main'
        });
        
        //about
        app.get('/about', function(req, res) {
            res.render('about');  //this points to the home.handlebars view, which also uses the default layout, 'main'
            
        });
        
        app.listen(app.get('port'), function() {
            console.log('Express started press Ctrl-C to terminate');
        });
        ```
        
    - In the layouts directory, add main.handlebars:
        ```(html)
        <!DOCTYPE html>
        <html lang="en">
        <head>
        {{>head}}  <!-- this > syntax indicates a filename -->
        <title>Express Tutorial</title>
        </head>
        <body>

        {{>bsnavbar}}

        <div class="container">
        {{{body}}}
        </div>

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

        </body>
        </html>
        ```
    - In the views directory, add a file home.handlebars:
        ```(html)
        <div class="page-header">
            <h3>Welcome to my Express Tutorial</h3>
        </div>
        ```
    
    - In the views/partials directory add file head.handlebars
        ```(html)
        <meta charset="UTF-8">
        <!-- If IE use the latest rendering engine -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- Set the page to the width of the device and set the zoom level -->
        <meta name="viewport" content="width = device-width, initial-scale = 1">
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        ```
        - This adds bootstrap, jquery, and sets the initial zoom to 1
    - Add another partial directory, bsnav.handlebars (see code in project- but it follows the same idea)
    - **body-parser*: npm package for parsing encoded data, per a POST request
    - *formidable*: npm package to allow you to upload files
    - *cookie-parser*: npm package to allow you to use cookies

- Express Routing
    - From the [Docs](http://expressjs.com/en/guide/routing.html)
    - Route paths can be...
        - Strings
            - '/about'
        - String Patterns
            - '/ab+cd'
            - The characters ?, +, *, and () are subsets of their regular expression counterparts. The hyphen (-) and the dot (.) are interpreted literally by string-based paths.
        - Regular Expressions
            - /.*fly$/

- Express Middleware
    - Difference between app.use() and app.get()
        - See [here](http://stackoverflow.com/questions/15601703/difference-between-app-use-and-app-get-in-express-js)
        - Basically, use() responds to any HTTP verb, but get() only responsd to GET.
        - Also use() has a variety of middleware applications, such as designating a subapplication, etc.
    - [Documentation](http://expressjs.com/en/guide/using-middleware.html) Notes
        - **TODO**


