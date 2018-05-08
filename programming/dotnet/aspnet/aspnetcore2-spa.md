ASPNet Core 2 SPA
=================

- This document covers how to set up an asp.net core 2 site with an angular 6 front-end
    - It will use the dotnet core CLI and the Angular CLI

## Root Project Level Setup
- Upgrade tools:
    - Angular CLI: `npm install -g @angular/cli`
        - run `ng --version` to verify you're on v6    
    - dotnet sdk
        - download most recent version
    - Install SASS: `npm install -g sass`
        - run `sass --version` to make sure you're up to date (1.3.2)
        - Note that it may refer to 'Dart SASS': that's ok.  This just means it's the version of SASS that doesn't have Ruby dependencies.
- `mkdir updated-test-angular` (this is the root project name- change it to whatever you want.)
- `cd updated-test-angular`
- create a .gitignore file with the following contents:

```(gitignore)
[Ss]taging/
```

## Front-End (FE) Project Setup 

### Initialize
- stay in the parent (updated-test-angular) directory
- `ng new 'fe' --verbose --skip-git --style=scss --routing`
- go to the package.json to make sure it's using the expected version of the angular cli        
- goto src/polyfills.ts and uncomment the necessary lines for IE compatibility (or other appropriate polyfills - some may require package installations but this is documented in that file)
- verify that the cli added a .gitignore file.add an appropriate .gitignore to the root 'fe' directory
    - here's one I grabbed from the CLI when you don't use the **skip-git** flag

```(git)

/dist
/dist-server
/tmp
/out-tsc

/node_modules

/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

/.sass-cache
/connect.lock
/coverage
/libpeerconnection.log
npm-debug.log
yarn-error.log
testem.log
/typings

/e2e/*.js
/e2e/*.map

.DS_Store
Thumbs.db
```

- Create a `styles` directory in the `src` directory and then move the `src/styles.scss` into it
    - Then update the `angular.json` file with the following updated paths:

    ```(json)
    "styles": [
        "src/styles/styles.scss"
    ],
    ```

    - There are 2 places in this file you'll need to make this update.

### Local Build Steps
- test build/serve non-aot:
    - `ng build --progress --verbose`
    - `ng serve --progress`  
        - this will recompile
        - it will tell you where it is being hosted, then open your browser
            - eg http://localhost:4200/
        - you might need to add the `--port x` option to specify a different port        
- test build/serve aot:
    - `ng build --aot --prod --progress --verbose`
    - `ng serve --progress --prod --aot`
        - you might also need to use `--port` again

### Adding Angular Material
- Run `ng add @angular/material`
    - You may need to add the following dependency to the package.json and the rerun `npm install`
        - `"@angular/cdk": "^6.0.0",`
- Use ng generate with angular material to generate a *quick-start* dashboard component:
    - `ng generate @angular/material:material-nav --name=nav`
- Clear out the app component template and insert `<nav></nav>`.
- Inside `<mat-sidenav-content>` and after `<mat-toolbar>` is where you put your content
    - To prove this, put an `<h1>your content here</h1>` and rebuild / view results  
        - you can remove this when you've proven it
    - Also, enter a `<router-outlet></router-outlet>` underneath/replacing the h1

### Refactor App-level components
- We're going to get rid of the 'nav' component and move it into the app component.
    - Then we'll add the router outlet to the component
    - Then we'll just shuffle around the way the app component is organized
