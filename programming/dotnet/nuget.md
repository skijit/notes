NuGet Notes
=====================

- [good getting started reference](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package)

## Package Contents

- NuGet packages (`.nupkg`) are just zip files whose contents follow certain conventions.
- NuGet packages can contain:
  - Manifest (`.nuspec`) 
  - Assembly(s)
  - Refs to other packages (i.e. can be a meta package which only links to other dependencies) or it can be a meta-package only containing other dependencies
  - Other files:
    - debugging symbols
  - Readme.txt
    - displayed when the package in installed
- High-level steps:
  - [PLAN](#Plan-Contents): You decide which assemblies and other files to include in the package
  - [COMPILE](#Compile-Sources): Compile your code
  - [DESCRIBE](#Creating-The-Manifest): Create a manifest file to describe:
    - dependencies
    - version 
    - copyright
    - MSBuild stuff
  - [PACK](#Packing): Use `nuget pack` to put everything together in a `.nupkg` file (based on the manifest)
  - [PUBLISH](#Publishing): Deploy to a NuGet feed or gallery
  - Note: These steps require usage of the [NuGet CLI](https://docs.microsoft.com/en-us/nuget/install-nuget-client-tools#nugetexe-cli), `nuget.exe`

## Plan Contents

- Best to have 1 assembly per nuget package (generally) unless you have a couple assemblies which aren't independently useful or are mutually interdependent

## Compile Sources
- In most cases, packaging is independent from compilation.
  - However, for .NET core projects using Visual Studio 2017, NuGet uses information from your project file.  Basically, you can use NuGet pack as a build target.  
  - [More info](https://docs.microsoft.com/en-us/nuget/reference/msbuild-targets)
- When you are distributing a class library as a nuget package, it is best to to select a .NET Standard class library.
  - A class library that targets the .NET Standard 2.0 allows your library to be called by [any .NET implementation that supports that version of .NET Standard](https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support).    

## Creating The Manifest
- There are a variety of...
  - required and optional properties that can be used in the Manifest...
  - methods for creating the manifest...

### Manifest File Format

- nuspec file (aka the manifest):
  - [nuspec reference is here](https://docs.microsoft.com/en-us/nuget/reference/nuspec)
  - xml
  - describes contents
  - explains how to build the package and how to install it into a project
  - Required Properties:
    - Package identifier (`<id>`): unique across the gallery that hosts the package
      - Best to use a namespace, prefixed by your company.
    - Specific version number in the form: *Major.Minor.Patch-[Suffix]* where -suffix identifies pre-release versions
      - Note that when resolving dependencies, and in general, NuGet only deals with package versions, not DLL versions.
    - Package title as it should appear on the host
    - Author and Owner information
    - Long description
  - Common optional properties:
    - Release notes
    - Copyright
    - Short description for Package Manager UI in Visual Studio
    - LocalID
    - Home page and license URLS
    - Icon URLS
    - lists of dependencies and references
    - Tags that assist in gallery searches
  - Package type property can be set in `<packageTypes\packageType>` element.
    - **Dependency**:
      - Default
      - Adds build or run-time assets
      - For backwards compatibility, don't set this.
    - **DotnetCliTool**:
      - extensions to the .NET CLI and invoked from the command line.
      - only works in .NET core projects.
    - **Custom type package**:
      - use an arbitrary type identifier that is like the package Id.
      - these are not recognized by the NuGet Package Manager in Visual Studio though.
  - Example nuspec file:

  ```(xml)
  <?xml version="1.0"?>
  <package xmlns="http://schemas.microsoft.com/packaging/2013/05/nuspec.xsd">
      <metadata>
      <!-- The identifier that must be unique within the hosting gallery -->
      <id>Contoso.Utility.UsefulStuff</id>

      <!-- The package version number that is used when resolving dependencies -->
      <version>1.8.3-beta</version>

      <!-- Authors contain text that appears directly on the gallery -->
      <authors>Dejana Tesic, Rajeev Dey</authors>

      <!-- Owners are typically nuget.org identities that allow gallery
              users to easily find other packages by the same owners.  -->
      <owners>dejanatc, rjdey</owners>

      <!-- License and project URLs provide links for the gallery -->
      <licenseUrl>http://opensource.org/licenses/MS-PL</licenseUrl>
      <projectUrl>http://github.com/contoso/UsefulStuff</projectUrl>

      <!-- The icon is used in Visual Studio's package manager UI -->
      <iconUrl>http://github.com/contoso/UsefulStuff/nuget_icon.png</iconUrl>

      <!-- If true, this value prompts the user to accept the license when
              installing the package. -->
      <requireLicenseAcceptance>false</requireLicenseAcceptance>

      <!-- Any details about this particular release -->
      <releaseNotes>Bug fixes and performance improvements</releaseNotes>

      <!-- The description can be used in package manager UI. Note that the
              nuget.org gallery uses information you add in the portal. -->
      <description>Core utility functions for web applications</description>

      <!-- Copyright information -->
      <copyright>Copyright ©2016 Contoso Corporation</copyright>

      <!-- Tags appear in the gallery and can be used for tag searches -->
      <tags>web utility http json url parsing</tags>

      <!-- Dependencies are automatically installed when the package is installed -->
      <dependencies>
          <dependency id="Newtonsoft.Json" version="9.0" />
      </dependencies>
      </metadata>

      <!-- A readme.txt to display when the package is installed -->
      <files>
          <file src="readme.txt" target="" />
      </files>
  </package>
  ```

- You can also include dependencies directly into the package using the `include` and `exclude` attributes on the `dependency` element.

###  Method 1: From Convention-Based Working Directory

- You can create a directory with all the contents you want in the package and then the manifest doesn't have to specify explicitly which files should be included in the package.
  - Packing will automatically add all the files in the folder (recursively), except for folder which begin with `.`
- Folder conventions:
  - **Root**: location for readme.txt
  - **lib/{tfm}**: Assemblies, documentaion, and symbol files.
    - *TFM* refers to Target Framework Moniker, basically the framework version you're using.
      - examples: net46, net461, uap, netcore
    - See [here](https://docs.microsoft.com/en-us/nuget/create-packages/supporting-multiple-target-frameworks) for more TFM info.
  - **runtimes**: Architecture-specific assembly, symbol, and native resource files.
    - See [here](https://docs.microsoft.com/en-us/nuget/create-packages/supporting-multiple-target-frameworks) for more info.
    - examples: win10-arm, win10-x86, win10-x64
    - you'll also put these in subfolders of *native* or *lib*
  - **content**: arbitrary files that will get copied to the project's root. 
    - To have the package add an image in the application's /images folder, place it in the package's content/images folder.
  - **build**: MSBuild .targets and .props files
  - **tools**: Powershell scripts and programs accessible from package manager console.
- Once you have the desired folder structure, run `nuget spec` and the manifest will be created.
  - Some placeholders might still need to be edited in this manifest.
  - [Placeholder reference](https://docs.microsoft.com/en-us/nuget/reference/nuspec#replacement-tokens)

### Method 2: From an assembly DLL
- run `nuget spec <assembly-name>.dll`
- This replaces a few placeholders in the manifest with specific values in the assembly.
  - `<id>` property will be set to the assembly name
  - `<version>` property will be set to the assembly version.

### Method 3: From a Visual Studio Project
- Run in folder containing a project file `<project-name>.csproj`:  `nuget spec`
- Conveniently, when you base a manifest off a `.csproj` file, other packages that have been installed are automatically referenced as dependencies.
- When you create a nuspec from a Visual Studio project, the manifest contains tokens (symbol delimited by `$` on both sides) that are replaced with information from the project **when the package is built**.
  - For specific mappings of project files properties to manifest placeholders, see [here](https://docs.microsoft.com/en-us/nuget/reference/nuspec#replacement-tokens)
- There are integrated methods for creating, packing, and publishing packages via Visual Studio 2017
  - [documentation here](https://docs.microsoft.com/en-us/nuget/quickstart/create-and-publish-a-package-using-visual-studio)
  - I've heard it's rather buggy though, so might be best to stay away from the packing/publishing at least.
    - TODO: any experiences?
  
### Method 4: From New file with default values
- the most manual method
- run with `nuget spec [<package-name>]`
  - if you omit *package-name*, `Package.nuspec` is created
- resulting file has lots of placeholders
  

## Package Versioning in NuGet and in General
- [Package Versioning In Nuget](https://docs.microsoft.com/en-us/nuget/reference/package-versioning)
- Format: Major.Minor.Patch[-Suffix]
  - Major: Breaking changes
  - Minor: New features, but backwards compatible
  - Patch: Backwards compatible bug fixes only
  - Suffix: an optional prerelease version
    - alpha
    - beta
    - rc
  - [Semantic version 1.0 info](http://semver.org/spec/v1.0.0.html)
- NuGet 4.3 also supports [semantic version 2.0.0](http://semver.org/spec/v2.0.0.html)
  - changes include:
    - leading zeros are not accepted
    - minor version numbers must be incremented in API is marked as deprecated
- "DLL Hell" can refer to:
  - Breaking applications by updating a shared dll
  - When versioning policy is so tight that two components (A, B) can't be used because they depend on different versions of the same componet (X)
- Nuget addresses this by only doing bin deployment:
  - everything is application specific
  - nothing is installed machine wide (there is a machine-wide cache, but no GAC)
- Unification vs Side by Side:
  - if you need to use two different versions of the same DLL, there are 2 competing resolution strategies:
    - Side By Side: 
      - X.dll v1.0 and X.dll v1.1 both run at the same time
      - Doesn't work well bc the bin folder can only contain one file named X.dll
        - Workarounds would violate a number of assumptions basic tooling and components make.
    - Unification:
      - Pick one version
      - This is what NuGet uses
- Nuget deals only with package versions, not assembly versions
- Nuget always tries to install the lowext version that satisfies requirements
  - That's why it's good to always select a lower bound on your dependency versions
- Strong Names and Binding
  - When an assembly has a strong name, it's very hard to use another version of that assembly
    - Therefore apps can break
  - To solve this problem, you can specify *Binding Redirects* which  go in your web.config or app.config and instruct your runtime to accept a different version of an assembly.

  ```(xml)
  <runtime>
  <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
  <dependentAssembly>
  <assemblyIdentity name="X"
  publicKeyToken="032d34d3e998f237" culture="neutral" />
  <bindingRedirect
  oldVersion="0.0.0.0-2.0.1.5" newVersion="2.0.1.5" />
  </dependentAssembly>
  </assemblyBinding>
  </runtime>
  ```
  
## Packing
- When using a manifest based on a Visual Studio project, run: `nuget pack <project-name>.csproj`
  - This will do placeholder replacement
- When using a different manifest-generation method, run `nuget pack <project-name>.nuspec`
- Additional options:
  - `nuget pack MyProject.csproj -IncludeReferencedProjects`
    - recursively adds any referenced projects as dependencies
  - `nuget pack MyProject.csproj -properties Configuration=Release`
    - updates your build configuration, otherwise it will use the default (typically *Debug*)
  - `nuget pack MyProject.csproj -symbols`
    - Includes debugging symbol files

## Publishing
- There are 2 different procedures for publishing:
  - To an http exposed gallery, such as nuget.org
    - Not covered here - but lots of sources describing this.
    - Usually requires you have a developer key
  - To a local feed (typically to a folder or UNC path)
- Publishing to a UNC-exposed feed: 
  - uses [nuget add](https://docs.microsoft.com/en-us/nuget/tools/cli-ref-add): `nuget add <packagePath> -Source <sourcePath> [options]`
  - `<sourcePath>` specifies the folder-based package source to which the package will be added
  - [Options documentation](https://docs.microsoft.com/en-us/nuget/tools/cli-ref-add#options)    
  - Example: `nuget add foo.nupkg -Source \\ricwebprd\newMarketNuGet`

## NuGet CLI and General Behavior
- In most of nuget operations, aside from package install, probably the CLI is going to be the better bet.
- [Good reference](https://docs.microsoft.com/en-us/nuget/tools/nuget-exe-cli-reference)
-  When you install a package into your project, the identity and version of the package is typically recorded in either:
  - project file (<- this is default for NuGet 4.0>)
  - packages.config
- Before you install a project, NuGet will try to install the package from your cache.
- NuGet also verifies that your project is compatible with the supported frameworks of the package.
- Package installation methods:
  - dotnet CLI: `dotnet install <package_name>`
    - will expand its contents into a folder in the current directory
    - add reference to the project file
  - visual studio package manager: 
    - installs package and adds reference to the project file
  - nuget cli: `nuget install <package_name>`
    - downloads package and expands contents into a folder in the current directory
    - can also download all packages listed in a packages.config
    - downloads and installs dependencies
    - **makes no changes to project files**
- General Installation notes:
  - If the package is being installed into a Visual Studio or .NET core project, only files relevant to the projects fraework are expanded.
    - When using the nuget CLI, all assemblies are added
  - When the project is installed via Visual studio ro the dotnet CLI, the reference is added to the appropriate project file (or packages.config depending on the project type/version)
- Nuget Caches:
  - There are a variety of caches...
    - to avoid downloading already installed packages
    - to provide offline support
  - NuGet falls back to installing from the cache when installing or reinstalling packages without a connection.
  - To list caches: `nuget locals all -list`
  - You will see something like:
  
  ```
  http-cache: C:\Users\user\AppData\Local\NuGet\v3-cache   #NuGet 3.x+ cache
  packages-cache: C:\Users\user\AppData\Local\NuGet\Cache  #NuGet 2.x cache
  global-packages: C:\Users\user\.nuget\packages\          #Global packages folder
  temp: C:\Users\user\AppData\Local\Temp\NuGetScratch      #Temp folder
  ```

  - to clear a cache: `nuget locals <cache-name> -clear`
- NuGet config files
  - Config files exist at the following levels and are applied from general to specific:
    - project: 
      - current folder or any folder up to the drive root
    - user
      - Windows: %APPDATA%\NuGet\NuGet.Config
      - Mac/Linux: ~/.nuget/NuGet.Config
    - machine
      - Windows: %ProgramFiles(x86)%\NuGet\Config
      - Mac/Linux: $XDG_DATA_HOME (typically ~/.local/share)
  - Format of a `Nuget.Config` is XML with key/value pairs
  - You can also the nuget CLI to change configurations:    
    - by default, changes are made to the user-level
    - values and properties are case-sensitive
    - better to not edit directly, as malformed XML will be ignored silently
    - example: `nuget config -set repositoryPath=c:\packages`
  - common configurations
    - dependencyVersion: gives various rules for deciding (based on semantic versioning) which dependency version to install:
      - e.g. Lowest, HighestPatch, HighestMinor, Highest
    - globalPackagesFolder: The location of the default global packages folder.
      - Default: %USERPROFILE%\.nuget\packages (Windows), ~/.nuget/packages (Mac/Linux)
    - repositoryPath: The location in which to install NuGet packages instead of the default $(Solutiondir)/packages folder. 
      - A relative path can be used in project-specific Nuget.Config files
    - defaultPushSource: Identifies the URL or path of the package source that should be used as the default if no other package sources are found for an operation.
    - various http proxy fields
 - Dependency Resolution:  
  - Any time a package is (re)installed/restored, NuGet installs (recursively) all dependent packages
  - Only one version of a given package can be used in a project (unlinke NPM)
  - Rules need to exist so that nuget can infer the proper version of a package to install
    - Lowest Applicable Version
    - Nearest Wins: if there are > 1 versions of the same package, the one which has the fewest hops between it and the application wins
    - Cousin Dependency: if there's still a conflict from nearest wins, the application should add a direct reference to a package to specify which version to use
  - Dependencies are resolved at install time, and the most suitable package version is written into the `packages.config` file.
  - Floating dependency notation (ie wildcards)
    - 4.* means use the latest 4.x version
    - 6.0.* use the latest 6.0.x version
- Package References in project files:
  - package references manage refs in the project files (rather than packages.config) in the `<PackageReference>` node.
    - gives you more fine-grained control than packages.config
    - gives you better integration with MSBuild
  - package references are used by default in .NET Core projects, .NET Standard projects, and UWP
  - you can manually copy your packages.config entries to your project file, if you want.
  - looks like this:

  ```(xml)
  <ItemGroup>
    <!-- ... -->
    <PackageReference Include="Contoso.Utility.UsefulStuff" Version="3.6.0" />
    <!-- ... -->
  </ItemGroup>
  ```

  - Version specification notation:

  | Notation | Applied Rule | Description |
  | :---: | :---: | :---: | 
  | 1.0	| 1.0 ≤ x	| Minimum version, inclusive |
  | (1.0,) | 1.0 < x	| Minimum version, exclusive |
  | [1.0] |	x == 1.0 | Exact version match |
  | (,1.0] | x ≤ 1.0 |	Maximum version, inclusive |
  | (,1.0) | x < 1.0	| Maximum version, exclusive |
  | [1.0,2.0]	| 1.0 ≤ x ≤ 2.0	| Exact range, inclusive |
  | (1.0,2.0)	| 1.0 < x < 2.0	| Exact range, exclusive |
  | [1.0,2.0)	| 1.0 ≤ x < 2.0	| Mixed inclusive minimum and exclusive maximum version |
  | (1.0)	| invalid |	invalid |

  - If you are using a dependency purely as a dev tool, you can specify it as a [PrivateAsset](https://docs.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#controlling-dependency-assets)
  - Package Reference Condition:
    - you can use MSBuild variables to define conditional expressions over whether a package is included
  - Creating a local feed:
    - Just add the pathname of the folder
    - call the `nuget sources` command or add it to the list of sources using the package manager UI  

## Other Tools
- [NuGet Package Explorer](https://github.com/NuGetPackageExplorer/NuGetPackageExplorer)
  - Create, update and deploy Nuget Packages with a GUI


  

  

