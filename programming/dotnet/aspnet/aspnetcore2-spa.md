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