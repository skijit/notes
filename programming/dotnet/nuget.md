NuGet Notes
=====================

- package can contain code or it can be a meta-package only containing other dependencies
  - some packages just include debugging symbols
  - good idea to include a readme that is displayed when the package in installed
- steps
  - you decide which assemblies and other files to include in the package
  - create a manifest file (`.nuspec`) to describe:
    - dependencies
    - version 
    - copyright
    - MSBuild stuff
  - use `nuget pack` to put everything together in a `.nupkg` file.  
  - deploy

## Detailed Package Creation
- use the [nuget CLI](https://docs.microsoft.com/en-us/nuget/install-nuget-client-tools#nugetexe-cli) (nuget.exe) for all of this
- nuget packages are just zip files with a renamed extension
- In most cases, packaging is independent from compilation.
  - However, for .NET core projects using Visual Studio 2017, NuGet uses information from your project file.  Basically, you can use NuGet pack as a build target.  
  - [More info](https://docs.microsoft.com/en-us/nuget/reference/msbuild-targets)
- Best to have 1 assembly per nuget package (generally) unless you have a couple assemblies which aren't independently useful or are mutually interdependent
- nuspec file (aka the manifest):
  - [nuspec reference is here](https://docs.microsoft.com/en-us/nuget/reference/nuspec)
  - xml
  - describes contents
  - explains how to build the package and how to install it into a project
  - Required Properties:
    - Package identifier: unique across the gallery that hosts the package
    - Specific version number in the form: *Major.Minor.Patch-[Suffix]* where -suffix identifies pre-release versions
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

## Creating Nuspec file

###  Method 1: From Convention-Based Working Directory

### Method 2: From an assembly DLL

### Method 3: From a Visual Studio Project

- When you create a nuspec from a Visual Studio project, the manifest contains tokens that are replaced with information from the project when the package is built.

### Method 4: From New file with default values

  




  ## Package Versioning info
  - [src](https://docs.microsoft.com/en-us/nuget/reference/package-versioning)


  ## TODO
  - How does the global and local package caches work?


  

