#NodeJS Fundamentals

github.com/samartioli/node-web-api
github.com/samartioli/node-basics

    - this has a link to the slides in the readme.md
    - this also covers using node as a web api

- Node Basics
    - Good for JSON APIs
        - SPAS
        - Streaming
    - Not great for...
        - CPU Heavy apps
        - Static Servers
    - Event Loop is single-threaded but this will delegated into asynch work
    - See the recommended reading for the slides
    - REPL (Read-Eval-Print-Loop Language Shell)
    - npm init will help build a package.json for you
        - walk through the prompts
        - lists all your project dependencies
    - to run a project, just type `node <mainjsfile>.js` from the node command prompt
    - Example 3: npm_link demonstrates how you can use node for command-line/scripting tools
    - Example 4: ShellJs is a bunch of commandline tools you can use!  **Revisit this!**

- As a Web API
    - start with Express framework
    - check into nodemon: it will monitor any changes to my files and then restart the server
    - see notes I put about the package.json in Example 2

- Require('pfdkfjd');
    - Looks globally, then locally, then ???
    - The file referenced in the require could have the entry point- see example 3 in web-api
        - You'll need to export the object you're importing

- Postman
    - Chrome app for generating http requests
    - More usable alternative to cUrl



- Look into package 'lodash'

- TODO:
    - Install Locally vs Globally
    - Packages.json
    - npm variations
    


