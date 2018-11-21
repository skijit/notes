AWS S3 Notes

## Getting Set up
- AWS Free Limits
  - https://aws.amazon.com/free/
  - S3 is 5 GB
  - good resources: https://aws.amazon.com/getting-started/
  - Login portal: https://us-east-2.console.aws.amazon.com/console/home?region=us-east-2#
  - When you create a personal account and you want to login, choose root account, specify your email address and pwd
- Node getting started guide
  - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html
    - SDK for Javascript Code Examples shows how to upload photos to S3
  - [AWS S3 Javascript Api](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
  

## Background
  - [src 1](https://www.youtube.com/watch?v=LfBn5Y1X0vE)
  - buckets are folders
  - security (CRUD) is defined at the bucket level
  - bucket logs store access info
  - you can choose region where bucket is stored
  - buckets can be created via:
    - web console
    - CLI
  - bucketname must be unique.  
    - prefix with name of organization.
    - use '.' delimiting and lowercase letters
  - cannot transfer ownership of bucket
  - you get 100 buckets per account
  - buckets cannot be nested
  - no limit to number of objects in buckets
  - storage classes
    - S3 Standard
      - high availability, durability, low latency, high-throughput
      - good for web applications
    - Infrequent access
      - Like Standard but with lower cost, however you're charged per gigabyte
    - Reduced Redundancy Storage
      - noncritical objects
      - less availability and durability
      - good for stuff which can be reproduced (e.g. thumbnails)
    - Amazon Glacier
      - rarely accessed
      - several hours to retrieve
      - good for things like db backups
  - hosting
    - you can host static websites in s3 buckets
      - configure your bucket for static website hosting and upload your code into your bucket
      - files will be available from: `<bucket-name>.s3-website.<aws-region>.amazonaws.com`
    - hosting static content (e.g. images)
      - you can provide url access to the objects in your bucket
      - one method: just enable the website hosting, like in the case above
      - another method: you don't need to enable static website hosting, as long as you set up permissions appropriately.
    - you can also host via ssl

## Security and AWS
- 2 different kinds of users:
  - Root : 
    - created with your account
    - use minimally
  - IAM (Identity & Access Mgmt)
    - created by your Root user
    - you can create lots of these and assign appropriate permissions
    - use these for your various tasks (and they can sign in to the portal)
- Different kinds of credentials (available for all user types)
  - username / pwd 
    - signing into console
  - access keys
    - doing things programmatically
  - key pairs
    - doing things programmatically, though only used by EC2 and CloudFront
- Regardless of credential type, you can only get them at the time of creation
  - there's no "password reset" option
  - you can disable and create new credentials, however
- Credentials are all account-specific
- User Credentials are generated differently depending on their type:
  - **Root** : Security Credentials page in the Management Console
  - **IAM** : IAM Console

### Getting Started with Security and Node
- Create IAM User
  - do this in the console
- Generate Credentials for IAM User
  - access keys are provided automatically during user creation
- Store Credentials for access via Node
  - [see here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)
  - There is a default file format and location for this credentials file
  - location it is stored in depends on the OS
  - there are different combinations of access and secret access keys that can be specified in this same file, each corresponding to a different profile
    - you specify profile is used with the `AWS_PROFILE` account
  
## AWS CLI
- This is a great way to interact with AWS.
- Some examples of modifying my S3 bucket:
  - Note the `cmd` extension was only necessary to get it to work in git-bash
    - `aws.cmd s3 help`
    - `aws.cmd s3 ls s3://musical.image-depot-1`
    - `aws.cmd s3 ls s3://musical.image-depot-1 --recursive`
    - `aws.cmd s3 ls s3://musical.image-depot-1 --recursive | awk '{print $4}'`    
    - `aws.cmd s3 mv s3://musical.image-depot-1/CDN.EVBUC.COM/EVENTLOGOS/159967043/0DD9698FF6DE4C83BD8079A811BB1A2C.JPG s3://musical.image-depot-1/cdn.evbuc.com/EVENTLOGOS/159967043/0DD9698FF6DE4C83BD8079A811BB1A2C.JPG --acl public-read`

