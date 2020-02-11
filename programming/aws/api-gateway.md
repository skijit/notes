API Gateway
==============

- [src: API Gateway Deep Dive Video](https://learning.oreilly.com/videos/deep-dive-into/9781788835374)
- Advantages of API Gateway
  - Serverless
  - Lambda Integration
- API Gateway has solutions for:
  - Availability
  - Scalability
  - Monitoring
  - Caching
  - Security
  - Versioning
- Other nice features
  - Integration with AWS Lambda
  - GET, POST, PUT, PATCH
  - Let's you test the API
  - Multiple stages (i.e. environments)
- Architecture of API Gateway
  - Enpoints can be hosted on:
    - EC2 Instances
    - Lambda
    - Public Endpoint
  - Caching
  - CloudWatch Integration (Health Monitoring/Metrics)
  - CloudFront Integration
    - Sends response to the edge location that is closest to the originating request
- API Design Methodology (high-level)
  - Specify a Resource
  - Specify the methods (GET, POST)
  - Specify Stages (environments like DEV, TST)
- Versioning
  - You can move different versions through different stages
### Building an API
- Create a new API Gateway
  - Choose:
    - Manually create
    - Import from Swagger
    - Endpoint type: { Edge Optimized, Regional }
- Define Resources
  - They're just the paths underneath the root
  - You can enter path parameters
  - Each resource has:
    - Name
    - Path
  - Another option: Proxy Resource
    - This is to turn a particular route into a Proxy for either:
      - Some backend HTTP service
      - Integration with lambda
    - so a route like `/api/{proxy+}` will forward everything after the `/api/` to a lambda or HTTP service
    - API Gateway handles the mapping of events, requests, responses
- Define Methods
  - You define the verb you want to support on the resource
  - You define an integration type:
    - Lambda
    - HTTP
    - Mock
    - AWS Service
    - VPC Link
- Deploy API
  - Deployment is a point-in-time snapshot of the API Gateway, resources, and methods
  - Deployments are required for client invocation
  - Each deployment needs to be associated with a **stage** (environment)
  - Deployment Settings
    - API Cache (adds an extra charge)
    - API Throttling
    - CloudWatch Logs and Metrics
    - Deployment History
  - When you deploy an API and associate it with a stage, you get a DNS name you can use
    - It probably includes the stage name in the URL (at the end)
- Map Request Parameters
  - When you look at the diagram in API Gateway, you'll see two hops in the request phase:
    - Method Request
    - Integration Request
  - Each can be clicked and used to show detailed behavior
  - You specify details on how parameters are handled in both the method And Integration request
  - The execution diagram also has a link to generate tests in the first box
- Map Response Payloads
  - Go to Gateway Responses
  - Choose the HTTP status code you want to customize and begin updating the template
  - This is a global setting for your entire API
- Generating an API Key
  - For each method, you can specify whether an API Key is required

### Access Control for API
- Example: Letting a user view (only) the API in the console
  - Create an IAM user with access to the console (ie has a password)
  - Assign a group to the user
  - Attach a policy to the group
    - Provided policies aren't specific enough so create a new policy
    - Visual Editor for Policy is more informative (better for exploratory work) than entering JSON manually
- Example:
  - You can create a permission to allow access to only one method (e.g. a GET on a resource)
  - Then in the API Gateways method request (in the diagram), set Authorization to AWS_IAM
- Default authentication for a method is "none"
- We can use PostMan to send API requests with IAM users (ie w credentials)
  - In the Authorization tab, you select "AWS Signature"
  - Then insert your AccessKey, SecretKey, AWSRegion, ServiceName, SessionToken
- ARN shortcuts
  - `arn:aws:apigateway:region::/restapis/*` : use this when you want to give access to all models, stages, resources, and methods in the region
  - `arn:aws:apigateway:region::/restapis/api-id/*`: full access for a particular api
  - `arn:aws:apigateway:region::/restapis/api-id/resources/resource-id/*`: full access for a particular resource
  - `arn:aws:apigateway:region::/restapis/api-id/resources/resource-id/methods/GET`: restrict to a particular method
- CORS controls: Enable and specify the domains you want to provide access to
- API Keys: you assign a usage plan for each key which defines a usage plan:
  - Bandwidth
  - Throttling
- Custom Authentication using AWS Lambda
  - also possible

### Lambda-API Gateway Integration
- Lambda Proxy Integration: whatever payload (body, headers, query string) comes over in the API Gateway, it will be available in the lambda
  - exposed in `event`
    - `event.body`
    - `event.queryStringParameters`
  - response has to have a particular shape
    
    ```(typescript)
    {
      statusCode: number,
      headers: {
        [key:any]: string
      },
      body: string,
      isBase64Encoded: boolean
    }
    ```

## Supporting older API Versions in API Gateway
- Not sure the best way to handle this yet.
- One possibility is to create a totally different API (for major versions) and wrap each one in a generated SDK

## Todo
- Http2?
- what about using SQS, API Gateway with ECS or other container solution?

