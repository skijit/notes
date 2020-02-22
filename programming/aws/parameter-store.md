AWS Parameter Store
========
- [src](https://aws.amazon.com/blogs/mt/the-right-way-to-store-secrets-using-parameter-store/)

## Secrets Storage with ECS

### Service Identity
- Run services with principle of least priviledge
- You can only limit their access if they have an identity, so run services with IAM Roles
- Each ECS cluster node needs to run the `ecs-agent`
  - There are ECS-optimized AMI's which includes this OOTB
  - Amongst it's other responsibilities for cluster management, it will retrieve an IAM role to assign to a container and then inject this information into the container via environment variables
    - It assigns the variable `AWS_CONTAINTER_CREDENTIALS_RELATIVE_URI` to a URI suffixed with a GUID
    - The container then gets role information by communicating directly with the agent (via HTTP)
    - The agent will respond with a JSON object including:
    
    ```(json) 
    {
      "RoleArn": "arn:aws:iam::111111111111:role/test-service",
      "AccessKeyId": "ASIAIYLSOW5USUQCZAAQ",
      "SecretAccessKey": "REDACTRED",
      "Token": "REDACTED",
      "Expiration": "2017-08-10T02:01:43Z"
    }
    ```
- Other security techniques include:
  - You have to block a container from being able to reach the metadata service directly (as it could assume any other task role)
    - See main src for techniques to block (which depend on the container network setting)
  - The host `ecs-agent` config file should set `ECS_DISABLE_PRIVILEDGED` to prevent running a priviledged Docker container

### Parameter Store
- An ECS task gets its role from the `ecs-agent` as described from above
- Then it requests some parameters from SSM Parameter Store
- Each role is granted a GetParameters permission applied to the Parameter Store values underneath the key which matches the service name:

```(json)
{
  "Sid": "",
  "Effect": "Allow",
  "Action": "ssm:GetParameters",
  "Resource": [
    "arn:aws:ssm:*:*:parameter/{{service_name}}/*",
  ]
}
```

- Each value is encrypted with the same key in KMS, so you need to provide the role permission on that as well:

```(json)
{
  "Sid": "",
  "Effect": "Allow",
  "Action": [
     "kms:ListKeys",
     "kms:ListAliases",
     "kms:Describe*",
     "kms:Decrypt"
  ],
  "Resource": "parameter_store_key"
}
```






  
  

