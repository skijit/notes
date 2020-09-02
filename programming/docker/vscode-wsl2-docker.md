Getting Containery with WSL2 and VSCode
====================

## Todo:
- [Review new post about developing in a container, in wls](https://code.visualstudio.com/blogs/2020/07/01/containers-wsl)

## Intro
- We can do remote development with VSCode and the Remote Development Extension.  This enables...
  - Connecting / Developing against a local WSL2 instance
  - Connecting / Developing against a remote machine
- Additionally, we can develop against containers
- Install the [Remote development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- Install the Docker Desktop WSL 2 (currently a tech preview)[https://docs.docker.com/docker-for-windows/wsl-tech-preview/]

## Steps
- Get the latest (windows insiders!) version of windows 10
- Go to windows store and download the various linux distros (e.g. Ubuntu, Ubuntu Server, etc.)
- Go to windows store and download the windows terminal
- In powershell (w windows terminal), set WSL2 as the version to use for all Linux distros
- Configure windows terminal to use WSL shells
- In Linux shell, go windows home dir `/mnt/c/Users/blhabblah` 
- find a repo and  startup VSCode in that dir, so it opens in WSL mode.  Then go through the various extensions and click the `install in Ubuntu` buttons wherever available
- update installation of docker desktop on windows    
- install nodejs on the ubuntu image
  - I've used NVM (see instructions below)
- Step 1: Running a node job on the Linux server 
  - Start with a hello-world node job with no extra dependencies
  - [install yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
  - `yarn init` in a new folder and stick the following file inside, select defaults
  - `touch index.js`    
  - `code .` to start VSCode in remote mode
  ```(javascript)
  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;


  const server = http.createServer((req, res) => {  
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World - ${new Date().toISOString()}\n`);
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  ```

  - run `node index.js`
    - you should see the results in browser at: [localhost:3000/](http://localhost:3000/)

- Step 2: Debugging a node job on the Linux server
  - In previous example, just click `F5` and choose the node debugging profile

- Step 3: Running a node job on the Linux server in a container


- Step 4: Debugging a node job on the Linux server in a container
  - Do I need the Docker WSL 2 Technical Preview?
- Step 5: Running and Debugging a non-trivial Node job on the Linux server in a container
- Step 5: Running an ASPNetCore job on the Linux server
- Step 6: Debugging a ASPNetCore job on the Linux server
- Step 7: Running a ASPNetCore job on the Linux server in a container
- Step 8: Debugging a ASPNetCore job on the Linux server in a container
- Step 9: Orchestrating so that the Node Container can talk to the AspNetCore Container, whilst still Debugging

## Misc Tips
- From Git-Bash, you could `wsl code .` to switch to Linux inline, launch into VS Code, then return to your Windows shell.
- See this [Tips and Tricks Post](https://devblogs.microsoft.com/commandline/tips-and-tricks-for-linux-development-with-wsl-and-visual-studio-code/)
- For example, you can run `explorer.exe` in WSL and it'll launch the windows executable.  It might be useful for other applications...
  - you'll definitely need the `.exe` at the end
- in win terminal, you can change the font size with `ctrl+scroll`

## Other Sources
- [Full reference](https://code.visualstudio.com/docs/remote/remote-overview) for Remote Development
- [Getting Started Guide for Remote Development](https://code.visualstudio.com/remote-tutorials/wsl/getting-started)

## Other Todos
- Terminal customization
  - font size
  - default shell
  - prompt
  - start directory
  - never showing powershell
  - vscode integration

## Docker / WSL2
- [docker post about the tech preview version](https://www.docker.com/blog/5-things-docker-desktop-wsl2-tech-preview/)
- basic architecture
  - In the old days, if you wanted to run a linux container on windows, you had to do it with a full linux HyperV VM (moby)
  - Now, we have WSL2, which is a thinner HyperV VM but while getting a more consistent docker/linux experience.
  - Docker Desktop runs the `dockerd` in the WSL2 instance
  - You tell (in Powershell) to use the WSL2 context of Docker, boot up WSL2 and then you're ready to go.
- Installation
  - Install Windows Terminal
  - Install WSL2 and Linux Flavors
  - Set up WSL2 in powershell:
    - make sure you view your different distros: `wsl -l -v`
    - set ubuntu server as your default distro: `wsl -s Ubuntu-18.04 2`    
  - Install Docker Desktop
    - I have 2.1.0 and it seems to work
  - Install Docker on your WSL2 instance
    - Could be as simple as `sudo apt install docker.io`, but google it
  - Enable Docker Desktop WSL2 Support (currently experimental)
  - In Powershell, `docker context ls`.  Then select the Ubuntu-18.04 context w `docker context use Ubuntu-18.04  
  - Start up a new linux session and you should be able to `docker run hello-world`
  - Other Docker Desktop settings:
    - Not sure whether it makes a difference if you select:      
      - "Expose daemon on tcp://localhost:2375 without TLS"
      - which context you use

## VSCode and Containers
- First, install the Docker VsCode extension and add the following to your workspace settings:

  ```
  "remote.extensionKind": {
      "ms-azuretools.vscode-docker": "workspace"
  }
  ```
  - [More Info](https://github.com/microsoft/vscode-docker/wiki/Using-the-Extension-with-Docker-Desktop-WSL-2)
- [Comprehensive source here](https://code.visualstudio.com/docs/remote/containers)
- **Core Idea**:
  - There are lots of ways to use containers: VSCode Remote Containers Extension lets you use them as Development Environments:
    - Tools
    - Libraries
    - Runtimes
- You have a `devcontainer.json` which tells VSCode how to _access_ or _create_ a development container
  - Consider `development container`
  - Workspace files:
    - mounted from the local file system OR
    - run inside the container
  - So your dev environment can be completely different just by connecting to a different container
- 2 Basic Integration Methods:
  - Use a container as your full-time development environment
  - Attach to a running container to inspect it
- **Scenario 1**: Open Folder as a Container
  - This **does not** apply to WSL2, bc WSL2 is treated as a remote connection (and thus a remote container, which is advanced)
  - You can open any folder and then click in the lower-left hand and select 'Remote-Containers: Open Folder in Container...'
  - This takes a while the first time, but the next time you open it, the container will already be built, so it's much faster
    - Consider, however, this is building up a completely localized development/runtime environment
  - If you open a terminal, it will be in the container
  - It seems to use the WSL (if you see th path) in setting up the Bind Mount to the container
  
- Creating a devcontainer.json file:
  - HERE

- NEXT:
  - Experiment with VSCode integrations
  - Experiment with normal Docker containers
    - Compare the differences

## NVM Installation
- [starting source](https://www.liquidweb.com/kb/install-nvm-node-version-manager-node-js-ubuntu-16-04-lts/)
- [this is even better](https://github.com/creationix/nvm)
- `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
- restart terminal
- `sudo apt-get update`
- `sudo apt-get install build-essential libssl-dev`
- now to install the latest version node
    - `nvm install node`
    - `node -v` -> shows v10
- now (if you wanted) to install node v 9.11
    - `sudo nvm install 9.11`

## General VSCode Remote to WSL with Docker
- [execute a python job in a wsl2 container](https://www.docker.com/blog/developing-docker-windows-app-wsl2/)

## VSCode Run/Debug Node WSL2 Docker Container
- [debug a node job in a docker container](https://dev.to/alex_barashkov/how-to-debug-nodejs-in-a-docker-container-bhi)
  - build docker image of node job
    - added Dockerfile
    - used the VSCode ext build command- got `docker build --rm -f "Dockerfile" -t express_hw:latest .`
  - run docker container
    - `docker run --rm -d -p 3000:3000 -p 9229:9229 -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules`
    - `docker ps` should reveal the container is running
  - attach debugger
    
    ```(launch.json)
    {
      // Use IntelliSense to learn about possible attributes.
      // Hover to view descriptions of existing attributes.
      // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
      "version": "0.2.0",
      "configurations": [
          {
              "name": "Docker: Attach to Node",
              "type": "node",
              "request": "attach",
              "port": 9229,
              "address": "localhost",
              "localRoot": "${workspaceFolder}",
              "remoteRoot": "/usr/src/app",
              "protocol": "inspector"
          }
      ]
    }
    ```

- Question: can we pause execution in startup phase until a debugger is attached?

## VSCode Run/Debug AspNet Core WSL2 Docker Container
- some sources
  - [recent, good writeup, more automated attachment w debugger](https://espressocoder.com/2019/04/03/debugging-an-asp-net-core-docker-container-in-windows-and-linux/)
  - [recent example, decent writeup, more manual attachment w debugger](https://www.aaron-powell.com/posts/2019-04-04-debugging-dotnet-in-docker-with-vscode/)
  
  - [older- good background](https://garfbradaz.github.io/blog/2018/12/13/debug-dotnet-core-in-docker.html)
  - [also older - goodbackground](https://www.richard-banks.org/2018/07/debugging-core-in-docker.html)
  - also see my slides on gdrive from a conf presentation
- What about connecting to DB and containerizing that?
  - that's a Docker Compose topic
  - also remember that the disk for db is largely going to be provided by volume
  - [A simple example](https://medium.com/@kristaps.strals/docker-mongodb-net-core-a-good-time-e21f1acb4b7b)
 
- basic steps
  - [install dotnet sdk on linux machine](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/intro)
  - `dotnet new` on an aspnet core project
    - run in linux: `dotnet new mvc -n HelloWsl2Docker.Web -o HelloWsl2Docker.Web`
      - be sure to run this in your WSL2 filesystem, not the windows mount (e.g. `/mnt/c/Users/skijit/Documents/repos/HelloWsl2Docker.Web`) as there's a [WSL2/build issue at the time of this writing](https://github.com/dotnet/core/issues/3444) 
    - `cd HelloWsl2Docker`
    - `code .`
    - note the following scaffolding:
      - tasks: `build`, `publish`, and `watch`
      - launch profiles: `coreclr/launch` and `coreclr/attach`
      - you should be able to build/run/debug (w/o Docker) at this point
        - or for an alternate CLI: `dotnet build "HelloWsl2Docker.Web.csproj" -c Release -o app`
  - create a Dockerfile
    - open the VSCode command pallete and begin typing 'Add Docker Files to Workspace' and it will walk you through a quick wizard and generate your Dockerfile.
  - setting up integrated build / launch / debugging of container through vscode
    - click on the `Add Configuration...` on the Debug Launch Profile drop down
    - select `Docker: Launch .NET Core (preview)`
    - You can launch this debug profile and you'll see:
      - Image being created
      - Container Starting
      - Acquiring the .NET Core Debugger
        - This might fail if you haven't installed `unzip` on your machine
      - Building the code
        - If it fails, try again
      - Once it succeeds, you might have to look at the output window of `Docker:Launch .NET Core (preview)` to find the external port that is exposed.  However, another way is to use `docker ps -a`
- you'll need to rebuild for any code changes you make

- debugger
  - `vsdbg` is the main .net core debugger ([history](https://blog.lextudio.com/the-rough-history-of-net-core-debuggers-b9fb206dc4aa)), just like with node, we're using the vscode node debugging client [although there are other choices in the node ecosystem](https://nodejs.org/de/docs/guides/debugging-getting-started/#inspector-clients)
    - node-inspect is another one
    - they'll all use the same node-specific debugging protocol
  - the vsdbg debugger seems to use IPC rather than TCP to communicate between the main application, which means the debugger 
  - see https://github.com/Microsoft/MIEngine/wiki/Offroad-Debugging-of-.NET-Core-on-Linux---OSX-from-Visual-Studio

- observations/questions
  - multistage build files are the norm
  - image has to be rebuilt with code changes
  - do we need a different version of the build for debug/release?
    - you can set that as a build flag `--build-arg`
    - [this post addresses the issue](https://garfbradaz.github.io/blog/2018/12/13/debug-dotnet-core-in-docker.html) (although there's a refactoring note)
  
## VSCode Run/Debug Go WSL2 Docker Container






