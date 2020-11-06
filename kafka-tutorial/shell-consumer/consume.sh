#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
"$BASEDIR"/../kafka_2.13-2.6.0/bin/kafka-console-consumer.sh --topic kafka-tutorial --from-beginning --bootstrap-server localhost:9092