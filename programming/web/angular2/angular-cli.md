Angular CLI
================

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
    - `--watch`" run build when files change
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