- app.module.ts

    ```(typescript)
    //Core
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { LayoutModule } from '@angular/cdk/layout';
    import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

    //Feature Modules
    //TODO

    //App-Level
    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';

    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,                 
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        AppRoutingModule //order matters: this should always be last
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

- app-routing.module.ts
    - no changes        
- app.component.html
    - Copy the nav.component.html content here
- app.component.scss
    - Copy the nav.component.css content here
- app.component.ts
    - Combine the existing code with the nav.component.ts file
- now rebuild (aot) and test

### Common Module
- Create the following folders under 'app'
    - common
        - add folders:
            - components
            - guards
            - helpers
            - models
            - pipes
            - services
    - constants
        - empty for now
    - features
        - empty for now
    - barrels (optional)
        - add files:
            - common.ts
            - constants.ts
            - mocks.ts
            - models.ts
            - modules.ts
            - services.ts
        - it's just a centralized registry of various es6 modules (broken out by type) which decouples your import statements from the actual project folder structure.
            - occasionally, there are some black-magic bugs dealing with barrel's so be sure to test this carefuly.
        - Basic format should look like:

        ```(typescript)
        export { MixDetailService } from './../features/mix-detail/mix-detail.service';
        export { UnlinkedMaterialsService } from './../features/shared/unlinked-materials.service';
        // ...
        ```

- Copy the common files (to appropriate directories) from previous projects that you want
- Add references to the barrels/common.ts as appropriate.  E.G.

```(typescript)
export { PageNotFoundComponent } from './../common/components/page-not-found.component';
export { NotAuthorizedComponent } from './../common/components/not-authorized.component';
```

- Add a ref to the common module to the barrels/module.ts

```(typescript)
export { CommonModule } from "../common/common.module";
```

- Create `app/common/common.module.ts` in the root directory:

    ```(typescript)
    import { NgModule, ModuleWithProviders } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { FormsModule, ReactiveFormsModule }    from '@angular/forms';  //presumably will need both

    //components
    import { PageNotFoundComponent, NotAuthorizedComponent } from './../barrels/common';

    @NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule
        ],
        exports: [        
            PageNotFoundComponent, 
            NotAuthorizedComponent
        ],
        declarations: [
            PageNotFoundComponent, 
            NotAuthorizedComponent
        ]
    })
    export class CommonModule {}
    ```

- Update the app.module.ts to include common.  
    - Add the following line under '//Feature Modules':

    ```(typescript)       
    import { CommonModule }  from './barrels/modules';
    ```

    - Also add import the module reference...

    ```(typescript)
    imports: [
        BrowserModule,   
        CommonModule, //<- NEW
        HomeModule, 
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        AppRoutingModule //order matters: this should always be last
    ],
    ```

### Feature Modules and Components
    
- Components will be grouped into Feature Modules
- There will be smart components and dumb components, the latter of which use on-push change detection
- **Create a feature module**
    - Assume the feature will be 'home'
    - Make a directory 'features/home/_module'
    - change to the _module directory            
    - `ng g module home --flat --routing`
        - note: you can add the flag `--dry-run` for any of these to see the changes without making changes
    - add these lines to your barrels/modules.ts: 

    ```(typescript)
    export { HomeRoutingModule } from "../features/home/_module/home-routing.module";
    export { HomeModule } from "../features/home/_module/home.module";
    ```

    - Update the app.module by updating this line:

    ```(typescript)
    import { CommonModule, HomeModule, HomeRoutingModule }  from './barrels/modules';
    ```

    - Also in the app.module, add the reference to the HomeModule in the imports section...

    ```(typescript)
    imports: [
        BrowserModule,   
        HomeModule, 
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        AppRoutingModule //order matters: this should always be last
    ],
    ```

- **Create a smart component**
    - Assume this smart component will also be called Home (and it lives inside the Home Feature module)
    - change directory to the home/ (i.e. no longer in the _module directory)
    - `ng g component home --export --flat --styleext scss --selector home  --module _module/home.module.ts --inline-template`
    - Add a route:
        - Add the following to your app-routing.module.ts:

        ```(typescript)
        import { PageNotFoundComponent} from './barrels/common';

        const routes: Routes = [   
        { path: '', redirectTo: '/home', pathMatch: 'full'},   
        { path: 'page-not-found', component: PageNotFoundComponent, pathMatch: 'full' },   
        { path: '**', component: PageNotFoundComponent } 
        ];
        ```

        - Add the following to your home/_module/home-routing.module.ts:

        ```(typescript)
        import { HomeComponent} from './../home.component';

        const routes: Routes = [    
        { path: 'home',   component: HomeComponent, pathMatch: 'full' }  
        ];
        ```
    
- **Create a dumb component**
    - Assume this dumb component will be called SearchListingsComponent and live inside the Home module.
    - change directory to home/
    - `ng g component SearchListings --styleext scss --selector search-listings --module _module/home.module.ts --inline-template --change-detection OnPush`
        - Note: if you plan on reusing this component in other projects, you might want to encapsulate the markup with `--view-encapsulation Emulated` or `--view-encapsulation Native`
            - Background: normally, component css gets copied to the document <head>.  If you want a super-portable component, a la web components, you can encapsulate this markup in the ShadowDom (which could be Emulated or Native - depending on what browsers you intend to target).  Of course, with careful namespacing in your css, you might avoid any collisions - this approach would just guarantee it.
    - Add the following to the HomeComponent template: `<search-listings> </search-listings>`

### Additional javascript Resources
- Add References to any other javascript files you might need
    - add the following to your angular.json with an array of the appropriate js to bundle (order matters):
    ```(json)
    "scripts": [
        "../node_modules/jquery/dist/jquery.js",
        "../node_modules/bootstrap/dist/js/bootstrap.js",
        "./assets/js/ie10-viewport-bug-workaround.js"
    ]
    ```
- Add the folowing useful npm components:
    - `npm install moment`
    - `npm install immutable`

### Additional Angular Material Setup
- TODO

## Back-End (BE) Project Setup
- `cd updated-test-angular`
- `mkdir be`
- `cd be`
- `mkdir web`
- `cd web`
    - this will create the project file (web.csproj) inside the `web` directory. 
    - sibling projects (which live in the same solution) can go in sibling directories (e.g. `be/core`)
- `dotnet new mvc`
    - adding a `--name foo` argument will chane the name of the project file.
- `cd ..`
- Adding a solution file 
    - You can build the all the units together and open this up in Visual Studio, so it's a good thing to have.
    - `dotnet new sln`
        - adding a **--name foo** argument will chane the name of the solution file (to foo.sln).
    - `dotnet sln add .\web\web.csproj`
        - adjust slashes for platform
- add a [.gitignore](https://www.gitignore.io/api/aspnetcore)
    - also add the following lines so that you don't check in your .map files or anything build from the front end

    ```(gitignore)
    *.map
    wwwroot/dist/*
    ```
    - add to git
- open in Visual Studio code and debug
    
### Connecting BE and FE with Build process
- Directories
    - back in root directory, (`updated-test-angular`) `mkdir staging`            
- Build tools and NPM
    - cd to the fe directory again
    
    - Add the following build tools:
        - `npm install --save-dev shx`
        - `npm install --save-dev npm-watch`
        - `npm install --save-dev parallelshell`
        - `npm install --save-dev path-exists-cli`
        - `npm install --save-dev copyfiles`
        - some of these you might just want to install globally
    - Add the following npm section to you package.json
    
    ```(json)
    //...
    "config" : { "outputPath": "be/web" },
    "watch": {
        "fill-targets-dist": {
            "patterns": [
                "../staging/**/*.{js,map,css}"
            ],
            "ignore": "../staging/**/assets/*.js"
        }
    },
    //...
    ```

    - Note the `outputPath` config variable might need to change depending on how you set up your be project
        
    - Add the following to your npm package scripts section

    ```(json)
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "prebuild-dev": "npm run clean-targets",
    "build-dev": "ng build --output-path=../staging/dist --output-hashing=none --progress --source-map --verbose",
    "postbuild-dev": "npm run fill-targets",
    "prebuild-prod": "npm run clean-targets",
    "build-prod": "ng build --prod --aot --output-path=../staging/dist --output-hashing=none --progress --verbose",
    "postbuild-prod": "npm run fill-targets",
    "clean-targets": "npm run clean-target-1 && npm run clean-target-2",
    "clean-target-1": "path-exists ../staging/dist && shx rm -r ../staging/dist || echo ../staging/dist already removed",
    "clean-target-2": "path-exists ../$npm_package_config_outputPath/wwwroot/dist && shx rm -r ../$npm_package_config_outputPath/wwwroot/dist && shx mkdir -p ../$npm_package_config_outputPath/wwwroot/dist/fonts || echo wwwroot/dist already removed && shx mkdir -p ../$npm_package_config_outputPath/wwwroot/dist/fonts ",
    "fill-targets": "npm run fill-targets-dist && npm run fill-targets-fonts",
    "fill-targets-dist": "copyfiles -u 3 ../staging/dist/*.{js,map,css} ../$npm_package_config_outputPath/wwwroot/dist",
    "fill-targets-fonts": "copyfiles -u 5 ../staging/dist/assets/fonts/glyphicons* ../$npm_package_config_outputPath/wwwroot/dist/fonts",
    "prewatch": "npm run clean-target-1",
    "watch": "parallelshell \"npm run watch-ng\" \"npm run watch-output\"",
    "watch-prod": "parallelshell \"npm run watch-ng-prod\" \"npm run watch-output\"",
    "watch-output": "npm-watch",
    "watch-ng": "ng build --output-path=../staging/dist --output-hashing=none --progress --source-map --verbose --watch",
    "watch-ng-prod": "ng build --prod --aot --output-path=../staging/dist --output-hashing=none --progress --verbose --watch",
    "test-config-var": "echo ./../$npm_package_config_outputPath/whatever"
    ```

    - **warning - NOT CROSSPLATFORM**: config variables on windows need to be enclosed in `%` but in linux/max, they probably need to be enclosed in `$`
        - use `test-config-var` to verify that the config variable is working correctly
    - some of these fill-targets might not be necessary... adjust as appropriate.
    - Important Script Entry Points Are:
        - `npm run build-dev`
        - `npm run watch`
            - note: nodemon section sometimes barfs but it's mostly reliable
        - `npm run watch-prod`
        - `npm run build-prod`

### SPA and Back-End Route Integration
- One way to handle this is to have a fallback route that maps everything that's not a filename with an extension to some default controller action (.e.g. Home/Index) because this implies it is actually a spa route.  ([documentation](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.sparouteextensions.mapspafallbackroute?view=aspnetcore-2.0))
    - Downside is that there's no way to return a legit 404.

    ```(csharp)
    //Startup.cs
    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");

        routes.MapSpaFallbackRoute(
            name: "spa-fallback",
            defaults: new { controller = "Home", action = "Index" });
    });
    ```

- Another way is to enumerate the specific spa routes on the default controller action.  You have to keep the list updated, but it will return legit 404's.

```(csharp)
//Startup.cs
app.UseMvc(routes =>
{
    // NewMarket.Web Routes (Common Libraries)
    routes.MapRoute(
        //blah blah blah
    );

    routes.MapRoute(
        name: "default",
        template: "{controller=Home}/{action=Index}/{id?}");
});
```

```(csharp)
//Default controller
[Route("/")]
[Route("/home")]
[Route("/record-concern")]
[Route("/record-concern/{id?}")]
[Route("/search-concerns")]
[Route("/concern-details/{id}")]
[Route("/reports")]
[Route("/report/{id}")]
[Route("/admin")]
[Route("/admin/routing-matrix")]
public IActionResult Index()
{
    ///blah blah blah
}
```

- A third way would be to write some custom middleware that reads your spa routes off some config file.  Then you don't have to rebuild/deploy the Backend for frontend changes.
- Whichever route you choose probably depends on the number of routes you have.

### Integrate FE and BE Templates

- Create a layout for SPA access.  This can be the default or a new one.  Just make sure you reference it from the default controller method's view.
    - If you use the default layout, make sure to change the other views to reference an appropriate one (i.e. that doesn't have SPA hooks in it.)

```(html)
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"]</title>
    <base href="/">

    <environment names="Staging,Production">
        <link rel="stylesheet" href="~/dist/styles.css">
    </environment>

    <!-- OPTIONAL CSS FILES: Include depending on your project -->
    <link href="/assets/lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/assets/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="/assets/lib/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="/assets/lib/ng2-toastr/ng2-toastr.min.css" rel="stylesheet" />
    
