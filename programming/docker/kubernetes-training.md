Kubernetes in 3 Weeks 
====================

- OS's manage these Core Resources
  - CPU
  - IO
  - Memory
- From a dev point of view, Kubernetes manages the same resources (analogous to OS)
- "high Cohesion and Low Coupling" in Containers
  - cohesion: only including components that are relevant to job at hand.  remove unnecessary things.
- 8 fallacies of distributed computing:
  - Nw is reliable
  - latency is zero
  - bandwidth is infinite
  - nw is secure
  - topology doesn't change
  - only one admin
  - transport cost is zero
  - nw is homogenous
- Moving to nw, you also lose your ACID transactions
  - move into a world of eventual consistency
- see spaced-based architecture (book: fundamentals of software architecture)
- kubernetes replaced swarm, accepted by docker
  - kubernetes has 10+ years of building orchestrators, so swarm couldn't compete
- nomad is a good simple container orchestrator from Hashicorp
- Todo: look into meshing, istio, k3s
- there are kubernetes app developer certs
- players
  - amazon, MS, Google, IBM
  - and so many more (digital ocean, alibaba, oracle)
- "day 1" vs "day 2"
  - day 2 is the emphasis on uptime, performance, security, etc.  (sometimes a harder problem)
- etcd: state
- 16 essentials
  - scalability and elasticity
  - security
    - how do you get secrets into your microservice: they have secrets support
    - role-based access is supported
  - volumes
  - load balancers
  - portability
  - resource management (spend/consume less)
  - scheduling: decides where on the cluster to run your services
  - Declarative: it figures out how to implement your instuctins (i.e. not imperative)
  - Distributed
  - Networking  (service to service)  
  - Extensibility: operator pattern, custom resource definitions ()
  - Abstraction
  - Self-healing
  - Observability
    - Logging
    - Tracing (hops across a distributed system)
    - Metrics (real-time dbs, dashboards, etc)
  - Namespaces: you can put applications in different namespaces
  - High Availability
- Good book: "Kubernetes up and running"
- Arch
  - node: a physical or vm in the cluster
    - master nodes run processes that manage cluster  (you want at least 2 for HA)
    - worker nodes run your processes
  - pods: grouping of one or more containers
    - typically ~30 pods per node
    - you want minimal number of containers inside your ppds
  - services load balance betwen load replicated pods and do service discovery
    - basically- you have a service that are interface to pods
  - kubelet is installed on each node and is responsible for lifecycle of pods
    - it doesn't inherently know about the containers
    - it uses Container Runtime Interface (CRI) to start the containers
    - the container just needs to follow the Open Container Interface (OCI)
      - Docker
      - cri-o
      - cri-containerd
      - crun
      - webassembly?!
  - network plane ties everything together
  - etcd: kubernetes state (real and desired)
    - you need at least 3 replicated versions of this
    - implements RAFT concensus algorithm
  - controller manager:
    - lives on master node
    - communicates w kubelets to (eg) start pods on nodes
    - scheduler will figure out the how to pack pods into the nodes
  - ingress/node port: this is where outside customers come in from
- CLI stuff
  - `kubctl create namespace ticketing`
  - `kubectl label namespace ticketing venue=operar watch=cpu`
- Yaml 
  - always start wtih `apiVersion` and `kind`
    - example kind: `namespace`, `pod`, etc.
    - would tie into the controller-manager (control-loop) for namespaces
    - apiVersion: also called Object controller version
    - kind: also called Object Classification
    - other root level properites: `spec` and `metadata`
- ReplicaSet (another `kind`)
  - tells you the number of instances of a pod you'd want
- Deployment (another `kind`)
  - very popular.  cover pods, their replicaset, and how to roll them back or update them
- Jobs (another `kind` - kind of like a cronjob)
- Daemon set (another `kind`)
- You connect different yaml files and resource types through the metadata kv pairs
- ConfigMap and SecretMap
  - Can get mapped into a container
  - Security questions is an example
  - Data can be linked by 
    - environment vars
    - command line parameters
    - read-only mount
