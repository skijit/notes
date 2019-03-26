Kubernetes
================

- [Core concepts](https://kubernetes.io/docs/concepts/)
- [general tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [windows ref](https://docs.docker.com/docker-for-windows/kubernetes/) 
- [comparison to swarm/compose](https://stackoverflow.com/questions/37845715/can-kubernetes-be-used-like-docker-compose)
- [12-factor apps](https://12factor.net/) - TODO - Separate notes on this

 - Kubernetes cluster includes 2 things:
  - Master: manages the cluster...
    - scaling
    - scheduling
    - allocating processes to nodes
    - updating
  - Nodes: workers
    - Runs containers (aka node processes)
    - Each has a Kubelet, which is an agent for managing the node and communicating back to the cluster master.
- Cluster should have a minimum of 3 nodes
- Kubernetes API:
  - hosted on master
  - node - master communication
  - end user (kubectl) - cluster communication
## Running Kubernetes locally
  - There are two options:
    1. Docker for Desktop now includes Kubernetes bundled
      - Windows-only
    2. Minikube 
      - Cross-platform
  - [Comparison of both approaches](https://codefresh.io/kubernetes-tutorial/local-kubernetes-windows-minikube-vs-docker-desktop/)
    - TL/DR: for Windows dev and getting started, go with Docker-Desktop.  Otherwise Minikube.
  - Minikube
    - lightweight kubernetes implemention that creates a VM on your local machine and deploys a simple cluster with only 1 node.
    - available for windows, linux, macOS
    - `minikube version`
    - `minikube start`
    - kubernetes CLI: `kubectl`
      - `kubectl version` will show you the client and server versions
      - `kubectl cluster-info`
      - `kubectl get nodes`
- Deployments
  - Deployment Configurations tell kubernetes how to create and update instances
  - The kubernetes master then realizes this configuration

## Core Concepts

### Kubernetes Control Plane
- Refers to all the kubernetes-related processes running in your cluster (i.e. hosting-oriented processes, not your application)
- Cluster Machines is divided into 2 types
  - Master
    - Only 1 per cluster
    - Runs 3 (+2) processes
      1. kube-apiserver
      2. kube-controller-manager
      3. kube-scheduler
      4. etcd: key / value store used as k8's internal cluster data
      5. cloud controller manager - runs controllers that interact with cloud providers
  - Nodes
    - Usually 2 or more in a cluster
    - Runs 2 (+1) processes
      1. kubelet
        - communicates with the master
        - makes sure containers are running in a pod
      2. kube-proxy
        - cluster network services
      3. container runtime: usually docker, but also containerd, cri-o, etc.
- Admin interacts with the cluster via the CLI, `kubectl`, which communicates with the master, and lets them:
  1. Create kubernetes objects which describe the desired state of the cluster.      
  2. make modifications to the cluster
  - Cluster is responsible for realizing the specified configuration changes (aka 'desired state').
- Additional Cluster Services
  - Cluster DNS 
    - serves DNS records for Kubernetes services and containers started by Kubernetes
    - Runs in addition to the other DNS servers in the environment
  - Web UI Dashboard
    - manage and troubleshoot the cluster
  - Container Resource Monitoring
    - centralized store of time series metrics about containers running in the cluster 
    - a UI for browsing that data
  - Cluster-level logging
    - mechanism for capturing container logs and centralizing in a log store, with a search/browsing interface
  
### Configuration
- [useful page](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/)
- K8s is controlled through a restful API
- That API is described through the swagger / Open API schema
- Two common clients for the API
  - `kubectl`: the user CLI
  - Client libraries called from within apps
- The Rest API payload is called the **Object Spec** and it's formatted as JSON
  - Object Spec describes the desired state
- But if you use kubectl, you'll typically specify the Object spec as a YAML configuration file, and kubectl will convert this to JSON and the corresponding API call.
- Example:
  - Config file

    ```(yaml)
    # application/deployment.yaml 
    apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
    kind: Deployment
    metadata:
      name: nginx-deployment
    spec:
      selector:
        matchLabels:
          app: nginx
      replicas: 2 # tells deployment to run 2 pods matching the template
      template:
        metadata:
          labels:
            app: nginx
        spec:
          containers:
          - name: nginx
            image: nginx:1.7.9
            ports:
            - containerPort: 80
    ```

  - Kubectl call
    - `kubectl apply -f https://k8s.io/examples/application/deployment.yaml --record`
      - I think it's ok if the object spec is accessed via the local file system
- Required fields in an Object Spec  
  - apiVersion - Which version of the Kubernetes API you’re using to create this object
  - kind - What kind of object you want to create
  - metadata - Data that helps uniquely identify the object, including a name string, UID, and optional namespace
  - spec
    - the format depends on the object type (e.g. it's one format for a Pod and another for a Deployment)

### Common Object Attributes
- **Names**
  - All K8s object types have a standard, unambiguous **Name** and **UID**
  - **Labels** and **Annotations** exist to add user-provided attributes to these objects
- **Namespaces**
  - This is a way to partition resources in a single cluster
  - The use-case is when you have multiple teams or projects sharing a cluster, but you want to have them maintained separately
  - Cluster DNS entries will expose cluster resources (e.g. services) with their associated namespace: `<service-name>.
<namespace-name>.svc.cluster.local` 
  - When no namespace is supplied, the default namespace is... `default`
- **Labels**
  - Labels let you associate user-defined key value pairs with an object.
  - Within a particular object, a key is unique
  - Example labels:
    - "release" : "stable", "release" : "canary"
    - "environment" : "dev", "environment" : "qa", "environment" : "production"
    - "tier" : "frontend", "tier" : "backend", "tier" : "cache"
    - "partition" : "customerA", "partition" : "customerB"
    - "track" : "daily", "track" : "weekly"
  - [See these labelling best practices](https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/)
- **Selectors**
  - Label Selectors provide a query syntax for objects based on their assigned labels
  - There are a few different syntax variations
    1. [Equality-Based](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#equality-based-requirement)
    2. [Set-based](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#set-based-requirement)
  - Usage scenarios
    - **From the CLI**
      - Ex: `kubectl get pods -l environment=production,tier=frontend`
      - the `-l` is a label selector
    - **In a Service Object Spec**
      - The set of pods that a service targets is defined with a label selector
      - The service object spec looks like this:

      ```(yaml)
      selector:
        component: redis
      ```

    - **In a Pod Object Spec**
      - Here the node which is selected when it has the label `accelerator=nvidia-tesla-p100`

      ```(yaml)
      apiVersion: v1
      kind: Pod
      metadata:
        name: cuda-test
      spec:
        containers:
          - name: cuda-test
            image: "k8s.gcr.io/cuda-vector-add:v0.1"
            resources:
              limits:
                nvidia.com/gpu: 1
        nodeSelector:
          accelerator: nvidia-tesla-p100
      ```

    - **Other Object Specs that might use a label selector**
      - Equality Based Syntax
        - Service (above)
        - Pod: (above)
      - Set-based syntax
        - Job
        - Deployment
        - Replica Set
        - Daemon Set
- **Annotations**
  - Like **Labels**
    - Associate k/v pairs with objects
    - Aribtrary, user-defined, metadata
  - Unlike **Labels**
    - Not the basis for querying (selecting).
  - So: the data can be retrieved (by tools and clients) but not formally searched
  - Common examples of metadata:
    - Build, release, or image information like timestamps, release IDs, git branch, PR numbers, image hashes, and registry address.
    - Directives from the end-user to the implementations to modify behavior or engage non-standard features.
- **Field Selectors**
  - Let you query k8s resources based on system-defined fields
  - The fields are specific to the object type, but all objects have:
    - `metadata.name`
    - `metadata.namespace`
  - Example of a chained field selector:
    - `kubectl get pods --field-selector=status.phase!=Running,spec.restartPolicy=Always`

### KubeCtl Approaches
- [ref](https://kubernetes.io/docs/concepts/overview/object-management-kubectl/overview/)
- There are 3 different approaches to specifying objects / cluster using KubeCtl:
  1. [Imperative commands](https://kubernetes.io/docs/concepts/overview/object-management-kubectl/imperative-command/): The CLI with all parameters explicit - no Object Specs
  2. [Imperative object configuration](https://kubernetes.io/docs/concepts/overview/object-management-kubectl/imperative-config/): The CLI with different Object spec yamls referenced
  3. [Declarative object configuration](https://kubernetes.io/docs/concepts/overview/object-management-kubectl/declarative-config/): Minimal CLI - almost everything is specified in the object spec files in a directory
- You want to choose one approach and stick with it
- Option 2 is the most mature and works well with CI/CD piplelines to production
  - This should be the starting point.

### Nodes
- [continue here](https://kubernetes.io/docs/concepts/architecture/nodes/) 


