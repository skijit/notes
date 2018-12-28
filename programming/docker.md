Docker - basics
=================

## Scattered Notes
- [youtube tutorial](https://www.youtube.com/watch?v=Vyp5_F42NGs)
- Provides the following environments
  - dedicated: one environment for each stack
  - identical: same environment settings between prod / dev
  - separate: separate instances between prod /dev
- Containers
  - Running instances / environments
- `docker ps` show running processes
- `docker ps -a` all running processes
- get started:
  - download the application image
    - definition of the environment
  - startup a container
    - running instance of an image
- `docker images` will show you what images you have installed
- if you run a node image, make sure it is bound to a particular version, not *latest*
- to promote /copy one image around, you just copy the image and configuration and then run the container
- installing docker engine
  - be careful about this... it changes a lot and is specific to your machine
- docker engine runs containers
  - docker engine runs a linux vm
  - based on linux container methodology
  - different from a vm though bc the different docker instances share resources 
    - e.g. same kernel, etc.
  - but they have their own file systems, etc. so the applications think they're running in an isolated environment
- `docker --version`
- `docker-compose --version`
- images are found on hub.docker.com
  - some images are official and some are community provided
- alpine:
  - since docker is based on linux containerization technology, you choose the linux distro that should be run for each image.
  - normally, this is *jessie* which is based on debian
  - newer distro is *alpine* which is more slim, has some advantages
- `docker pull nginx:1.10.2-alpine`
  - pulls down that image
- `docker run --name MyHumanReadableContainerName -p 80:80 nginx:1.10.2-alpine`
  - if you run an nginx image, you need to do port forwarding
  - syntax: -p host:guest
  - to run in background: `docker run --name MyHumanReadableContainerName -p 80:80 -d nginx:1.10.2-alpine`
    - these parameters can only be set the first time you create the container
    - if you want to change them, you need to create a new Container
    - implication- any generated content you put into that container will not be available in a new and reconfigured container
    - for that reason, we generally don't put data into our containers
- `docker stop MyHumandReadbaleContainername`
- `docker rm MyHumandReadbaleContainername`
  - remove the container (e.g. if you want to change the parameters)
- `docker exec -ti MyHumanReadableContainerName ./bin/sh`: execute a command inside a container 
  - starts a shell
  - you can make changes here, but when you stop the container, the changes are gone
- to give a container a config file from outside world, you use a volume (-v)
  - `docker run --name MyHumanReadableContainerName -v /some/host-based-nginx.conf:/etc/nginx/nginx.conf:ro -p 80:80 nginx:1.10.2-alpine`
  - maps local config file to /etc/nginx/nginx.conf in container
- making data available to container:
  - `docker run --name MyHumanReadableContainerName -v /some/host-based-nginx.conf:/etc/nginx/nginx.conf:ro -v /Users/myname/mydir/mysrcdir:/usr/share.nginx/html:ro -p 80:80 nginx:1.10.2-alpine`
  - you can also use this with hot reloading
- how to create your own docker image:
  - why? dedicated configuration
  - you can install new packkages (apt-get): so you create your own environment
  - you create a `Dockerfile`
  - every line is like a layer in a container
  ```(dockerfile)
  FROM nginx:1.10.2-alpine #base image to start with
  MAINTAINER me@example.com
  COPY ./nging.conf /etc/nginx/nginx.conf #copies from local to the guest, becomes part of the image so you dont have to use a volume
  ```
  - `docker build -t zipnginx:1.0 . ` will create a new image called zipnginx with tag 1.0 and use the Dockerfile in the current directory
- `docker-compose` lets you create multiple containers from one file...
  - this is for when you have multi-container applications

## Windows Containers Documentation
- [src](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/)
- simplicity of container-based deployments paves the way for the cloud (bc less server variation)
- container's host provisions a set of resources for the container, and the constainer can only use those resrouces
- **Container Host**: physical or virtual server configured with the windows container feature.
- **Sandbox**: Once a container has been started, all write actions such as file system modifications, registry modifications or software installations are captured in this *sandbox* layer.  
- **Container OS Image**: 
  - Containers are instances of images.  
  - Images are layered.
  - First layer of image is the OS (which is immutable)
- **Container Repository**:  a public or private registry for container images
- **Container Types**: 
  - 2 types of windows containers.  
  - Choosing which to run is a runtime decision.
  - **Windows Server Containers**
    - process isolation is effective, but not secure.
    - shares kernel with the container host (therefore all containers need the same version of os)
  - **Hyper-V Isolation**
    - strict separation
    - Each conatiner runs on a highly optimized virtual machine
    - TODO: compare Hyper-V Containers with standard docker containers
- Requires Windows Server 2016
- Container Orchestration involves
  - Scheduling: Upon some event/request, find a VM to spin up the container
  - Affinity: specify that containers should run nearby each other
  - Health monitoring
  - Failover
  - Scaling
  - Networking
  - Service Discovery: enable containers to locate each other automatically, even as the move between host machines and change IP addresses
  - Coordinated application upgrades
- Azure has 2 container orchestrators
  - Azure Container Service (AKS)
  - Azure Service Fabric
- running as a service: there's a command line parameter which you pass to `docker run` 
- [src](https://azure.microsoft.com/en-us/blog/containers-docker-windows-and-trends/)
- Virtualization
    - enabled by surplus hw capacity
    - types
        - Virtual memory
        - Hardware Virtualization
        - OS Virtualization : "Containers"
- Isolation
    - There is one host operating system running, shared by the containers
    - Those shared resources are projected into the isolated space the containers run inside (namespace)
        - only when a change is made, does the container get a distinct copy
- Resource Control
    - Host controls how much of it's resources can be used by a container
- Containers share the host OS
- Windows and Linux Containers
    - same experience
- Windows Server Containers vs HyperV Containers
    - Isolation
        - Brick-wall (full isoloation) in HyperV containers
        - Windows servers appear isolated, but boundardies could be crossed
    - Security
        - Better security with HyperV, but use Windows SErver containers when you trust all the apps
        - HyperV might be better for running other vendor's containers
    - Total Size
        - HyperV's are closer to the traditional VM model
- Linux Containers on Windows
    - Containers share a kernel with the container host, so running Linux containers directly on Windows is not possible.
    - Virtualization is required.
    - There are 2 ways to do this:
        1. Linux Containers run in a single full VM
        2. Run with HyperV Isolation
    - Linux Containers in a full (Moby) VM
        - Moby Linux VM runs on Hypervisor alongside windows desktop
        - Both OS'es run the Docker daemon which responds to calls from the Docker client
        - Docker client runs on windows desktop, but can dispatch calls to the VM or it's native OS
    - HyperV LCOW (Linux Containers on WIndows)
        - Each Linux container runs on it's own optimized linux VM (contrast to Moby approach where they all share the VM)

## Docker Workshop Notes
- [repo that walks through .net and docker together](https://github.com/DanielEgan/ContainerTraining)
- **Note**: My google drive has corresponding slide deck
- Running classic ASPNet applications in Azure -> Service Fabric
- Running ASPNet core applications in Azure -> Containers / Kubernetes
- Containerizing an ASPNet Core app:
    - Modify a line in `CreateWebHostBuilder` to make it listen to requests outside the container: `.UseUrls("http://0.0.0.0:5000")`
    - Using 2 different base images
        - One for Building
        - One for running (much smaller)
    - Dockerfile
    - .dockerignore
    - build: `docker build -t todov1 .`
    - run: `docker run -it --rm -p 5000:5000 -e "ASPNETCORE_URLS=http://+:5000" --name To_Do_App todov1`
        - if running from git-bash, prefix with `winpty `
- When your image is sucessfully running, you want to add it to a repository
- Repository notes
    - public image repository: dockerhub
        - you can also have private images hosted here
    - private image repository: 
        - free: docker registry
        - paid: docker trusted registry
        - azure container registry works too
    - push / pull
    - specify tags
- multistage builds let you build an image, which you compile with, then create a new image which you deploy a slimmed-down runtime
- just because a container is not running, doesn't mean it dosen't exist

## Gettings Started MS Guides

### Windows 10
- Running a Windows container on Windows 10
    - `docker pull mcr.microsoft.com/windows/nanoserver:sac2016`
    - `docker images` - shows you the locally installed images available
    - `winpty docker run -it mcr.microsoft.com/windows/nanoserver:sac2016 cmd.exe`
        - prefix with winpty since you've got -it
        - lets you run cmd on the image
    - `docker ps` shows you running docker images
    - `docker ps -a` shows you any images which have been run (at all)
    - `docker commit 3b759322ae28 helloworld` - lets you create an image based on your modified image
        - the id above was taken from the output of `docker ps -a`
    - now you can run a container based on this new image (with `docker run` (again))
        - `docker run --rm helloworld cmd.exe /s /c type Hello.txt`
            - runs a new container based on the helloworld image
            - executes cmd.exe inside of it (I think this is the entry point)
            - then removes it after running
    - BEST PRACTICE:
        - Don't use git-bash to run docker.  use cmd.
- Running a Linux Container on Windows 10
    - 

- Review how we do or do not specify Base OS for a windows .net core instance
https://github.com/dotnet/dotnet-docker/tree/master/samples/aspnetapp
- good ref: http://www.floydhilton.com/docker/2017/03/31/Docker-ContainerHost-vs-ContainerOS-Linux-Windows.html

### Windows Server
- TODO: Continue notes [here](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/) 

## Best Practices with Docker Files
- [src](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)