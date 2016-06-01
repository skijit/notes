#nodejs

- Node Package Manager
    - Some Notes from [this](https://www.youtube.com/watch?v=225nO79lciw) presentation
    - A Node Package is just a folder containing a program described by a package.json.
        - Depending on the client, you could reference a package in any number of ways: zip files, links to various places, etc.
        - You can ask it for specific versions of a package OR by default, you'll get one tagged 'Latest'
    - Node packages don't have to be nodejs programs.  It could be:
        - Less scripts
        - Images or other binary files
        - Any other code or text, etc.
    - Package.json
        - Minimum version is:
        
        ```(javascript)
        {
            "name": "package-name",
            "version": "0.1.0"
        }
        ```
        
        - Alternately, you could just run ```node init```, which will create this package.json file for you.
            - Follow the prompts when you use it.
            - Note it also wants you to specify an entry point (or index.js by default).
                - That's useful bc then other packages can reference this package, and just by calling it by package name, it will resolve to the appropriate entry point.
            - If you specify a git repo (typically hosted on github), then it can give you a bunch of other useful info in the package.json.
        - For documentation on the package.json schema, type ```node help json```
    - To have all the dependencies for your current project installed, ```npm install```
    - You can also associate any shell commands/tasks with some reserved events/hooks, which are known to npm (part of the package.json schema).
    - Some examples...
        - install
        - update
        - uninstall
        - start
        - ...
        - these are essentially events/hooks which you can use to trigger custom actions when installing your package.
        - Example:
        ```(javascript)
        // ...
        "start" : "node server.js"
        // ...```
        - Then you would invoke this as ```npm start```
        - Or if you want to define your own shell stub in the package.json:
            - Put it under the 'scripts' object 
            - Invoke it with ```npm run-script <script-name>```
    - Package Installation Methods / Options
        - Packages can be installed **Locally** or **Globally**:
        - Global:
            - *Nix:
                - /usr/local/lib/node
                - /usr/local/lib/node_modules
            - Windows:
                - C:\Users\<username>\AppData\Roaming\npm
                - Or if you use choclatey, it will go to some other location...
            - To view, ```npm list -g```  or ```npm root -g```
        - Local: 
            - In the .\node_modules subfolder of the directory with the packages.json (usually)
            - To view, ```npm list``` or ```npm root```
            - AKA %appdata%\npm
        - You can also install a global package and link it locally.  See [here](http://www.bartread.com/2014/02/17/whats-difference-locally-globally-installing-npm-packages/)
        - Rules of thumb for whether to install locally or globally:
            1. If you’re installing something that you want to use in your program, using require('whatever'), then install it locally, at the root of your project.
            2. If you’re installing something that you want to use in your shell, on the command line or something, install it globally, so that its binaries end up in your PATH environment variable.
    - Peer dependencies
        - Decent explanation [here](https://nodejs.org/en/blog/npm/peer-dependencies/)
        - Gist involves the plugin model where you develop a package to be used inside a host...
            - But you demand a particular version of that host.  
- Streams
    - Streams are an abstract interface which is implmented by a bunch of objects in node.js
        - HTTP server request is a stream
        - process stdout is also a stream
        - Basically, this is just an underlying concept/interface used in the node world.
        - It follows Unix Pipes.
        - They can be read/write/duplex
        - And they have a bunch of events like:
            - readable, data, end, close, error, writable, finish, pipe, unpipe
        - So the usecase is really when you need to read/write data across a shared buffer, rather than something like a file (I think)
- LibUV
    - **TODO** : don't really understand this
- Shelljs
    - [ShellJs](https://github.com/shelljs/shelljs)
    - This gives you portable unix style commands
    - You can run them from:
        - A Node program (if you ```var sh = require('shelljs')```)
        - Command line usage

- LoDash
    - This is a js library
    - Makes it easy to work with arrays, numbers, objects, etc.
        - Easy iterators (foreach, etc.)

- Shebang line on some node files
    - Some node programs will begin with ```#!/usr/bin/env node```
    - This tells the unix system to invoke the env program to find where node is and to make that the first argument when executing this script.
    - On Windows, it will ignore this shebang line and just look at the file extensions association
        - But it's a best practice on windows to prefix 'node' to your script call.  EG ```node myScript.js```.
        - Also, use the bin field in the package.json and npm will install a .cmd wrapper alongside your script so users can execute it directly.  EG ```myScript```

- How to run nodejs from git-bash
    - Update your .bashrc file's PATH based on the PATH you see in the node.js DOS prompt.  In my case:
    ```(bash)
    PATH=$PATH:/C/Users/skjeit/AppData/Roaming/npm:"/C/Program Files/nodejs/":/C/Users/skjeit/AppData/Roaming/npm:
    ```

