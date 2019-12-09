Docker Networking
==============

- [src](https://docs.docker.com/engine/tutorials/networkingcontainers/)

## Concepts
- Custom Networks use Drivers
- 2 OOB Drivers are:
  - Bridge
  - Overlay
  - (but you can write your own too)
- The default network for docker is named `bridge`
- Creating your own networks are a good way to isolate containers from each other
- For debugging, you can always exec a bash in a container and then try to ping another container to see if it's on the network
- Host vs Container Visibilities
  - A host's nw interaction with its container is limited to the ports that are opened
  - A container's visibility into anything is based on the network it is attached to
- Docker-Compose Details
  - D-C sets up a single network for all services
  - Each service's container is reachable and discoverable (i.e. embedded DNS) at a hostname which matches the container name
  - The project's nw is the same as the project name (which can be overriden via env vars)
  - You can create multiple networks in your project
    - This is sometimes done to increase the security between front and back-ends
  - You can configure the default network as well
## CLI
- `docker network ls`: view existing networks
- `docker network inspect <nwName>`: see characteristics of given network
- `docker network disconnect <nwName> <containerName>`: remove container from network
- `docker network connect <nwName> <containerName>`: add container to network
- `docker network create -d <driverName> <nwName>`: create your own network
  - `docker network create -d bridge my_bridge`
- `docker inpsect <containerName>`: will show you container info, including the network it's part of
