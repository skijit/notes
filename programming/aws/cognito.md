Cognito Basics
==================

- Sign-up and Sign-in Functionality
- User Data synchronization service
- Compare to IAM- which is identity access for "internal" principals
- Key Features
  - User Pools which is a serverless user directory
    - Provide user profiles
    - Authentication Tokens for users who sign-up directly and for those from federated identity providers
  - Identity Pools which define authorization
    - User pools are just for authentication 
  - A variety of advanced security features to identify/quarantine compromised accounts
    - Risk score to unusual activie
    - Users can verify identity through SMS
  - Identity federation through providers such as Google, Facebook, and Amazon 
    - Also through Active Directory through SAML
  - Standards support includes
    - OAuth 2.0
    - SAML 2.0
    - OpenID Connect
  - MFA
  - Access Control to backend resources
    - You map users to different roles
  - Easy integration with our apps, easy branding

  - User Pool vs Identity Pool
    - User Pool => Authentication
    - Identity Pool => Authorization
    - User Pool Use Cases
      - Sign-up and Sign-in webpages
      - Access and manage user data
      - Track user device, location, etc.
      - Custom Authentication flows
    - Identity Pool Use Cases
      - Give users access to an S3 bucket or DynamoDB table
      - Generate temporary AWS credentials for unauthenticated users

## 6 Common Cognito Scenarios
1. Authenticate with a User Pool
  - App users can sign in directly or federate with a third-party identity provider
  - User pool manages overhead of handling tokens that are returned from third parties and various  protocols
  - App receives user pool tokens from cognito which allow it to access other services
2. Access Server-side resources with User Pool
  - You can create user pool groups to manage permissions and represetnt different types of users
  - Once you have a domain for your user pool, Cognito provisions  a sign-up/sign-in page for your app
3. Access Resources with API Gateway and Lambda with a User Pool
  - API Gateway validates user pool tokens and grants users access to resources including Lambda functions or your own API
  - API Gateway lets you map groups in a user pool to IAM roles
  - The groups a user is a member of is encoded in the token
  - You can define an "Authorizer" lambda function, coming through API Gateway
4. Access AWS Services with a User Pool and an Identity Pool
  - After successful user pool authentication, you receive user pool tokens which you can exchange for AWS credentials via Identity Pool
5. Authenticate with a third party and access services with an Identity Pool
6. Grant users access to AppSync (graphql) resources with Cognito token (for user or identity pool)



