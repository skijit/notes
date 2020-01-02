AWS Certifcation Notes
==============

- [source](https://learning.oreilly.com/videos/aws-certified-developer)

## Basics
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

### Lab Notes
- Creating a Cloud 9 instance to interact with your account
  - Services -> Cloud 9
  - It's important to remember which region you've selected for your Cloud9 instance
  - Notice the Cloud 9 URL: `https://us-east-1.console.aws.amazon.com/cloud9/ide/ce2cfd92a8904276803985fa507a2f77`
    - has region
    - has ID that is in the name of the associated instance
- Cloud9 Check Availability Zones
  - `aws ec2 describe-availability-zones`

## EC2
- Some basic EC2:
  - In the EC2 Dashboard, you can select 'Running Instances' and see a lot of interesting data on instances:
    - Instance State
    - Instance Type (EC2 type, e.g. micro, etc)
    - Elastic IP: public, static IP address which you can assign
    - Availability Zone
    - Security Groups: lets you view each FW group
    - AMI Id: Machine image ID used to provision instance
      - Note that AMI's are region-specific
    - Public DNS
    - Private DNS
    - VPC
    - Subnet
    - Block Device: you see the EBS device attached to the instance
  - within Images tab...
    - You can define your own
      - Elastic Block Store -> Snapshots -> Actions -> Create Image
      - You can also create snapshots of your volumes which is very useful
    - You can also view the available AMI's by clicking "Launch Instance"
  - Network & Security tab...
    - Elastic IP: You can create your own to assign to an EC2 instance
    - You only pay for the IP when you associate it to an EC2 instance
  - Instances have tags
    - You can associate any tags you want
  - VPC
    - It's like setting up a traditional network, but with the benefits of using the scalable infrastructure
  - Configuring an EC2 Instance
    - CloudWatch is a health monitoring service
    - Tenancy
    - Selecting Security Group
      - You select a connection type - e.g. SSH for linux, RDP for windows
      - You also select the source IP - i.e. where you're logging in from (so you can select your own IP address)
    - Finally, you create a keypair, and this only is downloadable once!
      - Once vm is provisioned, select it in dashboard and select 'connect'
      - Follow the instructions to ssh in
- Storage
  - Volume Types
    - EBS
      - General Purpose (gp2)
        - SSD
        - base performance of 3 IOPS per GB
        - burst to 3000 iops for extended periods
        - use cases: Boot volumes, small/med databases, dev/test environments
      - Provisioned IOPS SSD (io1)
        - You specify the IOPS you need, up to 32,000 IOPS
        - 500 MBs of throughput
      - Throughput Optimized HDD (st1)
        - Magnetic
        - Throughput: 500 Mb/sec
        - Low cost, sequential workloads
        - Use cases: EMR (map reduce), ETL, DW, log processing
      - Cold HDD (sc1)
        - Magnetic
        - Low cost, 250 MB/sec
        - Infrequent
    - EC2 Instance Store
      - Attached to the host computer
      - Emphemeral -lost when you stop the instance
      - buffers, temporary, etc.
    - EFS
      - Storage capacity is elastic
      - You can create this filesystem then the console will give you instructions how to mount the filesystem to your EC2 instance
        - be sure to match the security groups between EFS and EC2
      - Very good shareability across EC2 instances
- 'Bursting' vs 'Provisioned'
  - Bursting usually has a lower baseline with the ability to scale
  - Provisioned has a higher baseline but no additional headroom
- [Autoscaling and Load Balancing](https://aws.amazon.com/ec2/autoscaling/)  
  - **Summary of this section**:  LB -> TG -> ASG -> LC
    1. Create a 'Launch Configuration' which is just configuration which tells us how to spin up EC2 Instances
    2. Create an 'Auto Scaling Group' which defines the policies (we define) for scaling out (more instances) or scaling in (less instances), and associate it with our Launch Configuration
    3. Create a 'Target Group' for the Load Balancer to send traffic to
    4. Create a 'Load Balancer' which listens for requests (internal nw or public) and routes the traffic to a target group.
    5. Register targets (instances created by our Auto Scaling Group) with the target group  
  - Pretty much everything in here is provisioned with a wizard
  - In EC2 dashboard, go to "Auto Scaling"
    - `Launch Configuration`: Templates that an autoscaling group uses to launch EC2 instances
      - Create Launch Configuration -> Looks just like EC2 Creation Process except that you're not creating EC2 instances, but the configuration required to spin up new instances for the purpose of autoscaling
      - The next step is to assign a launch configuration to an  autoscaling group

    - `Auto Scaling Groups`: contains a collection of EC2 instances that share similar characteristics and are treated as a logical grouping for instance scaling and management 
      - You can associate an autoscaling group with a launch configuration (just mentioned) or a launch template (similar but adds versioning)
      - An autoscaling group includes:
        - Name
        - Instance Size
        - Network
        - Subnet
          - Note you can choose to scale into multiple subnets
        - Do load balancing
        - Other stuff too
      - Scaling Policies
        - 2 options:
          - Keep the group at it's initial size
          - Use scaling policies to define how to scale up  
        - You can set separate policies to scale out or in based on any number of server metrics
        - You can set alarms on scale actions by posting to (user-defined) topics in ANS (Amazon Notification Service - covered later)
  - `Target Groups`
    - Middle man between the Auto-scaling group and the Load Balancer
    - Each target group can only be associated with one Load Balancer
    - We also have to register targets with the target group
      - Go to the 'Targets' tab and select the instances associated with the autoscaling group
  - `Load Balancer`
    - Load Balancing -> Load Balancers
    - 3 Load Balancer Types
      1. Http(s)
        - Good for most application types: very flexible
        - Operate at request level
        - Good for microservices and containers too
      2. TCP
        - Ultrahigh performance
        - Applications require a static IP
        - Can handle millions of requests per second
      3. Classic Load Balancer: Old Version for backwards compatibility
    - Can be public or internal
    - Route Configuration step (in wizard)
      - Specify a target group, etc
    - When you've created a load balancer, you can view the details in the Listener tab
- EC2 Lab Objectives
  - Create an EC2 Instance of any type
  - Associate it with a new security group that only allows SSH traffic from your IP address
  - Create a snapshot of the EBS attached to the instance
    - Log in an touch a file
      - select instance
      - click `connect`
      - follow ssh instructions
      - touch a file in /home/ubuntu
    - 'Create Snapshot' in Elastic Block Store -> Snapshots -> Volume  (this takes a bit)
  - Create an AMI using the snapshot
    - From EBS Snapshot, choose 'Create Image'
    - Then go to Images -> AMI
  - Create a new instance using the AMI
  - Notes from the Walkthrough:
    - Image vs Instance
      - The image appears more oriented around the volume
      - You can still specify a variety of instance types for your image    
- Load Balancing Lab Objectives
  - Create a luanch configuration using a LAMP stack ami
  - Create an auoscaling group with the launch configuration
  - Create a load balancer and target group
  - Have the load balancer servce traffic to the instances in the autoscaling group
  - Verify you see a webapp when you navigate to the load balancers http endpoint

- Pricing models
  - On-Demand: You pay the minimal start up cost, but it gets more expensive as you have to increase capacity
  - Reserved Instances: You pay up front for a fixed capacity, cheaper if you know what you want
  - Dedicated Hosts: Most expensive up front

## S3
- Simple Storage Service
- Concepts
  - Buckets
    - Fundamental organization unit
    - Limitless size
    - Upload/download and permission
    - Every object is stored in a bucket
    - Provide namespacing
    - Identify account responsible / access control
    - Unit of aggregation for usage reports
  - Objects
    - Entities stored in buckets
    - 2 parts of data
      - Object data
      - metadata
        - name /value pairs
        - also includes:
          - date last modified
          - content type
          - custom pairs
    - identified by key and version id    
    - Can be up to 5TB  
  - Keys
    - Uniquely identify object in a bucket
    - Combo of bucket-key-version-id    
  - Regions
    - Choose the region the bucket lives in
    - Do this to:
      - Optimize latency
      - Conform to Regulatory requirements
      - Optimize costs
  - Data Consistency Model
    - Read-after-write
      - Inserting new objects (PUT)
    - Eventual
      - For Delete/Update
      - BC S3 data is replicated across multiple data centers
- Storage Classes
  - Frquently Accessed:
    - Standard
      - Default
    - Reduced_Redundancy (RRS)
      - Noncritical, reproducible data stored with less redundancy than standard storage class
      - Not generally recommended
  - Infrequently Accessed:
    - Standard_IA    
      - Stored across multiple availablility zones
    - OneZone_IA
      - Less expensive bc less redundant
    - **for both**: available quickly (ms) but there's an extra fee
    - good for older data that is accessed infrequently
  - Glacier
    - Archiving data
    - Not available for realtime
    - Needs to be restored before accessed
    - You transition normal S3 to Glacier using *Lifecycle Management* (covered later)
- Permissions Overview
  - All S3 resources are by default private 
    - Only resource owner can access initially
    - Resource owner can write an access policy to let others access
  - Access Policy Options
    - Resource Based: Policies you attach to your bucket, object, etc. (includes access control lists)
    - User Policies: Attaching policies to users in your account
    - *You typically use a combination* of each type
  - Access Control Lists (ACL's)
    - Specify r/w permissions to other **accounts**
    - Only accounts - not users in your account
    - No conditional permissions or deny-permissions
- Permissions
  - By default, all objects and buckets are private
    - only resource owner and the account that created it can access
    - but the resource owner can write an access policy
  - Access-Based Policy Types/Options
    - Resource-Based: any policies you attach your resource (object, bucket, etc.)
    - User-Based: policies attached to users in your account
  - ACL's (Access Control Lists)
    - Resource-based
    - Grant r/w permissions
    - Limits: 
      - permissions granted only to other AWS accounts, not users in your account
      - No conditional permissions
      - No explicit denials of permissions
    - Use cases:
      - Letting another account upload to a bucket
    - Bucket Permissions Section let you configure:
      - Your account
      - Other accounts
      - Public Access
      - S3 Log Delivery Group
      - Also have the ability to set a **Bucket Policy**
        - More detail later
        - JSON schema - Collection of "statements", each of which has
          - Resources: Buckets and Objects
            - use the `arn` (amazon resource name) format to identify the resource (e.g. bucket)
          - Actions
            - The permissions you allow or deny using action keywords
          - Effect
            - Either "Allow" or "Deny"
          - Principal
            - The account, user, service, etc that the policy applies to

## Cloud Formation
- Service that helps you set up your resources so you can spend less time on config, more on application
- Create a template with all the resources you want (e.g. EC2 instances, databases) and it helps you provision them, w appropriate config
  - Gives you a 'stack'
  - 'Infrastructure as Code'
- Manage a collection of resources as a single unit
- You can reuse the same template to provision into multiple regions
- You can track revisions to your template
- Templates
  - There are different formats
  - Resources appear as name-value pairs or objects

```(json)
"Resources": {
  "EC2Instance": {                //name of resource
    "Type": "AWS::EC2Instance",   //required field
    "Properties": {
      //...
    }, 
  },

  "InstanceSecurityGroup": {
    "Type": "AWS::EC2::SecurityGroup",
    "Properties": {
      //...
    }
  }
}

```

  - You can also use a YML syntax

- `Parameters` section let you define the input values (which will show up in the config UI)
  - You can associate descriptions and default values
- `Mappings` let you map from one exposed parameter value to a different value (analogous to name/value in an HTML `<select>`)
- Pseduo-Parameters are auto-resolved by AWS (basically keywords)
  - Ex: `AWS::Region` -> will resolve to whatever the region was active when the stack was created
- There are a variety of functions available in the template, including:
  - `Fn::GetAtt`
  - `Fn::FindInMap`
- Outputs: ways to export different values when you instantiate using the template
  - use cases:
    - Good for organization
    - You can use the output from one to instantiate another stack
  - You can use `Fn:GetAtt` to pull out properties from particular resources
- Stacks and Stacksets
  - 2 ways to create a stack in the cloud formation services dashboard
    - Design Surface
    - Template (text sourced from...)
      - Local Computer
      - S3 location
      - Sample template
  - Dashboard Stack Creation
    - Name of stack
    - Parameters
      - Corresponds w parameters section of template
      - `AllowValues` -> dropdown selections
      - `KeyName` -> selects keypairs defined in that region
    - Add Tags
    - Create under a given IAM role
      - If you don't specify something, cloud formation will use the role defined in your specific account
    - Rollback Trigger
      - CF monitors the app while deploying and if it reaches a particular rollback threshold (e.g. monitoring time), it triggers a rollback
    - 'Termination Protection' is a configuration option which means you can't manually terminate the application from the dashboard
  - You can update a stack from the 'Update' menu
- Stacksets are a way for AWS to deploy a stack across multiple AWS accounts and Regions
  - You can identify account(s) (or upload a list of accounts with CSV's)
  - Alternately, you can deploy to Organizational Units (OU's) which are ways to organize multiple accounts within an AWS organization
    - Ex: you might have an OU for Production Application Accounts
  - 2 roles you need to specify:
    - IAM Admin Role: Role in the account you deploy FROM
      - has to have permissions to deploy into the child account
    - IAM Execution Role: Role in the account you deploy TO
      - has to have a role that allows external access from parent account
- AWS Systems Manager Parameter Store
  - basic idea
    - Secure, hierarchical storage for configuration and secrets management
    - good for passwords, secrets (tokens, keys, etc.), connection strings as parameter values
    - encoded as plain text or encrypted
    - you can refer to these parameters with the names assigned in the store
    - you can tag the parameters
    - you can also restrict access to these parameters by 
    - to consume a parameter for parameter store in your template, you define the type of the parameter to a reserved string (eg. AWS::SSM::Parameter::Name)
  - Navigate to 'Systems Manager' -> 'Parameter Store'
  - If you update a value in the Systems Manager Parameter Store, this will take effect when you click 'Update' on the consuming Cloud Formation Stack
- Wordpress Demo Notes (going through an existing template)
  - Refs can be pointing to Parameters or other resources
- Cloud Formation Lab Objectives
  - Deploy an EC2 Instance into a security group
  - The security group should allow SSH access from your machine
  - use Cloud 9
  - Find out where the schemas for various groups are
  - Parameters: keyname & ssh location
  - resources: EC2 and a new security group
  - Steps
    - Startup the Cloud9 EC2 Instance - not sure this is necessary
    - Log in to Cloud9 in that Environment
    - Select the sample LAMP stack template and download it, open in vscode
    - Create a second file, set language mode to json, type 'sta' and you'll get a cloud formation template skeleton
    - Go to the AWS Section on resource types to get the schema of the various types.
      - EC2
      - Security Group

## DynamoDB
- Features 
  - Seamless Scalability
  - Schemaless
  - No Admin Overhead (e.g. replication, clustering, hardware)
  - Encrypted
  - Easy monitoring and metrics dashboard
  - Easy/scheduled backups and point-in-time recovery (within last 35 days)
  - Built-in durability and high-availability
  - You can use global tables to keep regions in sync
- Basics
  - Collections are called 'Tables'
  - Records are called 'Items'
  - Fields are called 'Attributes'
    - nested attributes are ok up to 32 levels
- Keys
  - Each item has to be uniquely identified by a primary key
  - atrributes in primary key must exist in all items in a given table
  - 2 types of primary keys
    1. `Partition Key`
      - aka 'Hash Attribute'
      - Single attribute 
      - Plugs this value into a hash function which is used for partitioning/sharding
      - In a table with a Partition key, the values have to be unique

    2. `Composite Primary Key`
      - 2 attributes: Combination of a `Partition Key` and a `Sort Key`
      - Sort key is aka 'Range Attribute' 
      - Partition key still used for sharding, but it doesn't have to be unique
      - Values with same partition key are stored together but sorted by their sort key (which must be different)
  - Key-based queries, regardless of type, are supported
  - Each primary key attribute must be a scalar: string, number, or binary
  - Non-key attributes can be anything
- Secondary Index
  - You can create as many of these as you want
  - Lets you query against those additional attributes (named in the key)
  - 2 types of secondary indexes
    - Global: partition and sort key which can be different from the primary key
    - Local: same partition key as the primary key on the table but a different sort key
- Storage of Indexes
  - Each index gets stored (duplicated) in a separate table, but it is related to it's 'Base Table' (ie the original table)
  - Dynamo manages updating the index table as changes get made
  - When you create an index, you specify which other attributes should get projected from the base table
    - at a min, you get the table primary key attribute(s)
- Read/Write throughput capacity
  - When you specify an index, you have to set throughput capacity which affects the cost
  - This is so AWS can reserve the appropriate resources to meet the capacity, of course
  - Read Capacity Unit (item <= 4KB size) represents either:
    - One strongly consistent read per second per Item
    - Two eventually consistent reads per second per Item
  - Write capacity unit represents:
    - One write per second for an item up to 1KB 
  - Size is cumulative: so 4 read capacity units lets you read strongly consistent item of 16KB/sec
  - If you exceed throughput, you'll be throttled by failing with a 400 code
  - Management Mechanisms
    - Auto Scaling
      - you define min/max and specify a target utilization rate
      - if you create through the dashboard, this is enabled by default
    - Provisioned Throughput
      - You just set the max throughput - no autoscaling
      - If you exceed, you get throttled
    - Reserved Capacity
      - you can purchase reserved capacity in advance and commit to a minimum
      - it's cheaper than autoscaling
  - Throughput calculations (for provisioned throughput) Examples:
    - Objective: strongly consistent read 80 items, each 3KB, per second from a table
      - Each read gets 1 read capacity unit bc 3KB/4KB rounds up to 1
      - 1 rad capacity unit per item * 80 reads per second = 80 read capacity units
    - Objective: write 100 items (512 B) per second for a table
      - 512B / 1B rounds up to 1 capacity unit per item
      - 1 * 100 writes per second = 100 capacity units
- Point in Time Recovery
  - You can restore to any time in the last 35 days
  - Enable using the management console, dynamo API, or AWS API
  - Management console -> Table -> Backups -> Enable point in time recovery
  - If you enable it, that's when you start the clock for restore time
  - If you toggle it off/on, then you reset the clock
  - When you restore - it restores to a new table along with
    - Encryption settings
    - Any (global or local) associated secondary index tables
    - Read/write capacity settings
    - but:
      - you need to reset autoscaling
      - any other services, such as monitoring

## VPC
- You create a virtual network that resembles a physical network, but with the scalable infrastructure
- VPC is a Virtual Private Cloud
- It may share the same physical network as others but it is logically isolated
- You can
  - Specify an IP addres range
  - Add subnets
  - Associate security groups
  - Configure route tables
- Subnets
  - A range of IP addresses inside your VPC
  - Use a **public subnet** for stuff which must be connected to the internet
  - Use a **private subnet** for stuff which shouldn't be publicly available
  - 2 methods for security
    - Security Groups
    - Network ACL's
- Every AWS account has a default VPC installed in each region
- Every VPC has a default subnet in each AZ in that region
- If you ignore the VPC's, then everything gets installed into your default VPC
  - However, you can create any number of non-default VPC's
- Non-default Subnets include:
  - additional subnets you create in your default VPC
  - any subnets you create in your non-default VPC
- You can control how resources in a VPC can access resources outside that VPC:
- Your default VPC contains an Internet Gateway
  - Internet Gateway lets instances communicate with internet through the Amazon EC2 Network Edge
- Each default subnet is a public subnet
  - Each instance you launch in in it:
    - has 2 IP addresses:
      - Private IPv4 address
      - Public IPv4 address
    - Can communicate with internet through the internet gateway
- Route table
  - Contains a set of rules used to determine where network is routed
  - Each subnet in your VPC has it's own route table which controls routing for the subnet
  - You can associate multiple subnets with 1 route table, but each subnet needs at least 1 route table
  - When you create a VPC, it automatically has a route table
    - In route tables page in AWS VPC dashboard, you can view the VPC-specific route table by looking for "Yes" in the main column
    - The main route table is the default route table for any subnets which don't have their own route table
- Internet Gateways
  - Make it possible for subnets and EC2 instances to be publicly routable
  - It's a horizontally scaled, redundant, HA VPC component that allows communication between EC2 instances and the internet
  - 2 purposes
    - To provide a target for your route table for internet traffic
    - To perform NAT for EC2 instances with a public IP address
  - So it's like a superset of the NAT Gateway (below)
  - They can support IPv4 and v6 traffic
- NAT Gateways
  - Let instances connect to the internet, but prevent the internet from initiating those connections
  - Instances in a private subnet can connect to the internet (e.g. for patches) but they need to access this through a NAT gateway 
    - That NAT Gateway needs to be hosted in a public subnet
- Aside on the 0.0.0.0 address:
  - Called the 'wildcard address' or 'unspecified address'
  - If we're on a server, it means:
    - all IPv4 addresses on the given machine
  - If we're in a route table, it means:
    - The default route (i.e. it doesn't match one of the explicit entries)
- Security
  - Security Groups
    - Like a virtual fw to control inbound/outbound traffic for your instances
      - Each instance can have <= 5 SG's
    - Instance Level
      - If you don't specify an instance SG, it gets the VPC's default SG
    - "Allow" rules only
  - Network ACL's
    - Optional
    - Subnet level
    - "Allow" and "Deny" rules
- Lab
  - Objectives
    - Create a new VPC in any region
    - Create 2 subnets
    - Using a NAT Gateway, an internet gateway, and route tables, make 1 subnet public and the other private
    - Create an EC2 instance using a LAMP AMI and deploy it into the new public subnet
    - TODO: Continue here

## IAM


## Lambda
- Serverless runtime
  - Different runtimes
  - scales automatically
  - no charge when not running
  - no provisioning
  - zero administration
  - you're only responsible for your code
- Lambda Function
  - Custom code and any libraries
- Event Source
  - AWS service like SNS that triggers your function
  - Could be API Gateway or things like DynamoDB even
- Downstream Resources 
  - Additional AWS services like S3 that your Lambda calls
- Log Stream
  - Lets you annotate your code to view logs that are generated
- Lambda Dashboard
  - Throttling
    - After a certain number of invocations, it'll be throttled (no other invocations will be allowed)
  - Available Actions
    - Publish a new version
    - Create an alias of the same lambda
  - Qualifiers
    - Let you refer to versions and aliases (see above)
    - The point is to have version control and test different versions of your lambda
  - Add Triggers
    - API Gateway
    - CloudFront
    - CloudWatch Events
    - CloudWatch Logs
- First time you try to test the Lambda, it asks you to set up Test Events
- Authoring methods
  - Adding code inline (web editor)
  - Uploading a zip file
  - Upload a file from S3
- 'Handler' is the lambda entry-point (which has to be registered/identified somehow)
- Environment Variables can be set/visible to your Lambda
  - Good for config settings
- Basic settings
  - you can specify the memory allocated to your lambda
  - timeouts setting
- You can specify which VPC/Subnet/SG your lambda belongs to
- Adding Packages / Libraries
  - Create a lambda package by uploading a zip or specifying an S3 target
  - Basically, you just zip up your entire project (including, for example, your expanded node_modules dir)
- Lab 1 Objectives:
  - Todo: Continue here








        
    






