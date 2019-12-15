AWS Certifcation Notes
==============

- [source](https://learning.oreilly.com/videos/aws-certified-developer)
- Cloud9 is a browser-based development environment for AWS
  - You have to provision an environment for it to run on remotely - usually just specifying a new EC2 instance
- Compute Fundamentals
  - EC2
    - Virtual Instance
    - Highly Configurable
      - OS
      - RAM
      - CPU
      - Many many options
  - Lightsail
    - Easier version of EC2
  - ECS
    - Container Orchestration
  - EKS
    - Container Service for Kubernetes
  - Lambda: Serverless
    - Pay only for execution time
  - Elastic Beanstalk
    - Rapid webservice / application development
- Storage Fundamentals
  - EBS: Elastic Block Store
    - Attach to EC2 instances
    - Easy to clone and snapshot 
  - S3
    - Object storage
  - EFS: Elastic Fileystem
    - Highly scalable
    - Mount on EC2
  - Glacier
    - Object storage like S3 but...
    - Long term storage 
- Physical Global Infrastructure
  - Availability Zones
    - Compute clusters which are connected with low latecny, high throughput, and redundant nw
    - You can deploy services into Multiple Availability Zones - to get HA / Fault Tolerance
  - Regions
    - Physically separated clusters of Availability Zones
  - Edge Locations
    - Servce requests for CloudFront (?)and Route 53 (?)
    - Sounds like a CDN
    - For cached content
- Shared Security Model (responsibilities)
  - "You": "In the cloud"
    - IAM
    - Security Groups
    - VPC (your network)
    - MFA
    - Key/Credential Rotation
    - OS patches
  - AWS: "Of the cloud" -> physical
    - Remember- except for managed services, they're still mostly IAAS
    - Physical services
    - DOOS mitigation
    - Personnel
- Resource Limits
  - Each account has limits such as the number of API keys or resources
  - You can request increases