- 3 types of probes
  - liveness:
    - you'll set up an endpoint on your ms to prove health
  - readiness:
  - startup:
- HELM is a package manager for kubernetes
  - group a set of yaml files and bundle them together
- katakoda
  - search for 'first app' for kubernetes
- Todo: subscribe to alex ellis
- helm packages are called 'charts'
  - there are tons for things like kafka, rabbitmq, etc

- Container Architecture
  - [read this](https://medium.com/@saschagrunert/demystifying-containers-part-i-kernel-space-2c53d6979504)
 

## Session 2
- kubelet on each node connects to the CRI (container runtime interface) and that interfaces with container runtime
  - The container type just needs to implement OCI (open container interface)
- todo: check out katacoda to see what a container looks like search 'decomposing'
- see the tool 'Dive' for exploring layers in a container
  - you can use it to shrink your image size too
- CI/CD pipelines create issues for kubernetes and docker
  - creates a problem due to nested stuff
  - a lot of times creating the container image makes sense without using the CLI
  - there are better tools to build the docker image inside k8s
    - kaniko, podman/buildah, bazel, k3c,
  - you might run these types of things as k8s jobs
- init containers
  - when a pod starts, you can run a series of init containers in sequence
  - they're supplementary to do the extra work
    - e.g. seeding a database
- knative
- tekton
- check out cncf.io (cloud native computing foundation)
  - see tiles in landscape
- there's a helm chart which runs a local docker image repository on your cluster
- `jq` is a cool tool for parsing json files
- Distillation Pattern (8 factors)
  - "making containers as efficient and secure as possible on k8s"
  1. high cohesion 
  2. low coupling
  3. Immutable
  4. Idempotent
    - antipattern for idempotence: tagging with "latest"
  5. Attack Phobic
  6. Small Images
  7. Rapid Startup
  8. Resource Frugality (runtime)
- Metadata
  - Annotations and Labels
    - both are key-value pairs
  - Labels let you do filtering in the CLI
  - Annotaions are more required metadata, but you can't filter
- See ConfigMaps and Secrets Katacoda  <-- importante!
- Volumes
  - Pod-specific (althernative to IPC)
  - Node-Specific
  - Cluster-specific
- Stateful Services
- Quality of Service
  - BestEffort
  - Burstable
  - Guaranteed
- Horizontal Pod Autoscalar
  - thre's a katacoda for that (search hpa)
  - defines metrics and scaling rules
- Security: TBD
- Pod Disruption Budget
  - Never go below the minimum number of pods
  - applies to event types:
    - Node draining: taking pods off a particular node
    - Hardware Failures
    - Node Scaling Downward
    - Probe Failures
- Affinity
  - Pods are marked to tell scehdule what Nodes they prefer or not
    - e.g. if you're running .NET full frameowk, you want a wnidows server (host)
    - something with a GPU
  
- Config Maps and Secrets ('Context')
  - [see katacoda for config maps and secrets](https://learning.oreilly.com/scenarios/kubernetes-fundamentals-configmaps/9781492078869/)
  - config maps and secrets are very similar - go towards defining 'context'
  - 12 factor app- 3rd principles - config that varies between environments should be stored in environments
  - there is a config map section in k8s dashboard by default- but these are namespaced to the system
  - when you create configmap- they get stored in etcd - the HA, distributed in-memory store which you can use to look for k/v pairs
    - there are other distributed memory stores which you could swap out for etcd 
    - most architects would use a helm chart to get a different system for storing configmaps and secrets (in prod)
    - you can use the API to create configmaps or author your own yaml of kind `ConfigMap` (or use the API to dump the corresponding YAML if it was generated)
      - `kubectl create -f my-config-map.yaml`

  - 3 ways to get ConfigMap data into your Containers
    1. Pass in via commandline (for container)
    2. Pass in as ENV variable (most popular)
    3. Mount to a r/o file on the filesystem (and that file is created by k8s) (good for when this is dynamically changing (e.g. connection string)- since env variables are fixed in a container)
  
  - Creating/managing secrets
    - `kubectl create secret generic db-password --from-literal=password=myDbPassword`
    - `kubectl get secret db-password`
    - `kubectl get secret db-password -o yaml`

  - Similar to the swapping out etcd for ConfigMaps, if you don't want to use etcd for passwords, you can swap out something like vault (there's a helm chart for it) and still use the same secrets api (just like configmap)
  - once you have a secret injected into your container, you can use:
    - environment variable
    - encrypted file
    - call vault directly 
  
## Pod Quality of Service
- Top reasons why clusters fail: size your pods correctly 
  - Prometheus: Will analyze the CPU/Mem consumed by your your containers
- 3 ways to specify CPU/Mem needs of Pods to K8s
  1. BestEffort
    - Default when you don't specify
    - k8s will guess randomly
  2. Burstable
    - specify the minimum amount
    - also specify a highest amount
  3. Guaranteed
    - safest way, but fixed size and may overallocate resources
- See [Horizontal Pod Autoscalar katacoda](https://learning.oreilly.com/scenarios/kubernetes-observability-scaling/9781492079002/)
  - There are 3 ways to scale in k8s
    - Horizonal Pod Scaling- additional pod instances
    - Cluster Node Scaling- adjusts the entire size of the cluster so that all pods have a place to run and there are no unneeded nodes
    - Vertical Pod Scaling- increasing resources to pods
  - For Horizontal Pod Scaling
    - you specify a min and max number of pods to scale up, and min pod number to scale down
    - a control-loop compares metrics against these declared states and scales appropriately
  - Procedure
    - Install (via helm) the `metrics-server` application for k8s.  It discovers all nodes and queries the kubelets for CPU/memory.  (it only holds latest metrics- no history).
      - You can call the corresponding rest endpoint (pipe thru jq) or call `kubectl top node`
      - If you want to accumulate these metrics over time, you typically add the time-series database, `prometheus`
    - If your pod's deployment is a DaemonSet, StatefulSet, Job, or CronJob, then none of this applies.  It only applies to ReplicaSet deployments.    
    - You submit a yaml file kind: `HorizonatlPodAutoscaler`
- To understand units in resource requests:
  - [Explanation of MiB vs MB](https://en.wikipedia.org/wiki/Mebibyte)
  - [Explanation of units in k8s docs](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

## Pod Species
7 forms:
- ReplicaSet
  - declare how many instances of a pod you want
  - you can specify multiple containers within a replicateset
  - do not use with HorizontalPodAutoscaler as these would be somewhat in contention.  
    - the more "mature" solution is Deployment (of 1) + HorizontalPodAutoScaler
- Deployment
  - most common
  - supports rollouts
  - Pause
  - Image updates
  - rollbacks
  - inside the deployment is:
    - replicas
    - pod template
- DaemonSet
  - Run a pod on every node in the cluster (that matches a label)
  - Use cases: logging/log extraction, observability, anything you want to control at the node level, more system/cluster level than application level
- StatefulSet
  - Compare to Deployment:
    - Deployment are just clones of instances
    - StatefulSet is a set of instances, each one with a distinct identity
      - if one goes down, another one with the same identity will be brought back up  
  - Sticky Identity    
  - Connected volumes
  - Distributed managers
  - Consistent ID on a pod reconstruction
  - Ordered members
  - Use cases: things like Redis, RabbitMQ (see katacoda)
- Job
  - Use case: execute something and end
- CronJob
  - Same as job but reoccurring work (timing-based trigger)
  - smallest time resolution is 1 min

## K8S Design Patterns
- Operators:
  - [src](https://www.redhat.com/en/topics/containers/what-is-a-kubernetes-operator)
  - A kubernetes application design pattern
  - A higher-level abstraction, usually involving Custom Resource Definitions (CRD), that let's you encapsulate your application into a unit that can be managed through (your custom extension of) the k8s API.  
  - It builds in application logic (business logic) to determine when to scale something - so it's useful for stateful logic
  - In K8S, the controllers of the control plane implement control loops to compare actual and desired state based on generic concerns.  But operators provide a higher-level abstraction to let you manage them at a business logic level.
- Scatter/Gather
- You can run multiple containers in Pods
  - Pods are the atomic unit in K8S
  - You can run multiple containers in a pd
  - If you have a problem with a container, the entire pod will be crashed
    - So that creates some risks with colocating them, even though you get communication speed benefits
  - If the containers are on the same pod, that means they're on the same node too
  - When do you group containers in a single pod?
    - Communication efficiency:
      - Take advantage of IPC, communicating through localhost      
    - share filesystem
      - When you create a pod it gets an IP and a filesystem which is available to all containers in that pod
      - Individual containers on the pod can communicate via the filesystem
    - "Sidecar" is when you have a second or other container in a pod
      - But it's not part of the primary transaction handling for the pod
      - Applications Logging, pulling data, etc.
  - "Ambassador"
    - Not a sidecar 
    - Not specific to k8s
    - Represent and proxy to other services
    - Primary App talks to ambassador and the ambassador handles all the other back-ends
  - Adapter
    - Similar to ambassador pattern
      - But NOt a facade/proxy for a bunch of other services
- 4 ways to do Pod Composites (Sidecars)
  - Side car
    - the order in which containers in a shared pod start up is arbitrary
    - they're started in parallel
    - the more you put in, the slower they start up
  - Ambassador
  - Adapter
  - CQRS
    - Put the query model and command model in the same pod, but separate containers
- Services
  - these are necessary to open up a pod to be interacted with
  - typically, you'll expose a service with a `NodePort` type
    - `kubectl expose pod <podname> --type=NodePort --port=8`
    - you might create a service with a random port, here is a way to change it to a fixed value: `kubectl patch service <podname> --type='json' --patch='[{"op": "replace", "path": "/spec/ports/0/nodePort", "value":31111}]'`
- Storage
  - CSI (Common storage interface) drivers: for different storage services (e.g. Google cloud filesystem, Azure filesystem, etc.)
  - kind: PersistentVolume, PersistentVolumeClaims, etc
  - search for 'volumes' in the k8s documentation
- Ingress
  - Incoming Traffic
  - kind: Ingress
  - You create rules to match the request to a particular service

## Helm
- There are other package managers (Ballerina, metaparticle, pulumi)
  - but helm is the most popular
- use helm version 3 only
- charts are stored in private and public registries
- injects values into k8s YAML templates
  - `helm version`
  - `helm create`
  - `helm install`
  - `helm update`
  - `helm delete`
  - `helm test`
  - `helm search hub` search helm hub from CLI
  - `helm show readme <chartname>`
- [Helm Hub](hub.helm.sh)
  - Public repository
- A common pattern is to install an operator for a particular application via helm, then you configure it with a YAML file and that will leave it to the operator to install the actual application (e.g. Kafka)
- chartmuseum is like a repository hub
  - following a dockerhub-like example
- easiest way to install helm is with a curl script
- `helm env` shows your environment
- you'll typically call `helm install <nameOfChart> <name-of-properties-file>`
  - properties file has all the installation/runtime parameters
  - you would check it into your IAC code
- you typically want ton install a helm chart into a namespace
- `helm list --all-namespaces`
  - show every chart that is installed
- you can run container registries in kubernetes
  - it's quite easy







    


## Resources
- [scaling](https://learning.oreilly.com/scenarios/kubernetes-observability-scaling/9781492079002/)
- [sidecar deployments](https://learning.oreilly.com/scenarios/kubernetes-fundamentals-sidecar/9781492078845/)
- [helm](https://learning.oreilly.com/scenarios/kubernetes-pipelines-helm/9781492078968/)
- [k8s jobs](https://learning.oreilly.com/scenarios/kubernetes-fundamentals-jobs/9781492078852/)
- [stateful sets-rabbit mq](https://learning.oreilly.com/scenarios/kubernetes-applications-rabbitmq/9781492078913/)
- [stateful services](https://learning.oreilly.com/scenarios/run-stateful-services/9781492062103/)
- [storage]()
- ingress: search for 'ingress'

