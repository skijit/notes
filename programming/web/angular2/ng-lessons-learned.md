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
- Bundling 3rd Party Javascripts
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
- If you're need to support the non-evergreen browsers, go to `src/polyfill.ts` and uncomment the blocks that relate to IE


## High Level Angular Architecture
- Add page modules:
    - High-Level Approach
        - Each page will have a root component which we'll create now.
        - Each page will also have a module and routing information.
        - (unshared) subcomponents will live inside the page's folder
    - Generate component
        - run this from inside your `src` directory
        - `ng g component AdvancedSearch -cd OnPush --inline-template false --export --inline-style false -v`  
    - Set up Component nesting and basic compilation
        - change the selector from *app-advanced-search* to *advanced-search*
        - fill the html template for the component and add a reference to *advanced-search* in the app component templates
        - Add *AdvancedSearchComponent* to your App Module's *declarations * property
        - **Build and TEST**
    - Add a Module
        - run this from inside your `src` directory
        - `ng g module AdvancedSearch --flat -routing true --verbose` 
        - Add your page component to your module:
            - Add *AdvancedSearchComponent* to the page module's *Declarations* property            
        - Add your page module to your app
            - Remove *AdvancedSearchComponent* from your App Module's *declarations* property
            - Add *AdvancedSearchComponent* to your App Module's *exports* property
            - Add *AdvancedSearchModule* to your App Module's *imports* property            
        - **Build and TEST**
    - Set up routing
        - Add a SharedComponents Module with a PageNotFoundComponent
            - run this from inside your `src` directory
            - `ng g module SharedComponents true --verbose` 
            - run this from inside your `src\app\shared-components` directory
            - `ng g component PageNotFound --inline-template false --export --inline-style false -v`  
            - Add *SharedComponentsModule* to the *imports* property of your *AppModule*
            - Note that unlike the Page modules, the SharedComponents module does not have it's own routing module.  
                - The routes for any of these will be specified at the App routing level.
            - **Build and TEST**
        - Set up Global Routing
            - In the AspNet Core package, download the nuget package: Microsoft.AspNet.SpaServices
            - Add the following last route to your routing table:
            ```(csharp)
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            ```
                - This will map URL's which don't contain a '.' (indicating a file extension) to your default view, while files which do contain a '.' are treated like static files (e.g. cat.jpg) and should resolve properly.  For more info, see [here](http://blog.nbellocam.me/2016/03/21/routing-angular-2-asp-net-core/).
                - Clear your nuget cache when you load this!
            - In *app.component.html*, replace `<advanced-search></advanced-search>` with `<router-outlet></router-outlet>`
            - In *app-routing-module.ts* add `import { PageNotFoundComponent } from './shared-components/page-not-found/page-not-found.component';`
            - Add the follow to *advanced-search-routing.modules.ts*:
            ```(typescript)
            const routes: Routes = [
                { path: 'advanced-search/:saved-query-id',   component: AdvancedSearchComponent },
                { path: 'advanced-search',   component: AdvancedSearchComponent, pathMatch: 'full' }
            ];
            ```
            - Make sure you have a `import { AdvancedSearchRoutingModule } from './advanced-search-routing.module';` in  your advanced-search.module.ts.
            - Add the following to your *app-routing.module.ts*:
            ```(typescript)
            const routes: Routes = [  
                { path: '',   redirectTo: 'advanced-search', pathMatch: 'full' },  //temporary
                { path: '**', component: PageNotFoundComponent }
            ];
            ```
            - Add RouterLinks in the *app* component layout
                - Add directives to nav links such as the following:
                ```(html)
                <a routerLink='/advanced-search' routerLinkActive="current">Advanced Search</a>
                ```
    - Repeat process for other page modules
- Adding SubComponents
    - run this inside the parent component's directory.
    - `ng g component ActivityLog -cd OnPush --inline-template false --export --inline-style false -v --flat=true`
        - really up to you whether you want to use flat or not
- Adding a pipe to the App Module:
    - cd to `src/app/pipes` (mkdir if necessary)
    - `ng g pipe FilterDelegate --flat`
    - This will declare it in the AppModule, which is probably what you want

## Forms

## Validation
- Validation design should follow smart/dumb component pattern
    - You should have dumb validation and smart validation
    - Dumb Validation => Dumb Component
        - Form Validation
        - Best to do the trivial or really easy stuff using the OOB validation functions, and if need be custom validations.
    - Smart validation => Smart component
        - Logic is disconnected from validation
        - Involves business logic or any non-trivial validation checks
- Why is form validation not smart validation?
    - Everything has to be (re)validated at server level
    - It makes sense to write most (at least the non-trivial) validations only at the server level and use them to asynchronously validate on the client 
    - Async validations on the form is not really good: it's much harder to debounce these events
        - Conversely, if the dumb component sends change model events to the smart component, the smart component can debounce and fire off async validation calls to the server at a more appropriate rate.
- Smart Validation is just another state which needs to be maintained
    - You can manage via a service or just internal to the component
    - Most importantly, it's just program logic- not directly tethered to the form API.
- What does smart/dumb validation look like?
    - The model type which is passed as an input property to the dumb component should have two top-level properties:
        - Data Model
        - Validation State
    - The dumb component should emit this updated model type as an output event whenever (both):
        - The model has changed (e.g. user input to form)
        - It passes the form-validation
    - Smart component listens to dumb component change events, debounce, and fires off an async validation call to the server
        - Maybe this is delegated to a service or services
    - Smart component updates its validation state based on the async response(s)
        - disables/enables it's own UI elements as appropriate  (most of these should live in the dumb component)
    - Smart component updates the input properties for the associated dumb components
        - See point about Back End Validation for notes on how the smart component is able to distribute validation error messages to the appropriate 
    - Validation info passed from smart to dumb component doesn't have to display the validation message in the location of the problematic control 
        - Example: if the invalid control is buried in a form group in a form array, it's not worth the effort to display the error right next to that control
            - The validation fail might involve multiple controls - for example a uniqueness violation.  
        - The error message can be displayed prominently in the top or bottom of the dumb component with the most informative error message possible.
    - If the dumb component's input property's Validation State (inside the model type) has an error:
        - Form validation state should not be altered
        - Any dumb component UI elements which are enabled or disabled based on validation state should take into account the form's validation state as well as the validation state input from parent smart component
- What about when you try to write to the DB but it fails on that final validation right before the transaction?
    - Back end retun type should be modeled as something like:
        - Updated Data Model
        - Validation Errors
        - Other Errors
            - IE exceptions, etc.
        - Return type: 1= success, 2=validation errors, 3=other errors
    - If other errors:
        - Don't update the local model
        - Inform user of the errors (toast, modal, etc.)
    - If Validation Errors:
        - Set smart component's validation state to invalid
        - Distribute validation errors to appropriate dumb components
            - See point below
- Back End Validation and API Design
    - For each type of API transaction there should be an associated collection of validation methods
    - There should be a single high-level method that will call all of the appropriate validation methods for a given transaction type
        - The high level validation method can be called by:
            - The client: it walks through all the validation steps so the client only has to make one call 
            - The API: when the client tries to make a change (e.g. write to the DB), the API will call that same high level validation method first.
    - Each individual validation method should have a return value that gives the smart component sufficient information to distribute the error message to the appropriate dumb component.
    