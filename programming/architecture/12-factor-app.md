12 Factor App
=================

- [src](https://12factor.net/)
- Microservices Best Practices developed by Heroku team
- [12-factor app patterns in AWS](https://www.youtube.com/watch?v=2SxKKDXKrXQ&t=712s)

- **Codebase**
  - 1:1 Codebase to application
  - If there are > 1 codebases, it's a 'distributed system'
  - The only way to do shared code is with libraries, which require a dependecy manager
  - Codebase is the same across all deployments, although different versions may be active in each deployment

- **Dependency Management**
  - Never depend on system-wide packages
  - Never depend on host-based executables/tools
  - Dependencies should be scoped into the directory containing the app
  - Use some type of  *Dependency isoloation tool* to confirm that no implicit dependencies leak in from the surrounding system
    - For node, CI / `npm install` should be enough

- **Config**
  - *config* is everthing that varies between deploys (e.g. staging, production, dev)
  - includes credentials, names, etc.
  - needs to be separated from the executable
    - which makes it easier to open-source
  - environment variables are preferred method to provide an app config
  - don't group config names by environments - it should be be flat and have identical structure from one environment / deploy to the next

- **Backing Services**
  - Treat services (e.g. DB's, API's, etc.) identically whether provided internally or by a third party.
  - They should be able to be swapped out (detached) without application code changes.
  - Access these services through URL's.

- **Build, Release, Run**
  - Strict separation of 3 stages:
    - **build**: convert code to executable
    - **release**: combine build with a specific deployment's config.
    - **run**: launch the app in some runtime environment
  - Every release should have a unique ID, be immutable, and stored in some common location (if redeployment is necessary).

- **Processes**
  - Apps should be stateless and share nothing.
  - Any data that needs persisting should be stored in a stateful backing service, like a DB
  - Local filesystem can only be used as a cache and never depended on
  - This enables easier scaling out of an application via adding instances
  - If you need sessions, use a data store which has built-in expiration (e.g. Redis)

- **Port Binding**
  - Apps should be able to run independently of a webserver
  - The should bind to a local port and be self-hosted

- **Concurrency**
  - Some execution environments obfuscate the scale and behavior of their apps (e.g. JVM is one giant process and everything runs inside of that)
  - An application should decompose into normal processes, without any additional obfuscation or dependencies.
  - You can decompose the application by workload diversity / process types (e.g. an HTTP listener, a long running worker process, etc.)
  - You can scale out by creating new instances of these processes on other machines.
  - SystemD is a good way to take an ordinary process and make it into a service.

- **Disposability**
  - To enable scale-out processes should have minimal startup time.
  - Processes should shut down gracefully when recieving a SIGTERM signal
  - Processes should be robust against sudden death.  A queueing backend can be a useful approach to guarantee robustness in such an event.

- **Dev/Prod Parity**
  - Minimize the gaps across all environments:
    - **Time**: The time it takes between finishing coding and deployment.
    - **Personnel**: Devs write code, DevOps deploy it.
    - **Tools**: Production-level tools should be used in Dev (and obvs Prodution)

- **Logs**
  - Apps should write their logs directly to `stdout`
  - In production, can be rerouted to any number of destinations/routes/formats
  - The key is that the app doesn't have to know about this.

- **Admin Processes**
  - *Admin processes* refer to things like database migrations and one-time admin scripts
  - They should run in the same environment as long-running processes 
  - They should be shipped with the corresponding code / build to avoid sync issues.
  - REPLS are excellent for one-off scripts, batch files are useful where they're not available however


  
