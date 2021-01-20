- Define a schema (aka `mapping`) for an event (i.e. a real world event) called 'event' (it's a JSON document)

```(javascript)
//convert to JSON
{
  mappings: {
    event: {
      properties: {
        id: { type: "string", index: "not_analyzed"},
        name: { type: "string", analyzer: 'english'},
        description: { type: "string", analyzer: 'english'},
        start_date: { type: "date" }
      }
    }
  }
}  
```


- add it to an index (using python API):

```(python)
client.indices.create(index='myIndexName', body=mappingJsonObj)
```

- simplest query (`select * from blah`):

```(json)
{
  'query': {
    'match_all': {}
  }
}
```

- to invoke: `client.search(index=myIndexName, body=queryJsonAbove)`

- term query: exact matches
  - you'll index data as a keyword

```(json)
{
  'query': {
    'term': {
      'city': 'Fairfax'  //has to match exactly
    }
  }
}
```

- match query:
  - you'll index data as text
  - fuzzy / scored match

```(json)
{
  'query': {
    'match': {
      'name': 'any of these keywords will work'
    }
  }
}
```

- match_phrase
  - you can 'and' or 'or' the terms together
  - the terms have to appear in the specific order

```(json)
{
  'query': {
    'match_phrase': {
      'name': 'Mr Smith' //will not match 'smith blah blah mr'      
    }
  }
}
```

- to require that the terms are separated only by (e.g.) at most 2 terms, use `slop`
```(json)
{
  'query': {
    'match_phrase': {
      'name': 'Mr Smith' //will match 'smith blah blah mr'      
      'slop': 2
    }
  }
}
```





  - match_phrase_prefix
    - automatically wildcards everything after your query
  - match_bool_prefix
    - look for terms separately, but the last term is wildcarded
- boolean queries
  - combine queries together
  - combine operators:
    - must => 'AND"
    - should => 'OR'
    - must not => 'NOT'

  ```(json) 
  {
    'query': {
      'bool': {
        'must': [{
          'term': {
            'city': 'Fairfax'
          }
        }],
        'should': [{
          'match_phrase': {
            'name': {
              'query': 'mr smith',
              'slop': 2,
              'boost': 2 //lets you increase relative weight of each clause
            }
          }
        }]        
      }
    }
  }
  ```

  - you wont get a relevance score, unlike other queries

- Search Relevance
  - TF*IDF
    - TF: Term Frequency.  How often a term occurs in a document.
    - DF: Inverse Document Frequency (e.g. ).  How often it occurs in the set of all documents.
  - Score for a particular term: TF_term1 / DF_term1
    - Gets at the specificity of a term to a document
  - IDF = 1/DF and sometimes score is alternately represented as: TF*IDF

- Analysis
  - To get stuff in to Elastic:
    - Analysis
    - Indexing
  - Analysis Steps
    - Tokenization
    - Lower Casing
    - Stop Wording (throw away articles and things like 'the', 'a')
    - Stemming
  - Indexing 
    - Builds reverse indexes so that each token is mapped to the documents it appears in: `tokenA: [doc1, doc2, doc3]`
    - Elastic is so fast bc this part is so slow

- Building Search Results (2 passes)
  - Find all matches
  - Score
    - It already has the intended page size
    - So it walks through matching results and calculates score, and adds to fixed size queue if it's score is high enough (priority queue) and dequeues lowest scoring match

- Aggregations
  - Aggregations follow logically from the other operations, given the indexing
  - Filter: already provided in search
  - Group: taps into results/scoring pipeline 
  - Aggregate: taps into results/scoring pipeline
  - Originally aggregations were for faceted searches, but if you take the same information and invert it, you get histograms

```(javascript)
query = {
  query: {
    match_all: {}
  },
  aggs: {
    by_city: {
      terms: {
        field: 'city'
      }
    },
    by_price: {
      histogram: {
        field: 'price",
        interval: 10
      }
    }
  }
}
```

- where results look like:

```(javascript)
...
aggregations: {
  by_city: {
    buckets: [
      { key: "Fairfax", doc_count: 12345 },
      { key: "New York", doc_count: 34567 }
    ],
    doc_count_error_upper_bound: 0,
    sum_other_doc_count: 0
  },
  by_price: {
    buckets: [
      {key: 10, doc_count: 12},
      {key: 15: doc_count: 15}
    ]
  }
}
```

- aggs can be arbitrarily nested
- 66 different kinds of aggregations
  - 4 categories
    - buckets
      - grouping and counting
    - metrics
      - bounding box
      - avg
      - min/max
    - pipeline
      - connect aggregations
    - matrix (experimental)
  
   


