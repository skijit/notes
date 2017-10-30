Explanation of .NET Core Parts
===============================

- Sources
  - [This blog](https://stackify.com/net-core-vs-net-framework/)
  - [.net core github page](https://github.com/dotnet/core)
  - [general .net guide](https://docs.microsoft.com/en-us/dotnet/standard/)
  - [.net glossary](https://docs.microsoft.com/en-us/dotnet/standard/glossary)


- questions
  - Core project but full runtime?
  - Compatibility layer?
    - How can asp.net core run full framework?
    - see [this](https://stackoverflow.com/questions/44136118/net-core-vs-asp-net-core)
  - what is the runtime?  how many are there?

- misc
  - .net standard library is what is available to all runtimes?

## High Level
- Multiple Implementations
  - A .NET app is developed for and runs in one or more implementations of .NET
- .NET Standard
  - an API spec common to different implementations
  - although some .NET implementations...
    - provide unshared/exclusive API's
    - do not fully support versions/features of .NET standard
- **Implementations** of .NET include:
  1. .NET Framework
    - Original, windows-based implementation
    - 4.5 and later implmenet the .NET Standard, meaning applications which target .Net standard can run on .NET Core
      - Also has windows-specific API's including WinForms and WPF.
  2. .NET Core
    - cross-platform (windows, mac, linux)
    - designed for server and cloud workloads at scale (also embedded/IOT workloads)
    - implements .net standard, meaning applications which target .NEt standard can run on .NET Core
  3. Mono
    - powers Xamarin and runs on Android, Mac, iOS, tvOS, and watchOS
    - designed for a small runtime, minimizing footprint
    - implements .net standard
    - Has a JIT and AOT (static) compiler
  4. UWP
    - designed for modern multi-device windows-based touch-enabled and/or IOT applications
        - attempts to unify the development model for supporting windows PC's, tablets, phablets, phones, XBox (i.e. "One Windows")
    - When using C# and Vb>NEt, the .NET API's are provided by .NET Core
- **Target Framework**
  - collection of API's an application relies on
  - it is NOT the same as the .NET implementation bc you can target, for instance, .NET Standard
- .NET implementations handle dependencies differently:
  - **System-installed**: E.G. .NET Framework installs packages on the system, including Application Framework API's like ASP.NET
  - **Package-installed**: E.G. .NEt Standard and .NET Core, frameworkd API's are defined by applications or libraries
- Common Features of All .NET Implementations
  - **.NET Runtime(s)**  
    - Execution environment for a managed program.  
      - Emphasis on *Managed*, we're not including the OS here
    - E.G. ...
      - CLR -> .NET Framework
      - CoreCLR -> .NET Core
      - .NET Native -> UWP
        - Almost the same as CoreRT.
      - Mono -> Xamarin.iOS, Xamarin.Android, Xamarin.Mac
  - **Application Framework(s)** (optional)
    - E.G. ...
      - ASP.NET -> .Net Framework
      - WPF -> .Net Framework
  - **Development Tools**
    - Infrastructure / Dev tools common tao all .NET Implementations...
      - The .NET languages and their compilers
      - The .NET project system (based on .csproj, .vbproj, and .fsproj files)
      - MSBuild, the build engine used to build projects
      - NuGet, Microsoft's package manager for .NET
      - Open-source build orchestration tools, such as CAKE and FAKE


    
## .NET Core
- Characteristics
  - Flexible deployments, side-by-side installations, etc.
  - Cross-platform
  - Command-line tooling for all major workloads
  - .NEt Standard compliant, making code portable (full) .NET framework 4.5+ and Mono (Xamarin)
  - Open source (ie free)
- Components include...
  - .NET Runtime (CoreCLR)
    - Type system
    - Assembly loading
    - GC
    - Native interop
  - Framework Libraries (CoreFx)
  - Tooling (CLI) for the SDK (Core SDK) and language Compilers (Roslyn)
  - `dotnet` app host which hosts the runtime, loads the assembly, and launche the app
- Application models
  - .NEt core OTB gives you one application model: console apps
  - Other application models can be stacked on .NET core
    - ASP.NET Core
    - Windows 10 (UWP)
    - Xamarin targing UWP
- Distributions Channels
  - download
  - nuGet

[continue here](https://docs.microsoft.com/en-us/dotnet/core/index)

### CoreCLR
- [src](https://github.com/dotnet/coreclr)

### CoreFx
- [src](https://github.com/dotnet/corefx)

### CLI
- [src](https://github.com/dotnet/cli)

### SDK
- [src](https://docs.microsoft.com/en-us/dotnet/core/sdk)

### Roslyn
- [src](https://github.com/dotnet/roslyn)


  
## .NET Standard

## .NET Compilation Model
- [src](https://stackoverflow.com/questions/34665026/whats-the-difference-between-net-coreclr-corert-roslyn-and-llilc)
- Roslyn is the .NET compiler (i.e. C#, VB.NET -> IL)
  - TODO: Roslyn's benefits
- There are a variety of ways to run IL
  - JIT 
    - Used by CLR and CoreCLR
  - .NET Native / CoreRT
    - Used by UWP    
    - Compiles the IL into a single self-contained executable
    - .NET Native
    - Primarily AOT
  - NGEN
    - Another AOT, like .NET Native, but executables are not self-contained and require external runtimes
  - LLILC
    - I think this will be used as an AOT compiler for CoreCLR - similar to .NET Native but cross-platform
