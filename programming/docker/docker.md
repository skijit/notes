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
        - `-e "ENVIRONEMNT_VARS_HERE"`
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
        - Don't use git-bash or wsl bash to run docker.  use cmd or powershell.  it sucks, but do it.
- Running a Linux Container on Windows 10
    - 

- Review how we do or do not specify Base OS for a windows .net core instance
https://github.com/dotnet/dotnet-docker/tree/master/samples/aspnetapp
- good ref: http://www.floydhilton.com/docker/2017/03/31/Docker-ContainerHost-vs-ContainerOS-Linux-Windows.html

### Windows Server
- TODO: Continue notes [here](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/) 

## Best Practices with Docker Files
- [src](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

## Updated Notes
- Objectives:
    - run some standard docker containers on windows
    - get multiple containers to talk with another (e.g. compose?)
    - run some custom asp.net core stuff on a container 
- [first source](https://docs.docker.com/docker-for-windows/)
    - be sure to recursively uncompress the following folders, if you're compressing most files: 
        - C:\ProgramData\Microsoft\Windows\Hyper-V
        - C:\Users\Public\Documents\Hyper-V        
    - run `docker --version` to make sure you have the CLI
    - run docker desktop - this runs the docker engine
    - open powershell
    - run the hello-world docker image (it will most likely have to download it from docker-hub first)
        - `docker run hello-world`
        - this ran this on (windows) nanoserver
    - you can see all the containers that ran by using:
        - `docker ps -a` OR
        - `docker container ls --all`
    - to run ubuntu and run bash inside it:
        - `docker run --interactive --tty ubuntu bash`
    - running nginx
        - `docker run --detach --publish 80:80 --name webserver nginx`
            - `--detach`: runs conitainer in background and prints container id
            - `--publish <host-port>:<guest-port>`: i think this is port mapping
            - `--name <some-name>`: gives th container a name rather than an auto-generated one
            - `nginx` is the name of the image
        - `docker container stop webserver`: stops the webserver
            - this might take a while on windows
    - a container is a runnable instance of an image
        - when you run it, obviously it's created
        - it remains in your system, to be runnable
        - you can remove some containers by name:
            - `docker container ls -a`
            - `docker container rm name1 name2 name3`
        - you can restart an existing container with `docker restart <CONTAINER_NAME>`
        - once a container is created, it will have a 'thin writable layer' to capture local state changes
            - this data is persisted with the container even when it's turned off

- Windows Docker Desktop notes
    - linux vs windows engines:
        - there's an option where you can select whether to run windows or linux containers
        - even if you're set to run windows containers, you can run linux containers
        - but if you switch, then run `docker container`, you won't see your other containers
        - you need to switch to the other mode to see your existing containers
        - when you switch, docker for desktop switches which version of the docker daemon it talks to.  
    - when you switch to linux containers, different settings are displayed!
        - shared drives are required for mounting, but it is recommended to use volumes instead of mounting.
    - kubernetes is automatically installed with docker for desktop (and can be enabled). see notes below.


## Volumes
- [ref](https://docs.docker.com/storage/volumes/)
- avoid bind mounting, use volumes.
    - volumes are links to folders/files on the host file system in an area controlled by Docker
        - when you create a volume, I think it creates/copies the files to a separate area in the host filesystem controlled by Docker
    - bind mounts are links to folders/files on the host file system anywhere, and this introduces a risk bc other processes can change it (unlike how volumes are totally separated)
- volumes are used for:
    - data used by containers
    - data generated by containers
- some nice features with volumes (vs bind mounts):
    - easier to back up and migrate
    - manage volumes using docker cli
    - work on linux or windows containers
    - more safe to share amongst multiple containers
    - there are drivers to let you host those volumes remotely and encrypted
- containers have a writable layer, but you don't want to use it:
    - it increases the size of the volume
    - it's slow
- when containers generate non-persisted data, you can use a tmpfs mount
- there are 2 alternative flags for specifying a volume:
    - `-v`
        - a little more terse
    - `--mount`
        - simpler, uses k/v pairs in no specific order
        - you specify `type=volume` as one of the k/v pairs, so we're still talking about volumnes
        - better for handling driver options
- you can create a volume with: `docker volume create my-vol`
- then verify it with with: `docker volume ls`
- simple format to start a container with a volume, which if it doesn't exist, will be created

```
docker run -d \
  --name devtest \
  --mount source=myvol2,target=/app \
  nginx:latest
```

- or...

```
docker run -d \
  --name devtest \
  -v myvol2:/app \
  nginx:latest
```

- to create a new volume:
    - `docker volume create my-vol`
    - other CLI options for `--driver` and options `-o`

- multiple containers can use the same volume
- when no container is using a volume it is still available
- volumes can have *volume drivers* which let you store them on remote file systems or in the cloud
- bind mounts (though bad) do have some use cases:
    - Sharing configuration files from the host machine to containers
    - Sharing source code or build artifacts between a **development environment** on the Docker host and a container
        - If you use Docker for development this way, your production Dockerfile would copy the production-ready artifacts directly into the image, rather than relying on a bind mount.

## Storing Data Within Containers
- [ref](https://docs.docker.com/storage/storagedriver/)
- Storage drivers allow you to create data in the writable layer of your container. 
    - The files won’t be persisted after the container is deleted
    - read and write speeds are low.
- A docker image is composed of layers
- Each line in a dockerfile is a layer
- Consider...

```
FROM ubuntu:15.04
COPY . /app
RUN make /app
CMD python /app/app.py
```

- 4 layers:
    1. Base image
    2. Copy files from the client into the image
    3. Builds your application (make)
    4. executes a command
- each of these layers is read-only
- when you turn an image into a container, another layer is added which is not read-only
    - called the 'container layer' or 'writable layer'
    - it is read-write
- since each of these non-container layers are read-only, they are shared among containers based on the same image, or which use the same layers
- the only data stored in the writable layer are:
    1. existing files (from r/o layers) which have changed
        - the app will only see these newly copied files in the writable layer.
        - this strategy is called Copy-on-Write (COW)
        - the process of copying a file from a more foundational layer is called `copy_up`
    2. new files
- `copy_up` 
    - only occurs the first time a file is modified
    - lots of overhead
- storage drivers help manage the contents of the image layers
    - they implement these various strategies and have tradeoffs depending on platform and workload

## Overview
- [ref](https://docs.docker.com/engine/docker-overview/)
- The docker engine has 3 components:
    1. Docker Daemon (`dockerd`)
        - manages the docker objects (e.g. images, containers, volumes, etc.)
    2. Rest API
        - for driving the Docker Daemon
    3. Docker Client CLI
        - Calls the Rest API
        - Can be on the same system as the Docker Daemon, or remote
- Docker Services let you scale a single container across multiple docker daemons (i.e. hosts presumably).
    - Each dockerd participating in a service is part of it's *swarm*
    - When you define a service, you will include configurations such as the number of replicas you want
    - The swarm functionality will automatically load balance your service and make it appear to be a single instance
- Conceptual Hierarchy:
    - Stacks
    - Services
    - Container
- `docker build` will let you build an image from a dockerfile
    - you specify a name and tag for the image like so: `docker build --tag=<my-name>:<my-optional-tag>`
    - to docker, tags and versions are basically the same thing
- to publish your image to a registry, you'll follow this naming convention which has 3 parts:
    1. your username
    2. a repository: this is just a collection of images
    3. a tag: basically a version
    - example: `docker tag <my-preexisting-image-name> <username>/<repository-name>:<tag>`
    - once properly built and tagged, you can push to a registry (e.g. hub.docker.com)
    - when you push an image to hub.docker.com, it is by default public
    - you can have private repositories - but you only get 1 for free
- Services
    - a collection of load-balanced instances of the same container
    - services orchestration hierarchy:
        - swarm
            - needs to be initialized to run a stack
        - stack
            - this is what you deploy.  It has a name and is defined with a docker_compose.yml
            - e.g. `docker stack deploy -c docker-compose.yml getstartedlab`        
        - service
            - name of the service will be: `<name-of-stack>_<whatever-was-the-app-name-in-the-compose>`
        - tasks
            - each individual container
            - you can view with `docker stack ps <name-of-the-stack>`
    - docker-compose.yml defines:
        - a version
        - service(s) name
        - how many instances to run
        - various resource limits
        - restart policy
        - port mapping
        - networking info
- Swarms
    - a service is a container with multiple instances, running on one node
    - a swarm is when you scale this out to a cluster, running on multiple machines
    - machines in a swarm (cluster) are called nodes
    - you interact with a swarm just like an individual container app
    - there is a 'swarm manager' that is responsible for executing the commands issued (presumably by you) across the cluster
    - the yml file tells the swarm manager a number of important things, including the strategies for allocating containers to machines in the cluster (e.g. it could fill as many copies as possible on one machine or distribute them evenly, etc.)
    - `docker-machine` lets you create Hyper-V VM's and interact with them for things like:
        - init'ing swarm
        - joining swarm
        - leaving swarm
    - 2 ways to send commands to the swarm manager:
        - `docker-machine ssh <docker-commands-wrapped-in-quotes>`
        - `docker-machine env <vm-name>`
            - in powershell, this will provide you with a command to execute to talk directly to the swarm mgr through your shell (which is more convenient)
            - interestingly, while this will connect your shell to the vm, you still have access to your local files and thus deployment of the swarm is just like a normal stack deployment using your yml file, which refer to your image in the registry.
    - load-balancing
        - when you've deployed a swarm, you can hit any of the swarm vm's IP addresses and it will still be load-balanced
- Stack
    - A stack is a group of interrelated services that share dependencies, and can be orchestrated and scaled together     
    - each service is listed in the docker-compose.yml
    - about persisting data:
        - you'll probably want "one source of truth" for persisted data in a swarm
        - a common approach for these types of services is to:
            - no replicas
            - run them on the swarm manager
            - use volume mounting, referring to a directory on the swarm manager (usually in a docker-controlled area)
- Deployment
    - Docker Enterprise helps you deploy services in the same fashion across production servers
    - It also has integration with LDAP and other enterprise services

## Networking in Docker
- [ref](https://docs.docker.com/network/)
    - from this ref there are links to deep dives on each topic - probably worth exploring
- Network types:
    - user-defined bridge network
        - default
        - used when you have multiple standalone containers (i.e. not defined in a swarm) on the same host which need to communicate
    - host network
        - if there's only one container on a server, you can just use the host's network
    - overlay networks
        - connect multiple docker daemons, in a swarm scenario
        - you can also use overlay network for communication of 2 standalone containers on different docker daemons
    - macvlan
        - you can assign a mac address to each container
        - this is good for dealing with legacy applications (or migrating over from a vm deployment) which expect to be directly connected to a physical network (instead of being routed through docker's n/w stack)        
    - 3rd party nw plugins
        - allow you to use specialized n/w stacks

## Hyper-V on Windows 10
- Hyper-V replaces MS Virtual PC
- You can export your Hyper-V system into Azure
- Hyper-V on Windows Server has extra features for migrating from one server to the next
    - They're similar but different
    - Server version makes assumptions that you're not running anything else on the host but hyper-V VM's, but this would be invalid for a windows 10 scenario


   
