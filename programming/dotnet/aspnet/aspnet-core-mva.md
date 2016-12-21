ASP.NET Core
======================
- [Notes from Microsoft Virtual Academy](https://mva.microsoft.com/en-US/training-courses/introduction-to-asp-net-core-1-0-16841?l=JWZaodE6C_5706218965)

## Intro - Video 1
- download from [dot.net](dot.net)
- `dotnet` is the .net CLI
- to create a new application: `dotnet new`
    - creates: project.json and a program.cs
- on windows, core is installed under C:\Program Files\dotnet
- use `dotnet restore` to restore project dependencies
- to run: `dotnet run`
- if you press `ctrl+~` in vscode, it will open up a command prompt in that same directory
- to convert into a web app:
    - add a dependency to project.json: "Microsoft.AspNetCore.Server.Kestrel": "1.0.1"
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
- To watch for code changes: dotnetwatch.  Lives on github.
    - Follow instructions for installation- essentially means making a change to project.json.
    - to run, use `dotnet watch run` - basically, it's watching the run task

## Video 2 - Intro to ASP.NET Core
- File -> New -> Projects -> ASP.Net Core Web Application
    - Options:
        - Empty
        - Web API
        - Web Application
- ```dotnet new -t web```
    - you can see this by using ```dotnet new -help```
- kestrel vs IIS
    - kestrel is the little cross-platform web server.  
        - it talks to dotnet directly.
    - for dev|testing, you can use kestrel automatically, but for prod, you want to have IIS in front of it as a reverse proxy.
        - you can also divide up responsibilities if you want, such that some static files could be served by IIS
        - IIS will restart kestrel if it crashes
- If you use IIS, you need to have a web.config
    - this will include the launch browser command, in case you need to change that
- Some useful middleware:
    - ``` .UseKestrel() ```
    - ``` .UseUrls("http://localhost:8081") ```
    - ``` .UseIISIntegration() ```
    - ``` .UseContentRoot(Directory.GetCurrentDirectory()) ```
    - ``` .UseStaticFiles() ``` but this one is better -> ``` .UseFileServer() ```
- The code for middleware files is all on github
- Setting environment:
    - In project properties, you set the an environment variable: `ASPNETCORE_ENVIRONMENT` to `Development`
    - But note that this will be setting the properties for the different build profiles (e.g. "IIS Express", or "Kestrel")
    - This will add a corresponding entry into your launchSettings.json
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
            .AddJsonFile("appsettings.json")
            .Build();
    }

    //called at runtime - configures the pipeline
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
- to compile into a nuget package, use `dotnet pack`
- versions in your project.json are by default set to 1.0.0

- Next section: MVC




