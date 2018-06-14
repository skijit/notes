Logging in ASP.NET Core 2.1
======================

- [ms docs](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-2.1&tabs=aspnetcore2x)
- [nlog getting started](https://github.com/NLog/NLog.Web/wiki/Getting-started-with-ASP.NET-Core-2)

## Basic Concepts

- **Providers**
  - ASP.NET Core provides some basic logging abstractions, `ILogger` and `ILoggerFactory`, both from Microsoft.Extensions.Logging.Abstractions namespace
  - Your application code will primarily use references to the these abstractions
  - The Dependency Injection will inject concrete classes (or Providers) which implement the abstractions.
  - You choose and configure the providers primarily whilst setting up the application host builder.
  - There are built-in providers and 3rd party providers available
  - The term *Provider* doesn't refer to the specific medium (files, db, etc), destination (log file A, log file B), or filtering rules.
    - The specific file / destination for a log is called a *Target* (for NLog)
    - The provider lets you configure all of that, but most importantly, it provides an implementation of the Logging Abstractions
### Log Message Components
- Each log message has the following 4* attributes:
  - Log Level
  - Category
  - Event ID (optional)
  - Message Template
- **Log Level**
  - Trace
  - Debug
  - Info
  - Warning
  - Error
  - Critical
    - NLog calls this *Fatal*
- **Category**
  - This is a string passed into the log statements
  - By convention, this usually refers to the name of the associated class
- **Event Id**
  - This is typically an integer, defined by the local application, to refer to some higher-level function or feature.
    - E.G. GetItems, DeleteItem, etc.
  - The Event ID can associate multiple log statements with the same function.
- **Message Template**
  - Based on [Structured Logging](https://softwareengineering.stackexchange.com/questions/312197/benefits-of-structured-logging-vs-basic-logging) concept:
      - You don't typically pass in just a string, but rather a string template with placeholders and their replacements
      - Certain providers will allow you to query the data based on their placeholders
  - **Exception Logging**
    - The ILogger logging calls have overloads which accept Exceptions as parameters and the providers usually have special logic for how to deal with these.
- **Logging Scopes**
  - The basic logging abstractions also define the concept of a *Scope*, which is a way of associating a variety of log entries with a message/ID.
  - All of the log calls within a Scope are organized within a *Using* block.    

### Log Filtering
- You can define rules which filter which log entries are acted on (ie logged) by the provider.
- These rules are based on:
  - Provider Name
  - Log Level
  - Category
- These rules can be defined with:
  - Configuration
  - Rules
- There can be overlap in how these rules apply to a given message.  In the end, precedence will be given to the most specific provider.

## Built-in Providers
- The built-in providers live in Microsoft.Extensions.Logging namespace
- **Console**
  - Sends output to the console (std out)
- **Debug**
  - Windows, sends this output to System.Diagnostics.Debug
  - Linux, send this output to /var/log/message.
- There are others too, but less useful / platform-specific...

## Core Logging Setup
- 2 places where you set up logging:
  1. Host Building (**Required**)
    - This sets up the Provider DI
  2. Program.Main (**Optional**)
    - You might want to send some diagnostic messages within `main()`, before it makes it to host building or middleware config
    - See the nlog notes below for example
- Host Building Example Setup:
  - Most of the work happens in ConfigureLogging(), but you need to understand the context...

  ```(csharp)
  public static void Main(string[] args)
  {
      var webHost = new WebHostBuilder()
          .UseKestrel()
          .UseContentRoot(Directory.GetCurrentDirectory())
          .ConfigureAppConfiguration((hostingContext, config) =>
          {
              var env = hostingContext.HostingEnvironment;
              config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
              config.AddEnvironmentVariables();
          })
          .ConfigureLogging((hostingContext, logging) =>
          {
              logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
              logging.AddConsole();
              logging.AddDebug();
          })
          .UseStartup<Startup>()
          .Build();

      webHost.Run();
  }
  ```

- This is a more explicit approach to Host building.
  - Instead of using a generic `WebHostBuilder()`, a common choice is the call to `CreateDefaultBuilder()`.
  - [CreateDefaultBuilder()](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.webhost.createdefaultbuilder?view=aspnetcore-2.1) does the following:
    - use Kestrel as the web server 
    - configure it using the application's configuration providers
    - set the ContentRootPath to the result of GetCurrentDirectory(), 
    - load IConfiguration from 'appsettings.json' and 'appsettings.[EnvironmentName].json' 
    - load IConfiguration from User Secrets when EnvironmentName is 'Development' using the entry assembly, 
    - load IConfiguration from environment variables, 
    - configures the ILoggerFactory to log to the **Console** and **Debug** output, 
    - enables IIS integration, 
    - enables the ability for frameworks to bind their options to their default configuration sections. 
      - E.G. the 3rd party logging providers will know to read the `Logging` section of the config file
  - This code snippet handles the wireup of configuration sources and adds the Console and Debug logging providers.

- Another approach could be:

```(csharp)
var host = WebHost
            .CreateDefaultBuilder(args)
            .UseStartup<Startup>()
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
            })
            .UseNLog()  // NLog: setup NLog for Dependency injection
            .Build();            
```

- Here's an example Logging section of the `appsettings.json`:

```(json)
{
  "Logging": {
    "Debug": {
      "LogLevel": {
        "Default": "Information"
      }
    },
    "Console": {
      "IncludeScopes": false,
      "LogLevel": {
        "Microsoft.AspNetCore.Mvc.Razor.Internal": "Warning",
        "Microsoft.AspNetCore.Mvc.Razor.Razor": "Debug",
        "Microsoft.AspNetCore.Mvc.Razor": "Error",
        "Default": "Information"
      }
    },
    "LogLevel": {
      "Default": "Debug"
    }
  }
}
```

- There's a lot more stuff you can do in ConfigureLogging()...
  - including programmatically setting up filter rules or any other setting that might be left to configuration

## Example Logging Calls
- see the top source- no reason to copy this.
- also, check out the [ILogger docs with all the methods](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.logging.ilogger?view=aspnetcore-2.1)

## NLog 

### Config Example
- Example of logging before setting up the web builder host:

```(csharp)
public static void Main(string[] args)
{
    // NLog: setup the logger first to catch all errors
    var logger = NLog.Web.NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
    try
    {
        logger.Debug("init main");
        BuildWebHost(args).Run(); 
    }
    catch (Exception ex)
    {
        //NLog: catch setup errors
        logger.Error(ex, "Stopped program because of exception");
        throw;
    }
    finally
    {
        // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
        NLog.LogManager.Shutdown();
    }
}
```

- [nlog config file documentation](https://github.com/NLog/NLog/wiki/Configuration-file)
- root element will always be `<nlog>`.  Possible children are:
  - `<targets />` (REQUIRED) – defines log targets/outputs
  - `<rules />` (REQUIRED) – defines log routing rules
  - `<extensions />` (OPTIONAL) – loads NLog extensions from the *.dll file
  - `<include />` (OPTIONAL) – includes external configuration file
  - `<variable />` (OPTIONAL) – sets the value of a configuration variable

### Targets
- See [here](https://github.com/NLog/NLog/wiki/Targets)
- These are the destinations for log messages
  - Examples: File, Memory, MethodCall, Network, etc.
- Each `<target>` entry requires these 2 attrs:
  - `name`: the target name
  - `type`: see above
- Each type of target has a variety of other type-specific attributes
### Rules
- This is the routing table for how you associate log messages with particular targets
- Example rules config section:

```(xml)
<rules>
  <!--All logs, including from Microsoft-->
  <logger name="*" minlevel="Trace" writeTo="allfile" />

  <!--Skip non-critical Microsoft logs and so log only own logs-->
  <logger name="Microsoft.*" maxLevel="Info" final="true" /> <!-- BlackHole without writeTo -->
  <logger name="*" minlevel="Trace" writeTo="ownFile-web" />
</rules>
```

- Each logger element accepts the following attrs:
  - `name`: 
    - This should match the ILogger category field (which is by convention, the associated class)
    - You can use wildcards or partial matches here
  - `minLevel`: min level for a match
  - `maxLevel`: max level for a match
  - `level`: single level for a match
  - `writeTo`: the associated **Target** name
    - can be a comma-separated list
    - **TRICK**: if there is no writeTo specified, that's like sending it to /dev/null
  - `final`: make this the last rule processed
  - `enabled`: is disabled if set to false
- Examples:
  - All messages from the Class1 in the Name.Space whose level is Debug or higher are written to the "f1" target
  
  ```(xml)
  <logger name="Name.Space.Class1" minlevel="Debug" writeTo="f1" />
  ```

  - Messages from any class in the Name.Space namespace are written to both "f3" and "f4" targets regardless of their levels

  ```(xml)
  <logger name="Name.Space.*" writeTo="f3,f4" />
  ```

- When setting up your rules, consider that the Aspnet Core framework uses the same logging abstractions, so you might end up catching framework debug/trace messages if you're not careful.

### Layouts and Layout Renderers
- Layouts: texts with embedded tags delimited by ${ and }. 
- Layout Renderers: Said tags.  They can be used to insert pieces of contextual information into the text.
- These are specified in the targets.
- Example: Let’s assume, that we want to annotate each message written to the console with:
  - current date and time
  - name of the class and method that emitted the log message
  - log level
  - message text
- Solution:

```(xml)
<target name="c" xsi:type="Console"  layout="${longdate} ${callsite} ${level} ${message}"/>
```

- [more info on layouts](https://github.com/NLog/NLog/wiki/Layouts)
- [more info on layout renderers (placeholders)](https://github.com/NLog/NLog/wiki/Layout-Renderers)

### Troubleshooting Logging
- Add the following attributes to the `<nlog>` element:
  - internalLogLevel="Trace"
  - internalLogFile="/var/log/musicalweb/internal-nlog.txt"
  - internalLogToConsole="true"
  - internalLogIncludeTimestamp="true"

