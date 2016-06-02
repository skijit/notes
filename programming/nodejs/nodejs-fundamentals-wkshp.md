NodeJS Fundamentals
=========================
Notes from a Dev Intersections conference workshop, Spring 2016 

- Workshop links:
    - 2 Useful Repos with code and slides (in the readme.md):
        - [github.com/samartioli/node-web-api](github.com/samartioli/node-web-api)
        - [github.com/samartioli/node-basics](github.com/samartioli/node-basics)    
    - covers general node stuff as well as using it for a web api

- Node Basics
    - Good for JSON APIs
        - SPAS
        - Streaming
    - Not great for...
        - CPU Heavy apps
        - Static Servers
    - REPL (Read-Eval-Print-Loop Language Shell)
    - npm init will help build a package.json for you
        - walk through the prompts
        - lists all your project dependencies
    - to run a project, just type `node <mainjsfile>.js` from the node command prompt
    - Example 3: npm_link demonstrates how you can use node for command-line/scripting tools
    - Example 4: ShellJs is a bunch of commandline tools you can use!  **Revisit this!**

- As a Web API
    - start with Express framework - and consider using yeoman to generate the project
    - check into nodemon: it will monitor any changes to my files and then restart the server
    - see notes I put about the package.json in Example 2

- Require('pfdkfjd');
    - Looks globally, then locally, then ???
    - The file referenced in the require could have the entry point- see example 3 in web-api
        - You'll need to export the object you're importing

- Postman
    - See the [request builder](https://www.getpostman.com/)
    - Chrome app for generating http requests
    - More usable alternative to cUrl
