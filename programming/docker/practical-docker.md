Practical Docker
=====================


## Docker CLI Commands/ Quick Ref
- `docker ps -a`: show running processes
- `docker top <container>`: see processes running inside a container
- `docker container ls --all` (similar)
- `docker images` shows you what images you have installed
- `docker --version`
- `docker-compose --version`
- `docker pull nginx:1.10.2-alpine`
  - pulls down that image
- `docker run --name MyHumanReadableContainerName -p 80:80 nginx:1.10.2-alpine`
- `docker stop MyHumandReadbaleContainername`
- `docker restart MyHumandReadbaleContainername`
- `docker rm MyHumandReadbaleContainername`
  - Good if you want to remove the container
- `docker container rm name1 name2 name3` (similar)
- `docker exec -ti MyHumanReadableContainerName ./bin/sh`: execute a command inside a container 
  - starts a shell
  - you can make changes here, but when you stop the container, the changes are gone
  - remember the container is capable of running other processes, so when you exec, you run a different process in there
  - other examples:
    - `docker exec -it -e VAR=1 ubuntu_bash bash`: set an environment variable and run bash on container `ubuntu_bash`
- `docker run --name MyHumanReadableContainerName -v /some/host-based-nginx.conf:/etc/nginx/nginx.conf:ro -p 80:80 nginx:1.10.2-alpine`
  - volume mounting
    - You can do this with individual files (above) or map directories:
      - `docker run --name MyHumanReadableContainerName -v /some/host-based-nginx.conf:/etc/nginx/nginx.conf:ro -v /Users/myname/mydir/mysrcdir:/usr/share.nginx/html:ro -p 80:80 nginx:1.10.2-alpine`
- `docker run hello-world`
  - this is a standard image which will verify Docker is working on your machine
- `docker run --interactive --tty ubuntu bash`
  - to run ubuntu and run bash inside it
- running nginx (simple version)
  - `docker run --detach --publish 80:80 --name webserver nginx`
      - `--detach`: runs conitainer in background and prints container id
      - `--publish <host-port>:<guest-port>`: i think this is port mapping
      - `--name <some-name>`: gives th container a name rather than an auto-generated one
      - `nginx` is the name of the image
  - `docker container stop webserver`: stops the webserver
      - this might take a while on windows
- `docker volume create my-vol` : see other notes on volume and bind-mounting
- `docker build -t zipnginx:1.0 . ` will create a new image called zipnginx with tag 1.0 and use the Dockerfile in the current directory
- `docker inspect <imageName>` lets you view an image's metadata 
  - when you build up an image, all the previous parent layers' metadata is inherited
- `docker network` is used for setting up nw's between different containers
- whenever you're running in  container, the loopback address is `0.0.0.0` 

