## Stack Details
- Elastic Stack
  - Kibana: visualize & manage
  - Elastic Search: Search
  - Beats: Ingestion (Raw Data)
  - LogStash: Ingestion ("ETL")
- Deployment Options:
  - Elastic Cloud: SaaS
  - Elastic Cloud Enterprise: Self-Managed
  - Standalone: Self-Managed
- Applications built on top of the Elastic Stack
  - Logging
  - Health Monitoring  
  - App|Enterprise|Site Search
  - Security Analytics
  - Business Analytics
- Benefits of Elastic Search
  - Scalable
  - Flexibile Data Models
  - Real-Time
  - Highly-Available
  - Developer-Friendly
  - Versatile storage
  - Query & Aggregations
- To get started with an Online Cluster
  - `cloud.elastic.co`
  - or download from the company site
    - see `config/elasticsearch.yml` and contents of `bin/` directory
    - port 9200 by default
  - and then download kibana from the website
    - the dev tools console is excellent for getting started
    - similar file structure as elastic search (`config`, `bin`, etc.)
- Elastic stores data as JSON documents
- Interact w Elastic through REST API

## Search
### Data Operations
- Insert: 
  - `POST /<index_name>/<type_name>  Body: JSON Document`
    - `index` ~= a collection, so `index_name` is the name of the collection
    - `type_name` is deprecated, so just use the same value here (e.g. `_doc`) and assume it carries no semantics
    - The returned object will provide the inserted `_id` field (among other values)
    - Each time you invoke, you will get another inserted document
    - if the index doesn't already exist, it will be created (but you can disable this in configuration as well)
  - `PUT /<index_name>/<type_name>/<id_value>  Body: JSON Document`
    - You have to specify the id in the path
    - multiple (identical) invocations do not result in a duplicate record insertion
    - the returned object does include a `_version` property which updates each time the given document is overwritten
- Search: `GET /<index_name>/_search` 
- Delete: `DELETE /<index_name>`
- Create Index: `PUT /<index_name> Body: JSON Settings Document`
  - see docs for the variety of configs you can use when you create the index
- Bulk Insert:
  - `POST /<index_name>/_bulk Body: JSON Document`  
  - JSON Document Structure is different:
    - Each record has 2 objects:
      1. Something about the id.  E.G. `{ "index": {"_id": 1} }`
      2. The actual document

### Simple Queries
- note that `inspections` is the name of the index, and it's based on Restaurant Inspection data in San Francisco
- Match Operator: Get Documents that have 'soup' especially in the `business_name` property

```
GET /inspections/_search
{
  "query": {
    "match":  {
      "business_name": "soup"
    }
  }
}
```

- Match Phrase: Match the whole phrase, not just either of the terms

```
GET /inspections/_search
{
  "query": {
    "match_phrase":  {
      "business_name": "san francisco"
    }
  }
}
```

- Combining queries with `bool` operator: logical && of last 2 queries

```
GET /inspections/_search
{
  "query": {
    "bool": {
      must: [
        {
          "match_phrase":  {
            "business_name": "san francisco"
          }
        },
        {
          "match":  {
            "business_name": "soup"
          }
        }
      ]
    } 
  }
}
```

  - you can use `bool` with `must_not` instead of `must`

- Applying Weights to different parts of a query

```
GET /inspections/_search
{
  "query": {
    "bool": {
      must: [
        {
          "match_phrase":  {
            "business_name": {
              "query": "san francisco",
              "boost": 3
          }
        },
        {
          "match":  {
            "business_name": "soup"
          }
        }
      ]
    }
  }
}
```

- You can include the fragment that matches the search by altering your query and the response object will have a 'highlight' property:

```
GET /inspections/_search
{
  "query": {
    "match":  {
      "business_name": "soup"
    }
  },
  "highlight": {
    "fields": {
      "business_name": {}
    }
  }
}
```

- Range operator
```
GET /inspections/_search
{
  "query": {
    "range":  {
      "inspection_score": {
        "gte": 80
      }      
    }
  },
  "sort": [
    { "inspection_score": "desc"}
  ]
}
```

- Results are always ranked by relevance (_score)

- SQL-ish functionality:

```
POST _sql?format=txt
{
  "query": "SELECT business_name, inspection_score FROM inspections ORDER BY inspection_score DESC LIMIT 5"
}
```
  
  - You can also use the SQL CLI tool in the `bin` dir of Elastic Search
  - There's a JDBC client as well

### Simple Aggregations
- Some use cases:
  - facets in a search interface (e.g. filter on categories like 'size')
  - metrics
- ElasticSearch is using a column-store internally, so it's quite fast

- Example of aggregating into groups (buckets)

```
GET /inspections/_search
{
  "query": {
    "match":  {
      "business_name": "soup"
    }
  },
  "aggregations": {
    "inspection_score": {
      "range": {
        field: "inspection_score",
        ranges: [
          {
            "key": "0-80",
            "from": 0,
            "to": 80
          },
          {
            "key": "81-90",
            "from": 81,
            "to": 90
          },
          {
            "key": "01-100",
            "from": 91,
            "to": 100
          }
        ]
    }
  }
}
```

- There are lots of aggregations, including geo-coordinates and filtering on distance

### Mappings
- Mappings are essentially the schema for an index
- Each index exposes a `_mapping` endpoint from which you can `GET` or `POST` schema information
- When you insert a document to elastic search, it will make guesses about the mappings.
  - You should inspect the mapping by calling `GET /<index_name>/_mappings`
  - A lot of times, Elastic Search will get it wrong:
    - Mistake ints for floats
    - Not recognize geo-coordinates
    - ...

### Updating and Deleting
- Partial Document Updates are possible
- `POST /<index_name>/_update/<_id> Body: JSON document`
  - JSON document just has the stuff you want to add
- `DELETE /<index_name>/_update/<_id>`

### Analyzers
- You can specify analyzers on each field in each index
- In general, you might specify one of many 'tokenizers' and one of many 'filters'
  - tokenizer examples: whitespace, standard, stemming, etc.
  - filters: unique

## Kibana
- 3 key functionality types provided:
  - Data Visualization & Exploration & Analysis (most subsequent kibana notes are on this...)
  - Manage and Monitor the entire Elastic Stack ("Ingest to Insight")
  - Solutions: Application-specific modules
- Data Visualization & Exploration & Analysis
- Canvas is for custom reports
- Spaces are ways to completely partition you indexes into groups/tenants
- Getting data in:
  - Realtime
    - Modules can help you stream data from many sources into your cluster
      - uses Beats
  - Batch
    - you can upload json, csv, etc.
- Index Patterns: Lets you query on multiple indexes at once by defining a pattern which matches all of the index names
- Dashboards are all interactive

## Logs and Metrics
- Logstash: data pipeline
- Beats: data shipper
- Compare to RDBMS- everything is indexed- no penalty
- Different Beats products can read in logs from everything in the app stack (OS to persistence layers, webserver, etc)
  - Less oriented around application logs (in this presentation)
- Setting up metricbeats:
  - You install it and run as a service
  - Configure them to communicate with Elastic and the various systems
  - MetricBeats does ingests metric info from things like the OS, redis, apache, etc.
  - beats run as a service on your system, of course
- FileBeat
  - Similar to metric beats, but it ingest logfiles
- There's an elastic keystore available to avoid putting keys in config files


- https://docs.microsoft.com/en-us/dotnet/architecture/cloud-native/logging-with-elastic-stack

