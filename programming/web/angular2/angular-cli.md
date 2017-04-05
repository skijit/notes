Angular CLI
================

## General Stuff

- `ng new`: creates a new application right out of the box
    - even creates a git repo (or use `--skip-tests`)
    - `--routing` generates a routing module
- `ng generate`: generate components, routes, services, pipes with a simple command
    - `ng generate component my-new-component` : will create a new component in a folder *my-new-component* based off cwd, unless you use `--flat`
    - `ng generate SCAFFOLD_TYPE my-new-component`
        - Where SCAFFOLD_TYPE includes:
            - component
            - directive
            - pipe
            - service
            - class
            - guard
            - interface
            - enum
            - module
    
- `ng serve`: easy testing your app while developing locally
    - `ng serve --host 0.0.0.0 --port 4201`: to configure the host and port you're serving from
    - `--live-roload` (--lr)
    - Compiled application is served from memory, not disk.
- `ng eject` ejects your app and output the proper webpack configuration scripts
    - `--aot` build using aot compilation
    - `--app` specified name of app to use
    - `--base-href`:  url for the application being built
    - `--environment`: defines the build environment
    - `--extract-css`: extract css from global styles onto css files
    - `--force` overwrite any webpack.config.js and npm scripts already existing
    - `--output-path`: path where output will be placed
    - `--sourcemap`: outputs sourcemaps
    - `--watch`: run build when files change
- Bundling
    - All builds use Bundling
    - `ng build --prod` or `ng serve --prod` will use uglifying and tree-shaking functionality
 - Testing related commands:
    - `ng e2e`: 'end to end' tests
    - `ng test`: uses the Karma test runner
- CSS Preprocessor integration
    - point the `styleUrls` property in the `@Component` decorator to your less/scss files
- Global Library Installation
    - When you need to add a library (e.g. jquery for bootstrap components) to the global scope (i.e. they were loaded by a script tag).
    - Use the `.angular-cli.json`
        - in `apps[0].scripsts` and `apps[0].styles`, add as such:
        ```(json)
        "scripts": [
            "../node_modules/jquery/dist/jquery.js",
            "../node_modules/tether/dist/js/tether.js",
            "../node_modules/bootstrap/dist/js/bootstrap.js"
        ],
        ```
        and
        ```(json)
        "styles": [
            "../node_modules/bootstrap/dist/css/bootstrap.css",
            "styles.css"
        ],
        ```
- Using a Proxy:
    - Suppose you want to run your backend API as a separate process for development purposes.
    - This is good if you like the debugging experience in VSCode for FE stuff, but want to debug the backend API in Visual Studio.
    - Create a file called `proxy.conf.json` with the content
    ```(json)
    {
        "/api": {
            "target": "http://localhost:3000",
            "secure": false
        }
    }
    ```
    - To learn more, see [this](https://webpack.github.io/docs/webpack-dev-server.html#proxy)
    - add this script entry to package.json: `"start": "ng serve --proxy-config proxy.conf.json"

## Config Schema Notes
- [doc here](https://github.com/angular/angular-cli/wiki/angular-cli)
- *project*
    - *name*
    - *ejected* (bool) - whether project was ejected.  default is false.
- *apps* (array- so it supports multiple apps)
    - *outDir*: output directory for build results.  default is `dist/`
    - *stylePreprocessorOptions*: Options to pass to style preprocessors
        - *includedPaths* (array): paths to include.
    - *environmentSource*: source file for env config

## Adding the CLI to an existing Project
- files to look at:
    - .angular-cli.json 
    - package.json 
    - tslint.json (probably not needed for generator)
    - src/polyfills.ts (probably not needed for generator)
    - src/styles.css (probably not needed for generator)
    - src/tsconfig.json (probably not needed for generator)
- based on some initial tests, it makes more sense not to do this.
    - you end up pulling in a bunch of extra dependencies, which affect 
        - Your .NET build process (there are embedded aspx files in node/modules)
        - Your FE compilation process (webpack is changed)
- **THIS DOESN'T WORK**

## Things To Do:
- can I do watch if I'm not doing it through serve?
    - You can do watch through build!
    - I could always do a serve, but harness everything to npm scripts, so that I'm also serving it through vstudio (on a different port)
- can I do aot and prod compilation if it wasn't ejected as such?
- probably want a separate bootstrap build task in npm scripts
- if I don't have a static entry point, how does webpack build my dependencies?
    - HtmlWebpackPlugin is the only reference to index.html.
    - The purpose of the webpack plugin is to automate injection of your webpack bundles into a default, templated html file which you specify (index.html).
    - So I could possibly use a placeholder index.html file and have the npm script copy the bundles over to aspnet.  **TEST THIS**
- test adding static libraries to bundles (bootstrap, jquery) (**lower priority**)
- can I watch my less and add compilation there too?

## Most likely usage:
- Create a folder with two directories:
    - fe-proj
    - be-proj (this will hold the aspnet core project in it)
- `ng new SampleApp --verbose --skip-git --routing --ng4 -dir=fe-proj`
- Integration with less:
    - `npm install less --save-dev`
    - copy less folder to the src directory
    - add the following to your angular-cli.json
    ```(json)
        styles": [
            "./less/site.less"
        ]
    ```
- Dev Build
    - `ng build --dev --output-path=../be-proj/dist --output-hashing=none --progress --sourcemap --verbose --watch` 
        - Will watch the less, ts, html, js 
- Prod Build
    - `ng build --prod --aot --output-path=../be-proj/dist --output-hashing=none --progress --stats-json --verbose`
        - specifies which environment file is used, typically *environment/environment.ts* or *environment/environment.prod.ts*
            - see [here](https://github.com/angular/angular-cli/wiki/build#build-targets-and-environment-files) for instructions on adding config files for different build profiles
        - prod build uses uglifying and tree-shaking functionality
        - stats-json is an output file which you can use with webpack-bundle-analyzer 

## Explanation of various bundles
- [see here](http://stackoverflow.com/questions/42010893/what-these-angualr-cli-do-inline-bundle-js-vendor-bundle-js-main-bundle-js)
- inline: this is a webpack loader.
- polyfills: what's driven in *polyfills.ts*.  things like zone.js and a bunch of core es6 polyfills.
- vendor: angular libraries.
- main: your own code, driven by what's in *main.ts*
- scripts.bundle.js: stuff you put in your script declarations in angular-cli.json.  Things like jquery, bootstrap, etc.
- styles: 

