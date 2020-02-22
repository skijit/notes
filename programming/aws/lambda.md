Lambda
===============

## Getting Started Guide Notes
- [src](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html)
- The handler is what gets run each time an event comes in
  - It receives the event and a context object
- If your handler completes successfully, the runtime will cache all the code/variables defined outside of your handler so that new events only have to re-compile/execute your handler.
  - This lasts for the lifetime of the lambda and minimizes cold starts
  - All of these things are added to the 'execution context'
- You have access to local storage in `/tmp` directory
- Layers are so that you only have to redeploy your function- because otherwise you have to send up all the dependencies.  This is most useful in a dev/test scenario.
- to process items from a stream or queue, use *event source mapping*
- you can have async lambdas that only fire off some event to a queue, but the return a response before any return values or confirmations are provided
- AWS SAM is an extension for the AWS CloudFormation template language that lets you define serverless applications at a higher level.
- You can also use the AWS SAM CLI



- AWS Serverless Application vs Lambda Project (e.g. C# class with a function)
  - Lambda Project
    - Triggers
      - Events
      - Another application
  - Serverless Application
    - Uses API Gateway Proxy Integration
    - Forwards all requests to the lambda function
    - Then it gets passed to AWS .NET Core Pipeline



- [try this lab](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/)

- [lambda applications](https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html)

- using other frameworks - check the blueprints
- big picture: we're not running locally so much anymore (hence sandbox environments)

- continue here https://aws.amazon.com/serverless/

## Integration with Other AWS Services
- [src](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html)
- Example Triggers
  - AWS Resource Lifecycle events
  - Respond to HTTP requests
  - Consume events from a queue
  - Run on a schedule
- Each of these services will send an event (each with a different structure) formatted as JSON and the runtime will deserialize to an object which gets passed to your function handler.
- For compiled languages (C#, Java, Go), Lambda libraries provide definitions for event types
- **Pull**: [Event Source mapping](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html) is closer to a 'pull' trigger where Lambda will read data from another service and generate an event and invoke the function.
  - SQS
  - DynamoDB
  - Kinesis
  - Requires Lambda to have the `execution role` on the other service
- **Push**: Other triggers are more 'push' oriented
  - To set this up:
    - Grant the other service permission in the function's resource-based policy
    - Configure service to generate events and invoke your function
  - Invocations can be synchronous or asynchronous
    - Synchronous: (Request/Response Contract)
      - Might retry on errors, but that's up to the caller
      - Elastic Load Balancing
      - Cognito
      - Lex
      - Alexa
      - API Gateway
      - CloudFront
      - Kinesis
      - Step Functions
      - API Gateway (default)
    - Aynchronous: (Event Contract)
      - Lambda queues (internally) the event before passing it to function
      - Other services gets a success on queue
      - If Error, Lambda retires and can send failed events to a dead-letter queue that you have to configure 
        - You want to design these as idempotent
      - S3
      - SNS
      - Simple Email Service
      - CloudFormation
      - CloudWatch
      - CodeCommit
      - Config
      - Iot
      - CodePipeline
      - API Gateway (non-default)

## Integration with API Gateway
- See API gateway notes

## Cold Start Issues
- [cold start language comparison](https://levelup.gitconnected.com/aws-lambda-cold-start-language-comparisons-2019-edition-%EF%B8%8F-1946d32a0244)
- [basic cold start issues](https://serverless.com/blog/keep-your-lambdas-warm/)
- [more details](https://hackernoon.com/im-afraid-you-re-thinking-about-aws-lambda-cold-starts-all-wrong-7d907f278a4f)
- [comparison of configuration data options](https://www.concurrencylabs.com/blog/configure-your-lambda-function-like-a-champ-sail-smoothly/)
- For AWS Lambda
  - After a period of inactivity, typically 15 minutes, your lambda container is destroyed
  - A cold start occurs when you request the lambda where none is warm (active)
  - This can take >5 sec
  - A cold start can happen for each concurrent execution of your lambda: 
    - so if you have a concentrated spike of requests, each of them might incur a cold start
  - Running in a private VPC can exacerbate the latency
  - Runtime and memory size don't affect cold start times (this is controversial)
  - If you have a chain of lambdas, it could be any of those which requires a cold-start (weakest link problem)
  - Solutions:
    - Warm-up lambdas running on a schedule: calls each of your lambda's once every X minutes
    - You might specify a header to avoid the normal execution path
    - Or set up a CloudWatch Event Rule (cron) that pings the lambda
      - You need to concurrently invoke these events if you want multiple containers warmed

## Versioning, Environments, and Configuration Data w Lambda
- [src](https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html)
- [medium article](https://medium.com/aaptiv-engineering/https-medium-com-aaptiv-engineering-getting-started-with-versioning-in-aws-lambda-92c617e2f5f1)
- [configuration](https://www.concurrencylabs.com/blog/configure-your-lambda-function-like-a-champ-sail-smoothly/)
- Versioning is based off 2 concepts:
  - Versions
  - Aliases
- Versions
  - Each time you publish changes to your function, Lambda creates a new (immutable) version
  - This includes:
    - Unique ARN
    - Code and dependencies
    - Runtime
    - Function settings, including environment variables
      - **Note**: Once you've published it, the function's settings (and everything else) are immutable
- Aliases
  - Alaises are pointers to specific version of a lambda, representing an environment    
  - When you publish a version, you can update the aliases to point at the appropriate version
  - Triggers will refer to the lambda's alias
  - A lambda version can know what alias it's using because:
    - When you invoke/trigger the lambda through its alias, it has a unique ARN
      - e.g. `arn:aws:lambda:us-east-1:123456789012:function:helloStagedWorld:DEV`
    - This ARN can be accessed via the `context` object from within the Lambda
      - `context.invokedFunctionArn`        
- Versioning in real life
  - The entire environment (IAC) is deployed together (immutable architecture)
  - The alias is piped into the build
- Configuration Data
  - [src](https://www.concurrencylabs.com/blog/configure-your-lambda-function-like-a-champ-sail-smoothly/)
  - The Lambda knows which environment it is running in via the `context` object (see above)
  - But there are a variety of places you might put this data
  - **Lambda Environment Variables**
    - Env variables, like the Lambda are immutable
    - In some cases, that might mean you have to have one version of each variable per environment (e.g. `PRD_ConnectionString`, `TST_ConnectionString`, etc.)
      - I'm not sure this can't be overcome with your IAC setup (T4, CloudFormation, CLI, SAM, etc.)
    - Lambda has 'encryption helpers' available which can let you use KMS to encrypt secrets
  - **S3**
    - One bucket for each application configuration with a separate folder for each environment
    - be sure to enable versioning in S3    
    - Simple, but extra latency, also not the most flexibility for shared secrets
  - **DynamoDB**:
    - One table for config data with hash key named `stage` and values like `key1_PRD`, `key1_TST`, etc.
    - A bit faster than S3, and somewhat more expensive (not a lot though)


## TypeScript Support
- [Totally doable](https://scotch.io/@nwayve/how-to-build-a-lambda-function-in-typescript)  
- Transpile it locally and then zip up the js to upload to AWS
- Probably some good type definition files out there to leverage...

## Other Design considerations
- [excellent source](https://www.jeffersonfrank.com/aws-blog/aws-lambda-design-considerations/)
- Memory
  - You choose how much memory you want to reserve for each execution
  - This determines the unit price
  - By choosing a low memory amount, you may increase exectuion time and ultimately pay more
  - In general, you'll want to figure out your memory amount experimentally and it's not a key design consideration
  - Lambda's scale horizontally, so that's a more important design factor
    - Also how you decompose your problem into smaller, more managable pieces
- VPC
  - If the lambda doesn't need resources inside the VPC, leave it outside
  - To go in a VPC:
    - You need to assign the lambda an Elastic Network Interface (ENI) 
    - ENI scaling is not great, esp bc Lambda could scale horizontally, exhausting it's IP addresses
    - ENI only has private IP addresses
- Use Principle of Least Permission
  - Explicitly enumerate each resource available to each IAM role
- Coupling Lambdas
  - When you have a series of Lambdas, you should not invoke them directly but use an SQS between them
  - You can use synch (req/response model) with a pull
  - This enables you to send failed messages to Dead-Letter-Queue and try to replay them when fixed (or working on repro)
  - Also enables you to support multiple message format version (per queue) or have lambdas that handle both
  - Include message format version in message
  - You want to set the SQS visibility timeout to at least 6x the timeout of the lambda and maxRecieveCount to at least 5
- Batching
  - Available for SQS and Kinesis
  - Lets you specify batches of messages at once
  - Lowers bill, complicates error processing
  - You should also have them work in parallel (but increase their memory)
- Always be idempotent
- Consider using `/tmp` for a cache instead of making a nw call
- Keep data inside the same region
- If you use a VPC for your Lambda, consider S3 and Dynamo Gateway Endpoints - they're free!  Otherwise, since S3 and DynamoDB are publicly available, you have to pay for data to go through the NAT
- Big files can be streamed from S3
- Keep your shared Lambda code in one place (symlinked) or use a Lambda Layer
- Consider how you might couple one service which scales with another which doesnt (e.g. lambda with MySQL).  Implement queues between them.
- Use IAC
- If you're only using Lambda as an intermediary between API Gateway and DynamoDB, you could also try mapping the request (through Velocity Mapping Templates) directly to the API call required by DynamoDB - and therefore, you wouldn't need the Lambda
- In general, Lambda makes most sense as a utility function for cloud resources (esp considering how it integrates with evertying)
  - It's not great for an application framework - configuration and scaling is suspect
  - Big application frameworks (java, .net) also have a longer cold start time






