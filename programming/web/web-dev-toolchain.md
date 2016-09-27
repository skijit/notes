Web Dev Toolchain Overview
======
These are notes from a workshop from Dev Intersections conference in 2016

## Web Dev ToolChain
- node is the basis for a lot of the new web tooling
    - but note that running different versions of node on...
        - os x: easy
        - windows: hard if not impossible
&nbsp;   
- **Package Managers**
    - 2 primary tools:
        1. Node Package Manager (npm)
        2. Bower
    - NPM
        - can distribute anything: native binaries, front-end pacakges, etc.
        - angular 2 will not be distributed on bower, but only on npm
        - this might be part of a growing trend
        - there are some good blogs for moving from bower to npm, [example](https://shellmonger.com/2015/07/26/moving-from-bower-to-npm/)
    - bower 
        - just for front end resources
&nbsp;   
- **Task Runners**
    - These are typically for the wealth of compile/deploy tasks you might want in a modern (web) app
    - 2 Primary tools:
        1. Grunt
        2. Gult
    - Grunt:
        - configuration-based
    - Gulp
        - code-based
        - is pretty simple framework, but you augment it with packages (usually obtained via npm) to do particular tasks
&nbsp;   
- **Scaffolding / Generators**
    - You can use these to build out base project structures and other code-generation tasks
    - yeoman is a scaffolding tool, like t4 templates
    - there are lots of "generators" out there
    - very simple api
&nbsp;   
- **The CLI tooling trend**
    - docker
    - all the node stuff
    - vs / vscode / atom / extensions are just calling into the CLI tools
    - angular team will have some CLI for scaffolding
    - git
