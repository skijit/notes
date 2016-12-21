NPM Scripts
====================
- Usage of NPM Scripts for task-running, build-tasks, etc.

## Comparisons to Other Tools
- Gulp, Grunt, and WebPack use a plugin-model such that the tool being called is wrapped by the plugin
    - This is an extra layer of dependency, and something that could go wrong
    - Typically, the underlying tool they're calling is directly callable anyways, so why not call via npm?
    - Additionally, there are way more tools callable via npm than plugins exist for gulp, grunt, etc.
    - Documentation for the plugins is usually pretty bad

## NPM Scripts Features
- Supports convention-based pre and post hooks.
```(javascript)
{
  "name": "npm-scripts-example",
  "version": "1.0.0",
  "description": "npm scripts example",
  "scripts": {
    "prebuild": "echo I run before the build script",
    "build": "cross-env NODE_ENV=production webpack",
    "postbuild": "echo I run after the build script"
  }
}```
    - If I run `npm run  build`, then npm will execute the prebuild task, then the build task, then the postbuild task
        - This will work for any named tasks in there
- You can have one task call another:
```(javascript)
{
  "name": "npm-scripts-example",
  "version": "1.0.0",
  "description": "npm scripts example",
  "scripts": {
    "clean": "rimraf ./dist && mkdir dist",
    "prebuild": "npm run clean",
    "build": "cross-env NODE_ENV=production webpack"
  }
}
```
- You can call multiple scripts serially on a single line using `&&`
    - See example above
    - If you use a single `&` on Unix, it will run the two commands at the same time
- You can call a separate file, if things get too complicated:
```(javascript)
{
  "name": "npm-scripts-example",
  "version": "1.0.0",
  "description": "npm scripts example",
  "scripts": {
    "build": "node build.js"
  }
}
```
- Cross-Platform operators include
    - && chain tasks (Run one task after another)
    - < input file contents to a command
    - > redirect command output to a file
    - | redirect command output to another command
- ShellJS lets you run Unix commands on Windows - thus it works cross-platform
- You cannot add comments to the package.JSON

## Misc Notes
- start and stop scripts are pretty common across lots of platforms
- if you execute `npm restart`, npm will run `stop`, then `start`
- The name of your task can have a colon in it (e.g. run:dev)
- To see what packages are callable via npm, execute `ls node_modules/.bin`
- jshint package does linting
    - `.jshintrc` lets you configure
```(javascript)
"scripts": {
    "lint": "jshint *.js **/*.js"
  }```
- you could spec your `pretest` task as `npm run lint`.  If there's an error, the main `test` task will not run!
- TypeScript compilation
    ```(javascript)
    "scripts": {
        "compile:ts": "tsc --outDir ./lib --module commonjs ./src/typescripts/tsCode.ts"
    }```
- often good to add pre-tasks which clean out directories before new files are compiled
    - `rimraf` is a cross-platform version of rm -rf
- `uglify-js` is a good minifier.
    - Here is is piped input from browserify.
   ```(javascript)
    "scripts": {
        "build:bundle": "browserify ./client/js/app.js | uglifyjs -mc > ./public/js/bundle.js"
    }```
- Some tools have their own watch flags (typically -w)
    - There are other tools that are just watchers.  (e.g. the tool, `watch`)
- To pass custom arguments to a build task, use `--`
    - `npm run test -- --grep="pattern"`
    - The arguments will only be passed to the script specified after npm run and not to any pre or post script.

- to bump the version number, use `npm version [<newversion> | major | minor | patch ]
    - there are some other options, but probably not very useful
    - You can call this in your build process to bump
    - When you set the version in package.json, this will set a corresponding tag in git
- If you need to run on multiple lines, just insert the same code into a .sh script and call that from the npm script
- Youc an also add a `config` node (sibling to `scripts`) with name/value pairs.  
    - Then you can refer to the name in the scripts like this: $npm_package_config_<name>
    
    

    



