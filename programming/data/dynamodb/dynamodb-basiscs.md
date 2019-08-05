Dynamo DB Basics
====================
- [good starting ref](https://medium.com/swlh/data-modeling-in-aws-dynamodb-dcec6798e955)

- dynamo characteristics:
  - key/value store && document db
  - Autoscaling
  - Completely cloud-based
  - multi-regioned
- Everything is stored in a single table
- Each table has 2 key columns:
  - partition key
  - sort key
- Partition key determines which shard it goes into
  - "shard"
    - Dynamo calls these *Partitions* or RCU's (Read-capacity units)
- Sort key
  - All of the partition key records are automatically sorted by sort-key
  - A common pattern is to prefix each record's sort key with the record type (which indicates the underlying document structure)
- Modelling Example:
  - ![dynamo-modelling-example](/resources/images/programming/dynamo-modelling-example.png]

- Query Examples
  ```(json)
  // Parameterized query for a particular partition key
  {
    "TableName": "tournaments",
    "KeyConditionExpression": "partitionKey = :tournamentId",
    "ExpressionAttributeValues": {
      ":tournamentId": "983d39a3-bdd6-4b61-88d5-58595d555b81"
    }
  }

  // Parameterized query for one particular record type
  {
    "TableName": "tournaments",
    "KeyConditionExpression": "partitionKey = :tournamentId and begins_with(sortKey, :teamPrefix)",
    "ExpressionAttributeValues": {
      ":teamPrefix": "team-",
      ":tournamentId": "983d39a3-bdd6-4b61-88d5-58595d555b81"
    }
  }

  // simple query
  {
    "TableName": "tournaments",
    "Key": {
      "partitionKey": "983d39a3-bdd6-4b61-88d5-58595d555b81",
      "sortKey": "tournament-details"
    }
  }
  ```