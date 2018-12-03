Docker - basics
=================

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
- **Sandbox**: Once a container has been started, all write actions such as file system modifications, registry modifications or software installations are captured in this ‘sandbox’ layer.
  - TODO: Need more about this.  I thought you mount the filesystems separately.
- **Container OS Image**: 
  - Containers are instances of images.  
  - Images are layered.
  - First layer of image is the OS (which is immutable)
- **Container Repository**:  a public or privarte registry for container images
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
- TODO: Continue notes [here](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/) 

- TODO:
  - Revisit the topic of Docker-based development environments

- running as a service: there's a command line parameter which you pass to `docker run`
  
## More about Containers
- [src](https://azure.microsoft.com/en-us/blog/containers-docker-windows-and-trends/)

 

