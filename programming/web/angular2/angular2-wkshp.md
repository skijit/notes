Angular2 Workshop
=====================
Notes from a Spring 2016 Dev Intersections workshop with John Papa and Dan Wahlin

[Here's](jpapa.me/a2ps1stlook) a pluralsight course on Angular2 (A first look)


Modules/Components/Templates
Binding and Directives
Services and DI
Http  - how you GET/POST
Routing

The DI functionality is WAY different in NG2.

RTM: Not said.  Currently in Beta.  Hopefully in the next few months.
    Basically works
    Tooling and build process are still getting improved
    
Modules:
    This is how we organize our code
    Supports lazy-loading out of the box
    Not strictly an ng thing

Components:
    Like controllers
    These are like the basic building blocks
    
Decorators:
    Go hand in hand with components
    It's Metadata

Services

Data Binding

Performances
    Much much faster

Angular Quick Start Project:  
    git clone https://github.com/angular/quickstart ab16
    cd ab16
    npm i  (doesn't work in git shell- only cmd)
    npm start  (doesn't work in git shell- only cmd)

-----------
github.com/DanWahlin/Angular2-JumpStart

-----------
Angular 1 to 2 Differences

Directive syntax changes...
1.5: ng-repeat="vechicle in vm.vehicles"
2: *ngFor="#vehicle of vehicles"

Binding against dom directly now...
1.5: <h3 ng-bind="vm.story.name"></h3>
2: <h3 [innerText]="story.name"></h3>

One and two-way binding
square brackets: []: 
curly brackets: {}:

Events are inside parentheses: ()

Here's a two-way binding syntax:
[(ngModel)]="story.name"

No more factories, services, etc.  
Now you just use classes

@ is for decorators...

---------
Modules, Components, and Templates

quick note about docs:
angular.io/docs/ts/latest/api

    TODO:
        Quick start
        Case Study / Tour of Heros
        Check out the cheat sheet


walking through: github.com/danwahlin/angular2-barebones

notice:
    the file structure pattern
    the indext.html script refs
    <app-container> and app.components.ts
    
    Notice the @Component decorator and it's attributes
    
    ------------
    
    import { Component } from 'angular2/core'; //this is so we can use the decorator below
    
    //this is a decorator or an annotation
    @Component({
        selector: 'my-component', 
        //template: 'Hello {{ name }}',
        templateUrl: 'app/myComponent/my.component.html'
    })
    //other attributes:
    //providers: objects injected into the component
    //directives: any custom directives used in the component template
    //pipes: any things like 'filters' which are used in the component template
    
    export class MyComponent {
        name: string = "Joey Butts";
    }
    
    
    note: backtick lets you use simple multi-line templates.
    
    So- the attribute or decorator (there's a subtle difference I don't understand) is implemented by TypeScript.  
    It is also a proposal for ES2017, but not sure if it's been accepted.
    
    
Modules separtae code, and need to be exported or imported (via system.js)

classes, functions, and variables can be exported.

---------------------------------
Bindings and Directives

One-way binding:
    There's a shortcut syntax that allows interpolation
        img src={{fdlskfj}}
        
Property Binding
    whether an html attribute or component or directive property    
    uses the [] syntax

Event binding
    differences between events and attributes:
        onClick generates the click event
        so here, we just reference the same event
        <button (click)="save()">Save</button>    
    
Two-way binding:
    "banana in a box"
    [()]
    

'of' is in ES6

----------------------------------
Services and DI

services: a class... provides functionality (data calls, logging, etc) or state which needs to be shared

import { Injectable } from 'whatever/core';

@Injectable()
export class VehicleService {
    getVechicles() {
        return [
            new Vehicle(10, 'Car'),
            new Vehicle(11, 'Boat'),
            new Vehicle(12, 'ShoeCopter')            
        ]
    }
}

DI is how we provide an instance of a class to another angular feature

export class VehicleListComponent {
    vehicles: Vehicle[];
    
    //HERE'S WHERE IT HAPPENS: WE SPECIFY THE TYPE AND THE INJECTOR TAKES CARE OF THE REST (?)
    constructor(private _vs : VehicleService) {
        ...
    }
}

Best practice: Add @Injectable to every service

QUESTION: DO we need the import the components we are injecting?  ANSWER: YES

When you inject into a component, you specify the providers attribute on the Component attribute, and mark all the services your injecting.

You can specify these at the high level of the component and then if you want to, you can override in sub components.

Best practice: find the topmost parent component and register the service with the injector at that label.

Injector is like a cache of singleton instances of injectables
If you request a svc it doesn't currently have, it delegates to the provider

The directives property in the component will list the componets you need.

good tip for debugging / testing:
<pre> {{ thing | json }} </pre> 

WHOAH:  IF YOU SPECIFY THE SAME SERVICE IN TWO DIFFERENT COMPONENTS, THEN YOU GET DIFFERENT COPIES!  
IF YOU WANT THEM TO SHARE THE SAME SERVICE, JUST REGISTER THE INJECTABLE AT THE HIGHEST LEVEL.

In the future tooling, you'll be able to see the Dependency tree

AV REMINDER:
    VIEWS FOR APP & USER NOTIFICATIONS & LOGGING (WITH SEND ERROR)
    ERROR Messages as TOAST, rather than requiring a large footer
    
    QUESTION: Sidebar-enabled navigation
    
    PROJECT:
        WHAT ARE WE PROJECTING?
        FILTER PROFILES: By dept, SBU, ETC

    Report Definition
        Input collection type (eg inventory Numbers, fluid codes, etc) 
        Configurations / Views
        Shared configuration:
            output type
    
    What is saveable?
        project
        search results
        report configuration
        
    Can you batch search + report?
         
    Std Progress Indicators
    Report Error
    
    Saved Queries
        Reusing saved queries in existing searches
        They can be publicly shareable - but not necessarily workable due to security context

    Full Screen Navigation on homepage?

---------------------------------------
I/O

Check out Dan Wahlins Angular 2 Customer Manager app (in github... example below is pulled from it)

You decorate your component classes properties that you want visible in the template

import { Input, Output } from './angular2/core'

@Component({
    selector: 'filter-textbox',
    template: `
        <form>
            {{ label }}
            <input type="text" [(ngMOdel)]="model.filter"
                (keyup)="filterChanged($event)" />
        </form>
    `

})

export calss FilterTextboxComponent {
    model: { filter: string} = { filter: null };
    
    @Input() label: string = 'Filter';
    
    //output (updating ui due to internal state change) is triggered by events.
    //this is an event which gets fired corresponding to a change.
    //note that when it is called, it has the property name that is changing,
    //and the parts of the ui that are listening to this change are going to be
    //using "banana in a box syntax" (simulating 2-way binding).
    @Output() changed: EventEmitter<string> = new EventEmitter();  
    
    //subscribe to this custom event, and call the @Output function, changed
    filterChanged(event: any) {
        event.preventDefault();
        this.changed.emit(this.model.filter); //raise changed event
    } 
}    
    
    
NOTE:
    There is a Cookbook section in the DOCS
    https://angular.io/docs/ts/latest/cookbook/

----------------------------------
Http

can work with Promises OR Observables
this module is not part of core angular

rx.js : reactive extensions

[TODO: My Markdown thingy: How about a node project that injects the parts I need]

an http get is going to return an observable, which you can map the results... see slides
    also note that http interface will still change a tiny bit

you could always use any another ajax library!  (like jquery)

subscribing to observables:
    how is it different from promises?
        if you want, you can unsubscribe / cancel
            why is this important: in case you want to communicate with something other than simple http, such as WebSockets!
        TODO: investigate into these differences.  see more about this rx.js...

Remember to catch exceptions!

Spinner plumbing in angular 2 (ng1 used to be http interceptors)
    request interceptors will be in the RTM'ed version
    
---------------------------------
useful components:
    angular-material-2
    ?
---------------------------------
Angular Routing

    angular2/router module
    
    To use routing:
        1- Add router library script and <base> element
            you can get them from npm (locally) or just get them from a CDN
            router.dev.js
        
            you want to add a:
                <base href="/">
                
            supports normal URLS without hashes!
                using history.pushState
                
            remember if you're using this to make sure system.js is able to load the data
            
        2- Register ROUTER_PROVIDERS
            add it to the root component decorator's provider attribute
            
        3- Add the @RouteConfig decorator
            @RouteConfig([
                { path: '/', as: 'Customers', component: CustomersComponent, useAsDefault: true },
                ...
            ])
        
        4- Add a <router-outlet>
            this is like the old ng-view
        
        5- Use routerLink

      One of the big design decision is whether to lazy load views or not.
      
      TODO: clarify all this routing stuff!

---------------------

test runner discount code:
 anglebrackets_wallaby
 



