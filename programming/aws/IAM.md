IAM 
=======
- Actions are the atomic-level security information
    - They're available OOTB for the platform
- A Permission connects an action to a resource
  - (...and other things, like conditions, effect (ie allow or deny))
- A policy is a group of permissions
- You can define your own policy or use pre-defined ones
- The IAM Permissions Visual Editor is really useful (the alternative is using JSON editing directly)
- Groups are collections of users
- Groups are assigned policies (if you follow best practices)
- Use IAM conditions to make permissions more policies
    - Examples
      - Limiting developer IAM accounts to only work in a given subnet
      - Locking down admin accounts to only work from a specific IP range
      - Granting a permission for a specific time window

```(json)
{
  "Version": "2010-10-17",
    "Statement": {
       "Effect": "allow",
       "Action": "*",
       "Resource": "*"
       "Condition": { ... }
   }
}
```

- see [conditions documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html)
- principle of least permission means avoiding settings resources to "*"
- things which are assigned roles, typically only have one role assigned to them, but with potentailly multiple policies