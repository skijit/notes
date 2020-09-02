Edge Computing
================

- 2 types of edge servers
  1. CDN Edge Servers
  2. Edge Compute Servers

## CDN
- Serve static resources for a website, such as HTML, javascript, etc. from a server that is closer (faster) to the requester's location
- Scenario:
  - Client requests resource
  - Request lands at the CDN's closest server (by mediation of DNS or something else)
  - CDN serves it's copy of the resource
  - If the CND doesn't have the resource, it proxies the request to the origin server and caches the result
- 3 benefits:
  - Reduced latency for client
  - Reduced load on the server
  - Security benefits for server by shielding it from DDOS and other attacks

## Edge Compute Servers
- Provide dynamic processing (compute, storage) between IoT or 5G devices and the cloud or enterprise data center, reducing latency and bandwidth for the client
- Edge compute functionality is typically containerized

- Todo: More info on [this site](https://www.stackpath.com/edge-academy/edge-server/)