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

- Note that you also should specify some authentication info.
  - [There are a variety of ways](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication)
  - Env variables, config file, static credentials, etc.

## Resources
- Resources are what is being provisioned
- The list of AWS resources which can be provisioned is in the left menu of this [the Terraform/AWS docs](- [Basic AWS resource declaration](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)) 
- format for creating a resource (an EC2 instance)

```(hcl)
resource "aws_instance" "the-name-of-my-resource" {   ##format: provider_resoucreType myNameOfResource
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

continue here: https://www.youtube.com/watch?v=SLB_c_ayRMo&t=4182s