</head>
<body>
    
    @RenderBody()        

    <!-- OPTIONAL: You can include these scripts at the root level if you don't want to access-->
    <!-- them via the module loader.  Usually this would be stuff which runs outside of angular. -->
    <script src="/assets/lib/jquery/dist/jquery.min.js"></script>
    <script src="/assets/lib/moment/moment.min.js"></script>
    <script src="/assets/lib/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="/assets/lib/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js"></script>

    <!-- TODO: Review the prod bundles that need to be included -->
    <environment names="Development">
        <script src="~/dist/runtime.js" asp-append-version="true"></script>
        <script src="~/dist/polyfills.js" asp-append-version="true"></script>
        <script src="~/dist/styles.js" asp-append-version="true"></script>
        <script src="~/dist/vendor.js" asp-append-version="true"></script>
        <script src="~/dist/main.js" asp-append-version="true"></script>
    </environment>
        
    <environment names="Staging,Production">                
        <script src="~/dist/runtime.js" asp-append-version="true"></script>
        <script src="~/dist/polyfills.js" asp-append-version="true"></script>        
        <script src="~/dist/main.js" asp-append-version="true"></script>
    </environment>
    
    @RenderSection("scripts", required: false)
</body>
</html>
```

- Update the default controller method's view- typically found in `Views/Home/Index.cshtml`

```(csharp)
//Views/Home/Index.cshtml
@model WhateverViewModel
@{
    Layout = "_Layout"; //or whatever you called it above
    ViewData["Title"] = Model.AppName;
}

