Devops Tool Roundup
===============



## IAC Concepts
- **Configuration Management vs Provisioning**
  - Config Mgmt: Manage the software on *existing* servers
  - Provisioning: Create the servers
  - Usually, tools can do a little of both but have a particular emphasis
  - **Key**: Provisioning is preferable when you're using containers (as there's minimal dependencies installed on the server)
- **Immutable vs Mutable Infrastructure**
  - Config mgmt ususally implies Mutable infrastructure 
  - Mutable infrastructure often leads to `configuration drift` where each server becomes slightly different than others leading to difficult bugs
- **Procedural vs Declarative**
  - Procedural: Step by step instructions of what to do.  More akin to programming.
    - Pros:
      - More expressive
    - Cons:
      - Templates are less reusable - each one is applied w/o regard to current deployment.
      - Templates don't capture the full state - just the current operations/mutations
  - Declarative: Specify the *desired configuration* and let the software figure it out.
    - Pros: 
      - The templates are reusable/idempotent
      - The templates capture the full state
    - Cons: Less expressive (no branches, loops, etc.)
- **Master vs Masterless**
  - Master server is sometimes used to store infrastructure state and distributing updates
  - Provides some conveniences, but it's also extra infrastructure which imposes costs for maintenance and additional security
- **Agent vs Agentless**
  - Some IAC tools require you to install an agent on the server being provisioned/configured
  - Bootstrapping: creates some difficulty to figure out how/when to install the agent on the server
  - Security: adds a security risk as you have to open ports to let the agent communicate with the master
- [Excellent source](https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c)

## IAC Software

### Chef
- Profile:
  - Config Mmgmt
  - Mutable
  - Procedural
  - Agent (Chef client)
  - Master
  - OLD
- Notes
  - Master hosts a web interface (chef console)
  - Some support for masterless mode
  - Dubious but advertised support for agent-less mode

### Puppet
- Profile:
  - Config Mmgmt
  - Mutable
  - Declarative
  - Agent (Puppet Agent)
  - Master
  - OLD
- Notes
  - Master hosts a web interface (Puppet Enterprise Console)
  - Some support for masterless mode
  - Dubious but advertised support for agent-less mode
### Ansible
- Profile:
  - Config Mmgmt
  - Mutable
  - Procedural
  - No Agent (connects to servers via ssh)
  - No Master
- Notes
  - Currently (2020) very popular
  - One common approach is to use terraform for your IAC and ansible for deploying apps (presumably the non-containerized ones)

### Vagrant
- [See this](https://www.vagrantup.com/intro/index.html)
- Vagrant is a VM provisioning tool for **Development Environments** which runs locally or in other environments (e.g. VMWare, AWS, etc.)

### SaltStack
- Profile:
  - Config Mmgmt
  - Mutable
  - Declarative
  - Agent (Salt Minion)
  - Master
- Notes  
  - Some support for masterless mode
  - Dubious but advertised support for agent-less mode

### CloudFormation
- Profile:
  - Provisioning
  - Immutable
  - Declarative
  - No Agent
  - No Master
  - AWS Only

### Heat
- Profile:
  - Provisioning
  - Immutable
  - Declarative
  - No Agent
  - No Master

### Terraform
- Profile:
  - Provisioning
  - Immutable
  - Declarative
  - No Agent
  - No Master

## CI/CD Software

### Jenkins
### Travis
### CircleCI
### GitLab
### TFS Pipelines

## Health Monitoring Concepts
- **APM**: Application Performance Management
- Kibana
- DataDog
- TODO: More...
- [read this](https://indexoutofrange.com/Choosing-centralized-logging-and-monitoring-system/)

## Misc
- **Packer**
  - [read this](https://alex.dzyoba.com/blog/packer-for-docker/)
  - [and this](https://packer.io/intro/getting-started/install.html)

- Terraform and Kubernetes
  - [this looks like a good read](https://gruntwork.io/guides/kubernetes/how-to-deploy-production-grade-kubernetes-cluster-aws/#what-is-kubernetes)
  - [also this](https://www.hatboysoftware.com/blog/kubernetes-helm-terraform/)




