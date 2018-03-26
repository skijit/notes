WCF Notes
===================

## basic terms
- [notes from here](https://docs.microsoft.com/en-us/dotnet/framework/wcf/fundamental-concepts)
- wcf lets you send messages between services and clients
- client and service can be on the same or different computers
- messages are sent between endpoints
  - endpoint is any place a message is received
  - the service exposes one or more endpoints, and then client is an endpoint
- the endpoint exposes metadata whic tells clients (using standards)
  - where messages should be sent
  - how they should be sent
  - what they should look like
- Transport:
  - Can be HTTP, TCP, MSMQ, etc.
- Encodings
  - Text
  - MTOM (interoperable binary)
  - Binary
- Message patterns
  - request-reply
  - one-way (fire and forget)
  - duplex
- Binding
  - refers to the transport and encoding
- service operation: the method or functionality exposed by the service
- service contact: this is an interface which defines slots for the various service operations
- operation contract: defines the parameters and return type of an operation
- message contract: defines the format of the message
- fault contract: denotes errors that can be returned to the client.
- data contract: metadata descriptions of the data types a service returns
- self-hosted service: a service that runs within a process application that the developer created.
- hosting process: an application that is designed to host servies, like IIS.
- instancing: 3 options
  - single: a single CLR object services all the clients
  - per call: a new CLR object is created to handle each client
  - per session: a set of CLR objects is created, one for each separate session
- channel: a concrete implementation of some part of the binding.
