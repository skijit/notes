ASP.NET Core
======================
- [Notes from Microsoft Virtual Academy](https://mva.microsoft.com/en-US/training-courses/introduction-to-asp-net-core-1-0-16841?l=JWZaodE6C_5706218965)
- [Intermediate level series here](https://mva.microsoft.com/en-US/training-courses/intermediate-asp-net-core-1-0-16964)

## 1 - Basic Tooling and Project Structure
- download from [dot.net](dot.net)
- `dotnet` is the .net CLI
- to create a new application: `dotnet new`
    - creates: project.json and a program.cs
- on windows, core is installed under C:\Program Files\dotnet
- use `dotnet restore` to restore project dependencies
- to run a dotnet program from the CLI: `dotnet run`
- if you press `ctrl+~` in vscode, it will open up a command prompt in that same directory
- to convert into a web app:
    - add a dependency to project.json: *"Microsoft.AspNetCore.Server.Kestrel": "1.0.1"*
    - Update Program.cs
    ```(csharp)
    using System;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;

    namespace ConsoleApplication
    {
        public class Startup
        {
            public void Configure(IApplicationBuilder app)
            {
                app.Run(
                    context => { return context.Response.WriteAsync("hello world"); }
                );
            }    
        }
        
        public class Program
        {
            public static void Main(string[] args)
            {
                var host = new WebHostBuilder()
                    .UseKestrel()
                    .UseStartup<Startup>()
                    .Build();
                    
                host.Run();
                
            }    
        }    
    }
    ```
- To watch for code changes: dotnetwatch.  
    - Can be downloaded from github.
    - Follow instructions for installation- essentially means making a change to project.json.
    - to run, use `dotnet watch run` - basically, it's watching the run task

## 2 - ASP.NET Core and Middleware
- From Visual Studio: File -> New -> Projects -> ASP.Net Core Web Application
    - Options:
        - Empty
        - Web API
        - Web Application
- ```dotnet new -t web```
    - you can see this by using ```dotnet new -help```
    - ```dotnet new -t web```
- kestrel vs IIS
    - kestrel is the little cross-platform web server.  
        - it talks to dotnet directly.        
    - for dev/test, you can use kestrel automatically, but for prod, you want to have IIS in front of it as a reverse proxy.
        - so you always want kestrel: it's just a question of whether you put anything in front of it 
        - you can also divide up responsibilities if you want, such that some static files could be served by IIS
        - IIS will restart kestrel if it crashes
- If you use IIS, you need to have a web.config
    - since IIS knows about web.config
    - this will include the launch browser command, in case you need to change that
    - it includes the .net core module
- file *launchSettings.json* has the different build profiles and indicates whether they're using IISExpress, Kestrel, etc.
- Some useful middleware:
    - ``` .UseKestrel() ```
    - ``` .UseUrls("http://localhost:8081") ```
        - But remember that if Visual Studio launches your browser, it will need to know about this port.  (which you would set in *launchSettings.json*)
    - ``` .UseIISIntegration() ```
    - ``` .UseContentRoot(Directory.GetCurrentDirectory()) ```
    - ``` .UseStaticFiles() ``` but this one is better -> ``` .UseFileServer() ```
- The code for middleware files is all on github
- Setting environment:
    - In project properties, you set the an environment variable: `ASPNETCORE_ENVIRONMENT` to `Development`
    - But note that this will be setting the properties for the different build profiles (e.g. "IIS Express", or "Kestrel")
    - This will add a corresponding entry into your launchSettings.json
- some middleware you ref in ```Configure()``` might require adding corresponding services in ```ConfigureServices()```
- There are a variety of ways you can do configuration in ASP.NET now- not just what's in web.config.
    - You might want to store these configs in Json, for instance
    - Other options are ini, DB, etc.
    - One configuration management system for asp.net is the nuget package Microsoft.Extensions.Configuration.Json
    ```(csharp)
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }

        //constructor- these dependencies are injected
        public Startup(IHostingEnvironment env) 
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPaths)
                .AddJsonFile("appsettings.json")  //note this allows you to create environment-specific app settings
                .Build();
        }

        //called at runtime - configures the pipeline, and Run() actually runs it!
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Run(async (context) => 
            {
                await context.Response.WriteAsync($"Hello {env.EnvironmentName}, it's something {Configuration["message"]} ");
            });
        }

    }
    ```
- global.json 
    - is a sibling of the solution file and the src directory, which is the root for all the projects in the solution
    - this indicates the names of the folders to search from projects.  e.g. "projects":[ "src", "test" ]
- 2 ways to add references to other code:
    - solution reference : you just point to the other project
    - nuget reference
- When resolving references, the runtime will first look at local, and then finally to the internet (search order is: project, system, internet)
    - If you have a nuget library in your cache, you would be able to work offline.
    - The global nuget cache is at `%appdata%\Local\Nuget\v3-Cache
        - It's global! so it is shared among other projects
- to compile into a nuget package
    - `dotnet new -t lib` to create the project from the CLI
    - `dotnet pack` to package as a nuget from the CLI
- versions in your project.json are by default set to 1.0.0

## 3 - Routing
- Add a nuget reference to routing middleware: *Microsoft.AspNetCore.Routing*
```(csharp)
//Inside Startup class (Startup.cs)
//called at runtime - configures the pipeline, and Run() actually runs it!
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    loggerFactory.AddConsole();

    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    //this uses routing
    //BE AWARE: can be order sensitive, and routes can be greedy
    var routeBuilder = new RouteBuilder(app);
    routeBuilder.MapGet("", context => context.Response.WriteAsync("Hello from Routing"));
    routeBuilder.MapGet("otherRoute", context => context.Response.WriteAsync("Hello from Other Routing"));
    //notice the use of string interpolation and pattern matching in the route
    //this will match ints or strings
    routeBuilder.MapGet("blog/{blogNumber}", context => context.Response.WriteAsync($"Hello from blog post {context.getRouteValue("blogNumber")}"));
    //this will only match ints - this method also works for dates, longs, etc.
    routeBuilder.MapGet("blogNum/{blogNumber:int}", context => context.Response.WriteAsync($"Hello from blog post number {context.getRouteValue("blogNumber")}"));
    app.UseRouter(routeBuilder.Build());

    //this will only run if none of the routers are matched
    app.Run(async (context) => 
    {
        await context.Response.WriteAsync($"Hello {env.EnvironmentName}, it's something {Configuration["message"]} ");
    });
}
```

## 4 - MVC
- In the context of .net core, AspNet is another piece of middleware (because it's part of the pipeline)
    - However, it does sit on top of a lot of other middleware
    - It includes routing
    - Package: *Microsoft.AspNetCore.Mvc*
    - `app.UseMvc()`
- Simplest usage:
    - Add a *Controllers* folder, and something like...
    ```(csharp)
    public class SomethingController
    {
        [HttpGet("/")]
        public string Index() => "Hello from MVC!";

        [HttpGet("/TomTom")]
        public string MethodNamesDontMatter() => "Hello from TomTom!";


    }
    ```
    - Routing included in the attribute.  No need for routing table here.
    - Name of the controller method doesn't matter if the routing is set up
    - But you need to have the routing defined on it
- You can still have centralized routes too!
- If you want to use the typical convention-based controller name, action method routing, keep the default route you get in your project template:
```(csharp)
app.UseMvc(routes =>
    {
        //the '=Home' syntax are defaults (so the default controller is named 'Home')
        //the '?' is the optional syntax
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}"
        );
    } 
);
```
- Action Methods actually return IActionResult
    - Redirect
    - Json
    - File
    - HttpStatusCode
    - Content / strings
- Continue on Form Data videos
- ```(csharp)
//for non-dev environments, this is middleware to route to an error page
app.UseExceptionHandler("/Home/Error");
```
- ```(csharp)
//middleware for authentication
app.UseIdentity();
```
- Async controller methods are a good idea.  Makes them non-blocking!
```(csharp)
public async Task<IActionResult> Index() 
{
    // ...stuff here...

    return View(await _context.Movie.ToListAsync())
}
```
- **PRG** Pattern
    - Post / Redirect / Get
    - For form submission
    - You'll have each action method (end-point) overloaded with a different HTTP Verb
    ```(csharp)
    RedirectToAction("MySameAction");
    ```
- So you don't have to remember the HTTP error codes in a controller, you can use these helper methods:
    - `Redirect()`
    - `NotFound()`
    - `RedirectPermanent()`
- You can set attributes on the Model class (like a Date's Display Format) and it will always apply this format





