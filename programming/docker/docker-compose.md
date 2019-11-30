Docker Compose
=================

- use Compose for running multi-container applications
- Use Cases
  - Development Environments
  - Automated Testing Environments
  - Single Host Deployments
    - Other Production Environments (e.g. Clusters) [are in development](https://docs.docker.com/compose/production/)
## Configuration Files
- `Dockerfile`: define one container's image
- `docker-compose.yml`: how to interface the various containers
- `docker-compose.override.yml`: used for development
- [Compose file format](https://docs.docker.com/compose/compose-file/)
- currently using format version 3
- tons of example docker-compose files [on github](https://github.com/search?q=in%3Apath+docker-compose.yml+extension%3Ayml&type=Code)
- defines configuration for 3 things
  - services -> for config'ing containers
  - networks
  - volumes
- the particular values are analoous to `docker <container|volume|network> create` insofar as they respect the existing image / Dockerfile configurations
- bash-style environment variables (like in the Dockerfile) are ok in `docker-compose.yaml`
- high-level format:

```(yaml)
version
services:
  stuffhere
networks:
  stuffhere
volumes:
  stuffhere
configs:
  stuffhere
secrets:
  stuffhere
```

- `configs`
  - Lets you define swarm configurations by referring to corresponding files
  - you can localize them under the particular services too, in which case they're not global

- `service` properties
  - `build`: 2 forms
    1. path to the build directory

    ```
    build: ./dir
    ``` 

    2. an object with these options

    ```(yaml)
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
    ```

  - `image: yourservicename:tag`: when specified with a build path, it will name and tag the built image as specified.
  -  for the build args, your Dockerfile would look like this:

  ```
  ARG buildno
  ARG gitcommithash

  RUN echo "Build number: $buildno"
  RUN echo "Based on commit: $gitcommithash"
  ```

  - and your `docker-compose.yaml` would look like this:

  ```(yaml)
  build:
  context: .
  args:
    buildno: 1
    gitcommithash: cdc3b19
  ``` 

  - if you omit the corresponding value (e.g. 1 or cdc3b19), it will substitute in the corresponding environment variable at build time

  - `SHM_SIZE`: virtual memory size

  - `TARGET`: build the specified stage, if the the corresponding Dockerfile is a multistage build

  - `command`: override the default CMD in the container.
    - form 1: `command: bundle exec thin -p 3000`
    - form 2: `command: ["bundle", "exec", "thin", "-p", "3000"]`

  - `container_name`: specifies the custom container name, but remember this has to be unique

  - `depends_on`: expresses dependencies between services which has these effects:
    - `docker compose up` will start them in order of dependencies
    - `docker compose up SERVICE` will start the service and it's dependencies
    - `docker compose stop` stops them in dependency order

  ```(yaml)
  version: "3.7"
  services:
    web:
      build: .
      depends_on:
        - db
        - redis
    redis:
      image: redis
    db:
      image: postgres
  ```

  - `entrypoint`: overrides the default entrypoint

  - `env_file`: list of files that contain environment variables in the form

  ```
  VAR1=VAL1
  VAR2=VAL2
  ```

  - `environment`: list of environment variables to set

  - `expose`: list of ports to expose without publishing to the host machine.  they will however be accessible to linked services.

  - `external_links`: links to containers specified outside the `docker-compose.yaml`

  - `extra_hosts`: publishes entries into the container's `/etc/hosts` file

  - `healthcheck`: policies for checking the health of the container (same as in Dockerfile)

  - `image`: the image from which to base the container on.  it can be the container or tag name.

  - `network_mode`: same as in Dockerfile

  - `networks`: nws to join, which references entries under the top-level `networks` key

  - `restart`: sets restart policy for the container

  - `sysctls`: kernel parameters to set

  - `volumes`
    - this can be defined at top level if you want to share it across multiple services, or you could put in under services
    - you can only create named services at the top-level
    
    ```
    version: "3.7"
    services:
      web:
        image: nginx:alpine
        volumes:
          - type: volume
            source: mydata
            target: /data
            volume:
              nocopy: true
          - type: bind
            source: ./static
            target: /opt/app/static

      db:
        image: postgres:latest
        volumes:
          - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"
          - "dbdata:/var/lib/postgresql/data"

    volumes:
      mydata:
      dbdata:
    ```

    - Short Syntax
    
    ```
    volumes:
      # Just specify a path and let the Engine create a volume
      - /var/lib/mysql

      # Specify an absolute path mapping
      - /opt/data:/var/lib/mysql

      # Path on the host, relative to the Compose file
      - ./cache:/tmp/cache

      # User-relative path
      - ~/configs:/etc/configs/:ro

      # Named volume
      - datavolume:/var/lib/mysql
    ```

    - Long Syntax (ie properties you can specify (still only within `services` node))
      - `type`: `volume`, `bind`, `tmpfs`, or `npipe`
      - `source`: for bind mounts, this is the path on the host and for volumes this is the name of top-level volume
      - `target`: path in the container where mounted
      - `read-only`
      - there are other options...

    - When you deploy your container in a swarm, you should use named volumes bc you don't know which node is going to be used

- Top-level `Volume` CFG
  - a variety of driver opts
  - `external` indicates the volume was created outside of compose

- Network CFG
- Config CFG

## CLI Info
- [CLI Reference](https://docs.docker.com/compose/reference/)
- Syntax:
  - `docker-compose [-f <arg>...] [options] [COMMAND] [ARGS...]`
  - options
    - `-f FILE`: specifies an alternate docker-compose file
      - you can specify multiple files and they will be added in that order
    - `-p  NAME`: specifies a different project name (default = current directory)
      - each configuration has a project name
      - exposed as `COMPOSE_PROJECT_NAME` env variable
    - + a variety of networking/security stuff
- `build`
  - `build [options] [--build-arg key=val...] [SERVICE...]`
  - services are built and then tagged with `project_service`
  - run this when you change the Dockerfile or the content of the build directory
  - OPTIONS
    - `--force-rm`:  Always remove intermediate containers.
    - `--no-cache`
    - `--mem`
    - `--parallel`: build containers in parallel
    - `--build-arg <ARGS>`
    
- `create`: deprecated - use `up` instead
- `down`: stops and removes containers, networks, volumes, and images created by `up`
- `exec`: just like `docker exec`
  - `exec [options] [-e KEY=VAL...] SERVICE COMMAND [ARGS...]`
  - `--detach`:  run command in background
  - `--env KEY=VAL`: set env vars
  - `--workdir DIR`: path to workdir for command
  - for example, to get a shell: `docker-compose exec web sh`
- `ps`: list containers
- `pull`: pulls images for services
- `push`: pushes images for services
- `restart`: restarts all stopped and running services.  or you can specify multiple svcs.
- `rm`: removes stopped service containers
  - `-v` will remove any anonymous volumes
- `run`: creates a new container for a specified service and runs a 1-time operation in there
- `start`: start a servoce
- `stop`: stop a service
- `top`: displays the running processes

