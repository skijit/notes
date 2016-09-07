Getting Started With Angular 2
=========================
Notes from a pluralsight course

## Intro
- [Course link here](https://www.pluralsight.com/courses/angular-2-getting-started)
- [Sample Application here](https://github.com/DeborahK/Angular2-GettingStarted.git)
    - Local (PC) clone is `other-angular2/Angular2-GettingStarted`

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
- Some nifty things in the package.json:
```(javascript)
"scripts": {
    "start": "concurrently \"npm run tsc:w\" \"npm run lite\" ",
    "tsc": "tsc",
    "tsc:w": "tsc -w",
    "lite": "lite-server",
    "typings": "typings",
    "postinstall": "typings install"
}```

    - If you need a simple web server, look into the npm package `lite-server`.
        - The browser-sync stuff is included via lite-server
    - Notice the typings install automatically after running `npm install` 
    - `npm start` is used in place of running a gulp default task
        - this version of npm start includes browser-sync, but I'm not sure where.
    - the `w` switch for typescript is a 'watch', so it will auto-recompile whenever src changes

## Component Basics
- Component = Template + Class + Metadata
- Template
    - HTML + bindings and directives
- Class
    - Code which supports the view
    - Created with TypeScript
    - Properties
    - Methods
- Metadata
    - Let's angular know this class is a Component
    - Uses decorators
- Example

```(typescript)
import { Component } from 'angular2/core';
// you need to import the Component decorator from angular

@Component({
    selector: 'pm-app',
    template: `
        <div><h1>{{pageTitle}}</h1>
            <div> My first component</div>
        </div>
    `    
})
// selector is the directive name, {{pageTitle}} is a binding

export class AppComponent {
    pageTitle: string = 'This is a sample title';
}
```
- Angular has a variety of decorators:
    - @Component :
    - ...
- Angular is modular, and so the different pieces can be imported
    - angular2/core
    - angular2/animate
    - angular2/http
    - angular2/router
- Naming module filesnames: 
    - featureName.type.ts
    - EG app.component.ts
- Bootstrapping
    - Bootstrapping refers to the fact that the process will load and run
    - Loading the root component = bootstrapping 
    - index.html
        - Has all the default plumbing / includes
        - Has the root component reference as a directive in the <body>
            - `<pm-app>Loading app...</pm-app>`
        - Has the `System.import('app/main')
        - app/main is called the 'bootstrapper' and will load the root app component like so:
        ```(typescript)
        import { bootstrap } from 'angular2/platform/browser';
        import { AppComponent } from './app/component';
        bootstrap(AppComonent);
        ```
- Naming:
    - A component class name should:
        - Use PascalCase
        - Suffix with 'Component'
    - A component filename should:
        - use lowercase
        - live underneath the 'app' directory
        - include suffix with `.component.ts`
    - Properties in a class should:
        - Use camelCase

## Templates, Interpolation, Directives
- Inline and Linked Templates
    - Inline means they're inside the Component decorator as a string
        - Nice to have colocated with your code
        - use the `template` property in the decorator
    - Linked means a separate file
        - offers intellisense, syntax-checking
        - use the `templateUrl` property in the decorator
        - **gotcha**: path should be relative to the index.html file
- Referencing / Nesting Components
    - The root component's template will contain refs to the pertinent components and so on.
    - When a template is referencing another directive/component
        - Set the `directives` property in the decorator.
            - `directives: [ProductListComponent]`
        - import the component
            - this uses the relative path (to current component)
- Template - Class Communication
    - Binding: takes property data from the class and displays it in the template
        - One-way, Class->Template
    - Events: generate event data which can call methods in the class
        - One-way, Template->Class
    - Interpolation:
        - one- way
        - examples
        ```(html)
        <h1> {{pageTitle}} </h1>
        <h1> {{'Title: ' + pageTitle}} </h1>
        <h1> {{3*2+5}} </h1>
        <h1> {{'Title: ' + getTitle() }} </h1>
        <h1 innerText={{pageTitle}}></h1>
        ``` 
- \*ngIf
    ```(html)
    <table *ngIf='products.length'>
        <tbody></tbody>
    </table>```
- \*ngFor
    ```(html)
    <tr *ngFor='#product of products'>
        <td> {{ product.productName }} </td>
        <td> {{ product.productCode }} </td>
        <!-- ... -->
    </tr>```
    - note the use of `for...of` rather than `for...in`
        - `for...of`: walking over a collection
        - `for...in`: enumerating the properties attached to an object
- 3 Kinds of Angular Directives
    - Components
        - based on a template
    - Attribute Directives
        - changes the appearance or behavior of a an element
    - Structural Directives
        - changes the DOM by adding/removing elements
        - examples:
            - \*ngIf
            - \*ngFor
            - \*ngSwitch
- **gotcha**: there's a big difference between removing vs hiding a component.  If you hide it, it's still running.

## Data Binding and Pipes
- Property Binding is an alternative to Interpolation
    - Enclose the property name in \[ \]
    - `<img [src]='property.imageUrl'>`
    - Same semantics as interpolation, but property binding is recommended as the first choice when feasible
        - `<img src='{{property.imageUrl}}'>`
- Event Binding
    - Enclose the event in \( and \)
    - `<button (click)='toggleImage()'>`
    - For a list of html events you can bind to, go [here](https://developer.mozilla.org/en-US/docs/Web/Events) 
    - One-way binding
- Two-way Binding
    - Enclose the ngModel property in \[\( \)\]
    - So-called 'Banana in a box'
    - `<input type='text' [(ngModel)]='listFilter'`
- Pipes
    - Transform bound properties before they are displayed
    - Built-in pipes include:
        - date, number, decimal, percent, currency, json, slice, lowercase,  etc.
    - Pipes can be chained
    - Custom pipes can be developed
    - 2 examples of a built-in pipe
    ```(html)
    <img [src]='product.imageUrl' [title]='product.productName | lowercase'>
    {{ product.productPrice | currency:'USD':true:'1-2.2' | lowercase }}
    <!-- the stuff which follows currency are formatting parameters, which are
    also supported by pipes.  Pipes are separated by colons. -->
    ```
    
## More on Components
- Using interfaces
    - rather than using an `any` type on a class property, parameter or return type, we can use a typescript interface.
    ```(typescript)
    export interface IProduct {
        productId : number;
        // ...
        calculateDiscount(percent : number) : number;    
    }``` 
    - You can use an interface for:
        - Object literals which conform to the interface
            - if you only use the interface like this, consider removing the 'I' prefix
        - Classes which implement the interface
            - preferable if you've got methods in the interface
- Encapsulating Component Styles
    - If you want dedicated style for a component, there are two methods to specify this in the decorator:
    - `styles` property:
    ```(typescript)
    @Component({
        selector: 'my-tag',
        templateUrl: 'blah/gah/mah.html',
        styles: [ 'thead { color: #BBBBBB; }' ]
    })```
    - `styleUrls` property:
    ```(typescript)
    @Component({
        selector: 'my-tag',
        templateUrl: 'blah/gah/mah.html',
        styleUrls: [ 'app/products/products.list.component.css' ]
    })```
        - again, the path here is relative to the index.html
- Lifecycle Hooks
    - Major Lifecycle phases:
        - Create
        - Render
        - Create and Render Children
        - Process Changes
        - Destroy
    - Hooks:
        - **OnInit**: component initialization, **retrieve data**
        - **OnChanges**: watch for changes to *input properties*
            - *input properties* are discussed a little below
        - **OnDestroy**: cleanup
    - Each lifecycle hook has a corresponding interface.  To implement...
    ```(typescript)
    import { Component, OnInit } from 'angular2/core'
    
    export class ProductListComponent implements OnInit {
        // ...
        ngOnInit() : void {
            console.log('this is OnInit');
        }        
    }```
- Building Custom Pipes
    ```(typescript)
    //bring in the Pipe decorator and the interface PipeTransform
    //which needs to be implemented.
    import { Pipe, PipeTransform } from 'angular2/core';
    
    @Pipe({
        name: 'productFilter' //this is the how we reference the pipe
    })
    export class ProductFilterPipe implements PipeTransform {
        
        //value is a collection of input objects and args is an array
        //of arguments.
        transform(value: IProduct[], args: string[]) : IProduct[] {
            
            //walk through the value[] array, vis a vis any elements
            //in the args and return an IProduct
            
        }
    }```
    - If you want to consume the Pipe in a component, designate it as a dependency in the component decorator with the `pipes` property.
        - This process is analogous to how you use nested directives
    ```(typescript)
    @Component({
        selector: 'my-thing',
        templateUrl: '/blah/gah/wah.html',
        pipes: [ ProductFilterPipe ]
    })
    export class SomeOtherComponent { ... }```

## Nested Components
- When to nest a component
    - When it's only managing a smaller view
    - It has it's own selector
    - It communicates with it's container (optional)
- Communication pattern:
    - parent -> child : Input Properties
    - child -> parent : Events
- If the parent changes a property in the child, then the child will want to call `OnChanges`
- Input properties example
    - Nested Component
    ```(typescript)
    @Component({
        selector: 'pm-products',
        directives: [ StarComponent ]
        template: `
            <td>
                <ai-star [rating]='product.StarRating'> </ai-star>
            </td>
        `
    })
    export class ProductListComponent { ... }```
        - Note that you can **only** use property-binding on an input property
    - Container Component
    ```(typescript)
    @Component({
        selector: 'ai-star',
        templateUrl: 'star.component.html',
    })
    export class StarComponent {
        //THIS IS AN INPUT PROPERTY- SETTABLE BY CONTAINER
        @Input() rating: number; 
        starWidth: number;
        
        ngOnChanges() : void {
            this.starWidth = this.rating * 86 / 5;   
        }   
    }```
- Event Example (Child -> Parent communication)
    - Child component exposes an event with the @Output decorator which it can use to communicate data to it's container
    - Property decorated by @Output must be an event, but it's payload can be specified with the EventEmitter generic
    - Here's the child component:
     ```(typescript)
    @Component({
        selector: 'ai-star',
        template: `
            <div (click)='onClick()'>
                <!-- ... -->
            </div>
        `
    })
    export class StarComponent {
        @Input() rating: number; 
        starWidth: number;
        
        @Output() notify: EventEmitter<string> = new EventEmitter<string>();
        
        ngOnChanges() : void {
            this.starWidth = this.rating * 86 / 5;   
        }   
        
        onClick() {
            this.notify.emit('clicked!  This is the event payload, yo!');
        }
    }```
    - And the container component:
    ```(typescript)
    @Component({
        selector: 'pm-products',
        directives: [ StarComponent ]
        template: `
            <td>
                <ai-star [rating]='product.StarRating'
                    (notify)='onNotify($event)'> </ai-star>
            </td>
        `
    })
    export class ProductListComponent { 
        //...
        
        onNotify(message: string) : void {
            //do something
        }
     }```
     
## Services and Dependency Injection
- Service is a class with a focused purpose
- When you register a class as a service with Angular, it will maintain that instance as a singleton and manage injecting it into any components which request it (i.e. a component and any of it's children).
- When to use a service:
    - Any code which is not specific to driving a view
    - Code which you want to share to multiple views
    - Encapsulate external interactions (such as data access)
- The angular Injector will provide the instance to the component as an argument to it's constructor
- Example service:
    ```(typescript)
    import { Injectable } from 'angular2/core'

    @Injectable()
    export class ProductService {
        getProducts() : IProduct[] {
            //...
        }   
    }```
- The service file name should be servicename.service.ts
- Registering the service
    - Since it's a singleton, we only want to register it once.
        - Therefore, we register it at the **root component**.
    - Use the `providers` property in the @Component decorator
    ```(typescript)
    import { ProductService } from './products/product.service';
    
    @Component({
        selector: 'my-app',
        template: '<h1>{{title}</h1><other-component></other-component>',
        directives: [ OtherComponent ],
        providers: [ ProductService ]
    })
    export class AppComponent {
        //...
    }```
- Injecting the Service
    - We need to define it as a dependency in the component, using the constructor
    ```(typescript)
    @Component({
        //usual stuff here - nothing new!
    })
    export class ProductListComponent {
        constructor(private _productService : ProductService) { }
        //this is shorthand to assign the injected ProductService to
        //this._productService.  
        //you can use public or private accessors here, btw.
    }
    ```
    
