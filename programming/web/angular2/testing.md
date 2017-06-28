Testing With Angular CLI
===================
- [good src](https://angular.io/guide/testing)

## Intro
- Tools include:
    - **Jasmine**
        - test framework
        - Test = 'spec'.  Extension *.spec.ts
    - **Angular testing utilities**
        - framework to support testing angular-based code (e.g. mocking angular stuff, simulating component lifecycle, etc.)
        - reveal how a component interacts with angular
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

## Anatomy of a (Jasmine) Test
- Basic sections of a spec include:
    1. ES6 Import Statements
    2. Test Description function
        - Everything else actually goes in here 
        - ```describe('Your Component Name', () => { ... the rest of the test stuff... })```
    3. Global declarations
        - Fields you will initialize in the Before Each and use in the Individual tests
    4. Before Each function(s)
        - Code that is executed before each individual test.
        - ```beforeEach(() => { })```
    5. Individual Tests
        - Contained inside an ```it()``` function
        - ```it('should have some value', () => { ... aaa code here ... })```
    6. Asserts
        - use the ```expect()``` function

## First Example

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

- You have to trigger change detection on your own in the test using ``
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
        1. Async calls ```TestBed.configureTestingModule()``` and compiles the component assets
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

- **Spying vs Mocking**: This introduces an alternative method to mocking services: Spying
    - You can use them in combination or choose one
    - Spying intercepts calls to a service method and returns a predetermined value
        - In this example, it returns an immediately-resolved Promise: ```Promise.resolve(testQuote)```
        - One advantage of spying (in this case) is retaining the async nature by returning a Promise 
        - One disadvantage of spying is that it might be complicated when the service itself has injected dependencies
- There are 3 ways presented to test async dependency
    1. `async()` function which is passed to `it()`
        - relies on `whenStable()`
    2. `fakeAsync()` function
        - relies on `tick()`
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


