AWS Credential Types
============

- [Guide 1 Source](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)
- [Guide 2 Source](https://docs.aws.amazon.com/general/latest/gr/signing_aws_api_requests.html)
- Different types of security credentials are required depending on how you interact with AWS.
- All security credentials are (root) account-specific

## Root User Console Access
- Root user gives you full control over your account
- For security, Root user should only log into the AWS Management Console
  - Sign in with the associated **email** and **password**
- There are only [a few things]https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html) you should ever do with your root account
- Optionally, you can (and are advised to) enable **MFA** for root user

## IAM Console Access
- IAM users provide **username** and **password** to log into the console
  - There are also services that require these credentials
- IAM users can manage their owne password, but you have to give them explicit permission
- Optionally, you can (and are advised to) enable **MFA** for priviledged IAM users

## SDK and CLI Access
- Anytime you use the CLI or some AWS SDK, you will be using **Access Keys**
- Access keys are different from KeyPairs (discussed below)
- You associate an Access Key with an IAM (or Root) user
- Access Keys consist of 2 parts:
  - Access Key ID <- Identifies who you are
  - Secret Access Key <- Validates that you are who you say you are (signs the request - see below)
- Limited to 2 Access Keys per IAM user
  - You can disable a key at any time, but then it's gone permanently
- **Temporary Security Credentials** can also be created
  - You get the Access Key + Security Token
  - These credentials expire
  - good for less secure environments or to grant to users outside your account
- Generally favor roles over Access Keys because there's less requirement for rotation

### Signing Requests
- Your API requests through an AWS SDK and your CLI requests will be signed automatically
- You can make API requests and manually sign them too
  - Good when there's no SDK for the language you're using
- In any of these scenarios, you're sending a signed HTTP request
- Signing Steps:
  - You have a request payload
  - You calculate a hash of the request
    - Benefit: prevents any tampering with the request
  - You create a new hash with your secret key which includes the oriinal hash and some other info from your request 
    - This is known as the signature
    - Benefit: Verifies your identity
    - Benefit: The timestamp is also encoded, and so this prevents replay attacks

## EC2 and CloudFront
- These services require **Key Pairs**
- Key Pairs consist of a public and private key
- Main use cases:
  - EC2: to ssh in
  - CloudFront: distribute private content
- Various AWS Services provide ability to create a keypair

