- Excellent source: https://www.youtube.com/watch?v=SLB_c_ayRMo

## Getting Started
- Install Terraform on your local machine
- Install VSCode Terraform Extension (provides syntax highlighting, etc)
- `.tf`: Terraform file extension
- You can name your terraform file anything but put in in a designated folder bc terraform will maintain state and plugin information in there
  - `.terraform`: populated with plugins (during init) which are necessary when executing apply
  - `terraform.tfstate`: current state of what has been created  (NEVER DELETE THIS)

## Providers
- The first section of your tf file should indicate the provider (ie the target) (e.g. aws, azure, etc.)
- There are tons of providers (targets) for tf:  [see list](https://www.terraform.io/docs/providers/index.html#lists-of-terraform-providers
- Here's an example:

```(hcl)
## this is the required syntax for terraform 0.13 and later
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

# Create a VPC
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}
```

- Note that you also should specify some authentication info (e.g. your aws iam user):
  - [There are a variety of ways](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication)
  - Env variables, config file, static credentials, etc.

## Resources
- Resources are what is being provisioned
- The list of AWS resources which can be provisioned is in the left menu of this [the Terraform/AWS docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) 
- format for creating a resource (an EC2 instance)

```(hcl)
resource "aws_instance" "the-name-of-my-resource" {   ##format provider resourceType myNameOfResource
  ami = <some-AWS-ami-id-here>
  instance_type = "t2.micro"
}
```

## Workflow
- run these in the directory that contains the resources configs you want provisioned:
- `terraform init`
  - downloads plugins for providers
- `terraform plan`
  - dry-run of the steps that will be taken
- `terraform apply`
  - execute the creation/update/deletes of resources necessary to make your description of resources and actual instance match
- `terraform destroy`
  - removes the resources.  another option is to remove the resources from your tf file and apply

## References within Terraform:
- You might have to reference other resources (e.g. associate an internet gateway with a vpc)
- See example:

```(hcl)
resource "aws_vpc" "prod-vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.prod-vpc.id
}
```
## Backends
- You can specify a Backend in TF and this controls:
  - Where state is stored
  - Where API operations are run from
- There are two classes of backends:
  - **Enhanced**: store state and run API's
    - only `remote` is a backend that that performs remote operations. 
    - even then, it's optional.
    - if it is used, it displays a local log of changes
  - **Standard**: only store state
    - `local` is the only one that stores on a local disk, the rest are all remote disk / services of some kind
- [S3 as a backend](https://www.terraform.io/docs/language/settings/backends/s3.html):

```(hcl)
terraform {
  backend "s3" {
    bucket = "mybucket"
    key    = "path/to/my/key"
    region = "us-east-1"
  }
}
```

- you need to give the user role which terraform runs as succifient IAM S3 permissions
- You can mark certain resources as needing to be replaced even if there's no associated config changes with `terraform apply -replace="resource_name"`
- **workspaces** refer to keeping different versions (concurrently) of state of the same configuration on the same backend.
  - you can do this in the S3 backend
  - there are a variety of ways to do it.
    - you might have multiple accounts in AWS or 1 admin account to track states for various accounts
    - each account can represent different groups or environments
    - [more info](https://www.terraform.io/docs/language/settings/backends/s3.html)
### Files and Modules
- A `.tf` file uses Hashicorp Congif Language
  - There is also a JSON-variant of the language using extension `.tf.json`
- A module is a collection of terraform files in the same directory
  - Nested directories are not treated as part of the same module
  - Terraform treats all the files in the given directory as if they are just in one file
  - Separating them out by file is purely for convenience of developer
- When you refactor an existing (deployed) configuration into separate modules, use `terraform state mv` otherwise the state will get confused on re-apply
- Every tf config has one "root module"
- A "child module" is any module which called by another (usually the root module)
  - Child modules can be called multiple times within the same configuration
  - Child modules can be pulled in locally or from the terraform registry

### Calling a child module:

```(hcl)
module "servers" {
  source = "./app-cluster"   // req sys param - filepath or URI (in registry) - no template / variable replacement allowed
  version = "2.0.0"   // opt sys param, only honored if installing from a registry
  
  servers = 5  // input parameter - have as many of these as you want

  // these are other opt meta-parameters you can always use
  count = 1 // create multiple instances
  for_each  = toset(["assets", "media"]) // create multiple instances
  providers = { // by default, all default (non-aliased) parent provider configurations are passed from root, but you can override
    aws = aws.usw2
  }
  depends_on = [
    aws_iam_role_policy.example,
  ]

}
```

- re-run `init` whenever you add a new module to your root module
  - pass `--upgrade` flag to upgrade to a newer version

### Module output values

- Use an `output` block if you want a child module to provide any data to the calling module:

```(hcl)
output "instance_ids" {
  value = aws_instance.server.private_ip
}
```

- To reference an output value in the parent module:

```(hcl)
resource "aws_elb" "example" {
  # ...
  instances = module.servers.instance_ids
}
```

### Override Files
- Terraform assumes all the resources in a module are partitioned across files with no repeats
- Not a best practice, but if you need to override some configurations, you can add an `_override.tf` and terraform will merge the resource declarations (with override winning)
- There are some special rules for overrides depending on the construct ([see here](https://www.terraform.io/docs/language/files/override.html))

### Data Sources
- Each provider (e.g. aws) presents different resources AND data sources 
- Data sources are like resource blocks, except that instead of corresponding to resources created in the provider network, they correspond with data from the given provider
- The values you specify in a data block correspond to parameters for the given data source type
- You can also use the regular set of meta-arguments 
- There are a variety of local-only datasources for rendering templates, reading local files, and rendering AWS IAM policies

### Input Variables
- Declare input variables like this:

```(hcl)
variable "image_id" {
  type = string
}

variable "availability_zone_names" {
  type    = list(string)
  default = ["us-west-1a"]
}

variable "docker_ports" {
  type = list(object({
    internal = number
    external = number
    protocol = string
  }))
  default = [
    {
      internal = 8300
      external = 8300
      protocol = "tcp"
    }
  ]
}
```

- You can set types, sensitivity level (see `sensitive`), validation rules, descriptions, default types
- to consume an input variable, use the `var` prefix:

```(hcl)
resource "aws_instance" "example" {
  instance_type = "t2.micro"
  ami           = var.image_id
}
```

- There are multiple to ways to set input variables (for the root module):
  - `-var` command line option
  - variable definition file `.tfvars`
    - these files don't have variable blocks.  they're just the assignments.
    - you can alternately specify them in json as `.tfvars.json`
    - you load these on the commandline: `-var-file='testing.tfvars'` but any files names `terraform.tfvars` or `.auto.tfvars` are automatically loaded (or their json counterparts)    
  - environment variables
    - prefix with `TF_VAR_`

### Local Variables
- A local variable is just assigning a name to a value which you can use throughout the module

```(hcl)
locals {
  service_name = "forum"
  owner        = "Community Team"
}
```

- To consume a local variable: `locals.service_name`


### Output Variables
- You can use these in the root module or child modules
- Format:

```(hcl)
output "instance_ip_addr" {
  value       = aws_instance.server.private_ip
  description = "The private IP address of the main server instance."
}
```

- Root module outputs: printed out
- Child module outputs: available to parent module
- Consuming child module outputs: `module.<MODULE NAME>.<OUTPUT NAME>`

### Expressions
- https://www.terraform.io/docs/language/expressions/index.html

### Functions

### Reading Templates and Files
- The function `templatefile` will 
  - read in a template file (extension `.tpl` or `.tmpl`) (first parameter)
    - or the template can be inline
  - injecting parameters into the template
  - render the resulting string into the given module
- [src](https://www.terraform.io/docs/language/functions/templatefile.html)
- If you need to reformat the data as yml or json, use the `jsonencode()` or `yamlencond()` functions in the template
- The function `file` just reads the contents of the given file and injects it into the module


## Questions
- How do you blend with code repos?
- How do you refer to TF data in the code?
- How do you handle environmental changes?
continue here: https://www.youtube.com/watch?v=SLB_c_ayRMo&t=4182s
 
## Other
- Go to EC2 and create a keypair

## Creating an API Gateway & Lambda & S3 with TR
- [source](https://www.youtube.com/watch?v=SgvkU1yNuGM&t=88s)

- lambda entrypoint
  - always `handleRequest()`
  - when it's connected to API Gateway, there's an additional second parameter, `request`
    - includes http method, body, query string parameters, etc.
    - you can use this data to route to the appropriate function in your lambda
  - your response also needs to be adapted to an HTTP response
    - if you're being called from a browser, you need to set CORS headers too

```(hcl)
// filename: terraform/main.tf

provider "aws" {
  region = "us-east-2"
  profile = var.profile
}

variable "profile" {
  default = "dev-01"
}

##### Lambda Stuff ######

// this is a trick for running commands locally
resource "null_resource" "compile" {
  triggers = {
    build_number = "${timestamp()}"
  }

  provisioner "local-exec" {
    command = "<put the command to compile here>"
  }
}

// zip the code
data "archive_file" "zip" {
  type = "zip"
  source_file = "../target/lambdain"
  output_path = "../target/lambdain.zip"
  depends_on =  [null_resource.compile]
}

resource "aws_lambda_function" "my-lambda" {
  function_name = "my-lambda"
  handler = "lambdain"
  runtime = "go1.x"
  role = "your arn role here"
  filename = data.archive_file.zip.output_path
  source_code_hash = data.archive_file.zip.output_base64sha256
  memory_size = 128
  timeout = 10
}

resource "aws_lambda_permission" "allow_api" {
  statement_id = "AllowAPIgatewayInvokation"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.my-lambda.function_name
  principal = "apigateway.amazonaws.com"
}

#### API Gateway ####

resource "aws_api_gateway_rest_api" "my-api-gateway" {
  name = "my-api-gateway"
  endpoint_configuration { // this is pretty standard
    types = "[ REGION ]"
  }
}

// resource inside our api gateway
resource "aws_api_gateway_resources" "person" {
  rest_api_id = aws_api_gateway_rest_api.my-api-gateway.id
  parent_id = aws_api_gateway_rest_api.my-api-gateway.root_resource_id
  path_part = "person"
}

// POST
resource "aws_api_gateway_method" "post" {
  rest_api_id = aws_api_gateway_rest_api.my-api-gateway.id
  resource_id = aws_api_gateway_resources.person.id
  http_method = "POST"
  authorization = "NONE"
  api_key_required = false
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id = aws_api_gateway_rest_api.my-api-gateway.id
  resource_id = aws_api_gateway_resources.person.id
  http_method = aws_api_gateway_method.post.http_method
  integration_http_method = "POST"
  type = "AWS_PROXY"  // this is how the API Gateway forwards the request parameter into the lambda
  uri = aws_lambda_function.my-lambda.invoke_arn
}

resource "aws_api_gateway_method" "get" {
  rest_api_id = aws_api_gateway_rest_api.my-api-gateway.id
  resource_id = aws_api_gateway_resources.person.id
  http_method = "GET"
  authorization = "NONE"
  api_key_required = false
}

resource "aws_api_gateway_integration" "integration-get" {
  rest_api_id = aws_api_gateway_rest_api.my-api-gateway.id
  resource_id = aws_api_gateway_resources.person.id
  http_method = aws_api_gateway_method.get.http_method
  integration_http_method = "GET"
  type = "AWS_PROXY"  // this is how the API Gateway forwards the request parameter into the lambda
  uri = aws_lambda_function.my-lambda.invoke_arn
}

#### Deployment of API Gateway ####

resource "aws_api_gateway_deployment" "deployment1" {
  rest_api_id = aws_api_gateway_rest_api.my-api-gateway.id

  // if there's any change to the tf code attached to the aws_api_gateway_rest_api, redeploy
  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.my-api-gateway.body))
  }

  depends_on = [aws_aws_api_gateway_integration.integration]
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "example" {
  deployment_id = aws_api_gateway_deployment.deployment1.id
  rest_api_id = aws_api_gateway_rest_api.my-api-gateway.id
  stage_name = var.profile  // this will be part of the URL of the API Gateway
}


// when it deploys, you don't know what the URL is unless you go to the console
// but we can infer it by outputting these variables
output "invoke_arn" { value = "${aws_api_gateway_deployment.deployment1.invoke_url}"}
output "stage_name" { value = "${aws_api_gateway_stage.example.stage_name}" }
output "path_part" { value = "${aws_api_gateway_resources.person.path_part}" }

```


## Terraform Elastic OpenAPI Notes
- [source](https://dev.to/rolfstreefkerk/openapi-with-terraform-on-aws-api-gateway-17je)
- When you import the Open API spec document, AWS API gateway will create the swagger (and regular) endpoints for you
- tfvars 
  - files for terraform variable definitions.  
  - often placed in directories with env-specific valuables (e.g. `/env/dev`)
- modules are composed together in services
- S3 buckets are often used to set up terraform state files
  - set up encryption (security) and versioning (rollback)
- You can specify your open api spec in your `aws_api_gateway_rest_api` resource
