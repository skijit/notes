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

## Form Architecture
- Quick Summary
    - Based on Smart and Dumb Component Paradigm
    - Uses Dumb and Smart Validation
    - Uses Discrete Validation, but Continuous when data is invalid
    - Uses Reactive Forms Paradigm
    - Uses OnPush Dumb Components with immutable input properties provided by a state service (e.g. ngrx store)
    - Changes to global state are observed and injected into dumb components via smart components
        - Dumb component chooses which events to update state with
    - Global State contains smart-component specific View Models and other shared data
    - Minimum coupling over layers
- (P)Layers 
    - Form
        - **Reactive Forms**: Based on Reactive (aka Model-Driven) Forms paradigm instead of template-based
            - Discussion of the relative merits of each approach is out-of-scope, but it is discussed [widely](http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/)
            - You still use an Angular-HTML template, but much of the functionality (and some of the structure, if it is dynamic) is wired up in code rather than via use of directives such as `ngModel`
        - **Template**: The HTML form element is decorated with the `formGroup` directive, which corresponds to a component property, of type `FormGroup`
        - **API**: The `FormGroup` contains any number of other Angular Form API objects, which are bound to a *Form Model* object.
            - [Abstract Control](https://angular.io/docs/ts/latest/api/forms/index/AbstractControl-class.html)
            - [FormControl](https://angular.io/docs/ts/latest/api/forms/index/FormControl-class.html)
            - [FormArray](https://angular.io/docs/ts/latest/api/forms/index/FormArray-class.html) 
        - **Form Model**: The *Form Model* can be the same as the Data Model, but the former's structure should reflect the `FormGroup`'s structure, which may not be the case with the Data Model.
            - Form Models classes should be able to converto to and from the Data Model type.
    - Dumb Component
        - Encapsulates the Form and associated functionality:
            - Initialization / Wireup
            - CRUD Output Events
            - validators and validation-related events
        - Inputs Properties:
            - Data Model
            - *Smart Validation* Results
        - Outputs:
            - Form Validation Status Change: emitted to the parent (Smart) Component whenever there is an update to local (aka dumb) or injected (aka smart) validation status.
            - Do Smart Validation: emitted to the parent component whenever a smart validation needs to (re)occur.
            - CRUD Output Events: The component decides which internal events will trigger an output event to the smart component for CRUD-related purposes.
                - The smart component will decide whether the destination of the data will be the local store or to the db / server
        - Uses OnPush Change Detection Strategy: Change Detection and thus a re-render will only occur when a new (immuatable) input property is passed to it.
        - Functionality provided by the Base Class, `DumbFormComponent<T, K>` (T = Data Model Type, K = Form Model Type):
            - Validation:
                - Since validation is provided by both the dumb and smart components (more on that later), this functionality stitches is all together into a coherent whole
            - Data Flow:
                - Since there are two primary ways in which the form model (and thus the form) is updated, the base component manages keeping these consistent:
                    1. Direct Entry by User
                    2. Synchronization with the State (e.g. ngStore) data
                        - Via Injection of updated Data Model input property
                        - Consistent with the ngRX, Flux, single-flow-of-data paradigm
    - Smart Component
        - Like a controller- it orchestrates all the interactions between dumb components and the underlying services, but tries to stay lean/generic in terms of underlying logic, delegating that to the services it calls.
            - Not reusable, unlike a dumb controller
        - Responds to output events emitted by dumb components
        - Uses services (shared or component-specific) to:
            - trigger state changes
            - validate
            - observe state changes
        - Injects observer updates into corresponding dumb components
    - Services
        - Shared and Component-Specific Services provide all sorts of functionality for validation, server-interactions, local state updates, etc.
    - State Service
        - E.G. ngrx Store, redux, etc. 
        - A local state service and the functions which transact changes against them (e.g. reducers)  
        - The State provided by the State Service has various 'slices'.
            - Slices of state can be shared or smart-component specific (aka View Models)
    - View Model
        - Each smart component has a specific slice of state data- its view model 
- Coupling over layers
    - Form Model: Data Model
    - Form: Form Model
    - Dumb Component: Form Model, Data Model
    - Smart Component: Data Model, Services
    - Services: only shared services if they are used
- Validation Approach
    - Smart validation and Dumb Validation
        - To avoid redundancy in validation code since validation has to occur at server-level, only the simplest, framework-based *dumb* validators are run locally within the dumb component, and the rest is managed by the smart component which triggers server-based smart validation.
        - Smart Validation should NOT be re-evaluated when any existing dumb validation fails exist, because the smart validations will be encompass many/most/all of the dumb validations.
        - Smart Validation fail messages should be informative enough that they do not need to be placed next to the offending control since mapping the fail to a specific control would be an additional, unnecessary responsibility for the smart component.
    - Two Validation Approaches:
        - Continuous: data is (re)validated after each user input/event
        - Discrete: data is (re)validated only after predetermined event(s) (e.g. blur)
    - Adaptive Validation: (for lack of a better term) The most useable validation approach uses discrete and continuous approaches
        - When data is valid (or on first validation), validation updates to the user should be discrete
        - Once identified as invalid, the data should be revalidated continuously
    - Angular form (i.e. dumb) validation is continuous but we can use tricks to simulate adaptive validation
        - Touched vs Not Touched
            - A when a control loses focus, it is marked as Touched by the Angular Form API
            - The base dumb component class contains a method which the derived dumb component can call: `updateTouchedValues()`
                - This marks all valid controls as untouched
        - The base dumb form component class also has a helper method, `hideControlValidationMesg(control)`, which can be used by the form template to hide validation fail messages whenever the control is marked 'dirty'.
        - Therefore, controls which are invalid, but still untouched (because they haven't lost focus) will not display error messages (ie Discrete Validation)
        - Only once they lose focus and are invalid will the validation appear continuous.
- Form Update and Validation Control Flow
    - TODO: Trace execution of 4th drawing

    - 2 ways form's value observable fires:
        - Component Input Property change:
            - dataModel
                - Triggered by a dc output event (e.g. blur)
            - Smart validation Results
                - Triggered by a base-dc output event
        - Direct user input
            - Any events on the form components (includes blur)
    - The form change subscriber cannot directly change any values bc 
        - the dumb component is OnPush - only re-renders when input properties are changed.
            - changed values would not trigger change detection or a re-render (unless manually- which is bad)
        - it can only output events (see below), which might eventually trigger an update of the input properties. 
    - Two Possible Events Emitted:
        - onFormValidationStatusChange
            - triggered by both
                - Component Input Property Change: bc what if smart validation has changed?
                - Form Value change: Dumb validators might have invalidated the form, in which case the smart component would need to be notified.
        - onDoSmartValidation
            - triggered only by direct user input and if there was an existing smart validation fail (continuous validation)

![layers](/resources/images/programming/Angular2ArchDrawings/Slide1.PNG)
![smart-dumb-component-io](/resources/images/programming/Angular2ArchDrawings/Slide2.PNG)
![Form-update-flow](/resources/images/programming/Angular2ArchDrawings/Slide3.PNG)
![Form-update-and-validation-flow](/resources/images/programming/Angular2ArchDrawings/Slide4.PNG)

### Questions
- TODO: Make sure smart Validation doesn't get triggered if local validation fails exist, otherwise there will be duplications.
- Will I need something more granular than a single *do-smart-validation* output event in the dumb component?
- Remember to include error messages as separate- are these handled by the smart or dumb component? e.g. some DB transaction fail
- Consider for the future a way of mapping smart validation results back to the individual fields in the dumb component
- Possibly incorporate these notes:
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
    - Back End Validation and API Design
        - For each type of API transaction there should be an associated collection of validation methods
        - There should be a single high-level method that will call all of the appropriate validation methods for a given transaction type
            - The high level validation method can be called by:
                - The client: it walks through all the validation steps so the client only has to make one call 
                - The API: when the client tries to make a change (e.g. write to the DB), the API will call that same high level validation method first.
        - Each individual validation method should have a return value that gives the smart component sufficient information to distribute the error message to the appropriate dumb component.
