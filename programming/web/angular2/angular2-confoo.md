Angular2 Confoo  Workshop
==============

## Misc
- Now refer to ng1 as ng.js and ng2+ as (just) 'angular'
- Questions:
    - Module loader responsibilities vs execution engine
    - Relationship between angular and webcomponents

## ES2015
- Now they're developing the language spec on a yearly cadence!
- ES6 => ES2015, ES5 => 2009
- Useful features in ES2016...
    - Template strings
        - requires backtick ``` `${this.someName} is a person` ```
    - Block scopings (let)
        - Rather than function level
        - You can safely replace `var` with `let`
    - Classes, constructor, inheritance
        - ```extends``` and ```super```
    - Collections, Iterators,
        - ```Set``` class like arrays but each value is unique
        - ```Map``` dictionary style Collections
            - Key can be any type, but it has to be unique
    - Modules
        - relies on `import` and `export` keywords
    - Arrow Functions

    
## TypeScript
- Ember, React, Aurelia are all using TypeScript
- Union type:
```(typescript)
let cpt: number|string;
```
- You can still use `typeof()` from js
- ```any``` is good for receiving Json-based types
- ES class getters and setters are from typescript
```(typescript)
class Car {
    constructor(private _engine:string);  //auto-named property

    get engine():string {
        return this._engine;
    }
    set engine(val:string) {
        this._engine = val;
    }
}
```
- Interfaces 
    - Support inheritance
    - vs Using Classes
        - Inheritance is **NOT** a run-time JS concept, whereas classes **ARE**
        - See [this](https://jameshenry.blog/typescript-classes-vs-interfaces/)
            - If we are looking to create types for model data coming from a remote server, or other similar sources, it is a great idea to start by using an interface.
            - Unlike classes, interfaces are completely removed during compilation and so they will not add any unnecessary bloat to our final JavaScript code.
            - If we need to codify implementations of our interfaces later on, it is very easy to turn them into full classes.
- Optional element of Interface, use ?
```(typescript)
interface IPerson {
    firstName : string;
    lastName? : string;
    sayHi() => void;
}
function receivePerson(myPerson:IPerson) {
    myPerson.sayHi();
}
```

## Angular Basics 
- Super Useful VSCode Extensions
    - Angular v2 TypeScript Snippets
    - AngularDoc for VS Code
    - AutoImport
- All the libraries in NG will be synced (at least in Major version)
- CLI
    - Angular CLI will take care of the first 3steps in the Angular WF:
    1. Add script tags and populate config files (including dependencies in package.json) 
    2. Create app component and module
    3. bootstrap app module into index.html
    4. add more components
    - Also adds webpack
    - Manages Live Reload
    - Linter
    - Test driver
- Two-way binding is mostly used only in forms
- See the angular cheat sheet
- Snippets:
    - ```a-``` then choose 'Component' or 'Service'
- The CLI uses WebPack- If you want to see how this works, there's a syntax like `CLI -ngEject` (or something)
    - [here's the info](http://stackoverflow.com/questions/39187556/angular-cli-where-is-webpack-config-js-file-new-2017-feb-ng-eject)
- Also, beware of the `ng serve` with the CLI, it breaks if you rename a folder
- Shadow DOM can be used to keep component css separate.
    - See webcomponents and the encapsulation decorator property for more info
- emmet.io
    - syntax that generates you an html template
- `ng g component <feature-name> --flat`
    - `flat`: do it in the current folder
    - don't forget you can use the integrated terminal (`ctrl-~`)
    - to navigate to a different file that is in your project use `ctrl-p` and then start typing the file name
    - creates *.spec.ts for tests
    - updates your app.module.ts
- using @Input and @Output
    - You could call a method in a parent component's class, but then its tightly coupled to it
- Make constructors super-lightweight
- Services and singletons:
    - singletons only within the current context
    - you can have multiple instnces of the same service depending on where you inject them
    - there's a hierarchy of injectors
    - solution: you can still inject the service, but remove the `Provider` decorator property and it will use the parent injector
    - a lot of times, you  want to declare the injectors (`Providers` decorator property) at the root level.
- Good tools
    - Angular Graph Dependencies (ngd)
        - [here](https://github.com/compodoc/ngd)
        - take the ngd-cli
    - Augury is a chrome dev tools extension for debugging ng apps
- RxJs
    - Expose an observable in a service
    - One benefit of using RxJs (over promises) is that you can have multiple subscribers
    - rxmarbles.com
        - nice graphical representation of debounce and similar aggregations/operators
- Http module has std get, put, post, delete
- When you import and inject a Module, like the HttpModule, you don't need to register a Provider.  
    - That is handled internally by the module.     
    - Basically, it is only custom services which need to be registered as Providers
- `ng serve -port 10001` changes the port 
- running chrome with `--disable-web-security` will let you make unrestricted CORS calls (but be careful!!)
- slice pipe good for pagination
- check out ng2-bootstrap, material.angular.io
- ngModules
    - groups components, services, etc.
    - better organization, optimizations, etc
- same component cannot be in different modules
- BrowserModule is just for the bootstrap component
- Release to Production - Module optimizations
    - Just in Time `ng serve`
    - AoT `ng serve --prod`, or better `ng build --prod`
        - This will use webpack as the module loader.
            - It's a runtime dependency.
            - Everything is self-contained
    - code will go to the dist folder  
- `webpack bunder analyzer` is an interesting way to see how space is allocated in your webpack bundles
- each module has its own routes
- define routes in app.routing.ts
    - you create an array that maps paths to components
    - you export it
    - you can have child routes with different segments
    - order is sensitive
    - you can make routes less greedy with pathMatch: 'full'
- app.module.ts will import your routing and decalre them as an import
- <router-outlet> </router-outlet> is the container for router views
- you can use the [routerLink] directive OR use helpers to build references to the appropriate view/route
- you can retrieve captured routing parameters in the corresponding component's ngOnInit() using `this._route.snapshot.params['id']`
- `a-`routerLink
- 2 things need to happen with routing
    - <base href="/">
    - remember to configure the server router to return the default index
        - There's no more HTTP 404 since page not found is just a default view
- Read [this](https://angular.io/docs/ts/latest/guide/router.html) article about routing
- Augury is very nice for the router info
- Route Guards
    - decide if a route can be activated
    - CanActivate, CanDeactivate
- Check out Victorsavkin.com for good router articles
- To lazy load, you'll remove the imports and change the router
- 2 different types of forms modules
    - FormsModule
    - ReactiveFormsModule
        - more class/model-driven
        - validation is similar to how it worked in Angular 1
        - more testable this way
        - easier to dynamically / programmatically change
    