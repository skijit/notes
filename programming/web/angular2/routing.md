Routing
==========
- [primary src](https://angular.io/docs/ts/latest/guide/router.html)

- After the end of each successful navigation lifecycle, the router builds a tree of ActivatedRoute objects that make up the current state of the router. You can access the current RouterState from anywhere in the application using the Router service and the routerState property.
- CanDeactivate Guard lets you state a warning before moving off the current view (ie Discard Changes?)
- The browser uses the <base href> value to prefix relative URLs when referencing CSS files, scripts, and images.
- Provide the RouterModule in the AppModule so its available everywhere in the application
- The router adds the <router-outlet> element to the DOM and subsequently inserts the navigated view element immediately after the <router-outlet>.
- RouterLink attribute binding:
    - `<a routerLink="/crisis-center" routerLinkActive="active someOtherClass">Crisis Center</a>`
    - You can also use these attributes:
        - `[queryParams]`: takes an object `{ name: 'value'}`
        - `[fragment]`: takes a single value to link to the appropriate hash
    - routerLinkActive attribute toggles the css classes (space-delimited when the link is active)
- default route: `{ path: '**', component: PageNotFoundComponent }`
- redirect route (to default page): `{ path: '',   redirectTo: '/heroes', pathMatch: 'full' }`
- common practice is to declare a routing module (typically in *app-routing.module.ts*)
    - sometimes you even have a different routing module for each feature module
        - make sure to keep your default and wildcard routes at the app-level 
    - when you have multiple routing modules, you have to imprt them in the proper order
        - so the default and wildcard routes that you leave in the app-level routing should be imported last in the app-module
- if you're wondering why you don't see all the components having selectors, it might be because they're instantiated by the router
- `RouterModule.forRoot()` vs `RouterModule.forChild()`
    - In your module (either root (app) level or feature level), in your imports array, you'll likely call `RouterModule.forRoot(myRoutes)`
    - At the feature level, you actually call `RouterModule.forChild()` and only call `forRoot()` at the root level
- Programmatically routing to a different route
    - The router is going to be injected into the component
    - You can declare an event:
    ```(html)
    <li *ngFor="let hero of heroes | async"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{ hero.id }}</span> {{ hero.name }}
    </li>
    ```
    - Then in the component:
    ```(typescript)
    onSelect(hero: Hero) {
        this.router.navigate(['/hero', hero.id]);
    }
    ```
- Getting Route parameters back Programmatically
    - We don't read it from the Url... we get it from the route object.
    - The various data is stored in the *link parameters* array
    - The component has a *route* and a *router* injected into it:
    ```(typescript)
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: HeroService
    ) {}
    ```
    - Route and path parameters are available through the ActivatedRoute type (param = route).  It has these members:
        - `url`
        - `data`
        - `params`
        - `queryParams`
        - `fragment`.
        - AND MORE!
        - **Observables**: The first 5 members are observables.
        - **Remember**: 
            - only import the observable members you need!
            - use lifecycle hooks (e.g. ngOnInit() instead of the constructor b/c the hooks are called by the angular runtime at the appropriate moments... the constructor is based on object scoping which is independent of angular runtime pipeline)
                - Using the constructor also might delay drawing to the screen.s
- Observable method `switchMap()`:
    - Good for getting a paricular property from an object passed back.
    ```(typescript)
    ngOnInit() {
        this.route.params
        // (+) converts string 'id' to a number
        //switchMap lets you pull the params[id'] field (when available), 
        //perform an action on it (calling a service), and then map the
        //return value to a new Observable. (which you can subscribe to)
        .switchMap((params: Params) => this.service.getHero(+params['id']))
        .subscribe((hero: Hero) => this.hero = hero);
    }
    ```
- **Router** vs **Route** object
    - Both injected into the component
    - **router** is typically an instance of **Router**
        - good for Programmatically navigating to a route
    - **route** is typically an instance of **ActivatedRoute**
        - good for getting the link parameters: current route and parameter info
- More Observable/Router Gotchas
    - The router will not recreate a component if it moves to another view and sees the same component   
    - So if you change the route (in the example above) to a different id, the same component instance will be reused.
    - additionally, ngOnInit() is only called once.
    - BUT... since we've already subscribed to `this.route.params`, then we'll be updated.  (YAY observables)
- Constructor vs ngOnInit vs ngOnDestroy
    - Always unsubscribe from Observables in ngOnDestroy
    - If you use any @Input properties in your component, you gotta use ngOnInit, bc otherwise they won't be populated
    - If you are just doing things on services or other, you can do them in your constructor
- Optional Parameters
    - Generating links:
    ```(typescript)
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
    ```
        - Compare to a required parameter scenario:
        ```(typescript)
        this.router.navigate(['/hero', hero.id]);
        ```
    - Assuming `heroId` and `foo` are defined, this will generate the following URL:
        - **localhost:3000/heroes;id=15;foo=foo**
- Child Routes
    - A lot of times you'll create a new feature, with a root feature component.
    - There will be plenty of non-root components in that feature though.
    - The root feature component class will have no business logic.
    - The Template for the root feature component might itself contain a `<router-outlet>`
    - You typically define the routes for each module in a module routing file.
    - When there are child routes, you will define those within the parent routing.
    ```(typescript)
    const crisisCenterRoutes: Routes = [
        {
            //THIS IS THE PARENT ROUTE-> GET ENTERED IN THE APP-LEVEL
            //<router-outlet>
            path: 'crisis-center',  
            component: CrisisCenterComponent,  //Root feature component
            children: [
                {
                    path: '',
                    component: CrisisListComponent, //A child feature component- template has it's own <router-outlet> too!
                    children: [
                        {
                            path: ':id',
                            component: CrisisDetailComponent //Child feature component
                            //url is /crisis-center/2 (/crisis-center/''+'2')
                        },
                        {
                            path: '',
                            component: CrisisCenterHomeComponent //Child feature component
                            //url is /crisis-center (/crisis-center/''+'')
                        }
                    ]
                }
            ]
        }
    ];

    @NgModule({
        imports: [
            RouterModule.forChild(crisisCenterRoutes)
        ],
        exports: [
            RouterModule
        ]
    })
    export class CrisisCenterRoutingModule { }
    ```
    - Child routes are concatenated to paths of their parent routes (see comments in code above)

## Relative Links
- Relative Links are supported by the router
    - ./ or no leading slash is relative to the current level.
    - ../ to go up one level in the route path
    - Programmatically navigating with relative paths:
    ```(typescript)
    onSelect(crisis: Crisis) {
        this.selectedId = crisis.id;

        // Navigate with relative link (basically a concatenation of id to the current path)
        this.router.navigate([crisis.id], { relativeTo: this.route });
    }
    ```
    - Same scenario but using routerLink and relative paths:
    ```(html)
    <a [routerLink]="[crisis.id]" [class.selected]="isSelected(crisis)">
        <span class="badge">{{ crisis.id }}</span>
        {{ crisis.name }}
    </a>
    ```
    - Navigating up programmatically (w relative paths)
    ```(typescript)
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
    ```
        - This generates the URL: `/crisis-center/;id=3;foo=foo`

## Secondary Outlets
- The router only supports one primary *unnamed* outlet per template.
- A template can also have any number of named outlets. 
- Each named outlet has its own set of routes with their own components.
- Named outlets are the targets of **secondary routes**.
- Defining a secondary route
```(typescript)
{
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
}
```
- Linking to secondary route via routerLink
```(html)
<a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
```
    - Note you have to specify the outlet in **BOTH** the route and the link
- To empty the contents of a secondary outlet (and have the associated components destroyed), send it a null...
```(typescript)
closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}]);
}```

## Route Guards
- Guards control the routers behavior
    - If a guard returns true, the request proceeds through the router (and then view)
    - If a guard returns false, request is blocked at the router
- Use cases
    - Controlling view authorization
    - View pre-render actions
    - View pre-leave actions (e.g. confirm, save, etc.)
- Typically, the guards have to execute async (returning an Observable<boolean>)
- Guard Types
    - `CanActivate()`: mediate navigation to a route
    - `CanActivateChild()`: mediate navigation to a child route
    - `CanDeactivate()`: mediate navigation away from a view
    - `Resolve()`: data retrieval before route activation
    - `CanLoad()`: Can load a feature module async
- Example `CanActivate()` Auth Guard
    - The Auth Guard is a service which will also have an authorization service (AuthService- not shown) injected into it
    ```(typescript)
    import { Injectable }       from '@angular/core';
    import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
    }                           from '@angular/router';
    import { AuthService }      from './auth.service';

    @Injectable()
    export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) { return true; }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }
    }
    ```
    - The routing module then references the AuthGuard
    ```(typescript)
    import { AuthGuard }                from '../auth-guard.service';

    const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
        {
            path: '',
            children: [
            { path: 'crises', component: ManageCrisesComponent },
            { path: 'heroes', component: ManageHeroesComponent },
            { path: '', component: AdminDashboardComponent }
            ],
        }
        ]
    }
    ];

    @NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
    })
    export class AdminRoutingModule {}
    ```
