ASPNet Core 2 SPA
=================

## Using a SPA Template
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
- **Conclusion**: I already had doubts that this approach would be worthwhile, but this convinces me.
    - I am going to look at the various SPA Services they use, and make sure that all makes sense.

## Other SPA Services

- There is a lot of code from the Microsoft.AspNetCore.SpaServices in the template, but their purpose is to integrate the front and back ends into a single project.
- We don't want to use that approach.  It's easier to treat the two projects separately, and use different development environments.
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

## Manual Integration with Angular CLI

- Start with [this documentation](/programming/web/angular2/ng-lessons-learned)
    - It seems to be accurate still

- Upgrade the Angular CLI
- `mkdir updated-test-angular` (this is the root)
- `cd updated-test-angular`
- Create the FE project with Angular CLI
    - stay in the parent (updated-test-angular) directory
    - `ng new 'fe' --verbose --skip-git --routing`        
    - go to the package.json to make sure it's using the expected version of the angular cli        
    - goto src/polyfills.ts and uncomment the necessary lines for IE compatibility
    - test build/serve non-aot:
        - `ng build --dev --progress --verbose`
        - `ng serve --progress -dev`  note: this will recompile
            - it will tell you where it is being hosted, then open your browser
            - eg http://localhost:4200/
    - test build/serve aot:
        - `ng build --prod --progress --verbose`
        - `ng serve --progress -prod -aot`
            - test in the same as with dev        
- Crate the BE project with dotnet CLI
    - `cd updated-test-angular`
    - `mkdir be`
    - `cd be`    
    - `dotnet new mvc`
    - open in Visual Studio code and debug
    - Set up for SPA
        - Add to the `Configure()` in *Startup.cs*:
            
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

    - Build process
        - Directories
            - back in root directory, (`updated-test-angular`) `mkdir staging`            
        - Build tools and NPM
            - Add the folowing npm components:
                `npm install moment`
            - Add the following build tools:
                - `npm install --save-dev shx`
                - `npm install --save-dev npm-watch`
                - `npm install --save-dev parallelshell`
                - `npm install --save-dev path-exists-cli`
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
            "watch-ng": "ng build --dev --output-path=../staging/dist --output-hashing=none --progress --sourcemap --verbose --watch"
            ```

            - **warning - NOT CROSSPLATFORM**: config variables on windows need to be enclosed in `%` but in linux/max, they probably need to be enclosed in `$`
            - Important Script Entry Points Are:
                - `npm run build-dev`
                - `npm run watch`
                    - note: nodemon section sometimes barfs but it's mostly reliable
                    - since we're watching two different types of things (source and compiled output), you could easily change `watch-ng` to use a prod/aot build config.
                - `npm run build-prod`

    - SPA and Back-End Route Integration
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

    - Integrate root fe and be templates

    ```(csharp)
    //Views/Home/Index.cshtml
    @model WhateverViewModel
    @{
        Layout = "_LayoutAngular";
        ViewData["Title"] = Model.AppName;
    }

    <app-root></app-root>

    <input type="hidden" id="SettingsJson" value="@Model.SettingsJson" />
    <input type="hidden" id="UserData" value="@Model.UserDataJson" />
    ```

    ```(cshtml)
    //Layout
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>@ViewData["Title"]</title>
        <base href="/">

        <link href="/assets/lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
        <link href="/assets/lib/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" />
        <link href="/assets/lib/ng2-toastr/ng2-toastr.min.css" rel="stylesheet" />

        <environment names="Development,Staging,Production">
            <link href="~/dist/styles.bundle.css" rel="stylesheet" asp-append-version="true" />
        </environment>

    </head>
    <body>
        
        @RenderBody()        

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
    - Build/ Publishing
        - Depends on your publish platform and method.
        - See other notes on that.
        