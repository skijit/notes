Kafka
========================

- "kafka is a distributed, partitioned, replicated commit log system"
 - "replicated": analogous to "i do not want pets, I want cattle"  (ie no dependence on individual machines)
- really: distributing events or messages using a pub/sub model
- originally designed at linkedin to distribute data from FE to BE
- used by most "web scale" companies
- TODO: insert image of kafka API's
  - Kafka Core almost looks like a filesystem
  - Kafka Connect helps you connect to various sources (e.g. db replication between any number of databases)
- Kafka Core Basics
  - There are separate producer and consumer APIs
  - "Topics" are shared between producers and consumer APIs
  - Producer will "push" and consumer will "pull"
    - many other messaging systems push to the consumer
  - Topics
    - Think of key data structure as a circular buffer
    - Consumers will have to read at the speed that the buffer fills
      - This is a common problem in kafka implementations
    - Various consumers can have different pointers to their heads in the buffer
      - diff from many other messaging systems are more queue oriented (there is only one head for all consumers)
    - buffer size can be determined in terms of either:
      - bytes
      - time
  - Individual Kafka Messages
    - 2 components
      - `key` - binary (so the content can be serialized from any form)
        - optional
        - not analogous to a message header!
      - `value` - binary (so the content can be serialized from any form)
  - Partition
    - a topic can have N number of circular buffers
    - each instance of a topic's buffer is a partition
    - kafka runs a hash on the key then uses that to determine which partition to write
    - the key is a CRITICAL design decision
      - if you specify no key- then you can choose any partition to put it in, which could be useful for load balancing
      - if you specify a key- you have delivery sequencing guarantees only within the partition (so if this is important, you need a key, it needs to be designed correctly (per your partitions))
    - Like parallel paths from producer to consumer for a topic
      - like having multiple railroad tracks between 2 cities
    - Kafka scaling model
      - add new partitions (ie new tracks or lanes)
      - background
        - amdahl's law prev: you hit a ceiling in performance as you add more hardware
        - gunter's law: you hit a local optimimum, adding more reduces performance
        - max parallelism by example
          - you have 5 emergency exits is a single classroom of 20 kids
          - you add 5 more and you can exit twice as fast, etc
          - you will not gain evacuation performance beyond 20 doors (ie cpu's) bc max parallelism is 20
        - in kafka, the more partitions, the higher your ceiling
          - you scale linearly, as you would expect, with more partitions
  - Consumers
    - Consumer Group
      - each member/instance in a consumer group is mapped to unique partitions (within the consumer group)
        - = consumer side load balancing, (esp critical given you need to match producer/consumer timing)
      - scenario: count the messages that go through a topic
        - each consumer in a consumer group only sees a few of them - so how do they work together
        - kafka core doesn't have a solution and doesn't care
        - kafka streams DOES have a solution for this type of solution
  - Putting together the "distributed" + "partitioned" + "replicated" in Kafka Core:
    - `Broker`= any program that runs kafka (ie hosts a topic partition, etc) / is in your kafka cluster
      - usually docker containers in a k8s cluster
    - zookeeper is some apache sw that helps the brokers stay synchronized
    - suppose your cluster has:
      - 4 brokers
      - 1 topic
      - 3 partitions
      - Then...
        - each partition has a `Leader Partition` which lives on a particular broker and receives writes from producer (through the producer API)
        - each partition also has `Replica Partitions` on (some) of the other brokers
        - if a Leader partition goes down (due to issue with broker):
          - you can't write to it until...    
          - kafka "self heals" by electing one of the replicas to become the new leader

## Cap Theorem 
- Todo: get image 
- if you want Partition Tolerance
  - (be able to spread data to many different machines)
- then you have to choose:
  - Availablility
  - Consistency
- essentially, pick 2:
  - Partition Tolerance
  - Availability
  - Consistency
- Mongo chooses
  - Tolerance
  - Consistency
  - But it is not Available
- Couch DB chooses
  - Partition Tolerance
  - Availability
- Cassandra chooses
  - Partition Tolerance
  - Availability
- Hbase chooses
  - Tolerance
  - Consistency
- Kafka
  - Consistent
  - Partition Tolerant
  - "Eventually Available": ie when a leader goes down
    - so (as programmer) you have to figure out how to handle when it's not available

## Common Use Cases
- Messaging
  - only pub/sub
- website Activity Tracking
- Metrics
- Log Aggregation
- Stream Processing
  - has it's own stream library but also works well with other stream libraries incl spark
- Event Sourcing  
- Commit Log
  - Sim to DB replication
- Extremely high volume

## Comparisons with other messaging systems
- MQ series (from IBM)
  - schematized messages
  - value props: 
    - async 
    - supports interoperability
    - produces responses, so well suited to 1:1 request response pattern (ie one consumer)
  - when multiple consumers were supported, there was a topic system created
    - the topic was distributed to different queues
- Kafka is ideal when there are multiple consumers 
  - activeMQ, rabbitMQ are much better solutions when you have a single consumer
- pulsar
  - similar to kafka but has some higher-level abstractions
  - the new kid on the block

## Producer API
- Java API is the most common API (first class)
- Kafka inculdes a protocol which is how the various clients (node, .net, etc) are implemented
- Class `KafkaProducer<K,V>`
  - K: type of key
  - V: type of message
  - has a `send()` method has variants for whether a callback is used or not
  - has a `metrics()` method
- 3 mandatory properties which need to be set in a producer
  - `bootstrap.servers`
  - `key.serializer`
  - `value.serializer`
- `ProducerRecord` has properties:
  - `key` (optional)
  - `value`
  - `topic`
  - `partition`
- 3 ways to send messages
  - Fire-and-forget
  - Synchronous Send - future object is returned which can be used to see if `send()` was successful
  - Asynch send - callback is executed when response is received from kafka broker
- Configure the definition of message being sent
  - No Ack: corresponds w fire/forget
  - Ack from N Replicates
  - Ack from All replicas
- You can also write your own partitioner
- Java Client keeps an internal buffer locally (in process) and then they're sent over to the broker
  - you configure the policy on how you often you send from buffer to broker
- Kafka has it's own low-level built-in serializers but most people won't use them.  
  - Instead they'd use JSON, XML, Apach Avro, Protobuf
- A single `Producer` can send to multiple topics

## Consumer API
- Subscirbe to topic
- `KafkaConsumer<>`
  - `subscribe()`
  - `poll(interval)` 
    - you get batches of messages at a time
    - typically sit inside an infinite loop
    - consumers must keep polling kafka or they will be considered dead and the partitions will be handed to another consumer in the group
  - `commit()`- sets your 'head' in the topic buffer
    - Kafka doesn't track acknowledgements from consumers, so after processing, you have to call commit
    - but if there's a rebalance (e.g. bc of a timeout), the last commit may not have been called and duplicate messages may occur
    - you can autocommit or commit explicitly (sync or async)
  - You can as many consumers to each consumer group
- Rebalancing
  - when you re-map the ownership of partitions of consumers
  - has a cost
- You can subscribe to topics with Regular Expressions
  - this can match multiple topic names
  - if a new topic is crated with a name that matches, a rebalance will happen and consumers start consuming
  - example: `consumer.subscribe("test.*")
- Typically one consumer per thread
- A single `Consumer` can subscribe to multiple topics

## Topics
- Design decisions
  - name
  - schema
  - payload (how it is compressed)
  - key
  - number of partitions
  - number of replicas
- Concern by group
  - DevOps
    - Bandwidth consumption (size of messages)
    - Fault Tolerance and availability (size of cluster, replication factor)
    - Performance (partitions, message size)
  - Producer
    - Ease of production (schema design, serialization sot, delivery guarantees)
  - Consumer
    - Can I subscribe to only what I need (Topics/Partitions)
    - Latency (Cluster size)
  - natural tradeoff:
    - Simplifying the number of topics for producer might end up complicating (spamming) consumers
- How Topics and Partitions Influence Concerns
  - Topics
    - schema (structure, format)
    - Temporal constraints (frequency, sequence)
  - Parititions
    - Determine throughput
  - Best Practice
    - Topics -> Inform Semantics
    - Partitions -> Inform Throughput
- Best Practice
  - Use long names and consider hierarchical names (remember you can subscribe with RegEx)
- Schema
  - JSON is most common serialization, though not most efficient
  - Binary formats are sometimes preferable
- Throughput on producer is a function of:
  - Batch size
  - Compression codec
  - Ack type
  - Replication factor
- Througput on consumer is a function of message processing logic
- Best Practice:
  - overpartition for a situation you expect in future
  - you can add new partitions, but it may introduce duplication of messages in the same partition
  - there are also system costs for overpartitioning
- Handling Producer/Consumer Topic Tradeoffs
  - Producer wants to write to one topic- bc that's simple
  - There are tons of consumers out thre, but each is only interested in a subset of the events
  - Common solution is to create intermediary processes to read from the write topic and create a consumer-specific topic
    - This is also a role played by the Kafka Stream Processor
  - Common Problem with these solutions
    - Involves parallelism
    - Suppose you scale your topic from 1 to 10 partitions and then the intermediate processor goes down
      - It loses it's memory of unflushed consumer topic messages, and even though another processor will likely be created (assuming this is a k8s cluster or something like that).
      - Ultimately, you may probably have duplication of messages from the producer topic and that could mess up the analysis the processor creating the consumer topic has to do
  - Solution to this issue:
    - Kafka Streams (is one solution)

## Scaling Kafka
- Think of topic as a db table or a folder in a filesystem, collecting messages
- Topics break down into partitions- usually multiple
- Consumer Groups are instances which read the same topic
- Each parition is consumed by only 1 member of the group (called the *ownership* of the partition)
- Broker is a server in a kafka cluster that recieves mesgs from producers, commits them to disk, and responds to consumer fetch requests
  - Usually I/O bound
  - Single broker can handle thousands of partitions and millions of msgs per sec
- Retention
  - A few hours, days, or forever: you configure
  - Usually it's less than a month
  - It's intended to be a ledger of near-real-time activity
  - Some topics are *log compacted*- meaning it only retains the most recent message for the particular key
    - Foundation for streams and kSql
- Compression
  - you can compress in-flight and on-disk
  - compression algorithm options:
    - snappy: fast, but not great compression
    - gzip: great compression, but takes more CPU time
    - lz4: btween these two
  - compression operates on batches of messages, so the larger your batch size, the greater the benefit
- Multiple Clusters ok
  - Good to separate based on types of data, security requirements, separate data centers, etc
  - There's a cluster tool called Mirror Maker, which replacates messages from one cluster to the other
    - eg: a real time vs analytic cluster

## Streaming
- (after you learn this, you should move on KSql)
- Kstream library
- Based on functional programming theory
  - key ideas: semigroups, monoids, and monads
- 2 levels to the stream API
  - Low level API for manipulating streams
  - Higher level Stream 'DSL'
    - pulls in these functional ideas
- Streams: never-ending sequence
  - Functions: apply a dataflow or a sequence of functions to the streams
  - Reactive: process incoming stream data immediately upon receipt
- Kafka Stream Classes
  - `StreamsConfig` : wrapper around a map used for configuration
  - `KStreamBuilder` 
    - key class for setting up stream processing
    - based on Builder Pattern
      - Fluent API
      - Constructs processing data flow
  - `KafkaStreams`
    - wrapper of the actual stream
- Kafka Streams are distributed as a simple jar file- just include it in your file and you can use the streaming library
  - you can use other runtimes as well (e.g. .NET)
- note: `Serde` is short for serializer/deserializer
- Essentially- streams are a fluent, functional (lambda-driven) set of stream operators (similar to what you see in javascript Array members, or more closely to the operators in rxjs)
- Your kafka streams programs define a graph of processing and data distribution
- Time and Streaming
  - Provides windowing functions (useful for aggregations)
  - `event-time`: when an event was created by the source
  - `processing-time`: when an event was processed by the stream processor
  - `ingestion-time`: when an event was stored in a topic partition by one of the brokers
- Generally try to keep streams stateless, but the higher-level API provides some construcuts to support this as it can be important in some circumstances
- Streams vs Tables
  - Table represents state of the world at a particular point in time (e.g. now)
  - Stream is like the changelog of the table- each event which contributes to the table
  - Kafka lets you convert between streams and tables
  - Use cases are unclear... TODO
- Streams are parallelized and composable
- Backpressure
  - You won't get into a backpressure situation in consumer side (e.g. pushing in data faster than it can be processed) since the consumer uses a pull model
- Kafka has tight Integration with Spark/Flink
- Example wordcount streams processesor

```(java)
// First we create a stream builder
		StreamsBuilder bld = new StreamsBuilder();

		// Next, lets specify which stream we consume from
		KStream<String, String> source = bld.stream("stream-input");

		// This starts the processing topology
		source
			// convert each message list of words //List<string>
			.flatMapValues(value -> {
				//System.out.println("value = "+value);
				//System.out.println("return "+Arrays.asList(value.toLowerCase(Locale.getDefault()).split(" ")));
				return Arrays.asList(value.toLowerCase(Locale.getDefault()).split(" "));
			})
			// We're not really interested in the key in the incoming messages, we only want the values
			.map( (key,value) -> new KeyValue<>(value, value))
			// now we need to group them by key
			.groupByKey()
			// let's keep a table count called Counts"
			.count(Materialized.as("Counts"))
			// next we map the counts into strings to make serialization work
			.mapValues(value -> {
				System.out.println("Map values == "+value);
				return value.toString();
			})
			.toStream()
			// and finally we pipe the output into the stream-output topic
			.to("stream-output");
		
		// let's hook up to Kafka using the builder and the properties
		KafkaStreams streams = new KafkaStreams(bld.build(), props);
		// and then... we can start the stream processing
		streams.start();
```

## Kafka Admin and Integrations
- Initial/Common use case: consume kafka directly into Hadoop
  - Hadoop in this case is an ecosystem of tools with 2 primary components:
    - scalable, distributed file-system (e.g. HDFS or other) that works on commodity servers
    - analysis tools such as MapReduce
  - this integration was initially OOTB for kafka
- Kafka Connect
  - Developed by Confluent (kafka founders)
  - Abstracts away common problems every connector to kafka needs to solve:
    - fault tolerance
    - Partitioning
    - offset mgmt
    - monitoring
  - You can use Kafka Connect on ingress AND egress into Kafka
  - Connectors exist for:
    - JDBC (data source)
    - Elastic Search (data sink (ie target))
    - MongoDb
    - etc.
  - So (post Connect), Kafka has emerged as one of the key data integration platforms
- Administration
  - There's lots of admin tasks that have to be handled
    - topic magmt, cluster mgmt, graceful broker shutdown mgmt
  - Confluent's business model is to simplify this administration

## Kafka Delivery Guarantees
- Most common complaint/misuse is around duplicate messages
- Poor programming may lead to:
  - msgs processed multiple times
  - msgs not being processed
- Producer Issues
  - In the period between sending and receiving the stored ACK, the producer has no idea where the message is
    - assuming it was stored propertly, what if the ACK never is delivered back (due to a broker issue)?
    - you would retry to send the message and get duplicates
  - 2 solutions
    - Idempotent Producer
      - You would write the mesg a second time, but kafka would recognize it as a duplicate, so it gets ACK'ed as a duplicate
    - Transactions
      - Atomic writes across multiple partitions
      - They all succeed or fail together
    - (requires some configuration)
- Consumer Issues
  - Message Missed
    - Offset commit before successfully processing message
    - Partial processing of incoming msg
  - Message doubte processed
    - Processing before commit
    - Consumer fail before commit
  - Solutions
    - When your side-effect is outside Kafka (e.g. persist to DB), there is no good solution other than making your effect idempotent
    - When your side-effect is within Kafka (e.g. committing to Ktable) and using streams, then Kafka will only process msg once
      - Also true for Spark/Flink
  - (requires some configuration)

## Kafka Labs
- Rely on Docker-Compose, incl zookeeper
- Key Kafka Commands
  - `kafka-topics.sh`: manipulate / view topics    
  - `kafka-console-producer.sh`: produce data using stdin
  - `kafa-console-consumer.sh`: consume messages from console
- [src repo](https://github.com/SciSpike/kafka-lab)
   
## Comparisons with other Technologies

### Kafka vs ESB
- [src- Todo](https://www.confluent.io/blog/apache-kafka-vs-enterprise-service-bus-esb-friends-enemies-or-frenemies/)
- Mantra of event-driven services:
  - Centralize an immutable stream of facts
  - Decentralize the freedom to act, adapt, and change
- in contrast, ESB's:
  - messages are emphemaral, not persisted
  - centralize the governance of mesg schemas, flows, transformation, validation
    - this is common criticism of ESB's bc it prevents evolvability of services
- another big difference to ESB's:
  - kafka scalability/trhoughput

## Event Based Architectures
- todo: see Book 

## Kafka Stream Table Duality
- [src](https://www.confluent.io/blog/kafka-streams-tables-part-1-event-streaming/)


