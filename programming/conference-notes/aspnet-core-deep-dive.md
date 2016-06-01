#ASPNET Core DeepDive with Glen Condron

- Hosting and the Relationship to IIS
    - ASP.NET Core applications are just their own servers which can respond to requests
    - If you want, you can stand it up behind IIS, essentially using it (IIS) as a reverse proxy.
    - Otherwise, you stand it up behind kestrel:
        - Listens to a port, converst to http context and passes it through the middleware
        - Uses the same networking stack as nodejs
        - Also involves Web Listener:
            - same as Kestrel, but windows-only, and uses a windows system assemmbly (Sys...something... I forgot)
            - You would only use this if you need something like windows authentication.
    - You specify the hosting configurations in the project.json .

- Overriding dependencies
    - This came up bc he accidentally broke the demo application bc there was a new build of the framework.
    - The project.json lets you specify the framework, and nuget knows the dependencies and will restore them.
    - However, you can add some "import" nodes to override the dependency-resolution from the default that nuget uses.
    
 - Creating a project from the CLI
 > dotnet new
 
 - Adding an entry-point:
 In public static void Main(string[] args)...
 
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
    
    
     
 