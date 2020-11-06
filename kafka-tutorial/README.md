# kafka-tutorial

High level overview on how kafka works!

Useful Links:

Youtube: https://youtu.be/esGko6lK5e8

Kafka: https://kafka.apache.org/

Quickstart: https://kafka.apache.org/quickstart

Use Cases: https://kafka.apache.org/uses

## Getting Started

### Start zookeeper and kafka broker

```shell script
./kafka_2.13-2.6.0/bin/zookeeper-server-start.sh kafka_2.13-2.6.0/config/zookeeper.properties
./kafka_2.13-2.6.0/bin/kafka-server-start.sh kafka_2.13-2.6.0/config/server.properties
```

### Create Topic

```shell script
./kafka_2.13-2.6.0/bin/kafka-topics.sh --create --topic kafka-tutorial --bootstrap-server localhost:9092
```

## Create Producer

```shell script
./kafka_2.13-2.6.0/bin/kafka-console-producer.sh --topic kafka-tutorial --bootstrap-server localhost:9092
```

## Run Consumers:
```shell script
# Java Consumer (filters by 'java')
./java-consumer/gradlew run -p ./java-consumer 

# JavaScript Consumer (filters by 'js')
node ./javascript-consumer/index.js

# Shell Consumer (no filter)
./shell-consumer/consume.sh
```
