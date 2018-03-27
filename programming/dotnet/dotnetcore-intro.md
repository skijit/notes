.NET Core Introduction
====================

- Install the .NET Core SDK (I'm starting with 2.0)
- First thing to get familiar with is the [.NET Core CLI Commands](https://docs.microsoft.com/en-us/dotnet/core/tools/?tabs=netcore2x)

## .NET Core CLI
- `dotnet new`
  - Creates a new project, configuration file, or solution based on the specified template.
  - `dotnet new <TEMPLATE> [--force] [-i|--install] [-lang|--language] [-n|--name] [-o|--output] [-u|--uninstall] [Template options]`
  - Template options:
    - **console**
    - **classlib**
    - **web**: aspnet core empty
    - **mvc**: aspnet core web app (wvc)
    - **angular**: aspnet core with angular
    - **webapi**
    - **sln**: solution file
    - **webconfig**
    - **nugetconfig**
    - **globaljson**
  - ` \--force`: overwrite files
  - ` \-i|--install <PATH|NUGET_ID>`: Installs a source or template pack from the PATH or NUGET_ID provided.
  - ` lang|--language {C#|F#|VB}`
  - ` \-n|--name <OUTPUT_NAME>`: The name for the created output. If no name is specified, the name of the current directory is used.
  - ` \-o|--output <OUTPUT_DIRECTORY>`: Location to place the generated output. The default is the current directory.
  - Template Options:
    - ` --no-restore`: Doesn't perform an implicit restore (ie nuget packages) during project creation.
    - ` -f|--framework <FRAMEWORK>` - for classlib - specifies the framework to taret (e.g. netcoreapp2.0, netstandard2.0)
    - ` --sdk-version <VERSION_NUMBER>` - for globaljson template - Specifies the version of the .NET Core SDK to use in the global.json file.
    - ` --use-launch-settings` - for web -  Includes launchSettings.json in the generated template output.
      - launchSettings allows you to create different launch profiles (for running in different environments), which include values such as environment variables, etc.
    - there are a bunch of authentication settings for webapi, mvc, and razor projects [see here](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new?tabs=netcore2x)
- `dotnet restore`
  - uses NuGet to restore dependencies as well as project-specific tools that are specified in the project file. By default, the restoration of dependencies and tools are performed in parallel.
  - nuget feeds specified by 3 locations:
    - default: NuGet.config in same location as CLI tools installed.  
    - NuGet.config file in project directory
    - On command line for `dotnet restore`
  - this is typically implicitly run when you execute a `new`, `build`, `run`, `test`, `publish`, `pack`
- `dotnet build`
  - Builds a project and all of its dependencies.
  - `dotnet build [<PROJECT>] [-c|--configuration] [-f|--framework] [--force] [--no-dependencies] [--no-incremental]
    [--no-restore] [-o|--output] [-r|--runtime] [-v|--verbosity] [--version-suffix]`
  - output: project's code in IL, file extension is dll, symbol files for debugging (.pdb), dependencies file (.deps.json) that lists runtime dependencies, and a runtime config (.runtimeconfig.json) that specifies framework version used by the application
  - nuget packages are linked from the nuget cache, and not output
    - therefore the project is not in a runnable form since it is still disconnected from it's dependencies
    - for this, you need to use `dotnet publish`
  - under the hood, it uses MSBuild
    - also accepts MSBuild options
    - see [here](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-command-line-reference) for MSBuild Command Line ref
  - `PROJECT`: if project is not specified, it searches current working directory for any file extension that ends in `proj` (e.g. .csproj, etc.)
  - ` -c|--configuration {Debug|Release}`
  - ` --no-incremental` forces a clean before incremental build
  - ` -f|--framework <FRAMEWORK>` compiles for a specific framework.  E.g.
    - `netstandard2.0`  
    - `netcoreapp2.0`
    - `net471`
  - ` -o|--output <OUTPUT_DIRECTORY>` Directory in which to place the built binaries. You also need to define `--framework` when you specify this option.
  - ` -v|--verbosity <LEVEL>`  values are:
    - q[uiet]
    - m[inimal]
    - n[ormal]
    - d[etailed]
    - diag[nostic]
  - ` -r|--runtime <RUNTIME_IDENTIFIER>` specifies a target runtime, which is used to identify platform-specific resources in nuget packages.  e.g.
    - linux-x64
    - ubuntu.14.04-x64
    - win7-x64
    - osx.10.12-x64
    - [for more info](https://docs.microsoft.com/en-us/dotnet/core/rid-catalog)
    - **Question**: what is the default output location- the bin folder in your project, presumably?
  - [examples are here](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-build?tabs=netcore2x#examples)
- `dotnet publish`
  - Packs the application and its dependencies into a folder for deployment to a hosting system.
  - `dotnet publish [<PROJECT>] [-c|--configuration] [-f|--framework] [--force] [--manifest] [--no-dependencies] [--no-restore] [-o|--output] [-r|--runtime] [--self-contained] [-v|--verbosity] [--version-suffix]`
  - creates a directory with the following output:
    - DLL
    - .deps.json
      - contains refs to all the dependencies of the project
    - .runtime.configuration.json
      - specs the shared runtime version the application expects and other config options for runtime (e.g. garbage collection type)
    - application dependencies copied from nuget cache
  - this is the only officially supported way to prepare a project for hosting
  - The actual directory structure of an asp.net project varies depending on whether it's framework-dependent or self-contained.
    - see [here](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/directory-structure) for more info
    - self-contained structure looks like this:
      - logs/ (if included in publishOptions)
      - refs/
      - Views/ (if included in publishOptions)
      - wwwroot/ (if included in publishOptions)
      - .dll files
      - myapp.deps.json
      - myapp.exe
      - myapp.pdb
      - myapp.PrecompiledViews.dll (if precompiling Razor Views)
      - myapp.PrecompiledViews.pdb (if precompiling Razor Views)
      - myapp.runtimeconfig.json
      - web.config (if included in publishOptions)
  - `  -c|--configuration {Debug|Release}`
  - `  -f|--framework <FRAMEWORK>`
  - `  --self-contained`
    - Publishes the .NET Core runtime with your application so the runtime doesn't need to be installed on the target machine. 
    - If a runtime identifier is specified, its default value is true
  - `  --version-suffix <VERSION_SUFFIX>`
    - Defines the version suffix to replace the asterisk (*) in the version field of the project file.
  - `  --manifest <PATH_TO_MANIFEST_FILE>`
    - This is a path to a file which gives you a custom set of dependencies to include, primarily because you know the target deployment will include shared packages in some specified location.  The point is to make applications more lightweight.
    - this manifest file is what is created by the `dotnet store` command
  - `o|--output <OUTPUT_DIRECTORY>`
    - path for the output directory
    - defaults 
      - ./bin/[configuration]/[framework]/[runtime] for a self-contained deployment
      - ./bin/[configuration]/[framework]/ for a framework-dependent deployment
  - examples are [here](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore2x#examples)

- `dotnet run`
  - lets you run from source code without any explicit compile or launch commands.
    - combines `dotnet` and `dotnet build` and `dotnet restore`
  - `dotnet run [-c|--configuration] [-f|--framework] [--force] [--launch-profile] [--no-build] [--no-dependencies] [--no-launch-profile] [--no-restore] [-p|--project] [--runtime] [[--] [application arguments]]`
  - mostly for development environments where you have a project.    
  - Output files are written into the default location, which is bin/<configuration>/<target>. 
  - For example if you have a netcoreapp1.0 application and you run dotnet run, the output is placed in bin/Debug/netcoreapp1.0
  - If the project specifies multiple frameworks, then you need to use the `-f` switch
  - [examples](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-run?tabs=netcore2x#examples)

- `dotnet pack`
  - Packs the code into a NuGet package.
  - You can also use the NuGet CLI for this

- `dotnet`
  - This is to run framework-dependent assemblies
  - e.g. `dotnet myapp.dll`

- `dotnet clean`
  - cleans the output of a project
- `dotnet sln`
  - lets you add, remove, or list the projects in a .NET core solution file
- `dotnet store`
  - helps you build a runtime package store which (I think) is a cache of binaries installed on a target machine.
    - so you get a hybrid SCD / FDD

## Self-Contained vs Framework-Dependent Deployments

- 2 types of deployments
  1. Framework-Dependent
  2. Self-contained
- Framework-dependent (FDD)
  - requires a system-wide installation of the .NET core framework on the target system
  - app only contains it's code and any 3rd party dependencies outside the framework
  - contain dll files that are launched by using `dotnet` from command-line
    - `dotnet app.dll`
  - Advantages
    - Your build doesn't have to target the specific operating system
    - Deployment is small
    - multiple apps reusing the same .NET core framework for a total smaller footprint
  - Disadvantages
    - Your app can only run on the version of .NET core that you target - or a later version
    - Framework (library or runtime) changes may affect your app
- Self-Contained (SCD)
  - Default deployment model for .NET Core
  - Includes 3rd party dependencies and the version of Core libraries which you're using and the Core runtime
    - Doesn't include any native dependencies, so be sure to include these separately     
  - Contains an executable which is a renamed version of the Core host, and a corresponding named dll file which the application
  - Advantages
    - You have control over the version of .NET Core libraries and runtime that are used
  - Disadvantages
    - Since the framework is included in your deployment package, you select target platforms for deployment packages in advance
    - if you have multiple apps deployed to a single server, will result in a larger footprint
  
## CLI-Created ASP.NET Core project

- In some root development directory, run: `dotnet new mvc -n test-mvc`
- `cd` to the new test-mvc directory and start vscode in that folder: `code .`
- click open the Startup.cs file.  If you get a suggestion to install C# tools or extensions, select 'yes'.
  - when loading extensions, etc. are complete (you can monitor the progress in the terminal), restart VSCode and go back to Startup.cs
  - You will also likely get the warning "Required assets to build and debug are missing from 'MvcMovie'. Add them?" select Yes!
  - restart vscode again and go to Startup.cs
- press debug (F5) to build and debug the program.
  - this will start hosting the initial site with Kestrel
  - your browser will open up to http://localhost:5000/.

  
