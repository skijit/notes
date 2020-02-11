Comparison of Serverless and Container Solutions
==================

- https://www.cloudflare.com/learning/serverless/serverless-vs-containers/
    - https://www.sumologic.com/blog/serverless-vs-containers/
    - https://medium.com/@TechMagic/serverless-vs-docker-what-to-choose-in-2019-80cb80f4b680
    - https://serverless.com/blog/serverless-faas-vs-containers/
    - https://serverless.com/blog/why-we-switched-from-docker-to-serverless/

## Where Serverless Wins
- Fast Scaling (supposedly)
- Less Maintenance
- Much simpler
- Pay only for what you use (although at some scales, this can be more)
- Faster development
- When you're not seeing consistent, sustained traffic

## Where Containers Win
- Runs on-Prem and in-cloud
- Local Dev environment
- Multi-platform
- Less of a vendor lock-in
- Full control of dependencies
- No black-box
- More control over the stack and components, which may become extremely important as complexity grows
- Highly interoperable
- Great for migrating legacy applications



## Hybrid Approaches
### Mixed Container and Serverless

### Containers as a Service

### WASM as a Service

### Todo: 
- Cold Start issues
https://levelup.gitconnected.com/aws-lambda-cold-start-language-comparisons-2019-edition-%EF%B8%8F-1946d32a0244
https://serverless.com/blog/keep-your-lambdas-warm/
- For AWS Lambda
  - After a period of inactivity, typically 15 minutes, your lambda container is destroyed
  - A cold start occurs when you request the lambda where none is warm (active)
  - This can take >5 sec
  - Running in a private VPC can exacerbate the latency
  - Runtime and memory size don't affect cold start times (this is controversial)
  - If you have a chain of lambdas, it could be any of those which requires a cold-start (weakest link problem)
  - Common workarounds
    - Warm-up lambdas running on a schedule: calls each of your lambda's once every X minutes

  - See [this](https://hackernoon.com/im-afraid-you-re-thinking-about-aws-lambda-cold-starts-all-wrong-7d907f278a4f)
- Would you run a website, with all its static assets, etc. from lambda?


- can you use typescript with lambdas?