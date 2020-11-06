package kafka.tutorial.app;

import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.KStream;

import java.util.Properties;

import static org.apache.kafka.clients.consumer.ConsumerConfig.AUTO_OFFSET_RESET_CONFIG;
import static org.apache.kafka.common.serialization.Serdes.String;
import static org.apache.kafka.streams.StreamsConfig.APPLICATION_ID_CONFIG;
import static org.apache.kafka.streams.StreamsConfig.BOOTSTRAP_SERVERS_CONFIG;
import static org.apache.kafka.streams.StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG;
import static org.apache.kafka.streams.StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG;

public class App {

  public static void main(final String[] args) {
    Properties props = new Properties();
    props.put(APPLICATION_ID_CONFIG, "java-app");
    props.put(BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    props.put(AUTO_OFFSET_RESET_CONFIG, "earliest");
    props.put(DEFAULT_KEY_SERDE_CLASS_CONFIG, String().getClass());
    props.put(DEFAULT_VALUE_SERDE_CLASS_CONFIG, String().getClass());

    StreamsBuilder builder = new StreamsBuilder();
    KStream<String, String> textLines = builder.stream("kafka-tutorial");
    textLines
      .filter((key, value) -> value.contains("java"))
      .foreach((key, value) -> System.out.println(value));

    KafkaStreams streams = new KafkaStreams(builder.build(), props);
    streams.start();
  }

}