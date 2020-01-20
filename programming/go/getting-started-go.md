Getting Started With Go
=================

## Windows Setup
- Install [GoLang](https://golang.org/)
  - Accept the defaults
- When completed, verify go has been added to your path by starting a new command prompt and issue:
  - `go --version`
    - note the various commands available
  - `echo $GOPATH`
- A Go Environment encourages all your projects at a single root, *workspace*
  - `Workspace` is the root level 
  - There are 2 subdirs to the workspace
    - `src`
      - will have all your project repository sources at the first level
    - `bin`
      - all the compiled code
  - `GOPATH` points at your workspace
- Install the VSCode Go Extension 
- In your shell, change your GOPATH (see workspace mgmt notes) to point at where you want to stick a test workspace
- make `src` and `bin` and in `src` create a `hello` dir and inside it, a `hello-world.go` file
- open the `src` in vscode and you'll be prompted by vscode to install various go tools - select 'get all'
  - this will drop the go tools executables into your workspace's `bin` and copy their corresponding code to your `src` dir in a hierarchy defined by the path of the repo (i.e. `github.com/whatever/stuff...`)
    - packages in the go standard library don't need to be referred to with this kind of *import path*, but other dependencies do
  - add code to hello-world:

  ```(go)
  package main

  import "fmt"

  func main() {
    fmt.Printf("hello, world\n")
  }
  ```

  - when you save, go-tools should clean and build it automatically
  - in your terminal, in the `hello` dir, execute `go build` to build the executable and leave it in the current directory
    - notice the executable is named after the directory: `hello`, not the file with the main() in it
- Read [this short, incredibly useful doc](https://golang.org/doc/code.html).  It covers:
  - building executables vs libraries
  - referencing other packages
  - import paths
  - build tools
  - and more!
- VSCode Tips
  - [basic settings which are available](https://code.visualstudio.com/docs/languages/go)
  - [some advanced stuff](https://github.com/Microsoft/vscode-go/wiki/GOPATH-in-the-VS-Code-Go-extension)
  - [setting up debugging](https://github.com/Microsoft/vscode-go/wiki/Debugging-Go-code-using-VS-Code)
    - install delve tool (may already have it)
    - set up your launc.json


  - There are a variety of Go-specific VSCode [settings](https://github.com/Microsoft/vscode-go/wiki/GOPATH-in-the-VS-Code-Go-extension) you can place in your user or workspace file to avoid having all your go projects rooted in the same place.

## Workspace Management
- change workspace: `export GOPATH=/c/Users/skijit/Documents/repos/go-temp`
- add GOPATH's bin to your path: `export PATH=$PATH:$(go env GOPATH)/bin`
- `go build`: builds the executable and stores it in the same src directory
- `go install`: moves the executable into your workspace `bin` dir
- see an interesting go repo?
  - you want to install it to your gopath:
  - `go get <name of repo>`
  - `go get github.com/ChristopherBiscardi/gophercon-uk-sample-code`

## Modules and Conceptual Hierarchy
- A repository contains one or more Go modules.
- Each module contains one or more Go packages.
- Each package consists of one or more Go source files in a single directory. 
  - **THAT'S IMPORTANT!!**
  - To keep things simple, just always make the directory define the package name
  - [good explanation](https://stackoverflow.com/questions/43579838/relationship-between-a-package-statement-and-the-directory-of-a-go-file)
  - But if you must change the package name and directory name, then the import path will reflect the directory name.
  - [another good explanation](https://groups.google.com/forum/#!topic/golang-nuts/oawcWAhO4Ow)
- Go module is defined with the file `go.mod`, which looks like the following:

```
module github.com/my/thing

require (
    github.com/some/dependency v1.2.3
    github.com/another/dependency/v4 v4.0.0
)
```

- [this](https://www.youtube.com/watch?v=F8nrpe0XWRg&list=PLq2Nv-Sh8EbbIjQgDzapOFeVfv5bGOoPE&index=3&t=0s) video has background on the new concept
- source code for your go module does not have to live under your `GOPATH`

## GqlGen Notes
- based on [getting started](https://gqlgen.com/getting-started/) instructions
- also, [this](https://github.com/ChristopherBiscardi/gophercon-uk-sample-code)
- You initialize the modules with `go mod init`
- Start with the schema in a `schema.graphql` file
  - you can eventually put this in a different file(s), referred to in the `gqlgen.yml` file
- Run the initial codegen: `go run github.com/99designs/gqlgen init`
- The graphql types will be defined in Go structs, living in models_gen.go
  - A lot of times you want to overide this, so you can create your own go structs models and then:
    1. Point the `gqlgen.yml` at them
    2. Re-codegen: `go run github.com/99designs/gqlen`
- When you code-gen:
  - you've got high-level abstractions and graphql runtime code livin in the generated `generated.go` file
  - It will define an interface for every type or operation (query, mutation, etc) that you'll need to create a corresponding resolver for.
  - Another file is the `resolvers.go`
    - This has resolver stubs for each of the interfaces described in the `generated.go`
    - Note that `generated.go` isn't updated.  If you want it code-gen'ed, you need to remove it first.
    - Structure of this file is interesting:
      - Resolver struct with methods for each type of resolver that needs to be added
      - Then there's one (private) child struct for each type of resolver, which is what the Resolver methods return.
      - Those private child resolvers conform to the interfaces defined in the `generated.go` and so their corresponding methods are called by the runtime.
    
## GoRequest Notes
- [repo](https://github.com/parnurzeal/gorequest)
- goal: consume service calls from my rest api, I can do this in a console application for starters

	