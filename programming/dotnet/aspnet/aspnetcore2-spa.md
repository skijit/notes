ASPNet Core 2 SPA
=================

## Using a PreBuilt SPA Template from DotNet SDK
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
    

## Other SPA Services From DotNet

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

## Manual Integration with Angular CLI (Preferred Method)

### Root Level Setup
- Upgrade the Angular CLI and dotnet sdk
- `mkdir updated-test-angular` (this is the root project name- change it to whatever you want.)
- `cd updated-test-angular`
- create a .gitignore file with the following contents:

```(gitignore)
[Ss]taging/
```

### Front-End (FE) Project Creation with Angular CLI

- stay in the parent (updated-test-angular) directory
- `ng new 'fe' --verbose --skip-git --routing`        
- go to the package.json to make sure it's using the expected version of the angular cli        
- goto src/polyfills.ts and uncomment the necessary lines for IE compatibility (or other appropriate polyfills - some may require package installations but this documented)
- add an appropriate .gitignore to the root 'fe' directory
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

- test build/serve non-aot:
    - `ng build --dev --progress --verbose`
    - `ng serve --progress -dev`  note: this will recompile
        - it will tell you where it is being hosted, then open your browser
        - eg http://localhost:4200/
- test build/serve aot:
    - `ng build --prod --progress --verbose`
    - `ng serve --progress -prod -aot`
        - test in the same as with dev        

### Create the Back-End (BE) project with dotnet CLI
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
    - Add the folowing npm components:
        `npm install moment`
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
    "config" : { "outputPath": "be" },
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

    - Note the `outputPath` config variable might need to change
        - e.g. you might want to change it to `be/web`
    - Add the following to your npm package scripts section

    ```(json)
    "prebuild-dev": "npm run clean-targets",
    "build-dev": "ng build --dev --output-path=../staging/dist --output-hashing=none --progress --sourcemap --verbose",
    "postbuild-dev": "npm run fill-targets",
    "prebuild-prod": "npm run clean-targets",
    "build-prod": "ng build --prod --aot --output-path=../staging/dist --output-hashing=none --progress --verbose",
    "postbuild-prod": "npm run fill-targets",
    "clean-targets": "npm run clean-target-1 && npm run clean-target-2",
    "clean-target-1": "path-exists ../staging/dist && shx rm -r ../staging/dist || echo ../staging/dist already removed",
    "clean-target-2": "path-exists ../%npm_package_config_outputPath%/wwwroot/dist && shx rm -r ../%npm_package_config_outputPath%/wwwroot/dist && shx mkdir -p ../%npm_package_config_outputPath%/wwwroot/dist/fonts || echo wwwroot/dist already removed && shx mkdir -p ../%npm_package_config_outputPath%/wwwroot/dist/fonts ",
    "fill-targets": "npm run fill-targets-dist && npm run fill-targets-fonts",
    "fill-targets-dist": "copyfiles -u 3 ../staging/dist/*.{js,map,css} ../%npm_package_config_outputPath%/wwwroot/dist",
    "fill-targets-fonts": "copyfiles -u 5 ../staging/dist/assets/fonts/glyphicons* ../%npm_package_config_outputPath%/wwwroot/dist/fonts",
    "prewatch": "npm run clean-target-1",
    "watch": "parallelshell \"npm run watch-ng\" \"npm run watch-output\"",
    "watch-output": "npm-watch",
    "watch-ng": "ng build --dev --output-path=../staging/dist --output-hashing=none --progress --sourcemap --verbose --watch",
    "test-config-var": "echo ./../%npm_package_config_outputPath%/whatever"
    ```

    - **warning - NOT CROSSPLATFORM**: config variables on windows need to be enclosed in `%` but in linux/max, they probably need to be enclosed in `$`
        - use `test-config-var` to verify that the config variable is working correctly
    - some of these fill-targets might not be necessary... adjust as appropriate.
    - Important Script Entry Points Are:
        - `npm run build-dev`
        - `npm run watch`
            - note: nodemon section sometimes barfs but it's mostly reliable
            - since we're watching two different types of things (source and compiled output), you could easily change `watch-ng` to use a prod/aot build config.
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

    <environment names="Development">
        <script src="~/dist/inline.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/polyfills.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/styles.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/vendor.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/main.bundle.js" asp-append-version="true"></script>
    </environment>
        
    <environment names="Staging,Production">        
        <script src="~/dist/inline.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/polyfills.bundle.js" asp-append-version="true"></script>        
        <script src="~/dist/vendor.bundle.js" asp-append-version="true"></script>
        <script src="~/dist/main.bundle.js" asp-append-version="true"></script>
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

### Checking in your changes
- Presumably your root directory has a git repo in it.
- First only add and commit your various .gitignore files.
- Then add everything else and push to your remote server.

### Build/Publishing
- Depends on your publish platform and method.
- I have separate notes for build/publishing this to a remote Linux machine.
        
### Further Development Steps
- see [this documentation](/programming/web/angular2/ng-lessons-learned) in addition to whatever other sources

