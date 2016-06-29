Getting Started With Angular 2
=========================
Notes from a pluralsight course

## Intro
- [Course link here](https://www.pluralsight.com/courses/angular-2-getting-started)
- [Sample Application here](https://github.com/DeborahK/Angular2-GettingStarted.git)

## Anatomy of An Angular2 Appliction
- App = Components + Services
- Component = Template + Class + Metadata
- Class = Properties + Methods
- Metadata associates the class as an Angular Component
- Class has the reusable code
- Template has the HTML

## General Setup
- Application Scaffolding / Setup
    - To create an app, among other things, you'll need...
        - application folder => holds the project
        - tsconfig.json => configure typescript compiler
        - package.json => library and script dependencies
        - typings.json => references any types that are not documented here
        - main.ts => bootstraps the app with the the root component
        - ...and much more...
    - This can be done manually:
        - Follow instructions in the Quick Start guide at www.angular.io
        - **OR** download the results of these steps in the Quick Start guide (above)
    - You can also use CLI tooling, [AngularCli](https://github.com/angular/angular-cli)
        - **BUT** current this is still in beta (6/22/2016)
    - Or you can use Starter files from the course repo (link is above)
        - See contents of the folder 'APM - Start'
    - There could also be some **yeoman** templates out there too...
- Application Structuring / Conventions
    - app folder: all of the application code goes under here
- NPM installs...
    - all the angular library and dependencies
    - required typings.json files
- Modules
    - Angular2 uses ES 2015 Modules
    - ES2015 says a file === module
    - Any code in a module can be exported, and then becomes visible to another module when it is imported by it.
        ```import { Product } from ./product```
- index.html is the entry point for the application.  It has...
    - link tags to load stylesheets
    - script tags to load the libraries we need
    - a configuration for SystemJS and module loading
    - the body html tag