<app-root></app-root>

<!-- OPTIONAL: to save some time, you can inject some data from the BE to hidden inputs as json and then access them via your root angular component. -->
<input type="hidden" id="SettingsJson" value="@Model.SettingsJson" />
<input type="hidden" id="UserData" value="@Model.UserDataJson" />
```

- Update the Default controller method- typically `Controllers/HomeController.cs` method `Index()`
    - If the corresponding View is using a ViewModel, make sure it is passed in from here.

- The angular root component's template doesn't need to updated at the moment.

### Local Debugging
- Your FE build settings need to match your BE build settings, bc there is a slight difference in the FE output between AOT and DEV:
    - Aot has no styles or vendor bundle
    - Aot just uses a styles.css file, whereas DEV uses a styles bundle
- So your build environment needs to have the correct setting for the env variable, ASPNETCORE_ENVIRONMENT
    - Possible values: Development, Staging, Production
- In VSCode, just go to the ./vscode/launch.json and you'll see where you can update this.
    - **Warning**: You might have multiple ./vscode/launch.json files.  Be sure to change the environment variable in the root directory of your solution.

### Build/Publishing
- Depends on your publish platform and method.
- I have separate notes for build/publishing this to a remote Linux machine.
        
### Further Development Steps
- see [this documentation](/programming/web/angular2/ng-lessons-learned) in addition to whatever other sources

## Useless BE Approaches

### Using a PreBuilt SPA Template from DotNet SDK
- basic idea: you can use the dotnet CLI to create an ASP.NET Core project that integrates with a SPA framework (e.g. angular)
- [primary src](https://docs.microsoft.com/en-us/aspnet/core/spa/angular?tabs=visual-studio)
- run `dotnet --version` to verify you're at version >= 2.1.  Otherwise update the SDK.
- run `dotnet new --install Microsoft.DotNet.Web.Spa.ProjectTemplates::2.0.0` to get latest project templates
- to create a project using this template (in a new directory), run `dotnet new angular -o test-ang-mvc-templ8`
- running from vs code (first time):
    - open up from the current directory and wait 
    - when you get a warning about required assets needing to be installed before being able to build, select 'yes'
    - press F5 to debug: this will take a while as it restores nuget and npm packages
    - **RESULTS**: Doesn't work.  Builds but cannot run.  
- **CONCLUSION**: DONT USE THIS METHOD
    - I already had doubts that this approach would be worthwhile, but this convinces me.
    

### Other SPA Services From DotNet

- There is a lot of code from the Microsoft.AspNetCore.SpaServices in the template, but their purpose is to integrate the front and back ends into a single project.
- I don't want to use that approach.  It's easier to treat the two projects separately, and use different development environments.
- Recall that most of our content (js (app code, polyfills, vendor, etc), css, ) will be bundled by the front end build process into *.bundle.js.
- The main thing we need to use is the routing:

```(csharp)
app.UseMvc(routes =>
{
    routes.MapRoute(
        name: "default",
        template: "{controller=Home}/{action=Index}/{id?}");

    routes.MapSpaFallbackRoute(
        name: "spa-fallback",
        defaults: new { controller = "Home", action = "Index" });
});
```

- [SpaServices Routing Helpers](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa-services#routing-helpers)
- [documentation](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.sparouteextensions.mapspafallbackroute?view=aspnetcore-2.0)
- This is the default route, but it also ignores any files which might be static files (i.e. anything with a filename extension).
    - Front-end routes will not likely contain filename extensions, so these get routed to the default controller action.
    - If there is a filename extension, it will be treated as a static file and look for the specified path inside the webroot (usually `wwwroot`).
    - If the user sends in a fake front-end route, unfortunately, there's not a good way to return a 404.

