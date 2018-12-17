Angular Architecture Workshop
============================

- from Dec 3, 2018
- [google slides](https://codewithdan.me/ng-architecture-workshop)
- [github link](https://github.com/DanWahlin/angular-architecture)
- [labs](https://codewithdan.me/ng-architecture-labs)

## Outline
- Planning
- Features and Modules
- Shared Libraries
- Component Structure
- Component Communication
- State Mgmt

## Dev Tools
- Angular CLI
- VS Code
- Extensions
- Chrome Dev Tools

## Architecture Planning
- Checklist
  1. App Overview
    - Goals
  2. (Key) Features
    - will relate to modules
  3. Domain Security
    - are you using tokens, AD, when you call to your API?
  4. Domain Rules
    - where is your business logic?  
      - client or server?
    - where is validation?
      - at least on server
  5. Logging
    - console.log and even local storage is insufficient in his opinion
  6. Services / Communication
    - e.g. web sockets (for real-time server-pushing) vs http
  7. Data Models
    - you should know this at least for your current sprint, though maybe not everything
    - so you can avoid sending enormous graphs of data
  8. Feature Components
    - HOw the features break down into components
  9. Shared Functionality
    - Using shared libraries
    - e.g. publishing to internal or external npm
- Shoot for no more than 1-2 slide(s) per topic

## Features and Modules
- keep folders flat
  - less navigation
  - he doesn't have a features parent folder (I think I prefer this)
  - [angular style guide](https://angular.iio/guide/styleguide#flat)
  - if you have 4 files per component, then generally give them their own folder
  - if you really small components, it's nice to have them in the same file
    - html
    - scss
    - comp
    - maybe a spec file?
- one module should generally not have it's own component
- group into modules based on: 
  - related func
  - routing
  - lazy loading
    - if it's lazy loaded, you can add that to the module and it's quite easy
- (unofficial) types of feature modules
  - domain
    - encapsulates a feature / functional group
    - e.g. AppModule
  - routed
    - you can route to
    - modules can be routed AND domain
  - service
    - hold on to utilities or services
    - exception handling, logging, error handling
    - these should be portable from one app to another in your organization
    - import these once in the App Root module (**important**)
    - lots of services, probably no components
    - not lazy loaded
    - typically called *CoreModule*
    - also for things that you only want one of
    - presenter has code that throws an error when a module is used more than once
  - widget
    - controls
    - reusable
    - can also be reused across the app
    - can be imported into every (feature) module that uses them
      - like in Angular Material
- he advocates creating a module just for the ng material components (export them)
  - then just import that module wherever you need it

## Shared Libraries
- you can create libraries that are used:
  - within a project
  - across other projects (requires npm - and you'll specify the version number)
- generating your own library
  - [reference](github.com/angular/angular-cli/wiki/stories-create-library)
  - inside your angular project...
  - `ng generate library my-lib`
    - creates a workspace, which is analogous to a *solution*
      - one *project* for library
      - one *project* for test-consumer of library
    - cli will update your tsconfig to look for your lib ref
      - I think this only applies to the test-consumer project
    - `ng build my-lib` - note that you specify the name of the workspace (*project*) when you build it.
      - or `ng build my-lib prod`
    - `cd dist/my-lib`
    - `npm publish ...`
- **GOTCHA**: when you import the shared module in your app, make sure there's no path specified.
  - the tsconfig lib has been updated and it should work cleanly
- **ANOTHER GOTCHA**: the file *public_api.ts* determines what is exported, so when you add new files to the library, be sure to update this file.

### Local NPM Repos
- Shared Angular Libraries require npm - when you publish across projects
  - see [here](https://medium.com/engenharia-noalvo/ways-to-have-your-private-npm-registry-and-a-final-diy-solution-eed001a88e74)
  - https://help.sonatype.com/repomanager3
    - there appears to be a free and a paid-for version
    - it can be used as our docker repository as well
  - other local npm servers: nexus, artifactory, progit, tfs, sinopia
- remember semantic versioning syntax:
  - `~`: update patch-level
  - `^`: update minor-level

## Structuring Components
- Container / Presentation Pattern
  - Presentation Component(s): for the UI
    - how do peer presentation components communicate?
      - it's mediated by container component
  - Container Component
    - responsible for state   
- State Communication
  - Container to Presentation: Input properties
  - Presentation to Container: Output properties
  - Presentation Containers CD should be OnPush
  - 3 things that trigger OnPush CD:
    1. Input
    2. Output
    3. DOM Event
    - remember to use immutables
- Immutability
  - useful node cloning library: clone
  - immutable.js library

## Component Communication
- Options
  - Event Bus
    - Mediator pattern
  - Observable Service
    - Subect/BehaviorSubject/ReplaySubject
  - Both of these really apply to rxjs
- Event Bus
  - mediator pattern

  - Service

  ```(typescript)
  @Injectable()
  export class EventBusService {
      private subject = new Subject<any>();

      on(event: Events, action: any): Subscription {
          return this.subject
                .pipe(
                      filter((e: EmitEvent) => {
                        return e.name === event;
                      }),
                      map((event: EmitEvent) => {
                        return event.value;
                      })
                    )
                    .subscribe(action);
      }

      emit(event: EmitEvent) {
          this.subject.next(event);
      }
  }
  ```

  - Publishing

  ```(typescript)
  export class CustomersListComponent implements OnInit {

    constructor(private eventbus: EventBusService) { }

    selectCustomer(cust: ICustomer) {
      this.eventbus.emit(new EmitEvent(Events.CustomerSelected, cust));
    }

  }
  ```

  - Subscribing

  ```(typescript)
  export class AppComponent implements OnInit, OnDestroy { 
    eventbusSub: Subscription;
    customer: ICustomer;
    
    constructor(private eventbus: EventBusService) { }

    ngOnInit() {
      //Use event bus to provide loosely coupled communication (mediator pattern)
      this.eventbusSub = this.eventbus.on(Events.CustomerSelected, (cust => this.customer = cust));
    }

    ngOnDestroy() {
      this.eventbusSub.unsubscribe();
    }
  }
  ```

  - these types may be local
  - Downsides
    - You don't know who is triggering (unless you put that in the triggering event)
      - can lead to maintenance issues
    - remember to unsubscribe
- Observable Service
  - observer pattern
    - more direct
  - It's a bit less loosely coupled, but perhaps simpler in the relationship between publisher / subscriber
  - Use an appropriate RxJs Subject type (see notes below)

  - Publisher

  ```(typescript)
  @Injectable()
  export class DataService {
    customers: ICustomer[];
    private customersSubject$ = new Subject<ICustomer[]>();
    customersChanged$ = this.customersSubject$.asObservable();

    addCustomer() : Observable<ICustomer[]> {
      ...
      // Send customers data to any observers
      this.customersSubject$.next(this.customers);
      return of(this.customers);  //TOM: I don't think I like this part
    }
  }
  ```

  - Subscriber

  ```(typescript)
  export class AppComponent implements OnInit { 
    customers: ICustomer[];
    customersChangedSub: Subscription;
    
    constructor(private dataService: DataService) { }

    ngOnInit() {
      //Example of using BehaviorSubject to be notified when a service changes
      this.customersChangedSub = this.dataService.customersChanged$
        .subscribe(custs => this.customers = custs);
    }

    ngOnDestroy() {
      this.dataServiceSub.unsubscribe();
    }
    
  }
  ```

- **Always remember to unsubscribe the component is destroyed**
  - or see the AutoUnsubscribe() decorator (in slides) or the sub sink package (also in the presentation)

    
### RxJs Aside
- Excellent RxJS examples: [learnrxjs.io git book ](http://www.learnrxjs.io)
- [Instance Methods Decision Tree](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/which-instance.md)
  - check out the stackblitz links in the end
- RxJS Subject Objects
    - there are several observable objects referred to as subjects:
      - **Subject**: Send data only to subscribed observers... you don't get old stuff
      - **BehaviorSubject**: send last data value to observers as they subscribe
      - **ReplaySubject**: *All* previously sent data is stn to new observers
      - **AsyncSubject**: Emitlast value to observers when the sequence is completed
        - You only get the last once the sequence is cancelled

## State Management
- Options
  - Service
    - easiest option
    - always start with this
    - provide notifications with Observables
  - Ngrx
    - complicated
  - Ngxs
  - Observable Store
    - the presenter wrote this
  - Akita
- Shared State
  - Entities
  - Session State
    - user info, prefs, pp settings, ux state, router config
- Local State
  - State that is private to your component
  - NOT SHARED STATE
- Progression of Complexity (when you start looking at other stuff)
  - You have lots and lots of services which need to be shared (tangled web)
- [ngrx library](https://github.com/johnpapa/angular-ngrx-data) that eliminates all the boilerplate
  - implements a generic repository on your entities


## Questions
- what is ng-prime?
  - has widgets - LOTS - but they're fugly
- using services for business logic
- good solution for strongly typing models returned from http client?
  - a cool solution would also include cloning behaviors (for immutability)
  - what about using a base class
    - or a base generic class?
  - https://stackoverflow.com/questions/29758765/json-to-typescript-class-instance
- arch-idea: maybe have a new service for each component but inject a shared state service singleton into it (at the root level)?


