Angular2 in General
=========================
- **Sources**
    - [Pluralsight Course link here](https://www.pluralsight.com/courses/angular-2-getting-started)
    - [Sample Application here](https://github.com/DeborahK/Angular2-GettingStarted.git)
        - My local (PC) clone is `other-angular2/Angular2-GettingStarted`
    - [Documentation Basics Section](https://angular.io/docs/ts/latest/guide/)
    - [Quick Start Guide](https://angular.io/docs/ts/latest/quickstart.html) : good for getting latest plumbing correct
    - **TODO**:
        - change detection
        - misc javascript:
            - rxjs
            - event system
            - throwing errors / exceptions - theory and practice

## General Setup
- Application Scaffolding / Setup
    - Required files:
        - `app` folder => holds the project
        - `tsconfig.json` => configure typescript compiler
        - `package.json` => library and script dependencies
        - `typings.json` => references any types that are not documented here
        - `main.ts` => bootstraps the app with the the root component
        - `index.html` => shell web page w/ required plumbing (aka entry point)
        - ...and more...
    - Setup options (some alternatives):
        - Follow **step-by-step instructions** in the [Quick Start guide](https://angular.io/docs/ts/latest/quickstart.html)
        - Download the **results** of these steps in the [Quick Start guide](https://angular.io/docs/ts/latest/quickstart.html)
        - You can also use CLI tooling, [AngularCli](https://github.com/angular/angular-cli)
            - **BUT** current this is still in beta (6/22/2016)
        - There are also some **yeoman** templates out there too
- Javascript Modules
    - Angular2 uses ES 2015 Modules
    - ES2015 says a file === module
        - Incidentally, TypeScript says a module is any file with an `export` in it
    - Any code in a module can be exported, and then becomes visible to another module when it is imported by it.
        ```(typescript)
        import { Product } from ./product```
- index.html is the **entry point** for the application.  It has...
    - link tags to load **stylesheets**
    - script tags to load the **libraries** we need
    - a configuration for **SystemJS** and module loading
    - the body html tag
    - reference to the **root app** component
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
        - This seems to run into problems when deploying to Azure (FYI) 
    - `npm start` is used in place of running a gulp default task
    - the ` -w ` switch for typescript is a 'watch', so it will auto-recompile whenever src changes

## App Anatomy 
- App = Components + Services
    - *oversimplification*: there are other class types that may be used, as well as Modules 
- Component = Template + Class + Metadata
    - Template has the HTML view (and possibly associated CSS)
    - Class = Properties + Methods (portable)
    - Metadata associates the class as an Angular Component
    - In **MV\*** Architectural terms, a Component = { Controller + ViewModel } 
- Services
    - Code which doesn't directly drive a view
    - Code which might be consumed by multiple components
- **Entry Point**
    - `index.html`
    - has hardcoded links to:
        - css
        - IE-related polyfills
        - system.js
        - rx.js (reactive extensions for javascript: needed by Html module and event system)
        - angular2.dev.js
    - Module Loader code
        - Configuration
        - Import of the Bootstrapper
    - HTML ref to the **App Component**
- **Bootstrapper**
    - **Bootstrapping**: a process will load itself and run
    - `app/main.ts`
    - imports 
        - the bootstrap service from angular
        - executes bootstrap, passing in the App component
    - example:
        ```(typescript)
        import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
        import { AppModule } from './app.module';

        platformBrowserDynamic().bootstrapModule(AppModule);```   
- **App Component**
    - `app.component.ts`
    - Top level container component
    - Aka root component
    - Creates any Services that will be needed by the application

## Components
- Component = Template + Class + Metadata
- Template
    - HTML + bindings + directives
- Class
    - Code which supports the view
    - Created with TypeScript
    - Properties
    - Methods
- Metadata
    - Let's angular know this class is a Component (and how to use it)
    - Uses decorators
- Example

```(typescript)
// you need to import the Component decorator from angular
import { Component } from '@angular2/core';

//decorator
//selector is the directive name, {{pageTitle}} is a binding
//notice it immediately precedes class code- NO SEMICOLON
//selector property is only necessary if you want to nest the
//component in another component
@Component({
    selector: 'pm-app',
    template: `
        <div><h1>{{pageTitle}}</h1>
            <div> My first component</div>
        </div>
    `    
})
export class AppComponent {
    pageTitle: string = 'This is a sample title';
}
```
- Inline and Linked Templates
    - Inline means they're inside the Component decorator as a string
        - Nice to have colocated with your code
        - use the `template` property in the decorator
    - Linked means a separate file
        - enhanced tooling through intellisense, syntax-checking
        - use the `templateUrl` property in the decorator
- Referencing Nested Components
    - The root component's template will contain refs to the pertinent components and so on.
    - When a template is referencing another directive/component
        - Set the `directives` property in the decorator.
            - `directives: [ProductListComponent]`
        - don't forget to import the corresponding component
            - this uses the relative path (to current component)
- Components and Directives
    - All components are directives
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


### Misc Techniques / Info
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
- Lifecycle
    - Major Lifecycle phases for components:
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
    import { Component, OnInit } from '@angular2/core'
    
    export class ProductListComponent implements OnInit {
        // ...
        ngOnInit() : void {
            console.log('this is OnInit');
        }        
    }```
- Debugging technique:
    `<pre> {{ thing | json }} </pre>`
- Request interceptors to have uniform spinners on any async / http call:
    - [see here](http://stackoverflow.com/questions/35498456/what-is-httpinterceptor-equivalent-in-angular2)

### Nested Components
- When to nest a component
    - When it's only managing a smaller view
    - It has it's own selector
    - It communicates with it's container (optional)
- Communication pattern:
    - parent -> child : Input Properties
    - child -> parent : Events
- If the parent changes a property in the child, then the child will want to call `OnChanges`
- **Input properties example**
    - Container Component
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
    - Nested Component
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
    - Also see the `inputs` array for bulk designation of input properties
- **Event Example** (Child -> Parent communication)
    - Child component exposes an event with the @Output decorator which it can use to communicate data to it's container
    - Property decorated by @Output must be an event, but it's payload can be specified with the `EventEmitter<>` generic
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

## Angular Modules
- Good for:
    - Organizing application
    - Integrating External Libraries
- Many Angular Libraries are packaged as Modules (FormsModule, HttpModule, RouterModule)
- They can encapsulate Components, Pipes, Directives, etc.
- Modules are like gatekeepers that define 
    - the dependencies (e.g. services, other modules, etc) the current module needs
        - those other modules or services will be imported as a javascript module, and then registered with Angular in it's @NgModule decorator.
    - which of it's components can be viewed in other modules
- Declared with the JavaScript class and decorator `@NgModule`
    - The class is usually empty
    - The decorator specifies everthing contained in the module:
        - `declarations`: the component, directive, and pipe classes the module needs
        - `exports`: the declarations (from above) that should be usable to other modules
        - `imports`: other modules whose exported classes are needed by the component templates in this module
        - `providers`: services used in the module
        - `bootstrap`: if this is the *root module*, the corresponding *root component*
- All Angular applications have at least one module, the *root module*, named `AppModule`
- Most apps have feature modules, they bundle related features together
    - The components won't have any reference to their associated module in their file
    - But any reference to them will occur through their associated module class.
- To launch an application, you bootstrap the root module.
- Example module declaration.
    ```(typescript)
    import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';

    @NgModule({
        imports:      [ BrowserModule ],
        providers:    [ Logger ],
        declarations: [ AppComponent ],
        exports:      [ AppComponent ],
        bootstrap:    [ AppComponent ]
    })
    export class AppModule { }```


## Path Gotchas
- Module Loading:
    - Ex: `import { AppComponent } from  './app.component';`
    - Non-Angular 2 modules should use paths **relative** to current component file     
    ```(typescript)
    import { StarComponent } from '../shared/star.component';
    import { ProductService } from './product.service';
    ```
    - Angular 2 modules can just be ref'ed with no path
        - probably b/c it's already in-scope from the include in `index.html`
        - `import { Component, OnInit }  from '@angular/core';`
- Decorator properties:
    - Use **absolute paths**
    - `templateUrl: 'app/products/product-list.component.html'`
    - `styleUrls: ['app/products/product-list.component.css']`


## Naming Conventions
- A component class name should:
    - Use PascalCase
    - Suffix with 'Component'
- File-naming convention:
    - <feature-name>.<type>.ts
        - type = { component | service | module | ... }
    - use lowercase
    - dash-case: separate words with a hyphen `-`
    - live underneath the 'app' directory
    - examples:
        - app.component.ts
        - data.service.ts
        - quick-search.component.css
- Class Properties & Methods:
    - Use camelCase


## Data Binding

### General Approach
- One Way
    - Data source to View
        - [Property Binding / Interpolation](#Data-Binding-Property-Binding)
        - [Attribute Binding](#Data-Binding-Attribute-Binding)
        - [Style Binding](#Data-Binding-Style-Binding)
        - [Class Binding](#Data-Binding-Class-Binding)
    - View to Data source
        - [Event Binding](#Data-Binding-Event-Binding)
- Two Way
    - Just syntactic sugar for two one-way bindings
- Bind to **DOM Properties and Events** 
    - **Not HTML attributes**
    - HTML attributes vs DOM Properties
        - No 1:1 mapping of HTML attributes to DOM Properties
        - Attributes are unchanging, written once in the HTML file text
        - Properties can change
        - Typically, an attribute's value (e.g. `type='text'`) or existence (e.g. `disabled`) **initialize** corresponding DOM properties
- Syntactic / Logical Structure of Binding / IO
    - Syntax: `<Target>='<Source>'`
        - `<Target>` will be enclosed in `[ ]`, `( )`, or `[( )]`
    - Logically:
        - `<Source>`
            - **Any** Property or Method in a Component
            - Not a Component **Input** or **Output**
                - It's a **Binding Source**
            - Refers to the property/method in the current component, i.e. the one whose template it appears in.
                - `deleteHero()` is a `<Source>` in the **current** component (i.e. the parent, i.e. one that references hero-detail in it's template). 
                ```(html)
                <hero-detail (deleteRequest)="deleteHero($event)" [hero]="currentHero"></hero-detail>```
            - Example Sources are `iconUrl` and `onSave()`
            ```(html)
            <img [src]="iconUrl"/>
            <button (click)="onSave()">Save</button>```
        - `<Target>`            
            - Is a DOM Property/Event or Directive Property
                - Remember: All Components Are Directives
            - **More restrictive than <Source>**
            - Property Binding Targets are defined as **@Input** Properties : they receive data.
            - Event Binding Targets are defined as **@Output** Properties: they emit data.
- Declaring @Input & @Output Properties
    - In Component Code:
    ```(typescript)
    @Output('myClick') clicks = new EventEmitter<string>(); //  @Output(alias) propertyName = ...```
    - In Component Decorator:
    ```(typescript)
    @Directive({
        outputs: ['clicks:myClick']  // propertyName:alias
    })```
    - **Aliases are optional**
- Syntax by Binding Type
    - Property / Attribute / Style / Class Bindings
        - `[ <TargetName> ] = "<Template-Expression>"`
        - *canonical form*: `bind-<TargetName> = "<Template-Expression>"` 
    - Interpolation
        - `{{ currentHero.firstName }}`
    - Event Binding
        - `(<TargetEvent>) = "<Template-Statement>"`
        - *canonical form*: `on-<TargetEvent> = "<Template-Statement>"`
    - Two Way Binding
        - `[(<DirectiveName>)]="<ComponentProperty>"`   
- Template Expression vs Template Statements
    - Short Version: Template Statements can change stuf (side-effects), Template Expressions can't
    - Template Expressions: can't assign, new up, chain statements with `;`, increment, etc.
    - Template Statements: like template expressions but you can do assignment and chain statements with `;`
    - Execution context for both: the current component instance.  You cannot reference items in the global namespace.

### Property Binding
- Syntax:
    - `[ <TargetName> ] = "<Template-Expression>"`
    - *canonical form*: `bind-<TargetName> = "<Template-Expression>"`
- TargetName:
    - Element's DOM Property
        ```(html)
        <img [src]="heroImageUrl">
        <img bind-src="heroImageUrl">```
    - Directive Property
        ```(html)
        <div [ngClass]="classes">[ngClass] binding to the classes property</div>```
    - Property of a Sub-Component:
        - If you define a property in a component with the **@Input** attribute, then it's value can be set
        ```(html)
        <hero-detail [hero]="currentHero></hero-detail>"```
- Interpolation
    - Interpolation is property-binding syntactical sugar
        - Is runtime-converted to equivalent property binding syntax
        - **Use either**: interpolation and property binding are functionally equivalent
        ```(html)
        <h1> {{pageTitle}} </h1>
        <h1> {{'Title: ' + pageTitle}} </h1>
        <h1> {{3*2+5}} </h1>
        <h1> {{'Title: ' + getTitle() }} </h1>
        <h1 innerText={{pageTitle}}></h1>``` 
- Omitting the brackets \[ \]
    - The \[ \] tell angular to evaluate the right-side as a Template-Expression instead of a string
    - It's ok to omit the \[ \] if all are true:
        - it's a one-time (i.e. not live) binding
        - target property accepts a string
        - you can hardcode it into the template
        ```(html)
        <hero-detail prefix="You are my" [hero]="currentHero"></hero-detail>```
        
### Attribute Binding
- Purpose
    - For attributes which have no corresponding DOM Properties
    - Examples:
        - ARIA
        - SVG
        - Table spans
- Syntax:
    - `[ attr.<TargetName> ] = "<Template-Expression>"`
- TargetName:
    - Html Attribute
        ```(html)
        <tr><td [attr.colspan]="1 + 1">One-Two</td></tr>```

### Class Binding
- Purpose
    - changes the values associated with the `class` attribute
        - so it's a special kind of attribute binding
- Syntax:
    - `[ class.<TargetName> ] = "<Template-Expression>"`
- TargetName:
    - CSS class
    - example: add or remove one style ('special') based on truthiness
    ```(html)
    <div [class.special]="!isSpecial">This one is not so special</div>```    
- you can also set class styles in bulk with class binding, but the documentation recommends using [NgClass directive](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#ngClass) instead for this scenario.

### Style Binding
- Purpose
    - similar to class binding, but it lets you set inline-styles
- Syntax
    - `[ class.<TargetName> ] = "<Template-Expression>"`
- TargetName
    - CSS Style
    ```(html)
    <button [style.color] = "isSpecial ? 'red': 'green'">Red</button>
    <button [style.background-color]="canSave ? 'cyan': 'grey'" >Save</button>```
- if you want to set several inline styles at the same time, use [NgStyle](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngStyle) directive
- style propery names can be written in dash-case or camelCase.

### Event-Binding
- Purpose
    - View to Data Source (one-way) communication
- Syntax
    - `(<EventName>) = "Template-Statement"`
    - `on-<EventName>="Template-Statement"` (aka *canonical form*) syntax
    ```(html)
    <button (click)="onSave()">Save</button>
    <button on-click="onSave()">On Save</button>```
- Event
    - Typically, a DOM element event
    - But Angular first checks whether that's an event of any known directives
- **$event**
    ```(html)
        <input [value]="currentHero.firstName" (input)="currentHero.firstName=$event.target.value" >```
    - The event binding passes event-related data to an event object named `$event`
    - Structure of `$event` depends on the event
    - If the target event is a DOM element event, `$event` is a DOM event Object
        - `target` property
        - `target.value`
        - See [this](https://developer.mozilla.org/en-US/docs/Web/Events) for more info on DOM events
    - **Custom Events**
        - Components can raise custom events with `EventEmitter`
        - Event Emitter:
            - Specifies the type represented by `$event`
            - Provides an `emit()` method which fires the event (presumably to be consumed by another Angular component)
        - **Example**:
            - Child Component emits a `deleteRequest` custom event (to be consumed by parent component) when a button is clicked
            - HeroDetailComponent template:
            ```(html)
             <button (click)="delete()">Delete</button>```
            - HeroDetailComponent class:
            ```(typescript)
            // This component make a request but it can't actually delete a hero.
            deleteRequest = new EventEmitter<Hero>();

            delete() {
                this.deleteRequest.emit(this.hero);
            }```
            - Parent component declaration
            ```(html)
            <hero-detail (deleteRequest)="deleteHero($event)" [hero]="currentHero"></hero-detail>```
                - Remember that `deleteHero()` is defined on this parent component- the one that includes hero-detail directive in it's template- **NOT** in `heroDetailComponent`.
            
### Two-way Binding
- Purpose / Limitations
    - Typical use-case is with <input> fields (i.e. in forms)     
    - Requires the `ngModel` directive, which requires `FormsModules`.  Be sure to import it.  
- Syntax
    - `[(<DirectiveName>)]="<ComponentProperty>"`
    - It is syntactic sugar, and runtime executed as the following two one-way bindings:
        `[(<DirectiveName>)]="<ComponentProperty>" <=> [<DirectiveName>]="<ComponentProperty>" (<DirectiveName>Change)="<DirectiveName>=$event"`
- DirectiveName
    - The only OOB Directive that supports two-way binding is `ngModel`
    - `ngModel` will only set/watch a DOM element's **value** property
    - If you want `ngModel` to target a custom component's property, you need to write a [ControlValueAccessor](https://angular.io/docs/ts/latest/api/common/index/ControlValueAccessor-interface.html)
 
## Built-In Directives

### NgClass
- alternative to using the class binding, esp when adding or removing **many classes**
- points at a method that returns an object of properties with boolean values
    - property names = class names
    - boolean value = whether to set them or not
- Example Usage:
    ```(html)
    <div [ngClass]="setClasses()">This div is saveable and special</div>
    ```
    - where `setClasses()` is a method defined on the component's class
     ```(javascript)
     setClasses() {
        let classes =  {
            saveable: this.canSave,      // true
            modified: !this.isUnchanged, // false
            special: this.isSpecial,     // true
        };
        return classes;
    }```
    

### NgStyle
- alternative to using the style binding, esp when adding or removing **many styles**
- just like NgClass, but the returned object's properties' values are the styles settings
- Example Method:
    ```(javascript)
    setStyles() {
        let styles = {
            // CSS property names
            'font-style':  this.canSave      ? 'italic' : 'normal',  // italic
            'font-weight': !this.isUnchanged ? 'bold'   : 'normal',  // normal
            'font-size':   this.isSpecial    ? '24px'   : '8px',     // 24px
        };
        return styles;
    }```
    
### NgIf
- different than hide/show on styles technique bc hide/show will keep the component executing
- adds or removes an element to the DOM based on truthiness/falsiness
- `<hero-detail *ngIf="isActive"></hero-detail>`
    - Don't forget the leading ` * `

### NgSwitch
- a switch statement
- at most, one element will be added to the DOM, or the Default will be shown
- Example
    ```(html)
    <span [ngSwitch]="toeChoice">
        <span *ngSwitchCase="'Eenie'">Eenie</span>
        <span *ngSwitchCase="'Meanie'">Meanie</span>
        <span *ngSwitchCase="'Miney'">Miney</span>
        <span *ngSwitchCase="'Moe'">Moe</span>
        <span *ngSwitchDefault>other</span>
    </span>```

### NgFor
- Some Examples
    ```(html)
    Example 1
    <div *ngFor="let hero of heroes">{{hero.fullName}}</div>
    
    Example 2
    <hero-detail *ngFor="let hero of heroes" [hero]="hero"></hero-detail>
    
    Example 3
    <div *ngFor="let hero of heroes; let i=index">{{i + 1}} - {{hero.fullName}}</div>```
- **Performance Caveats**
    - If you replace the collection underlying these DOM elements, Angular will by default refresh each item
    - Most of the times, this isn't necessary and it can slow things down significantly for large tables
    - If you use a **tracking function** in your looping directive, you can tell Angular how to identify each object, to determine if changes are really necessary!
    - Html Code:
        ```(html)
        <div *ngFor="let hero of heroes; trackBy:trackByHeroes">({{hero.id}}) {{hero.fullName}}</div>```
    - Tracking Function
        ```(javascript)
        trackByHeroes(index: number, hero: Hero) { return hero.id; } ```
        
## Forms And Template Reference Variables
- You can create a variable to refer to a DOM element or directive, and then use that variable in any sibling or child element.
    ```(html)
    <!-- phone refers to the input element; pass its `value` to an event handler -->
    <input #phone placeholder="phone number">
    <button (click)="callPhone(phone.value)">Call</button>

    <!-- fax refers to the input element; pass its `value` to an event handler -->
    <input ref-fax placeholder="fax number">
    <button (click)="callFax(fax.value)">Fax</button>```
- This can be very useful with forms.  For instance, here we use the form ref variable to drive validation.
    - note the use of `ngForm` which wraps the HTML DOM form element with extra functionality, such as tracking validity.
    ```(html)
        <form (ngSubmit)="onSubmit(theForm)" #theForm="ngForm">
            <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control" name="name" required [(ngModel)]="currentHero.firstName">
            </div>
            <button type="submit" [disabled]="!theForm.form.valid">Submit</button>
        </form>```

## Pipes
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
        also supported by pipes.  Pipes are separated by colons. -->```
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
        

## Services and Dependency Injection
- Service is a class with a focused purpose
- When you register a class as a service with Angular, Angular will maintain that instance as a singleton and manage injecting it into any components which request it (i.e. a component and any of it's children).
- When to use a service:
    - Any code which is not specific to driving a view
    - Code which you want to share to multiple views
    - Encapsulate external interactions (such as data access)
- The angular Injector will provide the instance to the component as an argument to it's constructor
- Example service:
    ```(typescript)
    import { Injectable } from '@angular2/core'

    @Injectable()
    export class ProductService {
        getProducts() : IProduct[] {
            //...
        }   
    }```
- **Registering the Service**
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
- **Injecting the Service**
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


## Reactive Extensions and Observables
- Observables are a Proposed feature for ES2016
- Observables are Pub/Sub
- Method **subscribes** to Observable
    - Observable **publishes** async events if...
        - data changes/arrives
        - no more data
        - error occurs
- Promise vs Observable
    - Promise: 1 async value, Observable: multiple async values over time
    - Promise: not cancellable, Observable: cancellable
    - Observable: supports `map()`, `filter()`, `reduce()`
- Observables are used within Angular (Http and Event system), via 'Reactive Extensions' library (nothing to do with React)
    - You can, however, use Promises with Http, but by default it uses Observables
- **Reactive Extention Methods**
    - TODO: Get more info [here](https://github.com/Reactive-Extensions/RxJS)

## Using Http Modules
- Recommended Usage:
    - Encapsulate Http functionality in a service
    - Expose Observable for use by any class/component that needs it
- **Alternately**, you could inject the jQuery ajax library into a service.
    - TODO- find examples of this
- Set up:
    - include Http script tag: `<script src='node_modules/angular2/bundles/http.dev.js'></script>`
    - script tag for rxjs should already be in your index.html
    - register the Http services in the root component, using the constant `HTTP_PROVIDERS`:
    ```(typescript)
        import { HTTP_PROVIDERS } from 'angular2/http';
        //...
        @Component({
            //...
            providers: [ HTTP_PROVIDERS ]
        })
        export class AppComponent {
            //...
        }```
    - load the various reactive extension features you want using:
    ```import 'rxjs/Rx';```
        - this is a different syntax.
        - loads the library, but imports nothing
        - during loading, the javascript is executed, and during loading, it makes the various features/operators we want to use available.
- Example Http Data Service:
    - AKA Observable Publishing
    ```(typescript)
    import { Http, Response } from 'angular2/http';
    import { Observable } from 'rxjs/Observable';
    
    @Injectable
    export class ProductService {
        private _productURL = "blahblah.com/api/getThing";
        
        //inject Http into _http property
        constructor(private _http : Http) { }
        
        //method returns an Observable, which wraps an array of IProduct
        getProducts(): Observable<IProduct[]> {
            //get() returns an observable (wrapping a Response object), 
            //and then we call it's map() method whose execution  
            //is deferred until data is available.  Map will transform
            //Response's json (deserialized by json) into an array of 
            //IProducts.  The do() method will serialize the response 
            //and drop it to the console.  catch() will call an associated
            //error handling method.
            return this._http.get(this._productUrl)
                        .map((response: Response) => <IProduct[]>response.json());
                        .do(data => console.log('ALL: ' + JSON.stringify(data))
                        .catch(this.handleError);
        }
        
        private handleError(error: Response) {
            //display error and rethrow to the calling code
            console.log(error);
            return Observable.throw(error.json().error || 'Server Error');
        }
    }```
        - TODO: look into Observable.throw() and how that works
- Example: Consuming the Data Service
    - AKA **Subscribing to the Observable**
    ```(typescript)
    //... code in component
    ngOnInit() : void {
        this.productService.getProducts().
            subscribe(
                products => this.products = products,
                error => this.errorMessage = <any>error);
    }```

## Navigation and Routing
- Nutshell
    - Each component has an associated
        - Route
        - Actions
        - Options
    - You activate the Route based on user Actions, and this opens the associated View/Component
- Router library is an external module
- Set up
    - Include Angular2 Router Script
    `<script src='node_modules/angular2/bundles/router.dev.js'></script>`
    - Define the Base Element (within HTML Head tag)
        - I think this is an HTML5 thingy 
    `<base ref='/'>`
    - Register ROUTER_PROVIDERS in the root component
    ```(typescript)
    import { ROUTER_PROVIDERS } from '@angular2/router';
    
    @Component({
        //...
        providers: [    //..., 
                        ROUTER_PROVIDERS ]
    })
    export class AppComponent {
        //...
    }```
- Routing is Component-Centric
    - Each route has 3 parts
        1. Name
        2. Path (e.g. '/products')
        3. Component (e.g. ProductComponent)
- @Routes Decorator (current name, @RouteConfig, is deprecated)
    - Apply this to any component that wants to manage routes
        - Call this component the **Host Component**
        - In this example, it is the root component
    - Example (Host Component = root component):
    ```(typescript)
    import { ROUTER_PROVIDERS, Routes } from 'angular2/router';
    import { WelcomeComponent } from 'welcome.component';
    import { ProductListComponent } from 'product-list.component';
    
    //@Routes takes an array as argument
    //name MUST BE IN PascalCase
    @Routes([
        { path: '/welcome', name: 'Welcome', component: WelcomeComponent, useAsDefault: true }
        { path: '/products', name: 'Products', component: ProductListComponent } 
    ])```
- When a route is activated, the path is appended to the URL of the application
    - Bookmarkable
- Ways a user can activate a route:
    1. Clicks something which points at the given route
    2. Types in the url (or uses bookmark)
    3. Back / Fowards button
- The @Routes configuration handles cases 2 and 3
- We handle case 1 tying Actions to Routes
    - Example in the Host Component (Root component) code
    ```(typescript)
    import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from 'angular2/router';
    
    @Component({
        selector: 'pm-app',
        template: `
            <ul class='nav navbar-bav'>
                <li><a [routerLink]="['Welcome']">Home</a></li>
                <li><a [routerLink]="['Products']">Product List</a></li>
            </ul>
            <router-outlet></router-outlet>
        `,
        directives: [ ROUTER_DIRECTIVES ],
        providers: [ ROUTER_PROVIDERS ]
    })
    @Routes([
        // ... as before ...
    ])
    export class AppComponent {
        // ...   
    }```
        - Notice the Property binding syntax uses an array as the source `"['Welcome']"` 
            - other values in this array will correspond to parameters to be passed to the router (see below)
        - Also notice the `routerLink` directive is using the route's **Name Property**
        - `<router-outlet>` in the template tells angular where to insert the view html
- Passing Parameters to Routes
    - **Step 1**: Update the `path` property in the `Routes` array to include a parameter / placeholder
        ```(typescript)
        { path: 'product/:id', name: ProductDetail, component: ProductDetailComponent }```
        - You can add as many parameters as you want by adding new path segments prefixed with the *:*
    - **Step 2**: Update the `routerLink` attribute to include parameter info
        ```(html)
        <a [routerLink]="['ProductDetail', { id: product.productId }]"> {{ product.productName }} </a>```
    - **Step 3**: Set up the newly routed component to have the route params injected into it
        ```(typescript)
        import { RouteParams } from 'angular2/router';
        
        constructor(private _routeParams: RouteParams) {
            console.log(this._routeParams.get('id'));
        }```
- Activating a route with code
    - Import the `Router` component and use it's method `navigate()`, much as you would use the `routerLink` directive.
    ```(typescript)
    import { Router } from 'angular2/router';
    
    @Component({
        //...
    })
    export class SomeComponent {
        constructor(private _router : Router) { }
        
        onBack(): void {
            this._router.navigate(['Products']);
        }
    }```



