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


## Form Architecture
- Summary
    - Based on Smart and Dumb Component Paradigm
    - Uses both *Dumb* and *Smart Validation*
    - Uses *Adaptive Validation*- a combination of *Discrete* and *Continuous* Validation (all terms I've made up- described below)
    - Uses Reactive Forms Paradigm
    - Uses OnPush Dumb Components with immutable input properties provided by a state service (e.g. ngrx store)
    - Changes to global state are observed and injected into dumb components via smart components
        - Dumb component chooses which events to update state with
    - Basic control flow for validation and form data are provided through base classes
    - Global State contains smart-component specific View Models and other shared data
    - Minimum coupling over layers
    - Remember that none of this addresses error messages.  Only validation.
- When to use:
    - Needs adaptive validation
    - Lots of text inputs
    - Want to follow smart / dumb component architecture
    - When there is a benefit to a model-driven approach (e.g. dynamic amounts of things)
- Future:
    - TODO: Consider an alternative of having a dumb component emit all DOM events you're interested in up to a smart component which manages validation and inject messages appropriately.
- Architecture 
![layers](/resources/images/programming/Angular2ArchDrawings/Slide1.PNG)
    - Form Layer
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
        ![smart-dumb-component-io](/resources/images/programming/Angular2ArchDrawings/Slide2.PNG)
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
- Validation 
    - Smart vs Dumb Validation
        - Dumb Validation => Dumb Component
            - Form Validation
            - Executed on client, in Dumb Component
            - Synchronous
            - Simple validations using the OOB validation functions, and if need be custom validators.
                - The more of these you use, the less DRY since they overlap with smart validations
            - **Don't use async dumb validators**: it introduces difficult-to-test data flow into the form code
        - Smart validation => Smart component
            - Triggered by smart component
            - Executed asynch, server-side
            - Not based on the Angular forms API
            - Smart Validation == All server-side validation
                - All validation checks ultimately need to be run server side.  
                - Could refer to simple server validations or more complex business logic oriented validations
            - **Precedence**: Smart Validation should NOT be (re)evaluated when any existing dumb validation fails exist
            - Smart Validation fail messages should be informative enough that they do not need to be placed next to the offending control since mapping the fail to a specific control would be an additional, unnecessary responsibility for the smart component.
    - Two General Validation Approaches:
        - **Continuous**: data is (re)validated after each user input/event
        - **Discrete**: data is (re)validated only after predetermined event(s) (e.g. blur)
    - **Adaptive Validation**: This is a very user-friendly validation method that incorporates discrete AND continuous approaches
        - When data is valid (or on first validation), validation updates to the user should be discrete
        - Once identified as invalid, the data should be revalidated continuously
        - Basically: you give the user a chance to get the input right without complaining, then when you have displayed validation fail messages, you update the data for each successive input.
    - How to do Adaptive Validation with Angular
        - Dumb validation (via angular forms api) 
            - Angular forms validators are continuous but we can simulate adaptive validation
            - Touched vs Not Touched
                - A when a control loses focus, it is marked as Touched by the Angular Form API
                - The base dumb component class contains a method which the derived dumb component can call: `updateTouchedValues()`
                    - This marks all valid controls as untouched
            - The base dumb form component class also has a helper method, `hideControlValidationMesg(control)`, which can be used by the form template to hide validation fail messages whenever the control is marked 'dirty'.
            - Therefore, controls which are invalid, but still untouched (because they haven't lost focus) will not display error messages (ie Discrete Validation)
            - Only once they lose focus and are invalid will the validation appear continuous.
        - Smart validation:
            - Occurs whenever:
                1. CRUD output event is emitted to the smart component.  The service will do it in inline before dispatching the appropriate update action. 
                2. The base dumb form component emits the DoSmartValidation event to the smart component whenever:
                    - The dumb component has existing smart validation errors AND
                    - Any user input occurs 
    - **Back End Validation and API Design**
        - For each type of API transaction there should be an associated collection of validation methods
        - There should be a single entry-point method that will call all of the appropriate validation methods for a given transaction type
            - It should take a parameter which indicates whether to do **comprehensive** or **smart-only** validation (just those which don't overlap with dumb validation)
            - The entry-point validation method can be called by:
                - The client: it walks through all the validation steps so the client only has to make one call (**smart-only**)
                - The Back End API: when the client tries to make a change (e.g. write to the DB), the API will call that same high level validation method first (inline). (**comprehensive**)
        - Each individual validation method should have a return value that gives the smart component sufficient information to distribute the error message to the appropriate dumb component.
- Control Flow
    - There are two interconnected logical flows of data in this architecture:
    1. Form Update Flow
    2. Validation Flow
- Form Update Flow
![Form-update-flow](/resources/images/programming/Angular2ArchDrawings/Slide3.PNG)
- Validation Flow
![validation-flow](/resources/images/programming/Angular2ArchDrawings/Slide4.PNG)
    - The form observer cannot directly change any values bc 
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
- Complete Form Update and Validation Flow
![Form-update-and-validation-flow](/resources/images/programming/Angular2ArchDrawings/Slide5.PNG)
- (1) User Enters Input
- (2) If the dumb component has specified this type of input/event as one which generates a CRUD event, then emit and go to (3.1), else go to (4.1)
- (3.1) The smart component handles the CRUD event and calls it's a corresponding method in it's designated service class
- (3.2) The service has two streams of activity: smart validation and executing the CRUD action.  Start with (3.3)
- (3.3) The service calls the smart validation methods
- (3.4) Smart validation results are copied into the Smart Component's View Model in the Store
- (3.5) The Smart Component is observing the View model in the Store.  When new smart validation results are found, it will inject this into the Dumb component's input property.
- (3.6) The Dumb Component is updated and marked for Change Detection.  Go to (3.7)
- (3.7) The View Model in the Store is updated per the CRUD event
- (3.8) The Smart Component's View Model Observer fires and it injects the new input property into the dumb component
- (3.9) The Dumb Component is updated and marked for Change Detection. Go to (4.1)
- (4.1) The Form Model is updated with the user input
- (4.2) The form observer is fired.
- (4.3) Test whether the form's validity status has changed.  If so, go to (5), else to (6)
- (5) Emit a form validity change event to the smart component
- (6) Test whether Smart Validation should be triggered. If so, go to (6.1)
- (6.1) Emit the Do Smart Validation event.
- **CHANGE DETECTION RUNS ASYNC**
    - When a given turn is done, if the component has been marked for Change Detection, then it will run.
    - Only then will the component be re-rendered with the updated input property values sent to it via the Smart Component (via Observing the Store)

### Questions
- Will I need something more granular than a single *do-smart-validation* output event in the dumb component?
- Consider streamlining how we handle smart and dumb validation
- Consider for the future a way of mapping smart validation results back to the individual fields in the dumb component.
- Another drawing which clearly designates what is handled by the Base Dumb Form Component vs the actual dumb component.

## Dialogs and State and View
- I started using the bootstrap modal dialog helper ng2-bs3-modal with a dialog service (providing `show()` and `hide()` methods, among others).
- Then I re-considered the design: why not have the modals be driven by the ngrx store properties?
    - It would be nice to have more state centralized in the ngrx store
    - It probably would be easier to test my services if they don't keep state themselves, but just assist with transitions
- But then after talking it through, I realized this approach wouldn't work bc the ng2-bs3-modal is not designed as a dumb component:
    - It doesn't get it's instructions based purely on input properties
    - It might emit events, for example on dismissal, but that's only for notification purposes: it will manage closing the dialog on its own rather than wait for some instruction from the smart component.
- Perhaps in the future, using a true dumb component, compatible with the ngrx methodology, it will be worth it.
- Future Goal:
    - Less state managed in services, more in the store
    - State managed should include visual elements (e.g. what is hidden and not)
        - This will make things more testable
![relationship-between-vm-sc-dc-reducer-action](/resources/images/programming/Angular2ArchDrawings/Slide6.PNG)

## Modules and DI
- Services and Components (among other things, like directives) go in Modules
- A module can specify which other modules it wants to import- in the decorator's `imports` field
    - It will get everthing the specified module(s) have exported
- A module's decorator's `export` field only allows Components - not services?
    - services are registered with the `providers` field
- Typically, you want to register services at the app (root) level- this gives you a global singleton which can be DI'ed wherever
- But it's crummy to associate each service in the app (root) level - it would be more convenient to put them into a module.
- **QUESTION**: how do you inject a service at the root level, while still keeping it in a module?
- **Answer**: You use the ModuleWithProviders class.
    - Example.
    ```(typescript)
    //In the module the service lives in
    @NgModule({
        imports: [
            //...
        ],
        exports: [
            //your components (that you want to export)
        ],
        declarations: [
            //you components
        ]
    })
    export class CommonModule {
        static forRoot(): ModuleWithProviders {
            return {
                ngModule: CommonModule,                     
                providers: [
                    MyService
                ]
            };
        }
    }
    ```
    - And then in App root module...
    ```(typescript)
    @NgModule({
        declarations: [
            //...
        ],
        imports: [
            //various modules here...
            CommonModule.forRoot(),
        ],
        providers: [
            //services which are registered at the app level
        ],
        bootstrap: [AppComponent],
        exports: [ ]
        })
    export class AppModule { }
    ```
    - **But remember**: when you import this (common) module into other modules (to get access to the components), you can use the normal method- you don't need to call `forRoot()` (i.e. use ModuleWithProviders)

## 2 Ways for Getting PolyMorphic DI

1. Using a factory:

```(typescript)
import { AjaxCallsService } from './../ajax-calls.service';  //cannot use a barrel importation here or it will fail
import { Store } from '@ngrx/store';
//more ES imports ...

//factory has AjaxCallsSvc injected because of the providers deps property (below)
//the ajaxCallSvc itself has a dependency on Store, and since that's in the 
//deps property too, that will work.
let logginsServiceFactory = (ajaxCallSvc : AjaxCallsService) => {
    
    //use the default provider, LogginsDefaultSvc
    let liveListener = new ConsoleLiveListener();
    let offlineListener = new ConsoleOfflineListener();
    let config = <LogginsConfig>{
    isOn: false,
    bufferSize: 10,
    levelFilter: LogLevel.Error,
    tagFilter: [ LogTag.FormProcessing, LogTag.BogusTag ],
    liveListeners: new Map().set(liveListener.getName(), liveListener),
    offlineListeners: new Map().set(offlineListener.getName(), offlineListener),
    formatter: (entry:LogEntry) => `${entry.message}`
    };
    
    //polymorphic injection: service contract is interface-based, but 
    //a concrete implementation is injected when using this provider
    return new LogginsDefaultService(config, ajaxCallSvc);
};

export let LogginsServiceProvider = {
    provide: LogginsService,
    useFactory: logginsServiceFactory, 
    deps: [ AjaxCallsService, Store ]
};
```

2. In the module decorator's providers property, use `{ provide, useClass }` instead of a concrete Service name

```(typescript)
providers: [
    SchemaService,
    //...
    ApiService,
    AuthUnitService,
    CacheService,
    //HERE: HttpService is an abstract class, JQueryHttpService is a concrete implementation
    { provide: HttpService, useClass: JQueryHttpService }
],
```

## OnPush and Change Detection
- [one source](https://stackoverflow.com/questions/36815706/does-changedetection-changedetectionstrategy-onpush-in-angular2-only-works-in/36845604#36845604)
- There are 3 conditions in which an OnPush Component will be marked for Change Detection
    1. An Input Property Changes
    2. It fires an (angular) event
    3. An observable referenced in the template and used with the `Async` pipe fires an event.
        - note that my OnPush components are usually dumb components and therefore not subscribed to an observable (as this typically happens in the smart component).

## Misc Best Practices
- **Enums**
    - Enums are good for representing a property as one of many alternatives (e.g. configuration), but the semantics are a little different than in C#.
        - Design Time : They act as a **type**
        - Run Time : They act as an **object** (where each value is a property)
    - Design Time:
        - You can use them for type annotations

    ```(typescript)
    enum LogLevel {
    Error,
    Warning,
    Info,
    Debug
    }

    export interface LogginsConfig {
    //...other properties
    levelFilter: LogLevel;
    //...other properties
    }
    ```

    - Run Time:
        - The enum is compiled into an object that has mappings from Name->Val and Val->Name (as long as you don't mark it a const enum)
        - Now that it is an object, any runtime manipulation such as assignments and comparisons require you to treat it as such.

        ```(typescript)
        console.log(LogLevel.Error);  //prints 0
        ```

        - Angular-specific gotcha:
            - If you want an enum in your Component, you need to define a property in the Component Class that refers to the enum (now an object)
                
            ```(typescript)

            export class LoggingLevelFormComponent {
                //this class property is initialized to the enum type, which at runtime is 
                //not a type but an object.
                LogLevel : typeof LogLevel = LogLevel; 
            }

            ```

        - For more info on this usage of `typeof` see [this blog post](https://blog.mariusschulz.com/2016/05/31/type-queries-and-typeof-in-typescript) or my typescript notes.
            - You could just as well leave this typeof annotation out.
        
    - Helper Methods:
        - I've added an enum service that lets you enumerate names and values in an enum object.

- **Event and Handler Naming**
    - In the traditional DOM scenario, there are 3 things involved in wiring up an event handler.    
    1. The event (e.g. `click`)
    2. The property to assign a handler to (e.g. `onclick`)
    3. The handler method (e.g. `DoSomething(event)`)
    - So you end up with:

    ```(html)
    <button onclick="return handleClick(event);">
    ```

    - In Angular event wireup, there are really only two things.
    1. The event
    2. The handler method

    ```(html)
    <button (onClick)="handleClick($event);">
    ```
    - There's no property to assign the handler to... you reference the event directly
    - So a good nomenclature rule for angular events is:
        - Event: `on<Event>`
        - Handler: `handle<Event>`
    - Another option is not to prefix your Event names with `on` because you can use the following alternative syntax to wire up angular events.
    ```(html)
    <button on-Click="handleClick($event);">
    ``` 
        - The dash seems to separate it from the normal DOM event property syntax
    - If you want to handle (in Angular) a DOM event for a HTML object that lives in a component tempalte, just refer to it by the event name.
    
    ```(html)
        <button (click)="handleClick($event);">        
        <!-- OR -->
        <button on-click="handleClick($event);">        
    ```
        