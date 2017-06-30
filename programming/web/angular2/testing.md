Testing With Angular 
===================
- be familiar with jasmine before starting - see [my notes](/programming/web/javascript/jasmine)
- [angular testing utilities](https://angular.io/guide/testing)

## Intro
- Tools include:
    - **Jasmine**
        - test framework
        - Test = 'spec'.  Extension *.spec.ts
    - **Angular testing utilities** (ATU)
        - framework to support testing angular-based functionality (generally components)
        - lets you verify a component's visual representation, which is typically not possibly with isolated unit tests
        - In code many of the angular testing utilities are accessible via `TestBed` class
    - **karma**
        - test runner
    - **protractor**
        - end to end (e2e) tests

- Isolated Unit tests
    - **Use for pipes and services**
    - test without any dependence on angular or injected values
        - test code will new up the class and inject mocked objects for any other constructor parameters    
- Put specs in the same folder as the component they test
- Although the names are somewhat different, the AAA pattern (Arrange, Act, Assert) still applies


## First ATU Example

- Here's an example which tests an angular component, BannerComponent, which has an inline template

```(typescript)
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { BannerComponent } from './banner-inline.component';

describe('BannerComponent (inline template)', () => {

  let comp:    BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ], // declare the test component
    });

    //you can configure the test module in various ways but you need
    //to be sure you're done configuring before calling 
    //TestBed.createComponent()!

    //fixture is a handle on the test environment surrounding the created component
    fixture = TestBed.createComponent(BannerComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    //DebugElement is a handle to the component's DOM element,
    //But DebugElement also has other functionality including
    //how you get injected services... so keep that in mind.
    //query takes a predicate (lambda which returns a bool)
    //the By class has lots of static method predicates
    //queryAll() also exists
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display original title', () => {
    fixture.detectChanges();  //you have to manually trigger CD
    expect(el.textContent).toContain(comp.title);
  });

  it('should display a different test title', () => {
    comp.title = 'Test Title';
    fixture.detectChanges(); //you have to manually trigger CD
    expect(el.textContent).toContain('Test Title');
  });
});

```

- You have to trigger change detection on your own in the test using `detectChanges()`
    - You can inject the provider `ComponentFixtureAutoDetect` into `configureTestingModule()`, but CD will still only occur on some async event:
        - Promise resolutions
        - Timers
        - DOM Events
          
## Components with External Templates
- Things change if your component has:
    - `templateUrl` property
    - `styleUrls` property
- Why do they change?
    - `TestBed.createComponent()` is sync, but when the compiler has to access the file system, it is async
- How do things change?
    - It's not that much.
    - You might call a sequence of 2 ```beforeEach()``` methods:
        1. `async()` calls ```TestBed.configureTestingModule()``` and compiles the component assets
        2. The same as before, but now starting with ```TestBed.createComponent()```
- First beforeEach()

```(typescript)
// async beforeEach
beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ BannerComponent ], // declare the test component
  })
  .compileComponents();  // compile template and css
}));
```
- Second beforeEach()

```(typescript)
// synchronous beforeEach
beforeEach(() => {
  fixture = TestBed.createComponent(BannerComponent);

  comp = fixture.componentInstance; // BannerComponent test instance

  // query for the title <h1> by CSS element selector
  de = fixture.debugElement.query(By.css('h1'));
  el = de.nativeElement;
});
```

## Component with Dependency

- To support an injected service to your component, there are few changes:
    - Reference the service as a provider in the `configureTestingModule()`, and specify the concrete implementation (mock) to use:
        - ```providers:    [ {provide: UserService, useValue: userServiceStub } ]```
    - Create a test double of the service
    - Get a reference to the mocked service from the test fixture's debugElement injector property
        - ```userService = fixture.debugElement.injector.get(UserService);```
        - There is a less verbose way to do this, but only works if the service is injected at the root level, but the above method works always.
- Example Component

```(typescript)
import { Component, OnInit } from '@angular/core';
import { UserService }       from './model';

@Component({
  selector: 'app-welcome',
  template: '<h3 class="welcome" ><i>{{welcome}}</i></h3>'
})
export class WelcomeComponent  implements OnInit {
  welcome = '-- not initialized yet --';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.welcome = this.userService.isLoggedIn ?
      'Welcome, ' + this.userService.user.name :
      'Please log in.';
  }
}
```

- Example Test

```(typescript)
//ES6 Imports

describe('Testing welcome class', () => {

    let comp:    BannerComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let userService: UserService;
    
    beforeEach(() => {
        // stub UserService for test purposes
        userServiceStub = {
            isLoggedIn: true,
            user: { name: 'Test User'}
        };

        TestBed.configureTestingModule({
            declarations: [ WelcomeComponent ],
            providers:    [ {provide: UserService, useValue: userServiceStub } ]
        });

        fixture = TestBed.createComponent(WelcomeComponent);
        comp    = fixture.componentInstance;

        // UserService from the component-under-test
        userService = fixture.debugElement.injector.get(UserService);

        //  get the "welcome" element by CSS selector (e.g., by class name)
        let de = fixture.debugElement.query(By.css('.welcome'));
        let el = de.nativeElement;
    });

    it('should welcome the user', () => {
        fixture.detectChanges();
        const content = el.textContent;
        expect(content).toContain('Welcome', '"Welcome ..."');
        expect(content).toContain('Test User', 'expected name');
    });

    it('should welcome "Bubba"', () => {
        userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
        fixture.detectChanges();
        expect(el.textContent).toContain('Bubba');
    });

    it('should request login if not logged in', () => {
        userService.isLoggedIn = false; // welcome message hasn't been shown yet
        fixture.detectChanges();
        const content = el.textContent;
        expect(content).not.toContain('Welcome', 'not welcomed');
        expect(content).toMatch(/log in/i, '"log in"');
    });
});
```

## Component with Async Dependency

- **Spying vs Manual Mocking** 
    - This introduces an alternative method to mocking services: Spying
    - You can use them in combination or choose one
    - The spies API in jasmine provides all sorts of functionality for mocking, hijacking, tracking, functions and objects.
    - Spying can intercept calls to a service method and returns a predetermined value
        - In this example, it returns an immediately-resolved Promise: ```Promise.resolve(testQuote)```
        - One advantage of spying (in this case) is retaining the async nature by returning a Promise 
        - One disadvantage of spying is that it might be complicated when the service itself has injected dependencies
- There are 3 ways presented to test async dependency
    1. `async()` function which is passed to `it()`
        - relies on `whenStable()`
            - returns a Promise
    2. `fakeAsync()` function
        - relies on `tick()`
        - linear style- no promises
    3. `jasmine.done()`
- Example component with an async dependency
    - `ngOnInit()` fires off ajax request and updates property

```(typescript)
@Component({
  selector: 'twain-quote',
  template: '<p class="twain"><i>{{quote}}</i></p>'
})
export class TwainComponent  implements OnInit {
  intervalId: number;
  quote = '...';
  constructor(private twainService: TwainService) { }

  ngOnInit(): void {
    this.twainService.getQuote().then(quote => this.quote = quote);
  }
}
```

- Test Setup (`beforeEach()`)

```(typescript)
beforeEach(() => {
  TestBed.configureTestingModule({
     declarations: [ TwainComponent ],
     providers:    [ TwainService ],
  });

  fixture = TestBed.createComponent(TwainComponent);
  comp    = fixture.componentInstance;

  // TwainService actually injected into the component
  twainService = fixture.debugElement.injector.get(TwainService);

  // Setup spy on the `getQuote` method
  spy = spyOn(twainService, 'getQuote')
        .and.returnValue(Promise.resolve(testQuote));

  // Get the Twain quote element by CSS selector (e.g., by class name)
  de = fixture.debugElement.query(By.css('.twain'));
  el = de.nativeElement;
});
```

- 2 Example tests which have no async behavior under test.
    - They make sure that before OnInit, no svc call is made (first) and afterwards that one is (second)

```(typescript)
it('should not show quote before OnInit', () => {
  expect(el.textContent).toBe('', 'nothing displayed');
  expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
});
 
it('should still not show quote after component initialized', () => {
  fixture.detectChanges();
  //if detectChanges() has completed, then onInit() has presumably run
  // getQuote service is async => still has not returned with quote
  expect(el.textContent).toBe('...', 'no quote yet');
  expect(spy.calls.any()).toBe(true, 'getQuote called');
});
```

### Async() to It()

```(typescript)
it('should show quote after getQuote promise (async)', async(() => {
  fixture.detectChanges();

  fixture.whenStable().then(() => { // wait for async getQuote
    fixture.detectChanges();        // update view with quote
    expect(el.textContent).toBe(testQuote);
  });
}));
```

- wrap the normal function you would pass into `it()` in `async()`
- `whenStable()` returns a **promise** that resolves when all async (ie ajax) calls are completed.

### FakeAsync()

```(typescript)
it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
  fixture.detectChanges();
  tick();                  // wait for async getQuote
  fixture.detectChanges(); // update view with quote
  expect(el.textContent).toBe(testQuote);
}));
```

- Makes it seem more sync / linear (since there's no promise), but you have to use `tick()`
- `tick()` simulates the passage of time until all pending asynchronous activities finish
- If you have a sequence of ajax calls to simulate/test, then `tick()` can be preferable to all the promise callbacks of the previous method. 

### jasmine.done()
 
```(typescript)
it('should show quote after getQuote promise (done)', (done: any) => {
  fixture.detectChanges();

  // get the spy promise and wait for it to resolve
  spy.calls.mostRecent().returnValue.then(() => {
    fixture.detectChanges(); // update view with quote
    expect(el.textContent).toBe(testQuote);
    done();
  });
});
```

- This is the traditional jasmine-based method.
- You pass the `it()` parameter function a *done* callback which you have to call manually.
- Unlike the previous 2 values, you will **reference the spy** directly.
- In simple tests, might be more work, but this is apparently useful when dealing with some Observable scenarios.


## Component with Inputs and Outputs

- 3 ways to test a component's input properties and output events
    1. Test it indirectly via it's containing component
        - Might be difficult depending on the injected dependencies
    2. Test as a standalone component (STANDALONE method)
        - The test will host and interact with the component 
    3. Create a test-only component to contain it (MOCK HOST COMPONENT method)

### Standalone

- Method:
    - Test Input Property:
        1. In the `beforeEach()`, new up instance of the Input property and assign it to the components input property
            - So wireup of input property happens programmatically rather than in the container component's template code.
        2. Trigger CD in the `beforeEach()`
        3.  The `it()` should compare the value in the debug element's DOM with the instance of the input property from 1
    - Test Output Event:
        1. The `it()` should subscribe to the output event and assign a local variable to payload
        2. The `it()` should trigger the event with `triggerEventHandler()`, defined on the element
        3. Assert that the local variable assigned in the subscription is the same as the one defined in the `beforeEach()` (step 1 of Test Input Property)
- **Complications**
    - Sometimes you have to mock the event payload for the framework to process as expected.
    - [See this section](https://angular.io/guide/testing#triggereventhandler) for an example on how to mock this with a useful helper
- Example 

```(typescript)
//ES6 Imports here

describe('Standalone Component IO', () => {

    let comp:    BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;    
    let heroEl:      HTMLElement;

    // async beforeEach
    beforeEach( async(() => {
    TestBed.configureTestingModule({
        declarations: [ DashboardHeroComponent ],
    })
    .compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardHeroComponent);
        comp    = fixture.componentInstance;
        heroEl  = fixture.debugElement.query(By.css('.hero')); // find hero element

        // pretend that it was wired to something that supplied a hero
        expectedHero = new Hero(42, 'Test Name');
        comp.hero = expectedHero;
        fixture.detectChanges(); // trigger initial data binding
    });

    it('should display hero name', () => {
        const expectedPipedName = expectedHero.name.toUpperCase();
        expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
    });

    it('should raise selected event when clicked', () => {
        let selectedHero: Hero;
        comp.selected.subscribe((hero: Hero) => selectedHero = hero);

        heroEl.triggerEventHandler('click', null);
        expect(selectedHero).toBe(expectedHero);
    });


```


### Mock Host Component

- Method
    - Create a mock host component to contain the component you want to test.
        - It can go in the same spec file as the component-under-test
        - It should have an inline template with just a reference to the component-under-test
    - Example

    ```(typescript)
    @Component({
    template: `
        <dashboard-hero  [hero]="hero"  (selected)="onSelected($event)"></dashboard-hero>`
    })
    class TestHostComponent {
        hero = new Hero(42, 'Test Name');
        selectedHero: Hero;
        onSelected(hero: Hero) { this.selectedHero = hero; }
    }
    ```
    - Declare both host and component-under-test components in the `configureTestingModule()` but only instantiate the host component
    - Testing of  Input Property and Output event are basically the same as in the standalone version
- Example

```(typescript)
//ES6 Imports here

describe('Standalone Component IO', () => {

    let comp:    BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;    
    let heroEl:      HTMLElement;

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            declarations: [ DashboardHeroComponent, TestHostComponent ], // declare both
        }).compileComponents();
    }));

    beforeEach(() => {
        // create TestHostComponent instead of DashboardHeroComponent
        fixture  = TestBed.createComponent(TestHostComponent);
        testHost = fixture.componentInstance;
        heroEl   = fixture.debugElement.query(By.css('.hero')); // find hero
        fixture.detectChanges(); // trigger initial data binding
    });

    it('should display hero name', () => {
        const expectedPipedName = testHost.hero.name.toUpperCase();
        expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
    });

    it('should raise selected event when clicked', () => {
        click(heroEl);
        // selected hero should be the same data bound hero
        expect(testHost.selectedHero).toBe(testHost.hero);
    });
});
```

## Test a Routed Component

- inject() uses root level injector only- you can't use component-level injected services
- before, we would use an injector.get() in the setup to get an instance of the service in the setup, but now we're doing it in the it()
- guide becomes pretty hard to follow - TODO revisit


## TODO
    - Jasmine
    - NgRx testing
    - Goal: Know how to test (in order of importance)
        - All services
        - Reducers
        - Smart Component
        - Dumb Components
