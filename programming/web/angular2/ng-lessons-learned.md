Angular2 Lessons Learned 
=====================

## Project Setup
- Your project will have a single root with the following contents:
    - YourAppBE
        - Where your ASPNET solution / projects go
        - We'll try to keep the basic .net solution / project templates intact
    - YourAppFE
        - Where your Angular project goes
        - Use the angular cli to generate a project (see instructions below)
    - .git
    - README.md

## AspNetCore Component
- Have the following files handy:
    - NLog config files (full replace- with some path changes)
        - *NLog.config*
        - *NLog.STAGING.config*
        - *NLlog.PRODUCTION.config*
    - *Startup.cs*
        - We'll want to replace mainly the ConfigureServices() and Configure() 
    - Base Controller (full replace)
        - *BaseSiteController.cs*
    - Example Services (full replace)
        - *AuthService.cs*
        - *BaseService.cs*
- In Visual Studio, set up a new Web Application
    - Asp.NET Core with .Net Framework (as opposed to .net core framework)
        - In theory, it's easy to switch to the core framework (just a line or two change to the *project.json*), but in reality it's more involved with that.  
    - Use Windows Auth
- Get Common NewMarket NuGet Packages
    - Nuget Feed: \\ricwebprd\NewMarketNuGet
    - Membership (AD)
    - User Context (Impersonation)
    - Caching
    - Sentry (Authorization)
    - Email
    - Helpers
    - Web (Some controllers to handle impersonation)
    - NuGet feed: \\ricwebprd\NewMarketNuGet
    - Base
    - See the README.md for their usages
        - TFS Repos: http://rictfserver1prd:8080/tfs/NMProjects/_projects
- Replace sections of *appsettings.json*
    - Copy your *appsetting.json* into *appsettings.production.json* and *appsettings.staging.json*
    - Change only the stuff that needs to be changed and the rest of the settings (if they're the same) can be removed
- Create a Sentry App ID
    - http://sentry.test.ethyl.net/
    - You'll need to be set up as a SuperAdmin so you can create your own Schemas
    - Create a new Schema
    - Create a new Application (same name) and assign it to the Binary Mixtures Schema
    - As a superAdmin, you can set up the schema anytime later
- 3rd Party Nuget Packages
    - NLog.Extensions.Logging (include prerelease)
        - All the NM Packages use a common logging interface and this is the provider!
        - Copy the 3 env-specific logging files into the project root
            - Update paths and make sure dev-env folder is created.
    - NLog.Web.AspNetCore
- Customize the startup
    - See Example file
    - Various adds and removes
    - Copy ConfigureServices(), Configure()
- Add the BaseController
- Add Services
    - Create a svc folder
    - Add an auth service (see files)
    - Make sure your startup ConfigureServices() creates a scoped AuthService so that it's injected into your controllers
- Build
    - Test basic wireup and that log files are created

### Setting up Impersonation
- This is for down the road...
- Copy this stuff from ChemExpo 
    - Get *newmarket.shared.js
    - TopNav under Views/Shared/Partial
        - Take everything from .welcome-dropdown class
        - Take newmarket.shared.css
- Some notes about UserContext
    - CurrentUser (may be impersonated) and HostUser (actual user)
    - GetIdentity() will get the CurrentUser
    - IsImpersonating

## Angular Setup
- We'll use the angular cli to create your project.
- This minimizes the amount of webpack configuration we need to do, while giving us the most flexibility and a project structure consistent with the community and best-practices.
- Also lets us use the other services of the angular cli, like the generators.  (see other notes)
- To create your project: `ng new SampleApp --verbose --skip-git --routing --ng4 -dir=fe-proj`
- Bulding less and other css:
    - if you have less files to compile:
        - `npm install less --save-dev`
        - copy less folder to the src directory
    - add the following to your angular-cli.json with an array of the appropriate css/less/sass to bundle (order matters):
    ```(json)
        styles": [
              "../node_modules/bootstrap/dist/css/bootstrap.css",
            "./less/site.less"
        ]
    ```
- Bundling 3rd Party Javascript
    - add the following to your angular-cli.json with an array of the appropriate js to bundle (order matters):
    ```(json)
    "scripts": [
        "../node_modules/jquery/dist/jquery.js",
        "../node_modules/bootstrap/dist/js/bootstrap.js",
        "./assets/js/ie10-viewport-bug-workaround.js"
      ]
      ```
- Build Process
    - In a nutshell, we'll copy the bundles and other assets into the BE project's *wwwroot/dist* folder
    - I recommend using npm script shortcuts for the following build commands:
    - Dev Build
        - `ng build --dev --output-path=../be-proj/dist --output-hashing=none --progress --sourcemap --verbose`
        - To watch, add the `--watch` parameter which will recompile on changes to *.less|ts|html|js 
    - Prod Build
        - `ng build --prod --aot --output-path=../be-proj/dist --output-hashing=none --progress --stats-json --verbose`
            - specifies which environment file is used, typically *environment/environment.ts* or *environment/environment.prod.ts*
                - see [here](https://github.com/angular/angular-cli/wiki/build#build-targets-and-environment-files) for instructions on adding config files for different build profiles
            - prod build uses uglifying and tree-shaking functionality
            - stats-json is an output file which you can use with webpack-bundle-analyzer 

