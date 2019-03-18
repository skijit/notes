Kubernetes
================

- [general](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [ref](https://docs.docker.com/docker-for-windows/kubernetes/) 
- [btw](https://stackoverflow.com/questions/37845715/can-kubernetes-be-used-like-docker-compose)

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

- Resume [Here](https://kubernetes.io/docs/concepts/)
