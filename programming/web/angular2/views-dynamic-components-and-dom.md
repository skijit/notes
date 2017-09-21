DOM, Component Composition, and More...
=======================

- These are notes on odds and ends in angular which will (maybe?) be useful for creating a bunch of typeahead control variants
- High Level architecture of the various typeahead variants:
  - An input field
  - A dynamically loaded list of suggestions to display below hand
  - All the associated interactions and state
- Some good general sources/sites:
  - The [rangle.io book is really good](https://angular-2-training-book.rangle.io/)
  - [netBasal](https://netbasal.com/)
  - [angular-in-depth](https://blog.angularindepth.com)
  - [todd-motto](https://toddmotto.com/)
- Topics discussed here include:
  - Attribute Directives
  - Component Projection
  - `@ViewChild`, `@ViewChildren`, `@ContentChild`, `@ContentChildren`
  - API classes `ElementRef`, `TemplateRef`, `ViewContainerRef`, `ViewRef`
  - Embedded Views and Host Views
  - elements/directives `<template>`, `<ng-template>`, `<ng-container>`, `<ng-content>`
  - Creating components dynamically
  - Accessing the DOM
  - Rendering rules 

## Attribute Directives
- [source](https://angular.io/guide/attribute-directives)
- attribute directives change the appearance or behavior of an element or component (these are referred to as host elements)
  - components are directives with templates
  - technically, components extend directives
- Simple Example

```(html)
<p [myHighlight]="color">Highlight me!</p>
```

```(typescript)
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective {

  //Since we used the directive decorator, we get a 
  //reference to (a wrapper of) the corresponding DOM element injected
  //provided we add the ElementRef type to the constructor.
  constructor(private el: ElementRef) { }

  //From the HTML, we use the same input property as directive
  //name (myHightligh), but internally we alias this property
  //as the more aptly named 'highlightColor' property.
  @Input('myHighlight') highlightColor: string;

  //The @HostListener decorator lets you subscribe to events 
  //of the DOM element that hosts an attribute directive
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

## Projection
- [source](https://angular-2-training-book.rangle.io/handout/components/projection.html)
- Projection is a more flexible way of injecting content into child components.
- The parent component template will include different blocks of html **inside** a nested component element.  
- Then the nested component can refer to / access that content using css-style selectors inside an `<ng-content>` component.
- Component with projections

  ```(typescript)
    @Component({
      selector: 'rio-child-select',
      template: `
        <div style="...">
          <h4>Child Component with Select</h4>
          <div style="...">
            <ng-content select="header"></ng-content>
          </div>
          <div style="...">
            <ng-content select="section"></ng-content>
          </div>
          <div style="...">
            <ng-content select=".class-select"></ng-content>
          </div>
          <div style="...">
            <ng-content select="footer"></ng-content>
          </div>
        </div>
      `
    })
    export class ChildComponent {}
  ```

- Template Usage

  ```(html)
  <rio-child-select>
    <section>Section Content</section>
    <div class="class-select">
      div with .class-select
    </div>
    <footer>Footer Content</footer>
    <header>Header Content</header>
  </rio-child-select>
  ```

## @ViewChild

- `@ViewChild` decorator gives your current component *access* to nested component or dom element.
  - *Access* = one of a variety of types, each of which wraps the specified element/component, and provides different functionality
  - For example...
    - If it returns a `ViewContainerRef`, then you can use this object as a host for injecting dynamic content
    - If it returns an `ElementRef`, then you get a wrapper to the DOM object, which allows you to read the content and do other functionalities
    - For the various types, see the [API Mental model](#api-mental-model) section.
  - So this represents another way of creating interactions between parent/child components other than just the standard property bindings (input to child) and events (output from child)
- `ViewChild()` Usage:
  - `ViewChild()` takes 2 parameters.
    1. The first parameter is either:
      1. A type: The nested component or directive class.  Angular will find the corresponding component/directive inside your template behind the scenes.
      2. String: If you use a template reference variable (e.g. `<input #like-this type='text'>`) in your template, you can identify the component/element with this.
    2. The second parameter indicates what API wrapper type you want returned for the element inside your template
- Case 1: Get by Type

```(typescript)
@Component({
    selector: 'app-root',
    template: `
    <app-alert>My alert</app-alert>
      <button (click)="showAlert()">Show Alert</button>`
})
export class AppComponent {
  @ViewChild(AlertComponent) alert: AlertComponent;

  showAlert() {
    this.alert.show();
  }
}
```

- Case 2: Get by Template Reference variable

```(typescript)
@Component({
  selector: 'app-root',
  template: `
  <app-alert #first ok="Next" (close)="showAlert(2)">
    Step 1: Learn angular
  </app-alert>
  <app-alert ok="Next" (close)="showAlert(3)">
    Step 2: Love angular
  </app-alert>
  <app-alert ok="Close">
    Step 3: Build app
  </app-alert>
    <button (click)="showAlert(1)">Show steps</button>`
})
export class AppComponent {
  @ViewChild('first') alert: AlertComponent;
  @ViewChildren(AlertComponent) alerts: QueryList<AlertComponent>;
  // ...
}
```

  - This also gives a sneak preview of`@ViewChildren`

- Case 3: Specifying the wrapper type with the second parameter
  - You could use the same example above, but the `@ViewChild()` call would look like this...

```(typescript)
@ViewChild('first', { read: ViewContainerRef })) vcAlert: ViewContainerRef;
```

  - Relevant SO questions: [here](https://stackoverflow.com/questions/37450805/what-is-the-read-parameter-in-viewchild-for) and [here](https://stackoverflow.com/questions/32693061/angular-2-typescript-get-hold-of-an-element-in-the-template/35209681#35209681) 
    - the 'read' parameter to `@ViewChild` specifies the type that should be returned by @ViewChild.
    - if you don't provide the `read` parameter, `@ViewChild()` returns...
      - `ElementRef` instance if there is no component applied, or the
      - component instance if there is.
      
- Lifecyle / Availability
  - `@ViewChild` and `@ViewChildren` are only set after `ngAfterViewInit()` is called
  
## @ViewChildren
- [good src](https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e)
- Essentially...
  - like `@ViewChild()`, but when you want to return a collection of elements
  - Returns a `QueryList<T>`, which is an observable collection
- QueryList...
  - is a collection which implements an iterable interface (and can be used with an ngFor)
  - properties include:
    - `first`
    - `last`
    - `length`
  - methods include:
    - `map()`
    - `filter()`
    - `find()`
    - `reduce()`
    - `forEach()`
    - `some()`
    - `toArray()` - this would be useful since typescript doesn't handle iterators when targeting ES5
    - `changes()` - you can subscribe to changes to the QueryList, which is updated any time a child element is added, removed, or moved
  
  ```(typescript)
  @ViewChildren(AlertComponent, { read: ElementRef }) alerts: QueryList<AlertComponent>
  ```

## @ContentChild and @ContentChildren

- `@ContentChild()` and `@ContentChildren()` are analogous to `@ViewChild()` and `@ViewChildren()` except they get content projected from the parent element rather than nested elements/components.
- `@ViewChildren` vs `@ContentChildren`
  - `@ViewChildren` won't include elements that exist within an `ng-content` tag
  - `@ContentChildren` **only** includes elements that exist within `ng-content`
- Lifecyle / Availability
  - only available after `ngAfterContentInit()` is called  

- Example of `@ContentChildren()`

```(typescript)
@Component({
  selector: 'tab',
  template: `
    <p>{{title}}</p>
  `,
})
export class TabComponent {
  @Input() title;
}

@Component({
  selector: 'tabs',
  template: `
    <ng-content></ng-content>
  `,
})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>

  ngAfterContentInit() {
    this.tabs.forEach(tabInstance => console.log(tabInstance))
  }
}

@Component({
  selector: 'my-app',
  template: `
    <tabs>
    <tab title="One"></tab>
    <tab title="Two"></tab>
    </tabs>
  `,
})
export class App {}
```

## API Mental Model
- [src](https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02)
- Angular2+ is intended to run on multiple platforms (e.g. browser, mobile platform, web worker, etc.), so there's various APIs which abstract away from the DOM.
- To access these APIs inside a component/directive, you use the `@ViewChild` or `@ViewChildren` decorators
  - Base classes returned by `@ViewChild` include 
    - `ElementRef`
    - `TemplateRef`
    - `ViewContainerRef`

### ElementRef
- Wraps a DOM element
- This is the lowest level api
- Use is generally discouraged for reasons of tight-coupling to browser and security reasons (XSS)
  - **TODO**: example...
- Can be injected directly into a component to get the host element, or used via `@ViewChild`
  - Doesn't work on components **TODO- verify**    

### TemplateRef
- Example of the HTML5 Template Tag in action (this is part of the Web Component spec)

```(html)
<script>
    let tpl = document.querySelector('#tpl');
    let container = document.querySelector('.insert-after-me');
    insertAfter(container, tpl.content);
</script>
<div class="insert-after-me"></div>
<template id="tpl">
    <span>I am span in template</span>
</template>
```

- Angular has a similar, but different way of handling templates, which also use the `<template>` tag
  - Example

  ```(typescript)
  @Component({
      selector: 'sample',
      template: `
          <template #tpl>
              <span>I am span in template</span>
          </template>
      `
  })
  export class SampleComponent implements AfterViewInit {
      @ViewChild("tpl") tpl: TemplateRef<any>;

      ngAfterViewInit() {
          let elementRef = this.tpl.elementRef;
          // outputs `template bindings={}`
          console.log(elementRef.nativeElement.textContent);
      }
  }
  ```
  
- We use `@ViewChild` to get a reference to a `TemplateRef` which wraps the template
- `TemplateRef` has 2 interesting properties:
  - a reference to it's host element (e.g. `<sample>`)
  - a method, `createEmbeddedView()` which returns a `ViewRef` (the uses for which will be discussed)
- One difference between how Angular and normal HTML handle the `<template>` tag is that Angular will actually remove it from the rendered output.
  - The rendered output for this is:

  ```(html)
  <sample>
    <!--template bindings={}-->
  </sample>
  ```

- Also, notice we're using the `<template>` tag instead of `<ng-template>`.  What's the difference?
  - [here's](https://toddmotto.com/angular-ngfor-template-element) a good read about `<ng-template>`
  - tl/dr; `<ng-template>` is used for driving structural directives (e.g. `*ngFor`, `*ngIf`, etc.)
    - The `*` prefix just indicates syntactic sugar: these directives are actually implemented with `<ng-template>` directive.

  - What are the use-cases for `<template>`?  
    - **They are blue prints for views**  (*views are important, see below*)

### ViewRef
- Represents an angular view
- **Views** are the fundamental building block of the UI
- Once you have a `View`, you can attach it to the DOM using a `ViewContainerRef`
- There are 2 types of views:
  1. **Embedded Views** are views generated using a `<template>'
    - Example:
    
    ```(typescript)
    ngAfterViewInit() {
      let view = this.tpl.createEmbeddedView(null);
    }
    ```

  2. **Host Views** are views which involve Dynamically Created Components
    - For example see section below on [Dynamically Creating Components](#dynamically-creating-components)
  
### ViewContainerRef
- [src](https://netbasal.com/angular-2-understanding-viewcontainerref-acc183f3b682)
- `ViewContainerRef` wraps a DOM element (container), typically for the purposes of adding components programmatically.
  - Any DOM element can be a `ViewContainer` (custom elements or normal elements)
  - **Surprisingly**, when used in this way, angular will put your injected content/components as a sibling of the 'container'
    - this is similar to how `<router-outlet>` works
    - This means that if you want to inject some views into the DOM, you have to create an extra DOM element to be their 'container' (or sibling-anchor?)
    - **UNLESS...**, you make the `ViewContainer` point to an `<ng-container>`, as this is simply rendered as a comment. 
- `ViewContainerRef` can host:
  - embedded views (in which case use `createEmbeddedView()` method)
  - host views (in which case, use `createComponent()` method)
- Methods associated with `ViewContainerRef`
  - clear() : void
  - insert(viewRef: ViewRef, index?: number) : ViewRef
  - get(index: number) : ViewRef
  - indexOf(viewRef: ViewRef) : number
  - detach(index?: number) : ViewRef
  - move(viewRef: ViewRef, currentIndex: number) : ViewRef

- Example 1: ViewContainerRef of a component:

```(typescript)
  @Component({
    selector: 'vcr',
    template: `
      <template #tpl>
        <h1>ViewContainerRef</h1>
      </template>
    `,
  })
  export class VcrComponent {
    @ViewChild('tpl') tpl;
    constructor(private _vcr: ViewContainerRef) {
    }
    
    ngAfterViewInit() {
      this._vcr.createEmbeddedView(this.tpl);
    }
  }

  @Component({
    selector: 'my-app',
    template: `
        <vcr></vcr>
    `,
  })
  export class App { }
```

  - the injected ViewContainerRef service corresponds to the host element (<vcr>)
  - the rendered html will place the template as a sibling (appended to) the host element

- Example 2: ViewContainerRef of a ViewChild

```(typescript)
  @Component({
    selector: 'vcr',
    template: `
      <template #tpl>
        <h1>ViewContainerRef</h1>
      </template>
      <div>Some element</div>
      <div #container></div>  
    `,
  })
  export class VcrComponent {
    @ViewChild('container', { read: ViewContainerRef }) _vcr;
    @ViewChild('tpl') tpl;

    ngAfterViewInit() {
      this._vcr.createEmbeddedView(this.tpl);
    }
  }

  @Component({
    selector: 'my-app',
    template: `
      <div>
        <vcr></vcr>
      </div>
    `,
  })
  export class App {}
```

  - The ultimate output will be something like this.

  ```(html)
  <my-app>
    <div>
      <vcr>
        <!--template bindings={}-->
        <div>Some element</div>
        <div></div>
        <h1>ViewContainerRef</h1>
      </vcr>
    </div>
  </my-app>
  ```

- Example 3: Using with `<ng-container>`
  
```(typescript)
@Component({
  selector: 'sample',
  template: `
      <span>I am first span</span>
      <ng-container #vc></ng-container>
      <span>I am last span</span>
      <template #tpl>
          <span>I am span in template</span>
      </template>
  `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
    @ViewChild("tpl") tpl: TemplateRef<any>;

    ngAfterViewInit() {
        let view = this.tpl.createEmbeddedView(null);
        this.vc.insert(view);
    }
}
```

- The resulting html will look like this...

```(html)
<sample>
  <span>I am first span</span>
  <!--template bindings={}-->
  <span>I am span in template</span>

  <span>I am last span</span>
  <!--template bindings={}-->
</sample>
```

- Another use-case is getting a `ViewContainerRef` to an attribute directive (rather than a component)
  - in other words, it refers to the host element of the attribute directive

## Creating Components Dynamically
- this is a big topic, these notes only scratch the surface...
- `ViewContainer` also has the following convenience methods to inject components dynamically...
  - createComponent(componentFactory...): ComponentRef<C>  
    - create a host view from the specified component and insert at the specified location
  - createEmbeddedView(templateRef...): EmbeddedViewRef<C>
    - create an embedded view from the specified template and insert at the specified location
- `ngTemplateOutlet` lets you do everything we've already seen (for creating an embedded view) declaratively

```(typescript)
@Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container [ngTemplateOutlet]="tpl"></ng-container>
        <span>I am last span</span>
        <template #tpl>
            <span>I am span in template</span>
        </template>
    `
})
export class SampleComponent {}
```

- `ngComponentOutlet` works similarly, but for host views...

```(html)
<ng-container *ngComponentOutlet="ColorComponent"></ng-container>
```

- here's a more comprehensive approach to creating components dynamically [src](http://blog.rangle.io/dynamically-creating-components-with-angular-2/)

```(typescript)
/* ------------------ app.component.ts ------------------ */
@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Lets dynamically create some components!</h2>
      <button (click)="createHelloWorldComponent()">Create Hello World</button>
      <button (click)="createWorldHelloComponent()">Create World Hello</button>
    </div>
    <dynamic-component [componentData]="componentData"></dynamic-component>
  `,
})
export class App {  
  componentData = null;

  createHelloWorldComponent(){
    this.componentData = {
      component: HelloWorldComponent,
      inputs: {
        showNum: 9
      }
    };
  }

  createWorldHelloComponent(){
    this.componentData = {
      component: WorldHelloComponent,
      inputs: {
        showNum: 2
      }
    };
  }
}

/* ------------------ dynamic.component.ts ------------------ */

import {Component, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';  
import HelloWorldComponent from './hello-world-component';  
import WorldHelloComponent from './world-hello-component';

@Component({
  selector: 'dynamic-component',
  entryComponents: [HelloWorldComponent, WorldHelloComponent], // Reference to the components must be here in order to dynamically create them
  template: `
    <div #dynamicComponentContainer></div>
    <!-- this might be nicer as an ng-container -->
  `,
})
export default class DynamicComponent {  
  currentComponent = null;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) { }

  s implement an Input setter that takes a component class and an object with key/value pairs mapping to what we want access in the created component.

  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
  @Input() set componentData(data: {component: any, inputs: any }) {
    if (!data) {
      return;
    }

    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map((inputName) => {return {provide: inputName, useValue: data.inputs[inputName]};});
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

    // We create a factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(data.component);

    // We create the component using the factory and the injector
    let component = factory.create(injector);

    // We insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);

    // Destroy the previously created component
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }

}
```

## Misc
- Services vs Providers vs ViewProviders
  - This is just a DI / Scope question.  Here's a [good source](https://blog.thoughtram.io/angular/2015/08/20/host-and-visibility-in-angular-2-dependency-injection.html)
  - When your component/directive refers to some type via a parameter constructor, the framework will look for some matching provider which will return an instance of said type.
  - The `providers` metadata property will expose the service instance(s) to the current and child components
  - Conversely, any instances provided by `viewProviders` will be exclusively available to the current component.
  - If neither metadata property is specified or a given type is not returned by them, then the framework's DI facility will proceed up the component tree looking for the injectors associated with each.
- use the `directives` property in the component decorator when you're referencing a nested directive
- setters on @Input properties are a nicer way of dealing with changes than the `ngOnChanges()` method
