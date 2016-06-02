ASPNET Core Deep Dive
============
Notes from a talk at DevConnections Spring 2016 with Glen Condron

- Hosting
    - This block is a mixture of notes from Glen Condron and [this page](https://docs.asp.net/en/latest/fundamentals/servers.html?highlight=kestrel) and this [so question](http://stackoverflow.com/questions/35228846/asp-net-core-1-rc2-web-application-entry-point)
    - Process Model
        - ASP.NET Core applications are literally console applications, and as such, have their own entry points (Main)
        - They become ASP.NET applications when you call into the ASP.NET libraries
        - Bootstrapping process (as of RC2): The compiled console application will...  (roughly...)
            1. Start a managed application by creating a process
            2.  loading the Core CLR
            3. Calling your entry point.
    - Relationship with Web Servers:
        - Asp.Net Core is decoupled from any particular Web Server
        - In the past, IIS would host ASP.NET applications in-process
        - Now, the ASP.NET Core applications can be run out-of-process (in a separate process) from IIS.
            - In many cases, you might still place the application behind IIS, but in this regard IIS is functioning essentially as a reverse proxy.
                - Relies on HttpPlatformHandler module which will proxy the requests to the other process.
        - Asp.Net Core's primary interface with Web Servers via an *HttpContext* which they provide.
    - Web Servers
        - The Web Server you use is specified in middleware and project dependencies
        - ASP.NET Core ships with 2 web servers:
            1. Kestrel
                - Cross-Platform
                - Based on libuv (the n/w stack for node.js)
            2. WebListener
                - Windows-Only
                - Adds windows authentication
        - You can compare features of Kestrel vs WebListener in terms of [Request Features](https://docs.asp.net/en/latest/fundamentals/servers.html?highlight=kestrel#supported-features-by-server).
            - Request Features: Various interfaces which as a whole, represent all a web server's features/functionality
        - You can write your own web server as well if you want...
    - Reverse Proxies
        - IIS
        - NginX
        - Apache
    - Recommended Hosting Configurations:
        - Running on Windows Server:  ReverseProxy:IIS -> Kestrel or WebListener
        - Running on Linux Server: ReverseProxy:IIS or Nginx -> Kestrel  
        - Running in cloud (i.e. App Service): Kestrel or WebListener

- Overriding dependencies
    - This came up bc he accidentally broke the demo application bc there was a new build of the framework.
    - The project.json lets you specify the framework, and nuget knows the dependencies and will restore them.
    - However, you can add some "import" nodes to override the dependency-resolution from the default that nuget uses.
    
- Creating a project from the CLI
 > dotnet new
 
- Adding an entry-point:
    - In public static void Main(string[] args)...
 
 ```(C#)
 var host = new WebHostBuilder()
    .UseKestrel()
    .UseDefaultHostingConfiguration(args)   //acts on addtl configurations from the commandline or project.json
    .Configure(app => {
        app.Run(contextFromKestrel => contextFromKestrel.ResponseAsync("Hello Foo!"))
    })
    .Build();
    
 host.Run();
 ```
 
- A variation involving more middleware...
    - Add a StartUp.cs class (just a normal class)
    - Update the WebHostBuilder:
    
 ```(C#)
 var host = new WebHostBuilder()
    .UseKestrel()
    .UseStartUp<Startup>()
    .Build();
    
 host.Run();
 ```
 
- And inside the Startup Class (which is called Startup only as a convention... not required)
 
 ```(C#)
 public void Configure(IApplicationBuilder app)  //this part uses DI
 {
    //for the pipeline:  if it has /mvc in the route, then use the first option, otherwise respond with Hello Foo!
    app.Map("/mvc", mvcapp => {
        mvcapp.UseMvcWithDefaultRoute();    
    });
    
    app.Run(c => c.Response.WriteAsync("Hello foo!");   
 }
 ```
       
- Configuring DI in Startup class:
 
 ```(C#)
 public void ConfigureServices(IServiceCollction services)
 {
    services.AddMvc();
 }
 ```
 
- So is the middleware really best considered a pipeline?  
    - Well, since you can add branches (see above where some pipelines use mvc and others not), it's not exactly the best metaphor
    
- As you add services, be sure to add the pieces in the project.json dependencies node.

    ```(C#)
    public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)  //this part uses DI
    {
        loggerFactory.AddConsole(); 
        
        //for the pipeline:  if it has /mvc in the route, then use the first option, otherwise respond with Hello Foo!
        app.Map("/mvc", mvcapp => {
            mvcapp.UseMvcWithDefaultRoute();    
        });
        
        app.Run(c => c.Response.WriteAsync("Hello foo!");   
    }
    ```
 
- But note in the example above, we didn't have to wire this up in ConfigureServices... we just added an ILoggerFactory in the project.json.
    
- The order in which you specify the pipeline is important!
    - It's a processing chain
    - You need to know what you're doing.  But the middleware will often not change much.
    
- What about OWIN?
    - OWIN is a standard for middleware which is a predecessor
    - The new pipeline can use use OWIN middleware, but it is not strictly an OWIN pipeline.
    
- When you compile and run (dotnet run), the app is compiled to and run from bin/
    - in project.json, you add a setting ("content") to copy the static files into bin/
    
- More middleware methods:
    - UseStatusCodePagesWithReExecute("/error")
        - Lets you return the Http status code to 404 and then call the next node (where you can set the page content)

- Target Frameworks
    - netcoreapp1.0 : runs on the dotnet core clr  (application model)
    - netstandard1.0 : when you're building a portable class libarry (to support all the devices)  
    - [More info](https://github.com/dotnet/corefx/blob/master/Documentation/architecture/net-platform-standard.md)
