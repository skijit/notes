New Features Notes For Angular Releases
==============

## Angular 6 (May 2018)

- CLI, Angular Material and other framework packages have unified major versions.
- `ng update` - a CLI command to help you upgrade your app and components (including all the usual angular dependencies like rxjs, typescript, etc.)
- `ng add` – a CLI command, which looks like `ng generate` but for higher-level components which may install additional dependencies
    - `ng add @clr/angular@next` — Install and setup Clarity from VMWare
    - Clarity is kind of like Angular-Material, but without the Material Design. 
    - On one hand, we already have an investment in MD via Cobalt, but I’m pretty ambivalent about MD.  I’ll be checking this out.
- Angular Elements:  you can wrap your angular components as a custom element which is part of Web Components
    - The big win seems to be simplifying adding dynamic content bc as soon as you add a custom element to the DOM, it bootstraps itself.
    - Also, it seems like a (perhaps) useful abstraction layer to simplify non-angular stuff integrating with angular.
    - Probably worth looking at this more, if for no other reason than to become more familiar with Web Components – because with native browser support for observing objects and web components, it seems like a big part of the angular framework might be unnecessary in the future.
- There’s some new templates for `ng generate` which create angular-material components like a dashboard, sidenav, data-table
- Library Support: This is a way to build a reusable library which is imported like an ES6 module (e.g. import {blah} from ‘my-lib’;) but doesn’t need to be connected to npm or live inside node_modules/ .  I don’t think this is going to be useful for code which has direct couplings to angular since it operates outside the angular module system.  There’s probably a good use-case I haven’t thought of.
- Tree Shakable Providers: Before we used to use ModuleWithProviders to associate services with our modules.  It was just more ugly angular boilerplate, but it worked.  Now the connection seems a little simpler: your module definition will not include the service (thus no ModuleWithProviders), but your service’s @Injectable() decorator will refer to whatever modules it wants to be injected into.  Apparently, this makes one’s bundle sizes smaller.
- Using RxJs v6.  I appreciate RxJs is a powerful API.  I use it all the time, and sometimes I understand it.  =(