## DockerFile
- [ref](https://docs.docker.com/engine/reference/builder/)
- [ref](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- Dockerfile helps you build the image, it's not for running the container
- Example Dockerfile:

```(dockerfile)
FROM nginx:1.10.2-alpine #base image to start with
MAINTAINER me@example.com
COPY ./nging.conf /etc/nginx/nginx.conf #copies from local to the guest, becomes part of the image so you dont have to use a volume
```

- *docker build* builds the image from a dockerfile and a *context*, which is a path you specify:
  - `docker build .` will pass the Dockerfile from the current directory AND all the files (recursively) in that directory to the docker daemon for building
  - In most cases, it’s best to start with an empty directory as context and keep your Dockerfile in that directory. Add only the files needed for building the Dockerfile. 
  - Also, youll want to use dockerignore files
- `docker build -f /path/to/a/Dockerfile .`
  - Point to a dockerfile located elsewhere, but use current directory as your context
- `docker build - < Dockerfile`
  - this is how you send no context
- **Context note**: it's a build context.  Just bc you have some files listed here, doesn't mean they'll land in the image.  By virtue of being in your build context, they can be referred to with `COPY` (etc) commands in the Dockerfile.
- Use the `-t` to apply tag(s) to your built image:
  - `docker build -t shykes/myapp:1.0.2 -t shykes/myapp:latest .`
- Directives
  - there are certain reserved words which can appear at the top of the dockerfile using k/v pairs which influence build behavior
    - syntax = indicates the builder version (i.e. the docker compiler version)
    - escape = indicates the character used for escaping newslines, etc
      - `# escape=\`
      - Note this setting can have different effects, particularly on windows paths- you might want to use the `~` as the escape character in that case
- Environment Variables

```
FROM busybox
ENV foo /bar
WORKDIR ${foo}   # WORKDIR /bar
ADD . $foo       # ADD . /bar
COPY \$foo /quux # COPY $foo /quux
```

- .dockerignore

```
# comment
*/temp*
*/*/temp*
temp?  # matches tempa and tempb
**/*.go # glob syntax ok
 *.md 
!README.md #exception
```

- `FROM <image>[:<tag>] [AS <name>]`
  - definitely use `AS` in multistage builds
- `RUN`
  - Use this to run some commands (e.g. `apt-get` or a shell) in the next layer
- `CMD`
  - This will specify the default executable or arguments that gets run as part of the running container
  - unlike `ENTRYPOINT`, the `CMD` is overrideable
  - when you have `ENTRYPOINT` and `CMD` together, `CMD` is often providing default parmeters
  - [interesting post explaining it all](https://dev.to/lasatadevi/docker-cmd-vs-entrypoint-34e0)  
- `LABEL`
  - Lets you assign k/v pairs for metadata on the image
- `EXPOSE`
  - This lets you define which ports are intended to be exposed for the image.
  - The ports are not actually published - for that you use `docker run` with the `-P` commandline
  - Using `-p` (little p version) is the way to specify any published ports, independent of what is marked in Expose
- `ADD`
  - Copies files or directories into the filesystem of the image
  - `ADD [--chown=<user>:<group>] <src>... <dest>`
- `COPY`
  - Similar to `ADD`, but ADD has some more flexibility in the sources (e.g. URLS, etc)
  - Generally, better to use `COPY`
- `ENTRYPOINT`
  - Lets you configure a container that will run as an executable
  - If this is specified in a base container, it can be overriden in the successive layer OR you can leave it blank, and it will still be executed. 
  - Should be obvious, but if an `ENTRYPOINT` occurs in a later layer and you only target on the earlier layers to build the image, then the `ENTRYPOINT` will not be executed.
   
- **SHell and Exec Forms Aside**
  - `RUN`, `CMD`, and `ENTRYPOINT` can all be run in one of 2 forms:
    1. Shell Form
    2. Exec Form
  - **Shell Form**
    - Syntax: `INSTRUCTION COMMAND`
    - Example: `RUN ap-get install python3`
    - It just looks normal - no array syntax like Exec form
    - It's all going to run on a shell (`/bin/sh -c <COMMAND>` to be specific)
  - **Exec Form**
    - Preferred form for `CMD` and `ENTRYPOINT`
    - Syntax: `INSTRUCTION ["executable", "param1", "param2"]


- `USER`
  - Sets the user name (or UID) and optionally the user group (or GID) to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow it in the Dockerfile.
- `WORKDIR /path/to/workdir`
  - Sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` instructions 
- `ARG <name>[=<default value>]`
  - Defines a build-time parameter that can be used: `docker build --build-arg <varname>=<value>`
  - Arg is ony visible once it's been defined and it is only visible in the current build scope (current `FROM`)
  - Can be referenced like an Environment variable
  - There are a variety of built-in/sys-defined build-args you can use (e.g. `HTTP_PROXY`)

  ```
  FROM busybox
  ARG SETTINGS
  RUN ./run/setup $SETTINGS
  ```

- `ONBUILD [INSTRUCTION]`
  - These instruction(s) are executed when the image is used as the base for another image
- `HEALTHCHECK [OPTIONS] CMD command`
  - Specifies a command to run to function as a health-check for the behavior of the container
  - Options include:
    - `--interval=DURATION (default: 30s)`
    - `--timeout=DURATION (default: 30s)`
    - `--start-period=DURATION (default: 0s)`
    - `--retries=N (default: 3)`
  
  ```
  HEALTHCHECK --interval=5m --timeout=3s \
    CMD curl -f http://localhost/ || exit 1
  ```

- `SHELL`
  - There are a variety of `RUN` and `CMD` forms that run in a shell
  - This keyword lets you customize the default shell and it's parameters

## Docker Run
- HERE
- [ref](https://docs.docker.com/engine/reference/run/)
- Parameters are immutable:
  - Once you create a container with `run`, the paramters (ports, etc) can only be set once (ie the first time)
- Question: what is up with the command after the image name?
- Specifying Image Version
- Port Forwarding
- Volumes
- Detached Mode (as a server)

- `docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]`
  - Although image developers can specify default values in the image itself, the `OPTIONS` section let's the invoker reset/override these values
  - if the dockerfile specifies a `CMD`, you can override this
  - same with `ENTRYPOINT`
  - example: `docker run -it --entrypoint /bin/bash example/redis`
  - example: `docker run -it --entrypoint /usr/bin/redis-cli example/redis --help`

- **Detached vs Foreground**
  - to run as a *service*, use `-d` option for *detached*
  - the container will exit when the root process running inside the container exits
  - gotcha: `docker run -d -p 80:80 my_image service nginx start` will exit almost immediately bc `service nginx start` will return (bc it's running a service inside the container)
- Attaching I/O:
  - when running in foreground mode, docker can attach the console to the inner process'es stdin, stdout, and stderr
  - `-a=[]`: Attach to `STDIN`, `STDOUT` and/or `STDERR`
    - `docker run -a stdin -a stdout -i -t ubuntu /bin/bash`
  - for interactive processes (like a shell), use `-it` which is the combinded form of:
    - `-i`:  keeps STDIN open
    - `-t`: allocate a TTY
- There are 3 identifiers a container
  - **Long UUID**: "f78375b1c487e03c9438c729345e54db9d20cfa2ac1fc3494b6eb60872e74778"
  - **Short UUID** "f78375b1c487"
  - **Name**: You can assign this manually or one gets generated automatically (e.g. "large_pirhana")
- `--cidfile="filename"`: will write the UUID out to a file (good for automation)
- `pid=<various-options>`
  - sets Process ID isolation
  - basically, the processes running in a container can be:
    - totally isolated
    - shared with the host (good for debugging)
    - shared with another container
- Networking
  - `--dns=[]`           : Set custom dns servers for the container
  - `--network="bridge"` : Connect a container to a network
                        'bridge': create a network stack on the default Docker bridge
                        'none': no networking
                        'container:<name|id>': reuse another container's network stack
                        'host': use the Docker host network stack
                        '<network-name>|<network-id>': connect to a user-defined network
  - `--network-alias=[] `: Add network-scoped alias for the container
  - `--add-host=""`      : Add a line to /etc/hosts (host:IP)
  - `--mac-address=""`   : Sets the container's Ethernet device's MAC address
  - `--ip=""`            : Sets the container's Ethernet device's IPv4 address
  - `--ip6=""`           : Sets the container's Ethernet device's IPv6 address
  - `--link-local-ip=[]` : Sets one or more container's Ethernet device's link local IPv4/IPv6 addresses 
  - Publishing ports and linking to other containers only works with the default (bridge)
  - network types
    - `none`	No networking in the container.
    - `bridge` (default)	Connect the container to the bridge via veth interfaces.
    - `host`	Use the host's network stack inside the container.
    - `container:<name|id>`	Use the network stack of another container, specified via its name or id.
    - `NETWORK`	Connects the container to a user created network (using docker network create command)
- `--restart=always`
  - restart as soon as it exits
- You can specify any number of runtime constraints on the container as well
- Publishing/Exposing Ports
  - `--expose=[]`: expose a range of ports, in addition to what is in the dockerfile
  - `-P`: publish all exposed ports
  - `-p=[]`: publish specific ports
- Setting environment variables
  - `-e "varName=varValue"`
- there are a variety of healthcheck options, corresponding to the setting in the dockerfile
- Volume (shared  filesystems)
  - See [this ref](docker run -it --entrypoint /usr/bin/redis-cli example/redis --help)

## Docker Volumes
- [src](https://docs.docker.com/storage/volumes/)
- In the old days, there used to be a recommendation for data-only containers.  But now we have the volume api which lets you create persistent volumes like so: 

```
docker volume create --name helloworld
docker run -d -v helloworld:/container/path/for/mapped/volume image-name command-to-execute
```

## Weird Stuff
- Some docker services (or their images) require other services to have a particular name
  - ex: I found that with the mongo-express image, if I changed the name of the service from `mongo` to `db`, it totally failed
